// src/components/WorldScene.js
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import initializeScene from './scenes/sceneInitializer';
import handleMouseClick from './controls/mouseEvents';
import exportObject from './controls/objectExporter';

const WorldScene = () => {
    const sceneRef = useRef(null);
    const [blocks, setBlocks] = useState([]);
    const raycaster = new THREE.Raycaster();

    useEffect(() => {
        const { scene, camera, renderer } = initializeScene(sceneRef, setBlocks);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        const onMouseClick = (event) => handleMouseClick(event, scene, camera, setBlocks, raycaster);
        window.addEventListener('contextmenu', (e) => e.preventDefault());
        window.addEventListener('mousedown', onMouseClick);

        return () => {
            window.removeEventListener('contextmenu', (e) => e.preventDefault());
            window.removeEventListener('mousedown', onMouseClick);
            // Clean up the scene
            blocks.forEach(block => scene.remove(block));
        };
        
    }, []); // Empty dependency array to run once

    return <div ref={sceneRef} />;
};

export default WorldScene;
