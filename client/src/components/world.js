import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import initializeScene from './scenes/sceneInitializer';
import handleMouseClick from './controls/mouseEvents';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import Toolbar from './toolBar'; // Import the Toolbar component

const WorldScene = () => {
    const sceneRef = useRef(null);
    const sceneInstance = useRef(null);
    const cameraRef = useRef(null);
    const [blocks, setBlocks] = useState([]);
    const [isGrouping, setIsGrouping] = useState(false);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [groups, setGroups] = useState([]);
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
            group.userData.color = colors[groupColorIndex % colors.length];
            setGroupColorIndex(prev => prev + 1);
            setCurrentGroup(group);
            setGroups(prev => [...prev, group]);
            setIsGrouping(true);
        }
    };

    const exportGroupToSTL = (group, index) => {
        const exporter = new STLExporter();
        const stlString = exporter.parse(group);
        const blob = new Blob([stlString], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `piece_${index + 1}.stl`;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const doneGrouping = () => {
        if (currentGroup) {
            // exportGroupToSTL(currentGroup, 0)
        }
        setIsGrouping(false);
        setCurrentGroup(null);
    };

    const logGroups = () => {
        console.log("Current Groups:", groups);
        groups.forEach((group, index) => {
            if (group && group.userData && group.userData.color !== undefined) {
                exportGroupToSTL(group, index);
            } else {
                console.log(`Group ${index + 1} is missing color data.`);
            }
        });
    };
    

    return (
        <div>
            <Toolbar 
                startGrouping={startGrouping} 
                doneGrouping={doneGrouping} 
                exportPieces={logGroups}
            />
            <div ref={sceneRef} />
        </div>
    );
};

export default WorldScene;
