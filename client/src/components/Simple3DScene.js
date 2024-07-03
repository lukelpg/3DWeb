import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Simple3DScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Mouse move event listener
    const handleMouseMove = (event) => {
      // Normalize mouse position to [-1, 1] range
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Move cube based on mouse position
      cube.rotation.x = mouseY * 0.5;
      cube.rotation.y = mouseX * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      scene.remove(cube);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default Simple3DScene;
