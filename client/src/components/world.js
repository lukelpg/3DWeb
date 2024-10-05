import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Terrain from './scenes/terrain';
import SpotLight from './lights/spotlight';
import Cube from './objects/cube';
import Model from './objects/model';
import Frame from './objects/coodFrame';

const WorldScene = () => {
    const sceneRef = useRef(null);
    const [blocks, setBlocks] = useState([]); // Track placed blocks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

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
        initialCube.position.set(5, 5, 5)
        console.log(initialCube.position)
        const clickedBlockPosition = initialCube.position.clone()
        console.log(clickedBlockPosition)
        scene.add(initialCube);
        setBlocks([initialCube]); // Start with one block

        // const car = new Model();
        // scene.add(car);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        const snapToGrid = (value, size) => {
            return Math.round(value / size) * size;
        };
        
        // let lastBlockPosition = new THREE.Vector3(0, 0, 0); // To track the last block's position
        // let clickedBlockPosition = new THREE.Vector3(0, 0, 0); // To track the last block's position

        const onMouseClick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children.filter(child => child.cubeMesh));
        
            if (intersects.length > 0) {
                const intersect = intersects[0];
                const newBlock = new Cube(); // Create a new cube
        
                // Get the world position of the clicked block
                const clickedBlock = intersect.object;
                const worldPosition = new THREE.Vector3();
                clickedBlock.getWorldPosition(worldPosition); // Get world position
        
                console.log('Clicked Block World Position:', worldPosition);
        
                const size = 1; // Assuming block size is 1 unit
                const newPosition = worldPosition.clone(); // Clone to avoid reference issues
        
                const faceNormal = intersect.face.normal.clone();
        
                // Adjust the new block position based on face normal
                if (faceNormal.equals(new THREE.Vector3(0, 0, 1))) { // Front face
                    newPosition.z += size; // Place in front
                } else if (faceNormal.equals(new THREE.Vector3(0, 0, -1))) { // Back face
                    newPosition.z -= size; // Place behind
                } else if (faceNormal.equals(new THREE.Vector3(0, 1, 0))) { // Top face
                    newPosition.y += size; // Place above
                } else if (faceNormal.equals(new THREE.Vector3(0, -1, 0))) { // Bottom face
                    newPosition.y -= size; // Place below
                } else if (faceNormal.equals(new THREE.Vector3(1, 0, 0))) { // Right face
                    newPosition.x += size; // Place to the right
                } else if (faceNormal.equals(new THREE.Vector3(-1, 0, 0))) { // Left face
                    newPosition.x -= size; // Place to the left
                }
        
                // Set the position of the new block
                newBlock.position.copy(newPosition);
        
                // Add the new block to the scene
                scene.add(newBlock);
                setBlocks(prevBlocks => [...prevBlocks, newBlock]); // Update state with new block
            }
        };
        
        
        window.addEventListener('click', onMouseClick);

        return () => {
            window.removeEventListener('click', onMouseClick);
            scene.remove(terrain);
            scene.remove(spotLight);
            scene.remove(coodFrame);
            blocks.forEach(block => scene.remove(block));
            terrain.dispose();
            spotLight.dispose();
            coodFrame.dispose();
            blocks.forEach(block => block.dispose());
        };
    }, []); // Keep track of blocks

    return <div ref={sceneRef} />;
};

export default WorldScene;
