/**
 * Interaction Manager - Handles user interactions with objects
 */

import * as THREE from 'three';

export class InteractionManager {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredObject = null;
        
        // Setup hover detection
        this.setupHoverDetection();
    }

    setupHoverDetection() {
        this.renderer.domElement.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        });
    }

    onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Find all interactive objects
        const interactiveObjects = this.getInteractiveObjects();
        
        // Calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(interactiveObjects, true);

        if (intersects.length > 0) {
            // Find the parent group with userData
            let targetObject = this.findInteractiveParent(intersects[0].object);
            
            if (targetObject && targetObject !== this.hoveredObject) {
                // Mouse entered new object
                this.onObjectHover(targetObject);
            }
        } else if (this.hoveredObject) {
            // Mouse left object
            this.onObjectLeave();
        }
    }

    onClick(event) {
        // Calculate mouse position
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Get interactive objects
        const interactiveObjects = this.getInteractiveObjects();
        
        // Check for intersections
        const intersects = this.raycaster.intersectObjects(interactiveObjects, true);

        if (intersects.length > 0) {
            const targetObject = this.findInteractiveParent(intersects[0].object);
            
            if (targetObject && targetObject.userData && targetObject.userData.interactive) {
                this.showObjectInfo(targetObject);
            }
        }
    }

    getInteractiveObjects() {
        const objects = [];
        
        this.scene.traverse((object) => {
            if (object.userData && object.userData.interactive) {
                objects.push(object);
            }
        });

        return objects;
    }

    findInteractiveParent(object) {
        let current = object;
        
        while (current) {
            if (current.userData && current.userData.interactive) {
                return current;
            }
            current = current.parent;
        }
        
        return null;
    }

    onObjectHover(object) {
        this.hoveredObject = object;
        document.body.style.cursor = 'pointer';
        
        // Optional: Add highlight effect
        // this.highlightObject(object);
    }

    onObjectLeave() {
        if (this.hoveredObject) {
            // Optional: Remove highlight effect
            // this.unhighlightObject(this.hoveredObject);
        }
        
        this.hoveredObject = null;
        document.body.style.cursor = 'default';
    }

    showObjectInfo(object) {
        const popup = document.getElementById('object-popup');
        const title = document.getElementById('popup-title');
        const description = document.getElementById('popup-description');

        title.textContent = object.userData.name || 'Unknown Object';
        description.textContent = object.userData.description || 'No description available.';

        popup.classList.remove('hidden');
    }

    highlightObject(object) {
        // Store original material
        object.traverse((child) => {
            if (child.isMesh && child.material) {
                child.userData.originalEmissive = child.material.emissive?.clone();
                if (child.material.emissive) {
                    child.material.emissive.setHex(0x444444);
                }
            }
        });
    }

    unhighlightObject(object) {
        // Restore original material
        object.traverse((child) => {
            if (child.isMesh && child.material && child.userData.originalEmissive) {
                child.material.emissive.copy(child.userData.originalEmissive);
            }
        });
    }
}
