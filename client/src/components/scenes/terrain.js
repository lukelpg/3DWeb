import * as THREE from 'three';

class Terrain extends THREE.Object3D {
    constructor() {
        super();

        // Create geometry (e.g., plane)
        const geometry = new THREE.PlaneGeometry(1000, 1000);
        geometry.rotateX(-Math.PI / 2);
        
        // Create material (e.g., basic material)
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x808080, 
            // wireframe: true 
        });

        const terrain = new THREE.Mesh(geometry, material);


        // Position the terrain (optional)
        terrain.position.y = -0.5; // Adjust as per your scene

        // Enable the terrain to receive shadows
        terrain.receiveShadow = true;

        // Add the terrain mesh to this Object3D
        this.add(terrain);
    }

    // Optionally implement a dispose method to clean up resources
    dispose() {
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

export default Terrain;
