/**
 * Benches Component - Creates park benches with wood and metal materials
 */

import * as THREE from 'three';

export function createBenches() {
    const benchGroup = new THREE.Group();
    benchGroup.name = 'benches';

    // Bench positions along paths
    const benchPositions = [
        // Along main horizontal path
        { x: -15, z: 3, rotation: 0 },
        { x: 15, z: 3, rotation: 0 },
        { x: -15, z: -3, rotation: Math.PI },
        { x: 15, z: -3, rotation: Math.PI },
        
        // Along main vertical path
        { x: 3, z: -15, rotation: Math.PI / 2 },
        { x: -3, z: -15, rotation: -Math.PI / 2 },
        { x: 3, z: 15, rotation: Math.PI / 2 },
        { x: -3, z: 15, rotation: -Math.PI / 2 },
        
        // Near fountain
        { x: 8, z: 8, rotation: -Math.PI / 4 },
        { x: -8, z: 8, rotation: Math.PI / 4 },
        { x: 8, z: -8, rotation: -3 * Math.PI / 4 },
        { x: -8, z: -8, rotation: 3 * Math.PI / 4 },
        
        // Near playground
        { x: -22, z: -5, rotation: Math.PI / 2 },
        { x: -22, z: 5, rotation: Math.PI / 2 }
    ];

    benchPositions.forEach((pos, index) => {
        const bench = createBench(index);
        bench.position.set(pos.x, 0, pos.z);
        bench.rotation.y = pos.rotation;
        benchGroup.add(bench);
    });

    return benchGroup;
}

function createBench(index) {
    const bench = new THREE.Group();
    bench.name = `bench_${index}`;
    bench.userData = {
        name: "Park Bench",
        description: "A comfortable wooden bench where visitors can sit and relax, enjoy the view, or chat with friends and family.",
        interactive: true
    };

    // Materials
    const woodMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b4513,
        roughness: 0.8,
        metalness: 0.0
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        roughness: 0.4,
        metalness: 0.8
    });

    // Bench seat planks
    const plankGeometry = new THREE.BoxGeometry(2, 0.08, 0.25);
    
    for (let i = 0; i < 4; i++) {
        const plank = new THREE.Mesh(plankGeometry, woodMaterial);
        plank.position.set(0, 0.5, -0.35 + i * 0.22);
        plank.castShadow = true;
        plank.receiveShadow = true;
        bench.add(plank);
    }

    // Backrest planks
    const backrestGeometry = new THREE.BoxGeometry(2, 0.08, 0.2);
    
    for (let i = 0; i < 3; i++) {
        const backPlank = new THREE.Mesh(backrestGeometry, woodMaterial);
        backPlank.position.set(0, 0.7 + i * 0.18, -0.5);
        backPlank.rotation.x = -0.2;
        backPlank.castShadow = true;
        bench.add(backPlank);
    }

    // Metal legs/frame
    const legGeometry = new THREE.BoxGeometry(0.08, 0.5, 0.6);
    
    // Left leg frame
    const leftLeg = new THREE.Mesh(legGeometry, metalMaterial);
    leftLeg.position.set(-0.85, 0.25, -0.2);
    leftLeg.castShadow = true;
    bench.add(leftLeg);

    // Right leg frame
    const rightLeg = new THREE.Mesh(legGeometry, metalMaterial);
    rightLeg.position.set(0.85, 0.25, -0.2);
    rightLeg.castShadow = true;
    bench.add(rightLeg);

    // Armrests
    const armrestGeometry = new THREE.BoxGeometry(0.08, 0.4, 0.08);
    
    const leftArm = new THREE.Mesh(armrestGeometry, metalMaterial);
    leftArm.position.set(-0.85, 0.7, 0.15);
    leftArm.castShadow = true;
    bench.add(leftArm);

    const rightArm = new THREE.Mesh(armrestGeometry, metalMaterial);
    rightArm.position.set(0.85, 0.7, 0.15);
    rightArm.castShadow = true;
    bench.add(rightArm);

    // Armrest tops
    const armTopGeometry = new THREE.BoxGeometry(0.12, 0.05, 0.35);
    
    const leftArmTop = new THREE.Mesh(armTopGeometry, woodMaterial);
    leftArmTop.position.set(-0.85, 0.92, -0.02);
    bench.add(leftArmTop);

    const rightArmTop = new THREE.Mesh(armTopGeometry, woodMaterial);
    rightArmTop.position.set(0.85, 0.92, -0.02);
    bench.add(rightArmTop);

    // Backrest support
    const backSupportGeometry = new THREE.BoxGeometry(0.06, 0.5, 0.06);
    
    const leftBackSupport = new THREE.Mesh(backSupportGeometry, metalMaterial);
    leftBackSupport.position.set(-0.85, 0.85, -0.5);
    leftBackSupport.rotation.x = -0.2;
    bench.add(leftBackSupport);

    const rightBackSupport = new THREE.Mesh(backSupportGeometry, metalMaterial);
    rightBackSupport.position.set(0.85, 0.85, -0.5);
    rightBackSupport.rotation.x = -0.2;
    bench.add(rightBackSupport);

    return bench;
}
