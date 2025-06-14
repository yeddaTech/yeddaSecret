import { initScene } from './model.js';
import { setupUI } from './ui.js';
import { initControls } from './controls.js';

// Esporta le variabili globali
export let scene, camera, renderer, controls;

// Inizializza l'applicazione
function init() {
    ({ scene, camera, renderer } = initScene());
    controls = initControls(camera, renderer);
    setupUI();
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();
