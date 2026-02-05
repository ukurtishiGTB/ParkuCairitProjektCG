/**
 * Paths Component - Creates walking paths in the park
 */

import * as THREE from 'three';

export function createPaths() {
    const pathGroup = new THREE.Group();
    pathGroup.name = 'paths';

    // Create path texture
    const pathTexture = createPathTexture();

    const pathMaterial = new THREE.MeshStandardMaterial({
        map: pathTexture,
        roughness: 0.9,
        metalness: 0.0
    });

    // Main horizontal path
    const mainHorizontalPath = createStraightPath(80, 4, pathMaterial);
    mainHorizontalPath.position.set(0, 0.02, 0);
    pathGroup.add(mainHorizontalPath);

    // Main vertical path
    const mainVerticalPath = createStraightPath(80, 4, pathMaterial);
    mainVerticalPath.position.set(0, 0.02, 0);
    mainVerticalPath.rotation.y = Math.PI / 2;
    pathGroup.add(mainVerticalPath);

    // Circular path around fountain
    const circularPath = createCircularPath(8, 2, pathMaterial);
    circularPath.position.y = 0.02;
    pathGroup.add(circularPath);

    // Diagonal paths from corners
    const diagonalPaths = [
        { startX: -35, startZ: -35, endX: -10, endZ: -10 },
        { startX: 35, startZ: -35, endX: 10, endZ: -10 },
        { startX: -35, startZ: 35, endX: -10, endZ: 10 },
        { startX: 35, startZ: 35, endX: 10, endZ: 10 }
    ];

    diagonalPaths.forEach(path => {
        const diagonal = createDiagonalPath(path, pathMaterial);
        pathGroup.add(diagonal);
    });

    // Path to playground
    const playgroundPath = createStraightPath(15, 3, pathMaterial);
    playgroundPath.position.set(-17.5, 0.02, 0);
    pathGroup.add(playgroundPath);

    // Add path borders
    addPathBorders(pathGroup);

    return pathGroup;
}

function createPathTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Base color (concrete/stone)
    ctx.fillStyle = '#b8a88a';
    ctx.fillRect(0, 0, 256, 256);

    // Add texture variation
    for (let i = 0; i < 500; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const shade = Math.random() * 30 - 15;
        const r = 184 + shade;
        const g = 168 + shade;
        const b = 138 + shade;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, 3, 3);
    }

    // Add some cracks/lines
    ctx.strokeStyle = '#9a8a6a';
    ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 256, Math.random() * 256);
        ctx.lineTo(Math.random() * 256, Math.random() * 256);
        ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 1);
    
    return texture;
}

function createStraightPath(length, width, material) {
    const pathGeometry = new THREE.PlaneGeometry(length, width);
    const path = new THREE.Mesh(pathGeometry, material);
    path.rotation.x = -Math.PI / 2;
    path.receiveShadow = true;
    return path;
}

function createCircularPath(radius, width, material) {
    const pathGroup = new THREE.Group();

    // Create circular path using ring geometry
    const ringGeometry = new THREE.RingGeometry(radius - width / 2, radius + width / 2, 32);
    const ring = new THREE.Mesh(ringGeometry, material);
    ring.rotation.x = -Math.PI / 2;
    ring.receiveShadow = true;
    pathGroup.add(ring);

    return pathGroup;
}

function createDiagonalPath(pathData, material) {
    const { startX, startZ, endX, endZ } = pathData;
    
    const length = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endZ - startZ, 2)
    );
    const angle = Math.atan2(endZ - startZ, endX - startX);

    const pathGeometry = new THREE.PlaneGeometry(length, 2.5);
    const path = new THREE.Mesh(pathGeometry, material);
    path.rotation.x = -Math.PI / 2;
    path.rotation.z = -angle;
    path.position.set(
        (startX + endX) / 2,
        0.02,
        (startZ + endZ) / 2
    );
    path.receiveShadow = true;

    return path;
}

function addPathBorders(group) {
    const borderMaterial = new THREE.MeshStandardMaterial({
        color: 0x5a5a5a,
        roughness: 0.8
    });

    // Border for main horizontal path
    const borderGeometry = new THREE.BoxGeometry(80, 0.1, 0.15);
    
    const topBorder = new THREE.Mesh(borderGeometry, borderMaterial);
    topBorder.position.set(0, 0.05, 2);
    group.add(topBorder);

    const bottomBorder = new THREE.Mesh(borderGeometry, borderMaterial);
    bottomBorder.position.set(0, 0.05, -2);
    group.add(bottomBorder);

    // Border for main vertical path
    const verticalBorderGeometry = new THREE.BoxGeometry(0.15, 0.1, 80);
    
    const leftBorder = new THREE.Mesh(verticalBorderGeometry, borderMaterial);
    leftBorder.position.set(2, 0.05, 0);
    group.add(leftBorder);

    const rightBorder = new THREE.Mesh(verticalBorderGeometry, borderMaterial);
    rightBorder.position.set(-2, 0.05, 0);
    group.add(rightBorder);
}
