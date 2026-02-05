/**
 * Birds Component - Creates animated birds flying around the park
 */

import * as THREE from 'three';

export function createBirds() {
    const group = new THREE.Group();
    group.name = 'birdsGroup';
    const birdList = [];

    // Create several birds
    const birdCount = 8;
    
    for (let i = 0; i < birdCount; i++) {
        const bird = createBird(i);
        
        // Random starting position
        const radius = 15 + Math.random() * 20;
        const angle = (i / birdCount) * Math.PI * 2;
        const height = 8 + Math.random() * 10;
        
        bird.position.set(
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius
        );
        
        bird.userData = {
            name: "Bird",
            description: "A bird enjoying the peaceful atmosphere of Çair Park. Many birds make this park their home.",
            interactive: false,
            // Animation properties
            orbitRadius: radius,
            orbitSpeed: 0.2 + Math.random() * 0.3,
            orbitAngle: angle,
            heightOffset: Math.random() * Math.PI * 2,
            wingPhase: Math.random() * Math.PI * 2
        };
        
        group.add(bird);
        birdList.push(bird);
    }

    return { group, birdList };
}

function createBird(index) {
    const bird = new THREE.Group();
    bird.name = `bird_${index}`;

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a4a4a,
        roughness: 0.6
    });

    const wingMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a3a3a,
        roughness: 0.5,
        side: THREE.DoubleSide
    });

    // Body
    const bodyGeometry = new THREE.SphereGeometry(0.2, 8, 6);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1.5, 0.8, 1);
    bird.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.12, 8, 6);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0.25, 0.08, 0);
    bird.add(head);

    // Beak
    const beakGeometry = new THREE.ConeGeometry(0.05, 0.15, 4);
    const beakMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const beak = new THREE.Mesh(beakGeometry, beakMaterial);
    beak.position.set(0.4, 0.08, 0);
    beak.rotation.z = -Math.PI / 2;
    bird.add(beak);

    // Left wing
    const wingGeometry = new THREE.BufferGeometry();
    const wingVertices = new Float32Array([
        0, 0, 0,
        -0.1, 0, 0.4,
        0.1, 0, 0.4,
        0.2, 0, 0.2
    ]);
    const wingIndices = [0, 1, 2, 0, 2, 3];
    wingGeometry.setAttribute('position', new THREE.BufferAttribute(wingVertices, 3));
    wingGeometry.setIndex(wingIndices);
    wingGeometry.computeVertexNormals();

    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(0, 0, 0.15);
    leftWing.name = 'leftWing';
    bird.add(leftWing);

    // Right wing
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0, 0, -0.15);
    rightWing.scale.z = -1;
    rightWing.name = 'rightWing';
    bird.add(rightWing);

    // Tail
    const tailGeometry = new THREE.ConeGeometry(0.08, 0.25, 4);
    const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
    tail.position.set(-0.35, 0, 0);
    tail.rotation.z = Math.PI / 2;
    tail.scale.set(0.5, 1, 1);
    bird.add(tail);

    return bird;
}
