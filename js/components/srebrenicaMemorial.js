/**
 * Srebrenica Memorial Component
 * A memorial dedicated to the victims of the Srebrenica genocide
 * Features the iconic Srebrenica Flower sculpture and memorial plaque
 */

import * as THREE from 'three';

export function createSrebrenicaMemorial() {
    const memorialGroup = new THREE.Group();
    memorialGroup.name = 'srebrenicaMemorial';
    memorialGroup.userData = {
        name: "Srebrenica Memorial",
        description: "A memorial dedicated to the victims of the Srebrenica genocide. The white flower (Srebrenica Flower) is an international symbol of remembrance. The inscription reads: 'Let grief become hope, let revenge become justice, let a mother's tear become prayer, that Srebrenica never happens again to anyone, anywhere.'",
        interactive: true
    };

    // Create the Srebrenica Flower sculpture
    const flower = createSrebrenicaFlower();
    flower.position.set(-2, 0, 0);
    memorialGroup.add(flower);

    // Create the memorial sign/plaque
    const sign = createMemorialSign();
    sign.position.set(2.5, 0, 0);
    memorialGroup.add(sign);

    // Create the concrete base elements
    const concreteBase = createConcreteBase();
    concreteBase.position.set(0, 0, 1);
    memorialGroup.add(concreteBase);

    // Create the metal railing/fence around the memorial
    const railing = createMemorialRailing();
    memorialGroup.add(railing);

    // Position the entire memorial in the park
    memorialGroup.position.set(25, 0, -25);
    memorialGroup.rotation.y = Math.PI / 6;

    return memorialGroup;
}

