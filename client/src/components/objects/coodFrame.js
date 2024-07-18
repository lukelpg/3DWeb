import * as THREE from 'three';

class Frame extends THREE.Object3D {
    constructor(size=5) {
        super();

        // Create an AxesHelper
        const axesHelper = new THREE.AxesHelper(size);

        // Add the AxesHelper to this Object3D
        this.add(axesHelper);
    }

    dispose() {
        // Dispose of the cube material and geometry
        this.children.forEach(child => {
            if (child.dispose) {
                child.dispose();
            }
        });
    }
}

export default Frame;