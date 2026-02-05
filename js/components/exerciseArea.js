/**
 * Exercise Area Component - Creates outdoor fitness equipment
 * Common park-style exercise equipment found in Çair Park
 */

import * as THREE from 'three';

export function createExerciseArea() {
    const exerciseGroup = new THREE.Group();
    exerciseGroup.name = 'exerciseArea';
    exerciseGroup.userData = {
        name: "Outdoor Fitness Area",
        description: "A public fitness area with exercise equipment for all ages. Residents of Çair come here to stay active and healthy while enjoying the fresh air.",
        interactive: true
    };

    // Ground surface for exercise area (rubber flooring)
    const floorGeometry = new THREE.PlaneGeometry(12, 8);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x5c4033,
        roughness: 0.95
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.01;
    floor.receiveShadow = true;
    exerciseGroup.add(floor);

    // Materials
    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a4a4a,
        roughness: 0.3,
        metalness: 0.8
    });

    const yellowMaterial = new THREE.MeshStandardMaterial({
        color: 0xf4d03f,
        roughness: 0.5,
        metalness: 0.3
    });

    const blueMaterial = new THREE.MeshStandardMaterial({
        color: 0x3498db,
        roughness: 0.5,
        metalness: 0.3
    });

    const redMaterial = new THREE.MeshStandardMaterial({
        color: 0xe74c3c,
        roughness: 0.5,
        metalness: 0.3
    });

    // 1. Pull-up Bar Station
    const pullUpBar = createPullUpBar(metalMaterial, yellowMaterial);
    pullUpBar.position.set(-4, 0, -2);
    exerciseGroup.add(pullUpBar);

    // 2. Parallel Bars (for dips)
    const parallelBars = createParallelBars(metalMaterial, blueMaterial);
    parallelBars.position.set(0, 0, -2);
    exerciseGroup.add(parallelBars);

    // 3. Sit-up Bench
    const sitUpBench = createSitUpBench(metalMaterial, redMaterial);
    sitUpBench.position.set(4, 0, -2);
    exerciseGroup.add(sitUpBench);

    // 4. Exercise Bike (stationary)
    const exerciseBike = createExerciseBike(metalMaterial, yellowMaterial);
    exerciseBike.position.set(-4, 0, 2);
    exerciseGroup.add(exerciseBike);

    // 5. Leg Press Machine
    const legPress = createLegPress(metalMaterial, blueMaterial);
    legPress.position.set(0, 0, 2);
    exerciseGroup.add(legPress);

    // 6. Stepper
    const stepper = createStepper(metalMaterial, redMaterial);
    stepper.position.set(4, 0, 2);
    exerciseGroup.add(stepper);

    // Position the exercise area in the park
    exerciseGroup.position.set(25, 0, 15);

    return exerciseGroup;
}

function createPullUpBar(metalMaterial, accentMaterial) {
    const group = new THREE.Group();
    group.name = 'pullUpBar';
    group.userData = {
        name: "Pull-up Bar",
        description: "A sturdy pull-up bar for upper body exercises. Great for pull-ups, chin-ups, and hanging exercises.",
        interactive: true
    };

    const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 8);
    
    // Left post
    const leftPost = new THREE.Mesh(postGeometry, metalMaterial);
    leftPost.position.set(-0.8, 1.25, 0);
    leftPost.castShadow = true;
    group.add(leftPost);

    // Right post
    const rightPost = new THREE.Mesh(postGeometry, metalMaterial);
    rightPost.position.set(0.8, 1.25, 0);
    rightPost.castShadow = true;
    group.add(rightPost);

    // Top bar
    const barGeometry = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8);
    const topBar = new THREE.Mesh(barGeometry, accentMaterial);
    topBar.position.set(0, 2.4, 0);
    topBar.rotation.z = Math.PI / 2;
    topBar.castShadow = true;
    group.add(topBar);

    // Base plates
    const baseGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16);
    
    const leftBase = new THREE.Mesh(baseGeometry, metalMaterial);
    leftBase.position.set(-0.8, 0.025, 0);
    group.add(leftBase);

    const rightBase = new THREE.Mesh(baseGeometry, metalMaterial);
    rightBase.position.set(0.8, 0.025, 0);
    group.add(rightBase);

    return group;
}

