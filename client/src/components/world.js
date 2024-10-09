import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import initializeScene from './scenes/sceneInitializer';
import handleMouseClick from './controls/mouseEvents';
import exportObject from './controls/objectExporter';

const WorldScene = () => {
    const sceneRef = useRef(null);
    const sceneInstance = useRef(null); // Ref to store the scene instance
    const [blocks, setBlocks] = useState([]);
    const [isGrouping, setIsGrouping] = useState(false);
    const [currentGroup, setCurrentGroup] = useState(null);
    const raycaster = new THREE.Raycaster();

    useEffect(() => {
        const { scene, camera, renderer } = initializeScene(sceneRef, setBlocks);
        sceneInstance.current = scene; // Store the scene in the ref

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        const onMouseClick = (event) => handleMouseClick(event, scene, camera, setBlocks, raycaster, isGrouping, currentGroup);
        window.addEventListener('contextmenu', (e) => e.preventDefault());
        window.addEventListener('mousedown', onMouseClick);

        return () => {
            window.removeEventListener('contextmenu', (e) => e.preventDefault());
            window.removeEventListener('mousedown', onMouseClick);
            blocks.forEach(block => scene.remove(block));
            if (currentGroup) {
                scene.remove(currentGroup); // Remove the current group when unmounted
            }
        };
        
    }, []);

    const startGrouping = () => {
        if (!currentGroup) {
            const group = new THREE.Group();
            sceneInstance.current.add(group); // Use the scene from the ref
            setCurrentGroup(group);
            setIsGrouping(true);
        }
    };

    const doneGrouping = () => {
        setIsGrouping(false);
        setCurrentGroup(null);
    };

    return (
        <div>
            <div ref={sceneRef} />
            <button onClick={startGrouping}>New Piece</button>
            <button onClick={doneGrouping} disabled={!isGrouping}>Done Piece</button>
        </div>
    );
};

export default WorldScene;
