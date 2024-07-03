import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Simple3DScene = () => {
  const containerRef = useRef(null);
  const isMouseDown = useRef(false); // Ref to track mouse button state

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
