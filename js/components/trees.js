/**
 * Trees Component - Creates trees with hierarchy (trunk + leaves)
 */

import * as THREE from 'three';

export function createTrees() {
    const treeGroup = new THREE.Group();
    treeGroup.name = 'trees';
    const trees = [];

    // Tree positions around the park
    const treePositions = [
        // Along the edges
        { x: -35, z: -35, scale: 1.2 },
        { x: -35, z: -20, scale: 1.0 },
        { x: -35, z: -5, scale: 1.3 },
        { x: -35, z: 10, scale: 0.9 },
        { x: -35, z: 25, scale: 1.1 },
        { x: -35, z: 35, scale: 1.0 },
        
        { x: 35, z: -35, scale: 1.1 },
        { x: 35, z: -20, scale: 1.0 },
        { x: 35, z: -5, scale: 1.2 },
        { x: 35, z: 10, scale: 0.8 },
        { x: 35, z: 25, scale: 1.0 },
        { x: 35, z: 35, scale: 1.3 },
        
        { x: -20, z: -35, scale: 1.0 },
        { x: -5, z: -35, scale: 1.1 },
        { x: 10, z: -35, scale: 0.9 },
        { x: 25, z: -35, scale: 1.2 },
        
        // Interior trees
        { x: -20, z: -20, scale: 1.4 },
        { x: 20, z: -20, scale: 1.3 },
        { x: -20, z: 20, scale: 1.2 },
        { x: 20, z: 20, scale: 1.5 },
        
        // Near playground
        { x: -28, z: -10, scale: 1.0 },
        { x: -28, z: 5, scale: 1.1 },
        
        // Near fountain
        { x: 12, z: 12, scale: 0.9 },
        { x: -12, z: -12, scale: 1.0 },
        { x: 12, z: -12, scale: 1.1 },
        { x: -12, z: 12, scale: 0.8 }
    ];

    treePositions.forEach((pos, index) => {
        const tree = createTree(pos.scale, index);
        tree.position.set(pos.x, 0, pos.z);
        treeGroup.add(tree);
        trees.push(tree);
    });

    // Add some pine trees for variety
    const pinePositions = [
        { x: -30, z: 30, scale: 1.0 },
        { x: 30, z: -30, scale: 1.2 },
        { x: -25, z: -30, scale: 0.9 },
        { x: 30, z: 30, scale: 1.1 }
    ];

    pinePositions.forEach((pos, index) => {
        const pine = createPineTree(pos.scale);
        pine.position.set(pos.x, 0, pos.z);
        treeGroup.add(pine);
        trees.push(pine);
    });

    return { treeGroup, trees };
}

function createTree(scale = 1, index = 0) {
    // Tree group with hierarchy: trunk + leaves
    const tree = new THREE.Group();
    tree.name = `tree_${index}`;
    tree.userData = {
        name: "Oak Tree",
        description: "A beautiful oak tree providing shade and fresh air. Trees like this make Çair Park a green oasis in the city.",
        interactive: true,
        swayOffset: Math.random() * Math.PI * 2
    };

    // Create trunk (hierarchical component 1)
    const trunkGeometry = new THREE.CylinderGeometry(0.3 * scale, 0.5 * scale, 4 * scale, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a3728,
        roughness: 0.9,
        metalness: 0.0
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 2 * scale;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    trunk.name = 'trunk';
    tree.add(trunk);

    // Create branches
    const branchGeometry = new THREE.CylinderGeometry(0.08 * scale, 0.15 * scale, 1.5 * scale, 6);
    const branchPositions = [
        { y: 3, rotation: { x: 0.5, z: 0.3 } },
        { y: 3.2, rotation: { x: -0.4, z: -0.5 } },
        { y: 2.8, rotation: { x: 0.3, z: -0.4 } }
    ];

    branchPositions.forEach((bp, i) => {
        const branch = new THREE.Mesh(branchGeometry, trunkMaterial);
        branch.position.y = bp.y * scale;
        branch.rotation.x = bp.rotation.x;
        branch.rotation.z = bp.rotation.z;
        branch.castShadow = true;
        branch.name = `branch_${i}`;
        tree.add(branch);
    });

    // Create foliage/leaves (hierarchical component 2)
    const foliageGroup = new THREE.Group();
    foliageGroup.name = 'foliage';

    // Main canopy
    const foliageGeometry = new THREE.SphereGeometry(2.5 * scale, 12, 10);
    const foliageMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d5a27,
        roughness: 0.8,
        metalness: 0.0
    });
    
    const mainFoliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    mainFoliage.position.y = 5.5 * scale;
    mainFoliage.castShadow = true;
    mainFoliage.receiveShadow = true;
    foliageGroup.add(mainFoliage);

    // Additional foliage clusters
    const clusterPositions = [
        { x: 1, y: 5, z: 0.5, size: 1.5 },
        { x: -0.8, y: 5.2, z: -0.7, size: 1.3 },
        { x: 0.5, y: 6, z: -0.5, size: 1.2 },
        { x: -0.5, y: 4.8, z: 0.8, size: 1.4 }
    ];

    const clusterColors = [0x2d5a27, 0x3d7a37, 0x276d2a, 0x348c3a];
    
    clusterPositions.forEach((cp, i) => {
        const clusterGeometry = new THREE.SphereGeometry(cp.size * scale, 8, 6);
        const clusterMaterial = new THREE.MeshStandardMaterial({
            color: clusterColors[i % clusterColors.length],
            roughness: 0.8
        });
        const cluster = new THREE.Mesh(clusterGeometry, clusterMaterial);
        cluster.position.set(cp.x * scale, cp.y * scale, cp.z * scale);
        cluster.castShadow = true;
        foliageGroup.add(cluster);
    });

    tree.add(foliageGroup);

    return tree;
}

function createPineTree(scale = 1) {
    const tree = new THREE.Group();
    tree.name = 'pineTree';
    tree.userData = {
        name: "Pine Tree",
        description: "An evergreen pine tree that stays green all year round, adding variety to the park's landscape.",
        interactive: true,
        swayOffset: Math.random() * Math.PI * 2
    };

    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.2 * scale, 0.4 * scale, 3 * scale, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x3d2817,
        roughness: 0.9
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 1.5 * scale;
    trunk.castShadow = true;
    tree.add(trunk);

    // Cone-shaped foliage layers
    const coneMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a472a,
        roughness: 0.8
    });

    const layers = [
        { y: 3, radius: 2.5, height: 2.5 },
        { y: 4.5, radius: 2, height: 2 },
        { y: 5.8, radius: 1.5, height: 1.8 },
        { y: 7, radius: 1, height: 1.5 }
    ];

    layers.forEach(layer => {
        const coneGeometry = new THREE.ConeGeometry(
            layer.radius * scale,
            layer.height * scale,
            8
        );
        const cone = new THREE.Mesh(coneGeometry, coneMaterial);
        cone.position.y = layer.y * scale;
        cone.castShadow = true;
        tree.add(cone);
    });

    return tree;
}
