import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const Simple3DScene = () => {
  const containerRef = useRef(null);
  const isMouseDown = useRef(false); // Ref to track mouse button state

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    // camera.position.set( 0, 0, 100 );
    // camera.lookAt( 0, 0, 0 );


    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);


    const loader = new GLTFLoader();

    loader.load( './components/models/free_1975_porsche_911_930_turbo.glb', function ( gltf ) {

      scene.add( gltf.scene );

    }, undefined, function ( error ) {

      console.error( error );

    } );


    // Cube
    const cubeGeometry = new THREE.BoxGeometry();
    const cubeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xC0C0C0
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    //Position camera
    camera.position.z = 2;
    
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
