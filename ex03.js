//ex03.js
import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { GUI } from './lil-gui.module.min.js';
import cube5 from './ex03/cube5.js';
import createGuiForCube from './ex03/createGui.js';

export function runEx03() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true; 
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    const controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.set(0,0,-2);
    const group = new THREE.Group();
    group.add(cube,cube5);
    scene.add(group); 

    camera.position.x = -5;
    camera.position.y = 5;
    camera.position.z = 5;
    camera.lookAt(0,0,0);

    // GUI 생성
    const gui = new GUI();
    createGuiForCube(group, gui);

    // Light 추가 함수
    function addPointLight() {
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(0, 0, 0);
        pointLight.castShadow = true;
        const pointLightHelper = new THREE.PointLightHelper(pointLight);  // Helper 
        scene.add(pointLight, pointLightHelper);
        return pointLight;
    }

    function addDirectionalLight() {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 0, 0);
        directionalLight.castShadow = true;
        const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);  
        scene.add(directionalLight, directionalLightHelper);
        return directionalLight;
    }

    const pointLight_05 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight_05.position.set(0, 4, 0);
    scene.add(pointLight_05);

    // Light GUI 생성 함수
    function createGuiForLight(light) {
        const lightFolder = gui.addFolder(`Point Light ${light.id}`);
        lightFolder.add(light.position, 'x', -10, 10).name('X');
        lightFolder.add(light.position, 'y', -10, 10).name('Y');
        lightFolder.add(light.position, 'z', -10, 10).name('Z');
        lightFolder.addColor(new function() {
            this.color = '#' + light.color.getHexString();
        }, 'color').onChange(function (value) {
            light.color.set(value);
        });
        lightFolder.add(light, 'intensity', 0, 2).name('Intensity'); // Add Intensity control
        lightFolder.add(light, 'castShadow').name('Cast Shadow');  // Add Shadow switch
        lightFolder.open();
        return lightFolder;
    }

    function addPointLightAndGui() {
        const light = addPointLight();
        createGuiForLight(light);
    }

    function createGuiForDirectionalLight(light) {
        const lightFolder = gui.addFolder(`Directional Light ${light.id}`);
        lightFolder.add(light.position, 'x', -10, 10).name('X');
        lightFolder.add(light.position, 'y', -10, 10).name('Y');
        lightFolder.add(light.position, 'z', -10, 10).name('Z');
        lightFolder.addColor(new function() {
            this.color = '#' + light.color.getHexString();
        }, 'color').onChange(function (value) {
            light.color.set(value);
        });
        lightFolder.add(light, 'intensity', 0, 2).name('Intensity'); // Add Intensity control
        lightFolder.open();
        return lightFolder;
    }
    
    function addDirectionalLightAndGui() {
        const light = addDirectionalLight();
        createGuiForDirectionalLight(light);
    }

    // Light 추가 버튼
    gui.add({Add_Point_Light: addPointLightAndGui}, 'Add_Point_Light').name('Add_Point_Light');
    gui.add({Add_Directional_Light: addDirectionalLightAndGui}, 'Add_Directional_Light').name('Add Directional Light');


    function animate() {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    }

    animate();
}