function createParallelBars(metalMaterial, accentMaterial) {
    const group = new THREE.Group();
    group.name = 'parallelBars';
    group.userData = {
        name: "Parallel Bars",
        description: "Parallel bars for dips and other bodyweight exercises. Excellent for building arm and chest strength.",
        interactive: true
    };

    const postGeometry = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8);
    const barGeometry = new THREE.CylinderGeometry(0.035, 0.035, 1.5, 8);

    // Four posts
    const postPositions = [
        { x: -0.3, z: -0.7 },
        { x: -0.3, z: 0.7 },
        { x: 0.3, z: -0.7 },
        { x: 0.3, z: 0.7 }
    ];

    postPositions.forEach(pos => {
        const post = new THREE.Mesh(postGeometry, metalMaterial);
        post.position.set(pos.x, 0.6, pos.z);
        post.castShadow = true;
        group.add(post);
    });

    // Two parallel bars
    const leftBar = new THREE.Mesh(barGeometry, accentMaterial);
    leftBar.position.set(-0.3, 1.15, 0);
    leftBar.rotation.x = Math.PI / 2;
    leftBar.castShadow = true;
    group.add(leftBar);

    const rightBar = new THREE.Mesh(barGeometry, accentMaterial);
    rightBar.position.set(0.3, 1.15, 0);
    rightBar.rotation.x = Math.PI / 2;
    rightBar.castShadow = true;
    group.add(rightBar);

    // Base frame
    const baseGeometry = new THREE.BoxGeometry(0.8, 0.05, 1.6);
    const base = new THREE.Mesh(baseGeometry, metalMaterial);
    base.position.set(0, 0.025, 0);
    base.receiveShadow = true;
    group.add(base);

    return group;
}

function createSitUpBench(metalMaterial, accentMaterial) {
    const group = new THREE.Group();
    group.name = 'sitUpBench';
    group.userData = {
        name: "Sit-up Bench",
        description: "An inclined bench for sit-ups and abdominal exercises. Features foot holders for stability.",
        interactive: true
    };

    // Bench surface (inclined)
    const benchGeometry = new THREE.BoxGeometry(0.5, 0.08, 1.5);
    const bench = new THREE.Mesh(benchGeometry, accentMaterial);
    bench.position.set(0, 0.4, 0);
    bench.rotation.x = 0.2;
    bench.castShadow = true;
    bench.receiveShadow = true;
    group.add(bench);

    // Support legs
    const legGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
    
    const frontLeg1 = new THREE.Mesh(legGeometry, metalMaterial);
    frontLeg1.position.set(-0.2, 0.2, 0.6);
    frontLeg1.castShadow = true;
    group.add(frontLeg1);

    const frontLeg2 = new THREE.Mesh(legGeometry, metalMaterial);
    frontLeg2.position.set(0.2, 0.2, 0.6);
    frontLeg2.castShadow = true;
    group.add(frontLeg2);

    const backLegGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.7, 8);
    const backLeg1 = new THREE.Mesh(backLegGeometry, metalMaterial);
    backLeg1.position.set(-0.2, 0.3, -0.5);
    backLeg1.castShadow = true;
    group.add(backLeg1);

    const backLeg2 = new THREE.Mesh(backLegGeometry, metalMaterial);
    backLeg2.position.set(0.2, 0.3, -0.5);
    backLeg2.castShadow = true;
    group.add(backLeg2);

    // Foot holder bar
    const footBarGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);
    const footBar = new THREE.Mesh(footBarGeometry, metalMaterial);
    footBar.position.set(0, 0.55, -0.65);
    footBar.rotation.z = Math.PI / 2;
    footBar.castShadow = true;
    group.add(footBar);

    // Foot holder supports
    const supportGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.3, 8);
    const leftSupport = new THREE.Mesh(supportGeometry, metalMaterial);
    leftSupport.position.set(-0.25, 0.45, -0.65);
    group.add(leftSupport);

    const rightSupport = new THREE.Mesh(supportGeometry, metalMaterial);
    rightSupport.position.set(0.25, 0.45, -0.65);
    group.add(rightSupport);

    return group;
}