function createSrebrenicaFlower() {
    const flowerGroup = new THREE.Group();
    flowerGroup.name = 'srebrenicaFlower';

    // Materials
    const whitePetalMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide
    });

    const greenCenterMaterial = new THREE.MeshStandardMaterial({
        color: 0x228b22,
        roughness: 0.4,
        metalness: 0.2
    });

    const darkGreenRingMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a5c1a,
        roughness: 0.3,
        metalness: 0.3
    });

    const silverStemMaterial = new THREE.MeshStandardMaterial({
        color: 0xc0c0c0,
        roughness: 0.2,
        metalness: 0.8
    });

    // Flower head height
    const flowerHeight = 6;

    // Create a group for the flower head that we can rotate to face forward
    const flowerHeadGroup = new THREE.Group();
    flowerHeadGroup.name = 'flowerHead';

    // Create petals (11 rounded petals arranged in a circle like the Srebrenica flower)
    const petalCount = 11;
    const petalRadius = 0.4;
    const flowerRadius = 1.2;

    for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        
        // Each petal is a sphere - now arranged on X-Y plane (facing Z direction)
        const petalGeometry = new THREE.SphereGeometry(petalRadius, 16, 12);
        const petal = new THREE.Mesh(petalGeometry, whitePetalMaterial);
        
        petal.position.set(
            Math.cos(angle) * flowerRadius,
            Math.sin(angle) * flowerRadius,
            0
        );
        
        // Slightly flatten the petals
        petal.scale.set(1, 1, 0.6);
        petal.castShadow = true;
        flowerHeadGroup.add(petal);
    }

    // Inner ring of smaller petals
    const innerPetalCount = 11;
    const innerPetalRadius = 0.3;
    const innerFlowerRadius = 0.7;

    for (let i = 0; i < innerPetalCount; i++) {
        const angle = (i / innerPetalCount) * Math.PI * 2 + Math.PI / innerPetalCount;
        
        const petalGeometry = new THREE.SphereGeometry(innerPetalRadius, 12, 10);
        const petal = new THREE.Mesh(petalGeometry, whitePetalMaterial);
        
        petal.position.set(
            Math.cos(angle) * innerFlowerRadius,
            Math.sin(angle) * innerFlowerRadius,
            0.1
        );
        
        petal.scale.set(1, 1, 0.5);
        petal.castShadow = true;
        flowerHeadGroup.add(petal);
    }

    // Dark green outer ring of the center
    const outerRingGeometry = new THREE.CylinderGeometry(0.55, 0.55, 0.15, 32);
    const outerRing = new THREE.Mesh(outerRingGeometry, darkGreenRingMaterial);
    outerRing.rotation.x = Math.PI / 2; // Rotate to face forward
    outerRing.position.set(0, 0, 0.1);
    outerRing.castShadow = true;
    flowerHeadGroup.add(outerRing);

    // Green center of the flower
    const centerGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32);
    const center = new THREE.Mesh(centerGeometry, greenCenterMaterial);
    center.rotation.x = Math.PI / 2;
    center.position.set(0, 0, 0.15);
    center.castShadow = true;
    flowerHeadGroup.add(center);

    // Inner dark circle
    const innerCircleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.25, 32);
    const innerCircle = new THREE.Mesh(innerCircleGeometry, darkGreenRingMaterial);
    innerCircle.rotation.x = Math.PI / 2;
    innerCircle.position.set(0, 0, 0.2);
    flowerHeadGroup.add(innerCircle);

    // Position the flower head at the top of the stems and tilt it slightly forward
    flowerHeadGroup.position.set(0, flowerHeight, 0);
    // Tilt the flower to face slightly downward toward viewers (like in the real photo)
    flowerHeadGroup.rotation.x = 0.3; // Slight tilt forward
    
    flowerGroup.add(flowerHeadGroup);

    // Create three stems (as seen in the image)
    const stemGeometry = new THREE.CylinderGeometry(0.06, 0.08, flowerHeight, 8);
    
    // Main center stem
    const mainStem = new THREE.Mesh(stemGeometry, silverStemMaterial);
    mainStem.position.set(0, flowerHeight / 2, 0);
    mainStem.castShadow = true;
    flowerGroup.add(mainStem);

    // Left stem (slightly angled)
    const leftStem = new THREE.Mesh(stemGeometry, silverStemMaterial);
    leftStem.position.set(-0.3, flowerHeight / 2, 0.2);
    leftStem.rotation.z = 0.1;
    leftStem.rotation.x = -0.05;
    leftStem.castShadow = true;
    flowerGroup.add(leftStem);

    // Right stem (slightly angled)
    const rightStem = new THREE.Mesh(stemGeometry, silverStemMaterial);
    rightStem.position.set(0.3, flowerHeight / 2, 0.2);
    rightStem.rotation.z = -0.1;
    rightStem.rotation.x = -0.05;
    rightStem.castShadow = true;
    flowerGroup.add(rightStem);

    // Base plate where stems connect to ground
    const basePlateGeometry = new THREE.CylinderGeometry(0.5, 0.6, 0.1, 16);
    const basePlate = new THREE.Mesh(basePlateGeometry, silverStemMaterial);
    basePlate.position.set(0, 0.05, 0.1);
    basePlate.castShadow = true;
    flowerGroup.add(basePlate);

    return flowerGroup;
}

