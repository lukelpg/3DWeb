import * as THREE from 'three';

class Cube extends THREE.Object3D {
    constructor() {
        super();

        // Create a box geometry
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        // Create a basic material and set its color
        const material = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });

        // Create a mesh combining the geometry and material
        this.cubeMesh = new THREE.Mesh(geometry, material); // Store mesh in a property

        this.cubeMesh.castShadow = true;
        this.cubeMesh.receiveShadow = true;

        this.userData.type = 'cube';

        // Add the cube mesh to this Object3D
        this.add(this.cubeMesh);
    }

    dispose() {
        // Dispose of the cube material and geometry
        this.cubeMesh.material.dispose();
        this.cubeMesh.geometry.dispose();
    }
}

export default Cube;
