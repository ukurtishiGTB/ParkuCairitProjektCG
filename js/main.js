/**
 * Çair Park - 3D Interactive Model
 * Computer Graphics Project - SEEU
 * 
 * Students: Veron Idrizi & Ubejd Kurtishi
 * Mentor: Prof. Visar Shehu
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// Import our modules
import { createParkGround } from './components/ground.js';
import { createTrees } from './components/trees.js';
import { createBenches } from './components/benches.js';
import { createLampPosts } from './components/lampPosts.js';
import { createPlayground } from './components/playground.js';
import { createFountain } from './components/fountain.js';
import { createPaths } from './components/paths.js';
import { createBirds } from './components/birds.js';
import { createSkybox } from './components/skybox.js';
import { setupLighting } from './components/lighting.js';
import { createSrebrenicaMemorial } from './components/srebrenicaMemorial.js';
import { createExerciseArea } from './components/exerciseArea.js';
import { InteractionManager } from './utils/interactions.js';
import { AnimationManager } from './utils/animations.js';

// Global variables
let scene, camera, renderer;
let controls, orbitControls;
let clock, delta;
let isNightMode = false;
let isPanelVisible = true;
let interactionManager, animationManager;

// Movement variables
const moveSpeed = 15;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const keys = { w: false, a: false, s: false, d: false };

// Camera constraints
const cameraConstraints = {
    minHeight: 3,
    maxHeight: 50,
    minDistance: 5,
    maxDistance: 80,
    bounds: 38
};

// Default camera position for reset
const defaultCameraPosition = { x: 0, y: 15, z: 35 };
const defaultTargetPosition = { x: 0, y: 0, z: 0 };

// Scene objects that need updates
let sceneObjects = {
    fountain: null,
    birds: [],
    trees: [],
    lights: {
        sun: null,
        ambient: null,
        lampLights: []
    }
};

// Initialize the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x87CEEB, 50, 200);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 5, 30);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    document.body.appendChild(renderer.domElement);

    // Clock for animations
    clock = new THREE.Clock();

    // Setup controls
    setupControls();

    // Build the park
    buildPark();

    // Setup managers
    interactionManager = new InteractionManager(scene, camera, renderer);
    animationManager = new AnimationManager(sceneObjects);

    // Event listeners
    setupEventListeners();

    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);

    // Start animation loop
    animate();
}

function setupControls() {
    // Orbit controls for easier navigation
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.08;
    orbitControls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent going below ground
    orbitControls.minPolarAngle = 0.1; // Prevent going too high (looking straight down)
    orbitControls.minDistance = cameraConstraints.minDistance;
    orbitControls.maxDistance = cameraConstraints.maxDistance;
    orbitControls.target.set(defaultTargetPosition.x, defaultTargetPosition.y, defaultTargetPosition.z);
    
    // Enable smooth zooming
    orbitControls.zoomSpeed = 1.0;
    orbitControls.rotateSpeed = 0.7;
    
    // Set initial camera position
    camera.position.set(defaultCameraPosition.x, defaultCameraPosition.y, defaultCameraPosition.z);
}

function buildPark() {
    // Create skybox
    const skybox = createSkybox();
    scene.add(skybox);
    sceneObjects.skybox = skybox;

    // Setup lighting
    const lights = setupLighting(scene);
    sceneObjects.lights = lights;

    // Create ground with grass texture
    const ground = createParkGround();
    scene.add(ground);

    // Create walking paths
    const paths = createPaths();
    scene.add(paths);

    // Create trees (with hierarchy: trunk + leaves)
    const { treeGroup, trees } = createTrees();
    scene.add(treeGroup);
    sceneObjects.trees = trees;

    // Create benches
    const benches = createBenches();
    scene.add(benches);

    // Create lamp posts
    const { lampGroup, lampLights } = createLampPosts();
    scene.add(lampGroup);
    sceneObjects.lights.lampLights = lampLights;

    // Create playground
    const playground = createPlayground();
    scene.add(playground);

    // Create fountain
    const fountain = createFountain();
    scene.add(fountain);
    sceneObjects.fountain = fountain;

    // Create birds
    const birds = createBirds();
    scene.add(birds.group);
    sceneObjects.birds = birds.birdList;

    // Create Srebrenica Memorial
    const srebrenicaMemorial = createSrebrenicaMemorial();
    scene.add(srebrenicaMemorial);

    // Create Exercise/Fitness Area
    const exerciseArea = createExerciseArea();
    scene.add(exerciseArea);

    // Add park boundary/fence
    createParkBoundary();
}

function createParkBoundary() {
    const boundaryGroup = new THREE.Group();
    boundaryGroup.name = 'parkBoundary';

    // Simple low fence around the park
    const fenceMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a4a4a,
        metalness: 0.6,
        roughness: 0.4
    });

    const fenceHeight = 1;
    const parkSize = 80;
    const fenceGeometry = new THREE.BoxGeometry(parkSize, fenceHeight, 0.1);

    // Four sides of fence
    const positions = [
        { x: 0, z: parkSize / 2, rotation: 0 },
        { x: 0, z: -parkSize / 2, rotation: 0 },
        { x: parkSize / 2, z: 0, rotation: Math.PI / 2 },
        { x: -parkSize / 2, z: 0, rotation: Math.PI / 2 }
    ];

    positions.forEach(pos => {
        const fence = new THREE.Mesh(fenceGeometry, fenceMaterial);
        fence.position.set(pos.x, fenceHeight / 2, pos.z);
        fence.rotation.y = pos.rotation;
        fence.castShadow = true;
        fence.receiveShadow = true;
        boundaryGroup.add(fence);
    });

    // Entrance gate
    const gateGeometry = new THREE.BoxGeometry(8, 3, 0.3);
    const gateMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d5016,
        metalness: 0.3,
        roughness: 0.7
    });
    const gate = new THREE.Mesh(gateGeometry, gateMaterial);
    gate.position.set(0, 1.5, parkSize / 2);
    gate.userData = {
        name: "Park Entrance",
        description: "Welcome to Çair Park! This is the main entrance where visitors enter to enjoy the beautiful green spaces and amenities.",
        interactive: true
    };
    boundaryGroup.add(gate);

    // Gate sign
    const signGeometry = new THREE.BoxGeometry(6, 1.5, 0.1);
    const signMaterial = new THREE.MeshStandardMaterial({ color: 0x1a472a });
    const sign = new THREE.Mesh(signGeometry, signMaterial);
    sign.position.set(0, 4, parkSize / 2);
    boundaryGroup.add(sign);

    scene.add(boundaryGroup);
}

function setupEventListeners() {
    // Window resize
    window.addEventListener('resize', onWindowResize);

    // Keyboard controls
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Close popup
    document.getElementById('close-popup').addEventListener('click', () => {
        document.getElementById('object-popup').classList.add('hidden');
    });

    // Click to interact
    renderer.domElement.addEventListener('click', (event) => {
        interactionManager.onClick(event);
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            keys.w = true;
            break;
        case 'KeyS':
            keys.s = true;
            break;
        case 'KeyA':
            keys.a = true;
            break;
        case 'KeyD':
            keys.d = true;
            break;
        case 'KeyT':
            toggleDayNight();
            break;
        case 'KeyH':
            togglePanel();
            break;
        case 'KeyR':
            resetCameraPosition();
            break;
        case 'Space':
            // Move camera up
            event.preventDefault();
            moveCameraVertically(5);
            break;
        case 'ShiftLeft':
        case 'ShiftRight':
            // Move camera down
            moveCameraVertically(-5);
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            keys.w = false;
            break;
        case 'KeyS':
            keys.s = false;
            break;
        case 'KeyA':
            keys.a = false;
            break;
        case 'KeyD':
            keys.d = false;
            break;
    }
}

function toggleDayNight() {
    isNightMode = !isNightMode;
    
    const timeIndicator = document.getElementById('time-indicator');
    const timeIcon = document.getElementById('time-icon');
    const timeText = document.getElementById('time-text');

    if (isNightMode) {
        // Night mode
        timeIndicator.classList.add('night');
        timeIcon.textContent = '🌙';
        timeText.textContent = 'Night Mode';
        
        // Adjust lighting
        sceneObjects.lights.sun.intensity = 0.1;
        sceneObjects.lights.ambient.intensity = 0.2;
        
        // Turn on lamp lights
        sceneObjects.lights.lampLights.forEach(light => {
            light.intensity = 2;
        });

        // Change sky color
        scene.fog.color.setHex(0x0a1628);
        scene.background = new THREE.Color(0x0a1628);
        
        renderer.toneMappingExposure = 0.5;
    } else {
        // Day mode
        timeIndicator.classList.remove('night');
        timeIcon.textContent = '☀️';
        timeText.textContent = 'Day Mode';
        
        // Adjust lighting
        sceneObjects.lights.sun.intensity = 1.5;
        sceneObjects.lights.ambient.intensity = 0.6;
        
        // Turn off lamp lights
        sceneObjects.lights.lampLights.forEach(light => {
            light.intensity = 0;
        });

        // Change sky color
        scene.fog.color.setHex(0x87CEEB);
        scene.background = new THREE.Color(0x87CEEB);
        
        renderer.toneMappingExposure = 1;
    }
}

function togglePanel() {
    isPanelVisible = !isPanelVisible;
    const panel = document.getElementById('info-panel');
    if (isPanelVisible) {
        panel.classList.remove('hidden');
    } else {
        panel.classList.add('hidden');
    }
}

function resetCameraPosition() {
    // Smoothly reset camera to default position
    camera.position.set(defaultCameraPosition.x, defaultCameraPosition.y, defaultCameraPosition.z);
    orbitControls.target.set(defaultTargetPosition.x, defaultTargetPosition.y, defaultTargetPosition.z);
    orbitControls.update();
}

function moveCameraVertically(amount) {
    const newHeight = camera.position.y + amount;
    // Clamp to constraints
    camera.position.y = Math.max(cameraConstraints.minHeight, Math.min(cameraConstraints.maxHeight, newHeight));
}

function updateMovement(delta) {
    // Get camera direction
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    // Calculate right vector
    const rightVector = new THREE.Vector3();
    rightVector.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0));

    // Apply movement
    if (keys.w) {
        orbitControls.target.addScaledVector(cameraDirection, moveSpeed * delta);
        camera.position.addScaledVector(cameraDirection, moveSpeed * delta);
    }
    if (keys.s) {
        orbitControls.target.addScaledVector(cameraDirection, -moveSpeed * delta);
        camera.position.addScaledVector(cameraDirection, -moveSpeed * delta);
    }
    if (keys.a) {
        orbitControls.target.addScaledVector(rightVector, -moveSpeed * delta);
        camera.position.addScaledVector(rightVector, -moveSpeed * delta);
    }
    if (keys.d) {
        orbitControls.target.addScaledVector(rightVector, moveSpeed * delta);
        camera.position.addScaledVector(rightVector, moveSpeed * delta);
    }

    // Keep within park bounds (horizontal)
    const bounds = cameraConstraints.bounds;
    camera.position.x = Math.max(-bounds, Math.min(bounds, camera.position.x));
    camera.position.z = Math.max(-bounds, Math.min(bounds, camera.position.z));
    orbitControls.target.x = Math.max(-bounds, Math.min(bounds, orbitControls.target.x));
    orbitControls.target.z = Math.max(-bounds, Math.min(bounds, orbitControls.target.z));
    
    // Keep camera height within constraints
    camera.position.y = Math.max(cameraConstraints.minHeight, Math.min(cameraConstraints.maxHeight, camera.position.y));
    
    // Keep target at reasonable height (slightly above ground)
    orbitControls.target.y = Math.max(0, Math.min(10, orbitControls.target.y));
}

function updateMiniMap() {
    const canvas = document.getElementById('map-canvas');
    const ctx = canvas.getContext('2d');
    const size = 150;
    canvas.width = size;
    canvas.height = size;

    // Draw park background
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(0, 0, size, size);

    // Draw paths
    ctx.strokeStyle = '#c4a35a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size / 2, size);
    ctx.moveTo(0, size / 2);
    ctx.lineTo(size, size / 2);
    ctx.stroke();

    // Draw fountain (center)
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 8, 0, Math.PI * 2);
    ctx.fill();

    // Update player marker position
    const marker = document.getElementById('player-marker');
    const mapScale = size / 80; // Park is 80 units wide
    const markerX = (camera.position.x + 40) * mapScale;
    const markerZ = (camera.position.z + 40) * mapScale;
    marker.style.left = `${markerX}px`;
    marker.style.top = `${markerZ}px`;
}

function animate() {
    requestAnimationFrame(animate);

    delta = clock.getDelta();

    // Update controls
    orbitControls.update();

    // Update movement
    updateMovement(delta);

    // Update animations
    animationManager.update(delta, clock.getElapsedTime());

    // Update mini map
    updateMiniMap();

    // Render
    renderer.render(scene, camera);
}

// Start the application
init();
