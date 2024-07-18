import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// import Skybox from './scenes/skybox';
import Terrain from './scenes/terrain';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SpotLight from './lights/spotlight';
import Cube from './objects/cube';
import Model from './objects/model';
import Frame from './objects/coodFrame';


const WorldScene = () => {
    const sceneRef = useRef(null);

    useEffect(() => {
        // Make World Scene
        const scene = new THREE.Scene();

        // Set Up Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
        camera.position.set( 8, 10, 22 );
        camera.lookAt( 0, 0, 0 );

        // Set Up Renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000); // for clearing screen to black before use
        renderer.setPixelRatio(window.devicePixelRatio); // for appropeiate rendering on different devices
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // softer shadows
        sceneRef.current.appendChild(renderer.domElement);

        // Set up OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = true; // Enable panning (middle click and drag)
        controls.update(); // Initial update of controls


        
        // Setup skybox
        // const skybox = new Skybox();
        // scene.add(skybox);

        // Setup terrain
        const terrain = new Terrain();
        scene.add(terrain);

        // Add spotlight
        const spotLight = new SpotLight();
        scene.add(spotLight);

        // Add global coodinate frame
        const coodFrame = new Frame();
        scene.add(coodFrame);

        const cube = new Cube();
        scene.add(cube);

        const car = new Model();
        scene.add(car);



        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
    
        animate();


        return () => {

            // Cleanup
            // sceneRef.current.removeChild(renderer.domElement);

            // scene.remove(skybox);
            scene.remove(terrain);
            scene.remove(spotLight);
            scene.remove(cube);
            scene.remove(coodFrame);

            // skybox.dispose();
            terrain.dispose();
            spotLight.dispose();
            cube.dispose();
            coodFrame.dispose();
        };
    }, []);

    return <div ref={sceneRef} />;
};

export default WorldScene;