function createMemorialSign() {
    const signGroup = new THREE.Group();
    signGroup.name = 'memorialSign';

    // Sign post materials
    const metalFrameMaterial = new THREE.MeshStandardMaterial({
        color: 0x808080,
        roughness: 0.3,
        metalness: 0.7
    });

    const signBoardMaterial = new THREE.MeshStandardMaterial({
        color: 0xe8e8e8,
        roughness: 0.5,
        metalness: 0.1
    });

    // Main sign board
    const signWidth = 2;
    const signHeight = 3;
    const signBoardGeometry = new THREE.BoxGeometry(signWidth, signHeight, 0.1);
    const signBoard = new THREE.Mesh(signBoardGeometry, signBoardMaterial);
    signBoard.position.set(0, 2.5, 0);
    signBoard.castShadow = true;
    signBoard.receiveShadow = true;
    signGroup.add(signBoard);

    // Create text area (dark section at top for "SREBRENICA")
    const titleAreaGeometry = new THREE.BoxGeometry(signWidth - 0.1, 0.6, 0.02);
    const titleAreaMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        roughness: 0.5
    });
    const titleArea = new THREE.Mesh(titleAreaGeometry, titleAreaMaterial);
    titleArea.position.set(0, 3.5, 0.06);
    signGroup.add(titleArea);

    // Subtitle area (lighter)
    const subtitleGeometry = new THREE.BoxGeometry(signWidth - 0.1, 0.3, 0.02);
    const subtitleMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b0000,
        roughness: 0.5
    });
    const subtitle = new THREE.Mesh(subtitleGeometry, subtitleMaterial);
    subtitle.position.set(0, 3.1, 0.06);
    signGroup.add(subtitle);

    // Text lines (represented as thin rectangles)
    const textLineMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.6
    });

    // Create multiple text lines
    for (let i = 0; i < 6; i++) {
        const lineWidth = 1.6 - Math.random() * 0.3;
        const lineGeometry = new THREE.BoxGeometry(lineWidth, 0.08, 0.01);
        const line = new THREE.Mesh(lineGeometry, textLineMaterial);
        line.position.set(0, 2.7 - i * 0.2, 0.06);
        signGroup.add(line);
    }

    // Second section of text (lighter color - Albanian text)
    const lightTextMaterial = new THREE.MeshStandardMaterial({
        color: 0x666666,
        roughness: 0.6
    });

    for (let i = 0; i < 5; i++) {
        const lineWidth = 1.5 - Math.random() * 0.4;
        const lineGeometry = new THREE.BoxGeometry(lineWidth, 0.06, 0.01);
        const line = new THREE.Mesh(lineGeometry, lightTextMaterial);
        line.position.set(0, 1.4 - i * 0.15, 0.06);
        signGroup.add(line);
    }

    // Metal frame around sign
    const frameThickness = 0.08;
    
    // Top frame
    const topFrameGeometry = new THREE.BoxGeometry(signWidth + 0.2, frameThickness, 0.15);
    const topFrame = new THREE.Mesh(topFrameGeometry, metalFrameMaterial);
    topFrame.position.set(0, 4.05, 0);
    signGroup.add(topFrame);

    // Bottom frame
    const bottomFrame = new THREE.Mesh(topFrameGeometry, metalFrameMaterial);
    bottomFrame.position.set(0, 0.95, 0);
    signGroup.add(bottomFrame);

    // Left frame
    const sideFrameGeometry = new THREE.BoxGeometry(frameThickness, signHeight + 0.2, 0.15);
    const leftFrame = new THREE.Mesh(sideFrameGeometry, metalFrameMaterial);
    leftFrame.position.set(-signWidth / 2 - 0.05, 2.5, 0);
    signGroup.add(leftFrame);

    // Right frame
    const rightFrame = new THREE.Mesh(sideFrameGeometry, metalFrameMaterial);
    rightFrame.position.set(signWidth / 2 + 0.05, 2.5, 0);
    signGroup.add(rightFrame);

    // Support posts
    const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
    
    const leftPost = new THREE.Mesh(postGeometry, metalFrameMaterial);
    leftPost.position.set(-0.8, 0.5, 0.2);
    leftPost.rotation.x = 0.2;
    leftPost.castShadow = true;
    signGroup.add(leftPost);

    const rightPost = new THREE.Mesh(postGeometry, metalFrameMaterial);
    rightPost.position.set(0.8, 0.5, 0.2);
    rightPost.rotation.x = 0.2;
    rightPost.castShadow = true;
    signGroup.add(rightPost);

    return signGroup;
}

function createConcreteBase() {
    const baseGroup = new THREE.Group();
    baseGroup.name = 'concreteBase';

    const concreteMaterial = new THREE.MeshStandardMaterial({
        color: 0xb0b0b0,
        roughness: 0.9,
        metalness: 0.0
    });

    // Create stepped concrete blocks (as seen in image)
    const blockConfigs = [
        { width: 4, height: 0.3, depth: 1.5, x: 0, y: 0.15, z: 0 },
        { width: 3.5, height: 0.3, depth: 1.2, x: 0, y: 0.45, z: -0.1 },
        { width: 3, height: 0.3, depth: 1, x: 0, y: 0.75, z: -0.2 },
        { width: 2.5, height: 0.25, depth: 0.8, x: 0, y: 1, z: -0.3 }
    ];

    blockConfigs.forEach(config => {
        const blockGeometry = new THREE.BoxGeometry(config.width, config.height, config.depth);
        const block = new THREE.Mesh(blockGeometry, concreteMaterial);
        block.position.set(config.x, config.y, config.z);
        block.castShadow = true;
        block.receiveShadow = true;
        baseGroup.add(block);
    });

    // Add some weathering detail blocks
    const detailMaterial = new THREE.MeshStandardMaterial({
        color: 0x999999,
        roughness: 0.95
    });

    for (let i = 0; i < 3; i++) {
        const detailGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.6);
        const detail = new THREE.Mesh(detailGeometry, detailMaterial);
        detail.position.set(-1.2 + i * 1.2, 0.1, 0.8);
        detail.receiveShadow = true;
        baseGroup.add(detail);
    }

    return baseGroup;
}

