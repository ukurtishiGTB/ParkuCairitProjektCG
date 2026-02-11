/**
 * Lighting Component - Sets up all light sources in the scene
 */

import * as THREE from 'three';

export function setupLighting(scene) {
    const lights = {
        sun: null,
        ambient: null,
        hemisphere: null,
        lampLights: []
    };

    // Ambient light (global soft illumination)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    lights.ambient = ambientLight;

    // Hemisphere light (sky-ground gradient light)
    const hemisphereLight = new THREE.HemisphereLight(
        0x87CEEB, // Sky color
        0x3d8b40, // Ground color
        0.4
    );
    scene.add(hemisphereLight);
    lights.hemisphere = hemisphereLight;

    // Directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffd0, 1.5);
    sunLight.position.set(50, 80, 30);
    sunLight.castShadow = true;
    
    // Shadow configuration for sun
    sunLight.shadow.mapSize.width = 4096;
    sunLight.shadow.mapSize.height = 4096;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.camera.left = -60;
    sunLight.shadow.camera.right = 60;
    sunLight.shadow.camera.top = 60;
    sunLight.shadow.camera.bottom = -60;
    sunLight.shadow.bias = -0.0001;
    sunLight.shadow.radius = 2;
    
    scene.add(sunLight);
    lights.sun = sunLight;

    // Add sun helper (visual representation) - optional, can be removed
    // const sunHelper = new THREE.DirectionalLightHelper(sunLight, 5);
    // scene.add(sunHelper);

    // Add subtle fill light from the opposite direction
    const fillLight = new THREE.DirectionalLight(0x9090ff, 0.3);
    fillLight.position.set(-30, 20, -30);
    scene.add(fillLight);

    return lights;
}

export function createNightLighting(scene) {
    // Moonlight (dim directional)
    const moonLight = new THREE.DirectionalLight(0x8888ff, 0.3);
    moonLight.position.set(-30, 60, -20);
    moonLight.castShadow = true;
    
    return moonLight;
}
