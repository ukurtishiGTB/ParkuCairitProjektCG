import * as THREE from 'three';

export class InteractionManager {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredObject = null;
        
        // Track mouse movement to distinguish clicks from drags
        this.mouseDownPosition = { x: 0, y: 0 };
        this.mouseDownTime = 0;
        this.clickThreshold = 5; // Max pixels moved to count as click
        this.clickTimeThreshold = 300; // Max milliseconds for a click
        
        // Setup hover detection and click tracking
        this.setupHoverDetection();
        this.setupClickTracking();
    }

    setupHoverDetection() {
        this.renderer.domElement.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        });
    }

    setupClickTracking() {
        // Track mouse down position
        this.renderer.domElement.addEventListener('mousedown', (event) => {
            this.mouseDownPosition.x = event.clientX;
            this.mouseDownPosition.y = event.clientY;
            this.mouseDownTime = Date.now();
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
        // Check if this was a real click or a drag (looking around)
        const deltaX = Math.abs(event.clientX - this.mouseDownPosition.x);
        const deltaY = Math.abs(event.clientY - this.mouseDownPosition.y);
        const timeDelta = Date.now() - this.mouseDownTime;
        
        // If mouse moved too much or took too long, it's not a click
        if (deltaX > this.clickThreshold || deltaY > this.clickThreshold || timeDelta > this.clickTimeThreshold) {
            return; // This was a drag, not a click
        }

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
    }

    onObjectLeave() {
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
