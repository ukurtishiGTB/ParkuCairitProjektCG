/**
 * Skybox Component - Creates the sky background
 */

import * as THREE from 'three';

export function createSkybox() {
    // Create a gradient sky using a large sphere
    const skyGeometry = new THREE.SphereGeometry(400, 64, 64);
    
    // Create gradient shader material
    const skyMaterial = new THREE.ShaderMaterial({
        uniforms: {
            topColor: { value: new THREE.Color(0x0077ff) },
            bottomColor: { value: new THREE.Color(0x87CEEB) },
            offset: { value: 20 },
            exponent: { value: 0.6 }
        },
        vertexShader: `
            varying vec3 vWorldPosition;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform float offset;
            uniform float exponent;
            varying vec3 vWorldPosition;
            void main() {
                float h = normalize(vWorldPosition + offset).y;
                gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
            }
        `,
        side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    sky.name = 'skybox';

    return sky;
}

export function createClouds() {
    const cloudGroup = new THREE.Group();
    cloudGroup.name = 'clouds';

    const cloudMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        roughness: 1
    });

    // Create several clouds at different positions
    const cloudPositions = [
        { x: 50, y: 40, z: -30, scale: 1.5 },
        { x: -40, y: 45, z: 20, scale: 1.2 },
        { x: 20, y: 50, z: 50, scale: 1.8 },
        { x: -60, y: 42, z: -40, scale: 1.3 },
        { x: 70, y: 48, z: 30, scale: 1.6 },
        { x: -30, y: 55, z: 60, scale: 1.4 }
    ];

    cloudPositions.forEach((pos, index) => {
        const cloud = createCloud(cloudMaterial);
        cloud.position.set(pos.x, pos.y, pos.z);
        cloud.scale.setScalar(pos.scale);
        cloud.userData = { 
            originalX: pos.x,
            speed: 0.5 + Math.random() * 0.5
        };
        cloudGroup.add(cloud);
    });

    return cloudGroup;
}

function createCloud(material) {
    const cloudGroup = new THREE.Group();

    // Create cloud from multiple spheres
    const sphereCount = 5 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < sphereCount; i++) {
        const radius = 3 + Math.random() * 4;
        const geometry = new THREE.SphereGeometry(radius, 8, 6);
        const sphere = new THREE.Mesh(geometry, material);
        
        sphere.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 8
        );
        
        cloudGroup.add(sphere);
    }

    return cloudGroup;
}
