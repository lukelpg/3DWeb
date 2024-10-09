// src/components/MouseEvents.js
import * as THREE from 'three';
import Cube from '../objects/cube';

const handleMouseClick = (event, scene, camera, setBlocks, raycaster, isGrouping, currentGroup) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children.filter(child => child.cubeMesh));

    if (event.button === 0) { // Left click
        if (intersects.length > 0) {
            const intersect = intersects[0];
            const newBlock = new Cube();
            const clickedBlock = intersect.object;
            const worldPosition = new THREE.Vector3();
            clickedBlock.getWorldPosition(worldPosition);

            const size = 1;
            const newPosition = worldPosition.clone();
            const faceNormal = intersect.face.normal.clone();

            // Adjust new block position based on face normal
            if (faceNormal.equals(new THREE.Vector3(0, 0, 1))) newPosition.z += size;
            else if (faceNormal.equals(new THREE.Vector3(0, 0, -1))) newPosition.z -= size;
            else if (faceNormal.equals(new THREE.Vector3(0, 1, 0))) newPosition.y += size;
            else if (faceNormal.equals(new THREE.Vector3(0, -1, 0))) newPosition.y -= size;
            else if (faceNormal.equals(new THREE.Vector3(1, 0, 0))) newPosition.x += size;
            else if (faceNormal.equals(new THREE.Vector3(-1, 0, 0))) newPosition.x -= size;

            newBlock.position.copy(newPosition);
            scene.add(newBlock);

            setBlocks(prevBlocks => [...prevBlocks, newBlock]);

            // Add to current group if in grouping mode
            if (isGrouping && currentGroup) {
                currentGroup.add(newBlock);
            }
        }
    } else if (event.button === 2) { // Right click
        if (intersects.length > 0) {
            const clickedBlock = intersects[0].object;
            const worldPosition = new THREE.Vector3();
            clickedBlock.getWorldPosition(worldPosition);

            setBlocks(prevBlocks => {
                const blockToRemove = prevBlocks.find(block => {
                    const blockPosition = new THREE.Vector3();
                    block.getWorldPosition(blockPosition);
                    return blockPosition.equals(worldPosition);
                });

                if (blockToRemove) {
                    scene.remove(blockToRemove);
                    if (currentGroup && currentGroup.children.includes(blockToRemove)) {
                        currentGroup.remove(blockToRemove); // Remove from group if applicable
                    }
                    return prevBlocks.filter(block => block !== blockToRemove);
                }
                return prevBlocks;
            });
        }
    }
};

export default handleMouseClick;
