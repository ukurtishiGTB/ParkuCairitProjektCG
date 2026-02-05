/**
 * Playground Component - Creates playground with hierarchical structures
 * (frames + swings, slides, etc.)
 */

import * as THREE from 'three';

export function createPlayground() {
    const playgroundGroup = new THREE.Group();
    playgroundGroup.name = 'playground';
    playgroundGroup.position.set(-25, 0, 0);

    // Playground surface (rubber safety surface)
    const surfaceGeometry = new THREE.PlaneGeometry(15, 20);
    const surfaceMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b4513,
        roughness: 0.95
    });
    const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    surface.rotation.x = -Math.PI / 2;
    surface.position.y = 0.01;
    surface.receiveShadow = true;
    playgroundGroup.add(surface);

    // Create swing set (hierarchical: frame + swings)
    const swingSet = createSwingSet();
    swingSet.position.set(0, 0, -5);
    playgroundGroup.add(swingSet);

    // Create slide structure (hierarchical: frame + slide + ladder)
    const slide = createSlide();
    slide.position.set(0, 0, 5);
    playgroundGroup.add(slide);

    // Create seesaw
    const seesaw = createSeesaw();
    seesaw.position.set(5, 0, 0);
    playgroundGroup.add(seesaw);

    // Create sandbox
    const sandbox = createSandbox();
    sandbox.position.set(-5, 0, 0);
    playgroundGroup.add(sandbox);

    // Add playground sign
    const sign = createPlaygroundSign();
    sign.position.set(7, 0, -8);
    playgroundGroup.add(sign);

    return playgroundGroup;
}

function createSwingSet() {
    const swingSet = new THREE.Group();
    swingSet.name = 'swingSet';
    swingSet.userData = {
        name: "Swing Set",
        description: "A classic swing set where children can enjoy swinging back and forth. The gentle motion is loved by kids of all ages!",
        interactive: true
    };

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0xcc3333,
        roughness: 0.4,
        metalness: 0.7
    });

    const chainMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.3,
        metalness: 0.9
    });

    // Frame - A-frame structure
    const frameHeight = 3.5;
    const frameWidth = 5;
    
    // Left A-frame
    const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, frameHeight + 0.5, 8);
    
    const leftFront = new THREE.Mesh(legGeometry, metalMaterial);
    leftFront.position.set(-frameWidth / 2, frameHeight / 2, 0.8);
    leftFront.rotation.x = 0.15;
    leftFront.castShadow = true;
    swingSet.add(leftFront);

    const leftBack = new THREE.Mesh(legGeometry, metalMaterial);
    leftBack.position.set(-frameWidth / 2, frameHeight / 2, -0.8);
    leftBack.rotation.x = -0.15;
    leftBack.castShadow = true;
    swingSet.add(leftBack);

    // Right A-frame
    const rightFront = new THREE.Mesh(legGeometry, metalMaterial);
    rightFront.position.set(frameWidth / 2, frameHeight / 2, 0.8);
    rightFront.rotation.x = 0.15;
    rightFront.castShadow = true;
    swingSet.add(rightFront);

    const rightBack = new THREE.Mesh(legGeometry, metalMaterial);
    rightBack.position.set(frameWidth / 2, frameHeight / 2, -0.8);
    rightBack.rotation.x = -0.15;
    rightBack.castShadow = true;
    swingSet.add(rightBack);

    // Top bar
    const topBarGeometry = new THREE.CylinderGeometry(0.06, 0.06, frameWidth, 8);
    const topBar = new THREE.Mesh(topBarGeometry, metalMaterial);
    topBar.position.set(0, frameHeight, 0);
    topBar.rotation.z = Math.PI / 2;
    topBar.castShadow = true;
    swingSet.add(topBar);

    // Create two swings
    for (let i = -1; i <= 1; i += 2) {
        const swing = createSwing(chainMaterial, frameHeight);
        swing.position.set(i * 1.2, 0, 0);
        swing.userData = { swingOffset: i * Math.PI / 4 }; // For animation
        swingSet.add(swing);
    }

    return swingSet;
}

function createSwing(chainMaterial, frameHeight) {
    const swingGroup = new THREE.Group();
    swingGroup.name = 'swing';

    // Chains
    const chainGeometry = new THREE.CylinderGeometry(0.02, 0.02, frameHeight - 1, 6);
    
    const leftChain = new THREE.Mesh(chainGeometry, chainMaterial);
    leftChain.position.set(-0.25, frameHeight / 2 + 0.5, 0);
    swingGroup.add(leftChain);

    const rightChain = new THREE.Mesh(chainGeometry, chainMaterial);
    rightChain.position.set(0.25, frameHeight / 2 + 0.5, 0);
    swingGroup.add(rightChain);

    // Seat
    const seatGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.3);
    const seatMaterial = new THREE.MeshStandardMaterial({
        color: 0x2244aa,
        roughness: 0.6
    });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 1, 0);
    seat.castShadow = true;
    swingGroup.add(seat);

    return swingGroup;
}

