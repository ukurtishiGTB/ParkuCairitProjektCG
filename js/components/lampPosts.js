/**
 * Lamp Posts Component - Creates lamp posts with lights
 */

import * as THREE from 'three';

export function createLampPosts() {
    const lampGroup = new THREE.Group();
    lampGroup.name = 'lampPosts';
    const lampLights = [];

    // Lamp positions along paths
    const lampPositions = [
        // Main horizontal path
        { x: -25, z: 0 },
        { x: -10, z: 0 },
        { x: 10, z: 0 },
        { x: 25, z: 0 },
        
        // Main vertical path
        { x: 0, z: -25 },
        { x: 0, z: -10 },
        { x: 0, z: 10 },
        { x: 0, z: 25 },
        
        // Around playground
        { x: -25, z: -12 },
        { x: -25, z: 12 },
        
        // Park corners
        { x: -30, z: -30 },
        { x: 30, z: -30 },
        { x: -30, z: 30 },
        { x: 30, z: 30 }
    ];

    lampPositions.forEach((pos, index) => {
        const { lampPost, light } = createLampPost(index);
        lampPost.position.set(pos.x, 0, pos.z);
        lampGroup.add(lampPost);
        lampLights.push(light);
    });

    return { lampGroup, lampLights };
}

function createLampPost(index) {
    const lampPost = new THREE.Group();
    lampPost.name = `lampPost_${index}`;
    lampPost.userData = {
        name: "Street Lamp",
        description: "A classic park lamp post that illuminates the pathways at night, ensuring safety and creating a warm atmosphere.",
        interactive: true
    };

    // Materials
    const poleMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.3,
        metalness: 0.9
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffee,
        transparent: true,
        opacity: 0.8,
        emissive: 0xffffaa,
        emissiveIntensity: 0.3
    });

    // Base
    const baseGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.2, 8);
    const base = new THREE.Mesh(baseGeometry, poleMaterial);
    base.position.y = 0.1;
    base.castShadow = true;
    lampPost.add(base);

    // Main pole
    const poleGeometry = new THREE.CylinderGeometry(0.08, 0.1, 4, 8);
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.y = 2.2;
    pole.castShadow = true;
    lampPost.add(pole);

    // Decorative ring
    const ringGeometry = new THREE.TorusGeometry(0.12, 0.03, 8, 16);
    const ring = new THREE.Mesh(ringGeometry, poleMaterial);
    ring.position.y = 3.8;
    ring.rotation.x = Math.PI / 2;
    lampPost.add(ring);

    // Lamp arm
    const armGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6);
    const arm = new THREE.Mesh(armGeometry, poleMaterial);
    arm.position.set(0.25, 4.1, 0);
    arm.rotation.z = -Math.PI / 2;
    arm.castShadow = true;
    lampPost.add(arm);

    // Lamp housing top
    const housingTopGeometry = new THREE.ConeGeometry(0.25, 0.2, 8);
    const housingTop = new THREE.Mesh(housingTopGeometry, poleMaterial);
    housingTop.position.set(0.5, 4.25, 0);
    housingTop.castShadow = true;
    lampPost.add(housingTop);

    // Lamp glass/bulb housing
    const glassGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.3, 8);
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.set(0.5, 4, 0);
    lampPost.add(glass);

    // Decorative bottom ring of lamp
    const lampRingGeometry = new THREE.TorusGeometry(0.18, 0.02, 8, 16);
    const lampRing = new THREE.Mesh(lampRingGeometry, poleMaterial);
    lampRing.position.set(0.5, 3.85, 0);
    lampRing.rotation.x = Math.PI / 2;
    lampPost.add(lampRing);

    // Point light (for night mode)
    const light = new THREE.PointLight(0xfff5e0, 0, 15, 2);
    light.position.set(0.5, 3.9, 0);
    light.castShadow = true;
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    light.shadow.radius = 4;
    lampPost.add(light);

    return { lampPost, light };
}
