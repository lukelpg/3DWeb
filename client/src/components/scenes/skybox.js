import * as THREE from 'three';

class Skybox extends THREE.Object3D {
    constructor() {
        super();

        // Define the texture paths for each side of the skybox
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            './models/freeSky.jpg'
            // 'path/to/px.jpg', // Right side
            // 'path/to/nx.jpg', // Left side
            // 'path/to/py.jpg', // Top side
            // 'path/to/ny.jpg', // Bottom side
            // 'path/to/pz.jpg', // Front side
            // 'path/to/nz.jpg', // Back side
        ]);

        // Create the skybox material
        const material = new THREE.MeshBasicMaterial({ 
            map: texture, 
            side: THREE.BackSide 
        });

        // Create a box geometry and apply the material
        const geometry = new THREE.BoxGeometry(1000, 1000, 1000);
        const skybox = new THREE.Mesh(geometry, material);

        this.add(skybox);
    }

    dispose() {
        // Dispose of the skybox materials and geometry
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

export default Skybox;
