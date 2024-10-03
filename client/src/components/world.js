import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Terrain from './scenes/terrain';
import SpotLight from './lights/spotlight';
import Cube from './objects/cube';
// import Model from './objects/model';
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
        scene.add(initialCube);
        setBlocks([initialCube]); // Start with one block

        // const car = new Model();
        // scene.add(car);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        const onMouseClick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children.filter(child => child instanceof Cube));

            if (intersects.length > 0) {
                const intersect = intersects[0];
                const newBlock = new Cube(); // Create a new cube

                // Position it based on the face normal
                newBlock.position.copy(intersect.point).add(intersect.face.normal);

                // Optionally, adjust the position to ensure it aligns properly
                newBlock.position.x = Math.round(newBlock.position.x);
                newBlock.position.y = Math.round(newBlock.position.y);
                newBlock.position.z = Math.round(newBlock.position.z);

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
    }, []); // Removed blocks from the dependency array

    return <div ref={sceneRef} />;
};

export default WorldScene;