function createMemorialRailing() {
    const railingGroup = new THREE.Group();
    railingGroup.name = 'memorialRailing';

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x909090,
        roughness: 0.3,
        metalness: 0.7
    });

    // Railing dimensions
    const railingWidth = 8;
    const railingDepth = 5;
    const railingHeight = 0.9;
    const postSpacing = 1.5;

    // Create horizontal rails
    const railGeometry = new THREE.CylinderGeometry(0.025, 0.025, railingWidth, 8);
    
    // Front rail (top)
    const frontTopRail = new THREE.Mesh(railGeometry, metalMaterial);
    frontTopRail.position.set(0, railingHeight, railingDepth / 2);
    frontTopRail.rotation.z = Math.PI / 2;
    frontTopRail.castShadow = true;
    railingGroup.add(frontTopRail);

    // Front rail (middle)
    const frontMidRail = new THREE.Mesh(railGeometry, metalMaterial);
    frontMidRail.position.set(0, railingHeight / 2, railingDepth / 2);
    frontMidRail.rotation.z = Math.PI / 2;
    railingGroup.add(frontMidRail);

    // Back rail
    const backTopRail = new THREE.Mesh(railGeometry, metalMaterial);
    backTopRail.position.set(0, railingHeight, -railingDepth / 2);
    backTopRail.rotation.z = Math.PI / 2;
    railingGroup.add(backTopRail);

    // Side rails
    const sideRailGeometry = new THREE.CylinderGeometry(0.025, 0.025, railingDepth, 8);
    
    const leftTopRail = new THREE.Mesh(sideRailGeometry, metalMaterial);
    leftTopRail.position.set(-railingWidth / 2, railingHeight, 0);
    leftTopRail.rotation.x = Math.PI / 2;
    railingGroup.add(leftTopRail);

    const rightTopRail = new THREE.Mesh(sideRailGeometry, metalMaterial);
    rightTopRail.position.set(railingWidth / 2, railingHeight, 0);
    rightTopRail.rotation.x = Math.PI / 2;
    railingGroup.add(rightTopRail);

    // Vertical posts
    const postGeometry = new THREE.CylinderGeometry(0.03, 0.03, railingHeight, 8);
    
    // Front posts
    for (let x = -railingWidth / 2; x <= railingWidth / 2; x += postSpacing) {
        const post = new THREE.Mesh(postGeometry, metalMaterial);
        post.position.set(x, railingHeight / 2, railingDepth / 2);
        post.castShadow = true;
        railingGroup.add(post);
    }

    // Back posts
    for (let x = -railingWidth / 2; x <= railingWidth / 2; x += postSpacing) {
        const post = new THREE.Mesh(postGeometry, metalMaterial);
        post.position.set(x, railingHeight / 2, -railingDepth / 2);
        railingGroup.add(post);
    }

    // Side posts
    for (let z = -railingDepth / 2 + postSpacing; z < railingDepth / 2; z += postSpacing) {
        const leftPost = new THREE.Mesh(postGeometry, metalMaterial);
        leftPost.position.set(-railingWidth / 2, railingHeight / 2, z);
        railingGroup.add(leftPost);

        const rightPost = new THREE.Mesh(postGeometry, metalMaterial);
        rightPost.position.set(railingWidth / 2, railingHeight / 2, z);
        railingGroup.add(rightPost);
    }

    return railingGroup;
}