function createExerciseBike(metalMaterial, accentMaterial) {
    const group = new THREE.Group();
    group.name = 'exerciseBike';
    group.userData = {
        name: "Stationary Exercise Bike",
        description: "An outdoor stationary bike for cardio exercise. Pedal away while enjoying the park scenery!",
        interactive: true
    };

    // Main frame post
    const frameGeometry = new THREE.CylinderGeometry(0.04, 0.05, 1.2, 8);
    const frame = new THREE.Mesh(frameGeometry, metalMaterial);
    frame.position.set(0, 0.6, 0);
    frame.castShadow = true;
    group.add(frame);

    // Seat post
    const seatPostGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
    const seatPost = new THREE.Mesh(seatPostGeometry, metalMaterial);
    seatPost.position.set(0, 1.1, -0.2);
    seatPost.rotation.x = -0.3;
    seatPost.castShadow = true;
    group.add(seatPost);

    // Seat
    const seatGeometry = new THREE.BoxGeometry(0.2, 0.06, 0.25);
    const seat = new THREE.Mesh(seatGeometry, accentMaterial);
    seat.position.set(0, 1.3, -0.35);
    seat.castShadow = true;
    group.add(seat);

    // Handlebar post
    const handlePostGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8);
    const handlePost = new THREE.Mesh(handlePostGeometry, metalMaterial);
    handlePost.position.set(0, 1.0, 0.3);
    handlePost.rotation.x = 0.3;
    handlePost.castShadow = true;
    group.add(handlePost);

    // Handlebars
    const handleGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.5, 8);
    const handlebar = new THREE.Mesh(handleGeometry, accentMaterial);
    handlebar.position.set(0, 1.25, 0.45);
    handlebar.rotation.z = Math.PI / 2;
    handlebar.castShadow = true;
    group.add(handlebar);

    // Pedal mechanism (simplified wheel)
    const wheelGeometry = new THREE.TorusGeometry(0.2, 0.03, 8, 16);
    const wheel = new THREE.Mesh(wheelGeometry, metalMaterial);
    wheel.position.set(0, 0.3, 0);
    wheel.rotation.y = Math.PI / 2;
    group.add(wheel);

    // Pedals
    const pedalGeometry = new THREE.BoxGeometry(0.15, 0.03, 0.08);
    const leftPedal = new THREE.Mesh(pedalGeometry, accentMaterial);
    leftPedal.position.set(-0.25, 0.3, 0);
    group.add(leftPedal);

    const rightPedal = new THREE.Mesh(pedalGeometry, accentMaterial);
    rightPedal.position.set(0.25, 0.3, 0);
    group.add(rightPedal);

    // Base
    const baseGeometry = new THREE.BoxGeometry(0.6, 0.05, 1);
    const base = new THREE.Mesh(baseGeometry, metalMaterial);
    base.position.set(0, 0.025, 0);
    base.receiveShadow = true;
    group.add(base);

    return group;
}

