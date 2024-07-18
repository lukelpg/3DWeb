import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// import Skybox from './scenes/skybox';
import Terrain from './scenes/terrain';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SpotLight from './lights/spotlight';
import Cube from './objects/cube';


const WorldScene = () => {
    const sceneRef = useRef(null);

    useEffect(() => {
        // Make World Scene
        const scene = new THREE.Scene();

        // Set Up Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
        camera.position.set( 4, 5, 11 );
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


        // // Add ground
        // const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
        // groundGeometry.rotateX(-Math.PI / 2);
        // const groundMaterial = new THREE.MeshStandardMaterial({
        // color: 0xffffff,
        // side: THREE.DoubleSide
        // });
        // const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        // groundMesh.receiveShadow = true; // Allow ground to receive shadows
        // scene.add(groundMesh);

        // // Add sun light from above (spotlight)
        // const spotlight = new THREE.SpotLight(0xffffff, 10000, 100, 0.2, 0.5);
        // spotlight.position.set(0, 25, 0);
        // scene.add(spotlight);

        // spotlight.castShadow = true;
        // spotlight.shadow.mapSize.width = 1024;
        // spotlight.shadow.mapSize.height = 1024;
        // spotlight.shadow.camera.near = 0.5;
        // spotlight.shadow.camera.far = 500;

        // Add ambient light
        // const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
        // scene.add(ambientLight);


        // Setup skybox
        // const skybox = new Skybox();
        // scene.add(skybox);

        // Setup terrain
        const terrain = new Terrain();
        scene.add(terrain);

        // Add spotlight
        const spotLight = new SpotLight();
        scene.add(spotLight);

        const cube = new Cube();
        scene.add(cube);


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

            // skybox.dispose();
            terrain.dispose();
            spotLight.dispose();
            cube.dispose();
        };
    }, []);

    return <div ref={sceneRef} />;
};

export default WorldScene;
