// src/components/SceneInitializer.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Terrain from '../scenes/terrain';
import SpotLight from '../lights/spotlight';
import Cube from '../objects/cube';
import Frame from '../objects/coodFrame';

const BLOCK_SIZE = 1; // Size of each cube
const GRID_SIZE = 16; // Width and Height of the grid
const MAX_HEIGHT = 10; // Maximum height for the hills

const initializeScene = (sceneRef, setBlocks) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(18, 8, 19);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    sceneRef.current.appendChild(renderer.domElement);

    // Add Terrain
    const terrain = new Terrain();
    scene.add(terrain);

    // Add SpotLight
    const spotLight = new SpotLight();
    scene.add(spotLight);

    // Add Ambient Light
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
    scene.add(ambientLight);

    // Add Coordinate Frame
    const coodFrame = new Frame();
    scene.add(coodFrame);

    // Function to create a smooth hill-like terrain with filled bases
    const createSmoothHillTerrain = () => {
        const blocks = [];
        const heightMap = [];

        // Generate a heightmap with smoother transitions
        for (let x = 0; x < GRID_SIZE; x++) {
            heightMap[x] = [];
            for (let z = 0; z < GRID_SIZE; z++) {
                // Create a base height with some randomness
                let baseHeight = Math.floor(Math.random() * MAX_HEIGHT);
                heightMap[x][z] = baseHeight; // Initialize base height
            }
        }

        // Apply smoothing multiple times
        for (let iteration = 0; iteration < 5; iteration++) { // Increase iterations for smoother hills
            const newHeightMap = JSON.parse(JSON.stringify(heightMap)); // Deep copy heightMap

            for (let x = 0; x < GRID_SIZE; x++) {
                for (let z = 0; z < GRID_SIZE; z++) {
                    const neighbors = [
                        heightMap[x - 1]?.[z] || 0, // Left
                        heightMap[x + 1]?.[z] || 0, // Right
                        heightMap[x][z - 1] || 0, // Front
                        heightMap[x][z + 1] || 0, // Back
                    ];
                    const averageHeight = (neighbors.reduce((sum, h) => sum + h, 0) + heightMap[x][z]) / (neighbors.length + 1);
                    newHeightMap[x][z] = Math.floor(averageHeight);
                }
            }
            heightMap.splice(0, heightMap.length, ...newHeightMap); // Update heightMap
        }

        // Create cubes based on the heightmap and fill in below
        for (let x = 0; x < GRID_SIZE; x++) {
            for (let z = 0; z < GRID_SIZE; z++) {
                const height = heightMap[x][z];
                
                // Create blocks from ground level up to the height
                for (let h = 0; h <= height; h++) {
                    const cube = new Cube();
                    cube.position.set(x * BLOCK_SIZE, h, z * BLOCK_SIZE);
                    cube.userData = { type: 'cube' };
                    cube.name = `cube_${x}_${z}_${h}`;
                    scene.add(cube);
                    blocks.push(cube);
                }
            }
        }
        return blocks;
    };

    // Create and set blocks
    const blocks = createSmoothHillTerrain();
    setBlocks(blocks);

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.update();

    return { scene, camera, renderer };
};

export default initializeScene;