function createLegPress(metalMaterial, accentMaterial) {
    const group = new THREE.Group();
    group.name = 'legPress';
    group.userData = {
        name: "Leg Press Machine",
        description: "An outdoor leg press machine for building leg strength. Uses body weight as resistance.",
        interactive: true
    };

    // Seat
    const seatGeometry = new THREE.BoxGeometry(0.5, 0.08, 0.5);
    const seat = new THREE.Mesh(seatGeometry, accentMaterial);
    seat.position.set(0, 0.5, -0.4);
    seat.rotation.x = -0.3;
    seat.castShadow = true;
    group.add(seat);

    // Backrest
    const backrestGeometry = new THREE.BoxGeometry(0.5, 0.6, 0.08);
    const backrest = new THREE.Mesh(backrestGeometry, accentMaterial);
    backrest.position.set(0, 0.7, -0.6);
    backrest.rotation.x = -0.4;
    backrest.castShadow = true;
    group.add(backrest);

    // Foot plate
    const footPlateGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.05);
    const footPlate = new THREE.Mesh(footPlateGeometry, metalMaterial);
    footPlate.position.set(0, 0.6, 0.3);
    footPlate.rotation.x = 0.2;
    footPlate.castShadow = true;
    group.add(footPlate);

    // Frame rails
    const railGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.2, 8);
    
    const leftRail = new THREE.Mesh(railGeometry, metalMaterial);
    leftRail.position.set(-0.3, 0.5, -0.1);
    leftRail.rotation.x = Math.PI / 2;
    leftRail.castShadow = true;
    group.add(leftRail);

    const rightRail = new THREE.Mesh(railGeometry, metalMaterial);
    rightRail.position.set(0.3, 0.5, -0.1);
    rightRail.rotation.x = Math.PI / 2;
    rightRail.castShadow = true;
    group.add(rightRail);

    // Support posts
    const postGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    
    const backPost = new THREE.Mesh(postGeometry, metalMaterial);
    backPost.position.set(0, 0.4, -0.7);
    backPost.castShadow = true;
    group.add(backPost);

    // Base
    const baseGeometry = new THREE.BoxGeometry(0.8, 0.05, 1.2);
    const base = new THREE.Mesh(baseGeometry, metalMaterial);
    base.position.set(0, 0.025, -0.1);
    base.receiveShadow = true;
    group.add(base);

    return group;
}

function createStepper(metalMaterial, accentMaterial) {
    const group = new THREE.Group();
    group.name = 'stepper';
    group.userData = {
        name: "Stepper Machine",
        description: "An outdoor stepper for cardio and leg exercises. Simulates climbing stairs for a great workout.",
        interactive: true
    };

    // Main post
    const postGeometry = new THREE.CylinderGeometry(0.05, 0.06, 1.3, 8);
    const post = new THREE.Mesh(postGeometry, metalMaterial);
    post.position.set(0, 0.65, 0);
    post.castShadow = true;
    group.add(post);

    // Handlebar
    const handleGeometry = new THREE.TorusGeometry(0.2, 0.025, 8, 16, Math.PI);
    const handlebar = new THREE.Mesh(handleGeometry, accentMaterial);
    handlebar.position.set(0, 1.3, 0.1);
    handlebar.rotation.x = Math.PI;
    handlebar.castShadow = true;
    group.add(handlebar);

    // Handle posts
    const handlePostGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.3, 8);
    
    const leftHandlePost = new THREE.Mesh(handlePostGeometry, metalMaterial);
    leftHandlePost.position.set(-0.2, 1.15, 0.1);
    group.add(leftHandlePost);

    const rightHandlePost = new THREE.Mesh(handlePostGeometry, metalMaterial);
    rightHandlePost.position.set(0.2, 1.15, 0.1);
    group.add(rightHandlePost);

    // Step pedals
    const pedalGeometry = new THREE.BoxGeometry(0.25, 0.04, 0.35);
    
    const leftPedal = new THREE.Mesh(pedalGeometry, accentMaterial);
    leftPedal.position.set(-0.2, 0.25, 0.1);
    leftPedal.rotation.x = 0.1;
    leftPedal.castShadow = true;
    group.add(leftPedal);

    const rightPedal = new THREE.Mesh(pedalGeometry, accentMaterial);
    rightPedal.position.set(0.2, 0.35, 0.1);
    rightPedal.rotation.x = -0.1;
    rightPedal.castShadow = true;
    group.add(rightPedal);

    // Pedal supports
    const supportGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);
    
    const leftSupport = new THREE.Mesh(supportGeometry, metalMaterial);
    leftSupport.position.set(-0.2, 0.35, -0.1);
    leftSupport.rotation.x = 0.3;
    group.add(leftSupport);

    const rightSupport = new THREE.Mesh(supportGeometry, metalMaterial);
    rightSupport.position.set(0.2, 0.45, -0.1);
    rightSupport.rotation.x = -0.3;
    group.add(rightSupport);

    // Base
    const baseGeometry = new THREE.BoxGeometry(0.7, 0.05, 0.6);
    const base = new THREE.Mesh(baseGeometry, metalMaterial);
    base.position.set(0, 0.025, 0);
    base.receiveShadow = true;
    group.add(base);

    return group;
}
