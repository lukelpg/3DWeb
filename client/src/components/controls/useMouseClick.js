import { useEffect } from 'react';
import * as THREE from 'three';
import Cube from '../objects/cube'; // Adjust the import path if necessary

const useMouseClick = (scene, camera, setBlocks) => {
    useEffect(() => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseClick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            // Log the type and contents of scene.children
            console.log('Scene Children:', scene.children);
            console.log('Type of scene.children:', typeof scene.children);

            // Check if scene.children is an array
            if (Array.isArray(scene.children)) {
                const intersects = raycaster.intersectObjects(scene.children.filter(child => child.cubeMesh));
                
                if (intersects.length > 0) {
                    const intersect = intersects[0];
                    const newBlock = new Cube(); // Create a new cube

                    const clickedBlock = intersect.object;
                    const worldPosition = new THREE.Vector3();
                    clickedBlock.getWorldPosition(worldPosition);

                    const size = 1; // Assuming block size is 1 unit
                    const newPosition = worldPosition.clone();
                    const faceNormal = intersect.face.normal.clone();

                    // Adjust the new block position based on face normal
                    if (faceNormal.equals(new THREE.Vector3(0, 0, 1))) newPosition.z += size; // Front face
                    else if (faceNormal.equals(new THREE.Vector3(0, 0, -1))) newPosition.z -= size; // Back face
                    else if (faceNormal.equals(new THREE.Vector3(0, 1, 0))) newPosition.y += size; // Top face
                    else if (faceNormal.equals(new THREE.Vector3(0, -1, 0))) newPosition.y -= size; // Bottom face
                    else if (faceNormal.equals(new THREE.Vector3(1, 0, 0))) newPosition.x += size; // Right face
                    else if (faceNormal.equals(new THREE.Vector3(-1, 0, 0))) newPosition.x -= size; // Left face

                    newBlock.position.copy(newPosition);
                    scene.add(newBlock);
                    setBlocks(prevBlocks => [...prevBlocks, newBlock]); // Update state with new block
                }
            } else {
                console.error('scene.children is not an array:', scene.children);
            }
        };

        window.addEventListener('click', onMouseClick);
        return () => {
            window.removeEventListener('click', onMouseClick);
        };
    }, [scene, camera, setBlocks]); // Ensure all dependencies are included
};

export default useMouseClick;
