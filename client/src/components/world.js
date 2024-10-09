import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import initializeScene from './scenes/sceneInitializer';
import handleMouseClick from './controls/mouseEvents';

const WorldScene = () => {
    const sceneRef = useRef(null);
    const sceneInstance = useRef(null);
    const cameraRef = useRef(null);
    const [blocks, setBlocks] = useState([]);
    const [isGrouping, setIsGrouping] = useState(false);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [groups, setGroups] = useState([]); // Make sure this is defined
    const raycaster = new THREE.Raycaster();
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
    const [groupColorIndex, setGroupColorIndex] = useState(0);

    useEffect(() => {
        const { scene, camera, renderer } = initializeScene(sceneRef, setBlocks);
        sceneInstance.current = scene;
        cameraRef.current = camera;

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('contextmenu', (e) => e.preventDefault());
        return () => {
            window.removeEventListener('contextmenu', (e) => e.preventDefault());
            blocks.forEach(block => scene.remove(block));
            if (currentGroup) {
                scene.remove(currentGroup);
            }
        };
    }, []);

    const onMouseClick = useCallback((event) => {
        const camera = cameraRef.current;
        handleMouseClick(event, sceneInstance.current, camera, setBlocks, raycaster, isGrouping, currentGroup);
    }, [isGrouping, currentGroup]);

    useEffect(() => {
        window.addEventListener('mousedown', onMouseClick);
        return () => {
            window.removeEventListener('mousedown', onMouseClick);
        };
    }, [onMouseClick]);

    const startGrouping = () => {
        if (!currentGroup) {
            const group = new THREE.Group();
            sceneInstance.current.add(group);
    
            // Ensure this line is executed
            group.userData.color = colors[groupColorIndex % colors.length]; 
            setGroupColorIndex(prev => prev + 1);
            setCurrentGroup(group);
    
            // Add the group to the state
            setGroups(prev => {
                const updatedGroups = [...prev, group];
                console.log("Updated Groups:", updatedGroups);
                return updatedGroups;
            });
    
            setIsGrouping(true);
        }
    };
    

    const doneGrouping = () => {
        setIsGrouping(false);
        setCurrentGroup(null);
    };
    

    const logGroups = () => {
        console.log("Current Groups:", groups);
        groups.forEach((group, index) => {
            if (group && group.userData && group.userData.color !== undefined) {
                const blockPositions = [];
                group.children.forEach(block => {
                    const worldPosition = new THREE.Vector3();
                    block.getWorldPosition(worldPosition);
                    blockPositions.push({ x: worldPosition.x, y: worldPosition.y, z: worldPosition.z });
                });
                console.log(`Group ${index + 1}: Color: ${group.userData.color.toString(16)}, Positions:`, blockPositions);
            } else {
                console.log(`Group ${index + 1} is missing color data.`);
            }
        });
    };
    

    return (
        <div>
            <div ref={sceneRef} />
            <button onClick={startGrouping}>New Piece</button>
            <button onClick={doneGrouping} disabled={!isGrouping}>Done Piece</button>
            <button onClick={logGroups}>Log Groups</button>
        </div>
    );
};

export default WorldScene;
