import * as THREE from 'three';

class SpotLight extends THREE.Object3D {
    constructor() {
        super();

        // Create the spotlight
        const spotLight = new THREE.SpotLight(0xffffff, 5000, 100, 0.2, 0.5);
        spotLight.position.set(50, 50, 50);
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 0.1;
        spotLight.decay = 2;
        spotLight.distance = 400;

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 0.5;
        spotLight.shadow.camera.far = 500;

        // Add spotlight to this Object3D
        this.add(spotLight);

        // Optionally add a helper to visualize the spotlight
        const spotLightHelper = new THREE.SpotLightHelper(spotLight);
        this.add(spotLightHelper);
    }

    dispose() {
        // Dispose of the spotlight and helper
        this.children.forEach(child => {
            if (child.dispose) {
                child.dispose();
            }
        });
    }
}

export default SpotLight;
