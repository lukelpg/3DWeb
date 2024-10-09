// src/components/SceneInitializer.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Terrain from '../scenes/terrain';
import SpotLight from '../lights/spotlight';
import Cube from '../objects/cube';
import Frame from '../objects/coodFrame';

const initializeScene = (sceneRef, setBlocks) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(8, 10, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    sceneRef.current.appendChild(renderer.domElement);

    const terrain = new Terrain();
    scene.add(terrain);

    const spotLight = new SpotLight();
    scene.add(spotLight);

    const coodFrame = new Frame();
    scene.add(coodFrame);

    const initialCube = new Cube();
    initialCube.position.set(5, 5, 5);
    initialCube.userData = { type: 'cube' };
    initialCube.name = 'initialCube';
    scene.add(initialCube);
    setBlocks([initialCube]);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.update();

    return { scene, camera, renderer };
};

export default initializeScene;
