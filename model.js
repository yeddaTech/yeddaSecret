import * as THREE from 'three';

export function initScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // Configura scena, luci e modello
    // ...
    
    return { scene, camera, renderer };
}

export function loadModel(scene) {
    // Logica per caricare il modello 3D
    // ...
}
