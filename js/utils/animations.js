/**
 * Animation Manager - Handles all animations in the scene
 */

import * as THREE from 'three';

export class AnimationManager {
    constructor(sceneObjects) {
        this.sceneObjects = sceneObjects;
    }

    update(delta, elapsedTime) {
        this.animateFountain(elapsedTime);
        this.animateBirds(delta, elapsedTime);
        this.animateTrees(elapsedTime);
        this.animatePlayground(elapsedTime);
    }

    animateFountain(elapsedTime) {
        const fountain = this.sceneObjects.fountain;
        if (!fountain) return;

        // Animate water surface
        const waterSurface = fountain.getObjectByName('waterSurface');
        if (waterSurface) {
            // Subtle wave effect
            waterSurface.position.y = 0.75 + Math.sin(elapsedTime * 2) * 0.02;
        }

        const upperWater = fountain.getObjectByName('upperWater');
        if (upperWater) {
            upperWater.position.y = 2.75 + Math.sin(elapsedTime * 2.5) * 0.015;
        }

        // Animate water spray particles
        const waterSpray = fountain.getObjectByName('waterSpray');
        if (waterSpray) {
            const particles = waterSpray.getObjectByName('waterParticles');
            if (particles && particles.geometry) {
                const positions = particles.geometry.attributes.position.array;
                const velocities = particles.geometry.userData.velocities;

                if (velocities) {
                    for (let i = 0; i < velocities.length; i++) {
                        // Update position
                        positions[i * 3] += velocities[i].x;
                        positions[i * 3 + 1] += velocities[i].y;
                        positions[i * 3 + 2] += velocities[i].z;

                        // Apply gravity
                        velocities[i].y -= 0.002;

                        // Reset particles that fall below a certain point
                        if (positions[i * 3 + 1] < -0.5) {
                            positions[i * 3] = (Math.random() - 0.5) * 0.3;
                            positions[i * 3 + 1] = 0;
                            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
                            velocities[i].x = (Math.random() - 0.5) * 0.02;
                            velocities[i].y = 0.05 + Math.random() * 0.05;
                            velocities[i].z = (Math.random() - 0.5) * 0.02;
                        }
                    }

                    particles.geometry.attributes.position.needsUpdate = true;
                }
            }
        }
    }

    animateBirds(delta, elapsedTime) {
        const birds = this.sceneObjects.birds;
        if (!birds || birds.length === 0) return;

        birds.forEach((bird) => {
            const data = bird.userData;
            if (!data) return;

            // Circular flight pattern
            data.orbitAngle += data.orbitSpeed * delta;
            
            const x = Math.cos(data.orbitAngle) * data.orbitRadius;
            const z = Math.sin(data.orbitAngle) * data.orbitRadius;
            const y = 10 + Math.sin(elapsedTime + data.heightOffset) * 3;

            bird.position.set(x, y, z);

            // Face direction of movement
            bird.rotation.y = -data.orbitAngle + Math.PI / 2;

            // Wing flapping animation
            const wingAngle = Math.sin(elapsedTime * 10 + data.wingPhase) * 0.5;
            
            const leftWing = bird.getObjectByName('leftWing');
            const rightWing = bird.getObjectByName('rightWing');
            
            if (leftWing) {
                leftWing.rotation.x = wingAngle;
            }
            if (rightWing) {
                rightWing.rotation.x = -wingAngle;
            }
        });
    }

    animateTrees(elapsedTime) {
        const trees = this.sceneObjects.trees;
        if (!trees || trees.length === 0) return;

        trees.forEach((tree) => {
            // Subtle swaying motion for foliage
            const foliage = tree.getObjectByName('foliage');
            if (foliage) {
                const swayOffset = tree.userData?.swayOffset || 0;
                const swayAmount = 0.02;
                const swaySpeed = 1.5;
                
                foliage.rotation.x = Math.sin(elapsedTime * swaySpeed + swayOffset) * swayAmount;
                foliage.rotation.z = Math.cos(elapsedTime * swaySpeed * 0.7 + swayOffset) * swayAmount;
            }
        });
    }

    animatePlayground(elapsedTime) {
        // Find playground group
        // Animate swings
        const swingSpeed = 2;
        const swingAmplitude = 0.3;

        // The playground contains swing set which has swing children
        // This would need proper traversal, but for simplicity:
        // You can enhance this by storing references during creation
    }
}
