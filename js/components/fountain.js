/**
 * Fountain Component - Creates an animated water fountain
 */

import * as THREE from 'three';

export function createFountain() {
    const fountainGroup = new THREE.Group();
    fountainGroup.name = 'fountain';
    fountainGroup.userData = {
        name: "Central Fountain",
        description: "The beautiful central fountain of Çair Park. A gathering spot where visitors enjoy the soothing sounds of flowing water.",
        interactive: true
    };

    // Materials
    const stoneMaterial = new THREE.MeshStandardMaterial({
        color: 0x8a8a8a,
        roughness: 0.7,
        metalness: 0.1
    });

    const waterMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a90d9,
        transparent: true,
        opacity: 0.6,
        roughness: 0.1,
        metalness: 0.3
    });

    // Base pool (outer ring)
    const outerPoolGeometry = new THREE.CylinderGeometry(5, 5.5, 0.8, 32);
    const outerPool = new THREE.Mesh(outerPoolGeometry, stoneMaterial);
    outerPool.position.y = 0.4;
    outerPool.castShadow = true;
    outerPool.receiveShadow = true;
    fountainGroup.add(outerPool);

    // Inner pool (water basin)
    const innerPoolGeometry = new THREE.CylinderGeometry(4.5, 4.5, 0.6, 32);
    const innerPoolMaterial = new THREE.MeshStandardMaterial({
        color: 0x6a6a6a,
        roughness: 0.5
    });
    const innerPool = new THREE.Mesh(innerPoolGeometry, innerPoolMaterial);
    innerPool.position.y = 0.5;
    fountainGroup.add(innerPool);

    // Water surface
    const waterGeometry = new THREE.CircleGeometry(4.4, 32);
    const waterSurface = new THREE.Mesh(waterGeometry, waterMaterial);
    waterSurface.rotation.x = -Math.PI / 2;
    waterSurface.position.y = 0.75;
    waterSurface.name = 'waterSurface';
    fountainGroup.add(waterSurface);

    // Central pedestal
    const pedestalGeometry = new THREE.CylinderGeometry(0.8, 1, 2, 16);
    const pedestal = new THREE.Mesh(pedestalGeometry, stoneMaterial);
    pedestal.position.y = 1.5;
    pedestal.castShadow = true;
    fountainGroup.add(pedestal);

    // Upper basin
    const upperBasinGeometry = new THREE.CylinderGeometry(1.5, 1.2, 0.4, 16);
    const upperBasin = new THREE.Mesh(upperBasinGeometry, stoneMaterial);
    upperBasin.position.y = 2.6;
    upperBasin.castShadow = true;
    fountainGroup.add(upperBasin);

    // Upper water
    const upperWaterGeometry = new THREE.CircleGeometry(1.3, 16);
    const upperWater = new THREE.Mesh(upperWaterGeometry, waterMaterial);
    upperWater.rotation.x = -Math.PI / 2;
    upperWater.position.y = 2.75;
    upperWater.name = 'upperWater';
    fountainGroup.add(upperWater);

    // Central spout
    const spoutGeometry = new THREE.CylinderGeometry(0.15, 0.2, 1, 8);
    const spout = new THREE.Mesh(spoutGeometry, stoneMaterial);
    spout.position.y = 3.3;
    spout.castShadow = true;
    fountainGroup.add(spout);

    // Water spout top (decorative)
    const topGeometry = new THREE.SphereGeometry(0.25, 16, 12);
    const top = new THREE.Mesh(topGeometry, stoneMaterial);
    top.position.y = 3.9;
    top.castShadow = true;
    fountainGroup.add(top);

    // Water spray particles (will be animated)
    const waterSpray = createWaterSpray();
    waterSpray.position.y = 3.9;
    waterSpray.name = 'waterSpray';
    fountainGroup.add(waterSpray);

    // Decorative elements around the fountain
    addDecorativeElements(fountainGroup, stoneMaterial);

    // Surrounding sitting edge
    const edgeGeometry = new THREE.TorusGeometry(5.3, 0.3, 8, 32);
    const edge = new THREE.Mesh(edgeGeometry, stoneMaterial);
    edge.rotation.x = Math.PI / 2;
    edge.position.y = 0.9;
    edge.castShadow = true;
    fountainGroup.add(edge);

    return fountainGroup;
}

function createWaterSpray() {
    const sprayGroup = new THREE.Group();
    
    // Create particle system for water
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 1] = Math.random() * 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        
        velocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: 0.05 + Math.random() * 0.05,
            z: (Math.random() - 0.5) * 0.02
        });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.userData = { velocities };

    const particleMaterial = new THREE.PointsMaterial({
        color: 0x87ceeb,
        size: 0.1,
        transparent: true,
        opacity: 0.8
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    particleSystem.name = 'waterParticles';
    sprayGroup.add(particleSystem);

    return sprayGroup;
}

function addDecorativeElements(group, material) {
    // Add small decorative fish sculptures
    const fishPositions = [
        { x: 3, z: 0, rotation: 0 },
        { x: -3, z: 0, rotation: Math.PI },
        { x: 0, z: 3, rotation: Math.PI / 2 },
        { x: 0, z: -3, rotation: -Math.PI / 2 }
    ];

    fishPositions.forEach(pos => {
        const fish = createDecorativeFish();
        fish.position.set(pos.x, 0.8, pos.z);
        fish.rotation.y = pos.rotation;
        group.add(fish);
    });
}

function createDecorativeFish() {
    const fishGroup = new THREE.Group();
    
    const fishMaterial = new THREE.MeshStandardMaterial({
        color: 0x7a7a7a,
        roughness: 0.5,
        metalness: 0.3
    });

    // Body
    const bodyGeometry = new THREE.SphereGeometry(0.15, 8, 6);
    const body = new THREE.Mesh(bodyGeometry, fishMaterial);
    body.scale.set(1.5, 0.8, 1);
    fishGroup.add(body);

    // Tail
    const tailGeometry = new THREE.ConeGeometry(0.1, 0.2, 4);
    const tail = new THREE.Mesh(tailGeometry, fishMaterial);
    tail.position.set(-0.25, 0, 0);
    tail.rotation.z = Math.PI / 2;
    fishGroup.add(tail);

    return fishGroup;
}
