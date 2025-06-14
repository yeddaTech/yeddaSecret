import * as THREE from 'three';

export function setupUI() {
    document.getElementById('resetBtn').addEventListener('click', resetCamera);
    document.getElementById('wireframeBtn').addEventListener('click', toggleWireframe);
    
    window.addEventListener('resize', onWindowResize);
}

function resetCamera() {
    camera.position.set(0, 1.5, 3);
    controls.target.set(0, 0, 0);
    controls.update();
    document.getElementById('info').style.display = 'none';
}

function toggleWireframe() {
    scene.traverse(function(child) {
        if (child.isMesh) {
            child.material.wireframe = !child.material.wireframe;
        }
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}