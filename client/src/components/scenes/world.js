import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import Skybox from './Skybox';
import Terrain from './Terrain';


const WorldScene = () => {
    const sceneRef = useRef(null);

    useEffect(() => {
        const scene = sceneRef.current;

        // Setup skybox
        const skybox = new Skybox();
        scene.add(skybox);

        // Setup terrain
        const terrain = new Terrain();
        scene.add(terrain);

        return () => {
            // Cleanup
            scene.remove(skybox);
            scene.remove(terrain);
        };
    }, []);

    return <group ref={sceneRef} />;
};

export default WorldScene;
