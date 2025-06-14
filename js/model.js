import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 3);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1.5, 1);
    scene.add(directionalLight);
    
    return { scene, camera, renderer };
}

export async function loadModel(scene) {
    return new Promise((resolve) => {
        // Sostituisci con il percorso del tuo modello
        const loader = new GLTFLoader();
        loader.load(
            './assets/models/human_body.glb',
            (gltf) => {
                const model = gltf.scene;
                model.scale.set(0.5, 0.5, 0.5);
                scene.add(model);
                resolve();
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
                resolve();
            }
        );
    });
}