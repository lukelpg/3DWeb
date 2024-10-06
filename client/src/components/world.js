import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Terrain from './scenes/terrain';
import SpotLight from './lights/spotlight';
import Cube from './objects/cube';
import Frame from './objects/coodFrame';

const WorldScene = () => {
    const sceneRef = useRef(null);
    const [blocks, setBlocks] = useState([]); // Track placed blocks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Effect for initializing the scene
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
        camera.position.set(8, 10, 22);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        sceneRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = true;
        controls.update();

        const terrain = new Terrain();
        scene.add(terrain);

        const spotLight = new SpotLight();
        scene.add(spotLight);

        const coodFrame = new Frame();
        scene.add(coodFrame);

        const initialCube = new Cube();
        initialCube.position.set(5, 5, 5);
        initialCube.userData = { type: 'cube' }; // Ensure userData is set
        scene.add(initialCube);
        setBlocks([initialCube]); // Start with one block

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        const onMouseClick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children.filter(child => child.cubeMesh));

            if (event.button === 0) { // Left click
                if (intersects.length > 0) {
                    const intersect = intersects[0];
                    const newBlock = new Cube();

                    const clickedBlock = intersect.object;
                    const worldPosition = new THREE.Vector3();
                    clickedBlock.getWorldPosition(worldPosition);

                    const size = 1; // Assuming block size is 1 unit
                    const newPosition = worldPosition.clone();

                    const faceNormal = intersect.face.normal.clone();

                    // Adjust the new block position based on face normal
                    if (faceNormal.equals(new THREE.Vector3(0, 0, 1))) { // Front face
                        newPosition.z += size;
                    } else if (faceNormal.equals(new THREE.Vector3(0, 0, -1))) { // Back face
                        newPosition.z -= size;
                    } else if (faceNormal.equals(new THREE.Vector3(0, 1, 0))) { // Top face
                        newPosition.y += size;
                    } else if (faceNormal.equals(new THREE.Vector3(0, -1, 0))) { // Bottom face
                        newPosition.y -= size;
                    } else if (faceNormal.equals(new THREE.Vector3(1, 0, 0))) { // Right face
                        newPosition.x += size;
                    } else if (faceNormal.equals(new THREE.Vector3(-1, 0, 0))) { // Left face
                        newPosition.x -= size;
                    }

                    newBlock.position.copy(newPosition);
                    scene.add(newBlock);

                    // Update state with new block
                    setBlocks(prevBlocks => {
                        const updatedBlocks = [...prevBlocks, newBlock];
                        console.log('Added block:', newBlock);
                        console.log('Updated blocks:', updatedBlocks);
                        return updatedBlocks;
                    });
                }
            } else if (event.button === 2) { // Right click
                if (intersects.length > 0) {
                    const clickedBlock = intersects[0].object; // The block that was clicked
                    const worldPosition = new THREE.Vector3();
                    clickedBlock.getWorldPosition(worldPosition); // Get the world position of the clicked block

                    // Find the block in the state that matches the clicked position
                    const blockToRemove = blocks.find(block => {
                        const blockPosition = new THREE.Vector3();
                        block.getWorldPosition(blockPosition);
                        // Check if the position is approximately equal
                        return blockPosition.equals(worldPosition);
                    });

                    if (blockToRemove) {
                        console.log('Removing block:', blockToRemove);
                        scene.remove(blockToRemove);

                        // Update state to remove the block from blocks array
                        setBlocks(prevBlocks => {
                            const updatedBlocks = prevBlocks.filter(block => block !== blockToRemove);
                            console.log('Updated blocks after removal:', updatedBlocks); // Log the updated blocks
                            return updatedBlocks; // Return the new state
                        });

                        // Dispose geometry and materials
                        if (blockToRemove.geometry) {
                            blockToRemove.geometry.dispose();
                        }
                        if (blockToRemove.material) {
                            if (Array.isArray(blockToRemove.material)) {
                                blockToRemove.material.forEach(mat => mat.dispose());
                            } else {
                                blockToRemove.material.dispose();
                            }
                        }
                    } else {
                        console.log('No block found at the clicked position.');
                    }
                }
            }
        };

        window.addEventListener('contextmenu', (e) => e.preventDefault()); // Prevent context menu from appearing
        window.addEventListener('mousedown', onMouseClick);

        return () => {
            window.removeEventListener('contextmenu', (e) => e.preventDefault());
            window.removeEventListener('mousedown', onMouseClick);
            scene.remove(terrain);
            scene.remove(spotLight);
            scene.remove(coodFrame);
            blocks.forEach(block => scene.remove(block));
            terrain.dispose();
            spotLight.dispose();
            coodFrame.dispose();
            blocks.forEach(block => block.dispose());
        };
    }, []); // No dependency on blocks here

    return <div ref={sceneRef} />;
};

export default WorldScene;
