import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    // Configura controlli...
    return controls;
}

export function setupRaycaster(camera, scene) {
    // Logica per l'interazione con il modello
    // ...
}