function createSlide() {
    const slideGroup = new THREE.Group();
    slideGroup.name = 'slideStructure';
    slideGroup.userData = {
        name: "Playground Slide",
        description: "A colorful slide with ladder access. Kids climb up the ladder and slide down for endless fun!",
        interactive: true
    };

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x4488cc,
        roughness: 0.3,
        metalness: 0.7
    });

    const redMaterial = new THREE.MeshStandardMaterial({
        color: 0xcc4444,
        roughness: 0.4,
        metalness: 0.6
    });

    const yellowMaterial = new THREE.MeshStandardMaterial({
        color: 0xeecc44,
        roughness: 0.5
    });

    // Platform
    const platformGeometry = new THREE.BoxGeometry(1.5, 0.1, 1.5);
    const platform = new THREE.Mesh(platformGeometry, redMaterial);
    platform.position.set(0, 2, 0);
    platform.castShadow = true;
    slideGroup.add(platform);

    // Platform supports
    const supportGeometry = new THREE.CylinderGeometry(0.08, 0.08, 2, 8);
    const supportPositions = [
        { x: -0.6, z: -0.6 },
        { x: 0.6, z: -0.6 },
        { x: -0.6, z: 0.6 },
        { x: 0.6, z: 0.6 }
    ];

    supportPositions.forEach(pos => {
        const support = new THREE.Mesh(supportGeometry, metalMaterial);
        support.position.set(pos.x, 1, pos.z);
        support.castShadow = true;
        slideGroup.add(support);
    });

    // Slide chute
    const slideGeometry = new THREE.BoxGeometry(0.8, 0.05, 3);
    const slideChute = new THREE.Mesh(slideGeometry, yellowMaterial);
    slideChute.position.set(0, 1, 2);
    slideChute.rotation.x = 0.5;
    slideChute.castShadow = true;
    slideGroup.add(slideChute);

    // Slide sides
    const sideGeometry = new THREE.BoxGeometry(0.05, 0.2, 3);
    
    const leftSide = new THREE.Mesh(sideGeometry, metalMaterial);
    leftSide.position.set(-0.4, 1.1, 2);
    leftSide.rotation.x = 0.5;
    slideGroup.add(leftSide);

    const rightSide = new THREE.Mesh(sideGeometry, metalMaterial);
    rightSide.position.set(0.4, 1.1, 2);
    rightSide.rotation.x = 0.5;
    slideGroup.add(rightSide);

    // Ladder
    const ladderGroup = createLadder();
    ladderGroup.position.set(0, 0, -1);
    slideGroup.add(ladderGroup);

    // Safety railing on platform
    const railGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 6);
    
    for (let i = 0; i < 3; i++) {
        const rail = new THREE.Mesh(railGeometry, metalMaterial);
        rail.position.set(-0.75, 2.5, -0.5 + i * 0.5);
        slideGroup.add(rail);
        
        const rail2 = new THREE.Mesh(railGeometry, metalMaterial);
        rail2.position.set(0.75, 2.5, -0.5 + i * 0.5);
        slideGroup.add(rail2);
    }

    return slideGroup;
}

function createLadder() {
    const ladderGroup = new THREE.Group();
    ladderGroup.name = 'ladder';

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x3366aa,
        roughness: 0.4,
        metalness: 0.7
    });

    // Side rails
    const railGeometry = new THREE.CylinderGeometry(0.04, 0.04, 2.5, 8);
    
    const leftRail = new THREE.Mesh(railGeometry, metalMaterial);
    leftRail.position.set(-0.3, 1.1, 0);
    leftRail.rotation.x = 0.3;
    leftRail.castShadow = true;
    ladderGroup.add(leftRail);

    const rightRail = new THREE.Mesh(railGeometry, metalMaterial);
    rightRail.position.set(0.3, 1.1, 0);
    rightRail.rotation.x = 0.3;
    rightRail.castShadow = true;
    ladderGroup.add(rightRail);

    // Rungs
    const rungGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8);
    
    for (let i = 0; i < 5; i++) {
        const rung = new THREE.Mesh(rungGeometry, metalMaterial);
        rung.position.set(0, 0.4 + i * 0.4, -0.15 + i * 0.12);
        rung.rotation.z = Math.PI / 2;
        rung.castShadow = true;
        ladderGroup.add(rung);
    }

    return ladderGroup;
}

