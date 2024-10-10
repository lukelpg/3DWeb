import * as THREE from 'three';
import Cube from '../objects/cube';

const handleMouseClick = (event, scene, camera, setBlocks, raycaster, isGrouping, currentGroup) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Include blocks from groups in intersection checks
    const intersectableObjects = scene.children.flatMap(child => {
        if (child instanceof THREE.Group) {
            return child.children.filter(c => c.cubeMesh);
        }
        return child.cubeMesh ? [child] : [];
    });

    const intersects = raycaster.intersectObjects(intersectableObjects);

    if (event.button === 0) { // Left click
        if (intersects.length > 0) {
            const intersect = intersects[0];
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

            const newBlockColor = isGrouping && currentGroup ? currentGroup.userData.color : 0x808080;
            const newBlock = new Cube(newBlockColor);

            newBlock.position.copy(newPosition);
            scene.add(newBlock);
            setBlocks(prevBlocks => [...prevBlocks, newBlock]);

            // Add the new block to the current group if grouping is active
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
                    console.log(`Attempting to remove ${blockToRemove.name} from the scene.`);

                    // Check if the block is in the current group
                    if (currentGroup && currentGroup.children.includes(blockToRemove)) {
                        console.log(`Removing ${blockToRemove.name} from current group.`);
                        currentGroup.remove(blockToRemove);
                    }
                    return prevBlocks.filter(block => block !== blockToRemove);
                }
                return prevBlocks;
            });
        }
    }
};

export default handleMouseClick;
