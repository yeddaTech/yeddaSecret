import { initScene, loadModel } from './model.js';
import { initControls, setupRaycaster } from './controls.js';
import { setupUI } from './ui.js';

export let scene, camera, renderer, controls;

function init() {
    ({ scene, camera, renderer } = initScene());
    controls = initControls(camera, renderer);
    setupUI();
    
    loadModel(scene).then(() => {
        document.getElementById('loading').style.display = 'none';
        setupRaycaster(camera, scene);
    });
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();