function createSeesaw() {
    const seesawGroup = new THREE.Group();
    seesawGroup.name = 'seesaw';
    seesawGroup.userData = {
        name: "Seesaw",
        description: "A classic playground seesaw (teeter-totter). Two children can sit on opposite ends and take turns going up and down!",
        interactive: true
    };

    // Base/fulcrum
    const baseGeometry = new THREE.ConeGeometry(0.3, 0.6, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x44aa44,
        roughness: 0.5,
        metalness: 0.3
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.3;
    base.castShadow = true;
    seesawGroup.add(base);

    // Plank
    const plankGeometry = new THREE.BoxGeometry(3, 0.1, 0.4);
    const plankMaterial = new THREE.MeshStandardMaterial({
        color: 0xcc6622,
        roughness: 0.7
    });
    const plank = new THREE.Mesh(plankGeometry, plankMaterial);
    plank.position.y = 0.6;
    plank.castShadow = true;
    plank.receiveShadow = true;
    seesawGroup.add(plank);

    // Handles
    const handleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8);
    const handleMaterial = new THREE.MeshStandardMaterial({
        color: 0x3366aa,
        roughness: 0.3,
        metalness: 0.7
    });

    const leftHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    leftHandle.position.set(-1.2, 0.85, 0);
    seesawGroup.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    rightHandle.position.set(1.2, 0.85, 0);
    seesawGroup.add(rightHandle);

    return seesawGroup;
}

function createSandbox() {
    const sandboxGroup = new THREE.Group();
    sandboxGroup.name = 'sandbox';
    sandboxGroup.userData = {
        name: "Sandbox",
        description: "A sandy play area where children can build sandcastles and play with toys. A favorite spot for creative play!",
        interactive: true
    };

    // Wooden frame
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b4513,
        roughness: 0.8
    });

    const frameGeometry = new THREE.BoxGeometry(3, 0.4, 0.2);
    
    const sides = [
        { x: 0, z: 1.4, rotation: 0 },
        { x: 0, z: -1.4, rotation: 0 },
        { x: 1.4, z: 0, rotation: Math.PI / 2 },
        { x: -1.4, z: 0, rotation: Math.PI / 2 }
    ];

    sides.forEach(side => {
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(side.x, 0.2, side.z);
        frame.rotation.y = side.rotation;
        frame.castShadow = true;
        sandboxGroup.add(frame);
    });

    // Sand
    const sandGeometry = new THREE.PlaneGeometry(2.6, 2.6);
    const sandMaterial = new THREE.MeshStandardMaterial({
        color: 0xdeb887,
        roughness: 1.0
    });
    const sand = new THREE.Mesh(sandGeometry, sandMaterial);
    sand.rotation.x = -Math.PI / 2;
    sand.position.y = 0.05;
    sand.receiveShadow = true;
    sandboxGroup.add(sand);

    // Add some sand toys
    const bucketGeometry = new THREE.CylinderGeometry(0.12, 0.1, 0.2, 8);
    const bucketMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b6b });
    const bucket = new THREE.Mesh(bucketGeometry, bucketMaterial);
    bucket.position.set(0.5, 0.15, 0.3);
    sandboxGroup.add(bucket);

    const shovelGeometry = new THREE.BoxGeometry(0.08, 0.02, 0.3);
    const shovelMaterial = new THREE.MeshStandardMaterial({ color: 0x4488ff });
    const shovel = new THREE.Mesh(shovelGeometry, shovelMaterial);
    shovel.position.set(-0.4, 0.06, -0.2);
    shovel.rotation.y = 0.5;
    sandboxGroup.add(shovel);

    return sandboxGroup;
}

function createPlaygroundSign() {
    const signGroup = new THREE.Group();
    signGroup.userData = {
        name: "Playground Rules",
        description: "Welcome to the Çair Park Playground! Please play safely and be kind to others. Suitable for children ages 3-12.",
        interactive: true
    };

    // Post
    const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
    const postMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a4a4a,
        roughness: 0.4,
        metalness: 0.7
    });
    const post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.y = 0.75;
    post.castShadow = true;
    signGroup.add(post);

    // Sign board
    const boardGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.05);
    const boardMaterial = new THREE.MeshStandardMaterial({
        color: 0x2255aa,
        roughness: 0.5
    });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.position.set(0, 1.6, 0);
    board.castShadow = true;
    signGroup.add(board);

    return signGroup;
}
