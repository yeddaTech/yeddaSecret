import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

export function initControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    return controls;
}

export function setupRaycaster(camera, scene) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object.name && object.name !== '') {
                zoomToPart(object, camera, controls);
                document.getElementById('info').style.display = 'block';
                document.getElementById('info').textContent = `Hai cliccato su: ${object.name}`;
            }
        }
    });
}

function zoomToPart(object, camera, controls) {
    const bbox = new THREE.Box3().expandByObject(object);
    const center = bbox.getCenter(new THREE.Vector3());
    const size = bbox.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let distance = Math.abs(maxDim / Math.sin(fov / 2)) * 1.5;
    
    controls.target.copy(center);
    camera.position.copy(center.clone().add(new THREE.Vector3(0, 0, distance)));
    controls.update();
}