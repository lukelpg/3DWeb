import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const Simple3DScene = () => {
  const containerRef = useRef(null);
  const isMouseDown = useRef(false); // Ref to track mouse button state

  useEffect(() => {
    // Set mouse useable mouse position to zero
    let mouseX = 0;
    let mouseY = 0;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000); // for clearing screen to black before use
    renderer.setPixelRatio(window.devicePixelRatio); // for appropeiate rendering on different devices
    containerRef.current.appendChild(renderer.domElement); // adds renderer to html document

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set( 4, 5, 11 );
    camera.lookAt( 0, 0, 0 );



    // Add ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    groundGeometry.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      side: THREE.DoubleSide
    });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    scene.add(groundMesh);

    // Add sun light from above (spotlight)
    const spotlight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
    spotlight.position.set(0, 25, 0);
    scene.add(spotlight);

    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    spotlight.shadow.camera.near = 0.5;
    spotlight.shadow.camera.far = 500;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    

    // Loading model
    // const loader = new GLTFLoader();

    // loader.load( 'free_1975_porsche_911_930_turbo.glb', function ( gltf ) {

    //   scene.add( gltf.scene );

    // }, undefined, function ( error ) {

    //   console.error( error );

    // } );


    // Cube
    const cubeGeometry = new THREE.BoxGeometry();
    const cubeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xC0C0C0
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // cube.position.z = 3; 
    scene.add(cube);

   

    //Position camera
    // camera.position.z = 2;
    
    // Mouse move event listener
    const handleMouseMove = (event) => {
      // Normalize mouse position to [-1, 1] range
      mouseX = (event.clientX / window.innerWidth) * 3 - 1;
      mouseY = (event.clientY / window.innerHeight) * 3 + 1;

      if (isMouseDown.current) {
        // Move cube based on mouse position only when mouse button is down
        cube.rotation.x = mouseY * 0.75;
        cube.rotation.y = mouseX * 0.75;
      }
    };

    const handleMouseDown = () => {
      isMouseDown.current = true;
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
      scene.remove(cube);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default Simple3DScene;
