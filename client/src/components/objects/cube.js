import * as THREE from 'three';

class Cube extends THREE.Object3D {
    constructor() {
        super();

        // Create a box geometry
        const geometry = new THREE.BoxGeometry(5, 5, 5);

        // Create a basic material and set its color
        const material = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });

        // Create a mesh combining the geometry and material
        const cube = new THREE.Mesh(geometry, material);


        cube.castShadow = true;
        cube.receiveShadow = true;

        cube.position.set(0, 3, -3);

        // Add the cube mesh to this Object3D
        this.add(cube);
    }

    dispose() {
        // Dispose of the cube material and geometry
        this.children.forEach(child => {
            if (child.material) {
                child.material.dispose();
            }
            if (child.geometry) {
                child.geometry.dispose();
            }
        });
    }
}

export default Cube;
