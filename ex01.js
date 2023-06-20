//ex01.js
import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { RGBELoader } from './RGBELoader.js';
import { createMaterial } from './material.js';
import { createGUI } from './gui.js';
import { onWindowResize, generateTexture, render } from './helper.js';
import { params } from './params.js';
import { init } from './init.js';

export function runEx01() {
    let torusMesh;
    let torusMesh_02;
    let torusMesh_03;

    const hdrEquirect = new RGBELoader()
        .setPath('textures/equirectangular/')
        .load('san_giuseppe_bridge_2k.hdr', function () {
            hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
            const { renderer, camera, scene } = init(hdrEquirect);
            createObjectsAndGUI(renderer, camera, scene);
            render(renderer, scene, camera, torusMesh, params);
        });

    function createObjectsAndGUI(renderer, camera, scene) {
        const torusGeometry = new THREE.TorusGeometry(25, 10, 32, 64);
        const texture = new THREE.CanvasTexture(generateTexture());
        texture.magFilter = THREE.NearestFilter;
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(1, 3.5);
        const material = createMaterial(params, hdrEquirect, texture);
        const material_02 = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });

        torusMesh = new THREE.Mesh(torusGeometry, material_02);
        torusMesh_02 = new THREE.Mesh(torusGeometry, material);
        torusMesh_03 = new THREE.Mesh(torusGeometry, material);
        torusMesh_02.scale.set(5, 5, 10);
        torusMesh_03.scale.set(10, 10, 10);
        torusMesh_03.position.set(0, 0, 0);
        scene.add(torusMesh, torusMesh_02, torusMesh_03);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', () => render(renderer, scene, camera, torusMesh, params));
        controls.minDistance = 10;
        controls.maxDistance = 9999;

        window.addEventListener('resize', () => onWindowResize(camera, renderer, () => render(renderer, scene, camera, torusMesh, params)));

        createGUI(params, material, torusMesh_02, torusMesh_03, () => render(renderer, scene, camera, torusMesh, params));
    }
}
