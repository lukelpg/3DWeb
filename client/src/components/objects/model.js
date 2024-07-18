import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Model extends THREE.Object3D {
    constructor() {
        super();

        const loader = new GLTFLoader().setPath('/models/free_1975_porsche_911_930_turbo/');
        loader.load( 'scene.gltf', (gltf) => {
            const mesh = gltf.scene;
            mesh.position.set(35, 0, 35);
            this.add(mesh);
        });
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

export default Model;