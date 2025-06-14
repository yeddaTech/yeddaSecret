// Variabili globali
let scene, camera, renderer, controls, model;

// Annotazioni per gli organi
const organInfo = {
    'Heart': 'Il cuore pompa 5-6 litri di sangue al minuto',
    'Brain': 'Il cervello contiene circa 86 miliardi di neuroni',
    'Lung': 'I polmoni permettono la respirazione',
    'Stomach': 'Lo stomaco digerisce il cibo',
    'Liver': 'Il fegato filtra le tossine dal sangue'
};

// Inizializzazione
function init() {
    // Creazione scena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 3);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Luci
    const light = new THREE.HemisphereLight(0xffffff, 0x444422);
    scene.add(light);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Controlli
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Carica modello
    loadModel();

    // Eventi
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('click', onClick);

    // UI
    document.getElementById('resetBtn').onclick = resetCamera;
    document.getElementById('wireframeBtn').onclick = toggleWireframe;

    // Animazione
    animate();
}

// Caricamento modello
function loadModel() {
    const loader = new THREE.GLTFLoader();
    loader.load(
        'assets/models/body.glb',
        function(gltf) {
            model = gltf.scene;
            model.scale.set(0.5, 0.5, 0.5);
            scene.add(model);
            document.getElementById('loading').style.display = 'none';
        },
        undefined,
        function(error) {
            console.error('Errore caricamento modello:', error);
            createSimpleBody(); // Fallback se il modello non carica
        }
    );
}

// Creazione corpo semplificato (fallback)
function createSimpleBody() {
    const group = new THREE.Group();
    
    // Torso
    const torso = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 0.5),
        new THREE.MeshPhongMaterial({ color: 0xffccaa, transparent: true, opacity: 0.8 })
    );
    torso.position.y = 1;
    group.add(torso);

    // Testa
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.3),
        new THREE.MeshPhongMaterial({ color: 0xffccaa })
    );
    head.position.y = 2.3;
    group.add(head);

    // Organi (semplici sfere)
    const heart = createOrgan('Heart', 0xff0000, [0, 1.2, 0.3], 0.15);
    const brain = createOrgan('Brain', 0xffff00, [0, 2.2, 0], 0.25);
    const lung1 = createOrgan('Lung', 0x00ff00, [0.3, 1.5, 0.2], 0.2);
    const lung2 = createOrgan('Lung', 0x00ff00, [-0.3, 1.5, 0.2], 0.2);
    
    group.add(heart, brain, lung1, lung2);
    scene.add(group);
    document.getElementById('loading').style.display = 'none';
}

function createOrgan(name, color, position, size) {
    const organ = new THREE.Mesh(
        new THREE.SphereGeometry(size),
        new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.9 })
    );
    organ.position.set(...position);
    organ.name = name;
    return organ;
}

// Gestione click
function onClick(event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.name && organInfo[object.name]) {
            showInfo(object.name, organInfo[object.name]);
            zoomToObject(object);
        }
    }
}

// Zoom sull'oggetto
function zoomToObject(object) {
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim * 2;
    
    controls.target.copy(center);
    camera.position.copy(center.clone().add(new THREE.Vector3(0, 0, distance)));
}

// Mostra informazioni
function showInfo(title, text) {
    const info = document.getElementById('info');
    info.innerHTML = `<h3>${title}</h3><p>${text}</p>`;
    info.style.display = 'block';
}

// Reset camera
function resetCamera() {
    camera.position.set(0, 1.5, 3);
    controls.target.set(0, 0, 0);
    document.getElementById('info').style.display = 'none';
}

// Toggle wireframe
function toggleWireframe() {
    scene.traverse(child => {
        if (child.isMesh) {
            child.material.wireframe = !child.material.wireframe;
        }
    });
}

// Resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animazione
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Avvia tutto
init();
