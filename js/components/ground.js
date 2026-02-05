/**
 * Ground Component - Creates the park ground with grass texture
 */

import * as THREE from 'three';

export function createParkGround() {
    const groundGroup = new THREE.Group();
    groundGroup.name = 'ground';

    // Main ground plane
    const groundGeometry = new THREE.PlaneGeometry(80, 80, 50, 50);
    
    // Create grass texture procedurally
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Base grass color
    ctx.fillStyle = '#3d8b40';
    ctx.fillRect(0, 0, 512, 512);
    
    // Add grass texture variation
    for (let i = 0; i < 10000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const shade = Math.random() * 40 - 20;
        const r = 61 + shade;
        const g = 139 + shade;
        const b = 64 + shade;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, 2, 4);
    }
    
    const grassTexture = new THREE.CanvasTexture(canvas);
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(10, 10);

    const groundMaterial = new THREE.MeshStandardMaterial({
        map: grassTexture,
        roughness: 0.9,
        metalness: 0.0,
        side: THREE.DoubleSide
    });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    ground.name = 'grassGround';
    ground.userData = {
        name: "Park Lawn",
        description: "The beautiful green grass of Çair Park, perfect for picnics, relaxation, and outdoor activities.",
        interactive: true
    };
    groundGroup.add(ground);

    // Add some terrain variation with small hills
    addTerrainVariation(groundGroup);

    return groundGroup;
}

function addTerrainVariation(group) {
    // Create small decorative mounds
    const moundGeometry = new THREE.SphereGeometry(3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const moundMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a9c4e,
        roughness: 0.9
    });

    const moundPositions = [
        { x: 25, z: 25 },
        { x: -28, z: 20 },
        { x: 20, z: -25 },
        { x: -25, z: -28 }
    ];

    moundPositions.forEach(pos => {
        const mound = new THREE.Mesh(moundGeometry, moundMaterial);
        mound.position.set(pos.x, 0, pos.z);
        mound.scale.set(1, 0.3, 1);
        mound.receiveShadow = true;
        group.add(mound);
    });

    // Add flower patches
    addFlowerPatches(group);
}

function addFlowerPatches(group) {
    const flowerColors = [0xff6b6b, 0xffd93d, 0xff8fd3, 0xffffff, 0x9b5de5];
    
    const patchPositions = [
        { x: 15, z: 15 },
        { x: -18, z: 12 },
        { x: 12, z: -18 },
        { x: -15, z: -15 },
        { x: 30, z: 5 },
        { x: -30, z: -5 }
    ];

    patchPositions.forEach(pos => {
        // Create flower patch
        for (let i = 0; i < 15; i++) {
            const flowerGroup = new THREE.Group();
            
            // Stem
            const stemGeometry = new THREE.CylinderGeometry(0.02, 0.03, 0.3, 6);
            const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
            const stem = new THREE.Mesh(stemGeometry, stemMaterial);
            stem.position.y = 0.15;
            flowerGroup.add(stem);
            
            // Flower head
            const flowerGeometry = new THREE.SphereGeometry(0.1, 8, 8);
            const flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
            const flowerMaterial = new THREE.MeshStandardMaterial({ color: flowerColor });
            const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
            flower.position.y = 0.35;
            flowerGroup.add(flower);
            
            flowerGroup.position.set(
                pos.x + (Math.random() - 0.5) * 4,
                0,
                pos.z + (Math.random() - 0.5) * 4
            );
            
            group.add(flowerGroup);
        }
    });
}
