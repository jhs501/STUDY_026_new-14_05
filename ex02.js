//ex02.js
import * as THREE from './three.module.js';
import { GUI } from './lil-gui.module.min.js';
import { OrbitControls } from './OrbitControls.js';
import addPointLight_02 from './ex02/Light.js';
import { pointLight_02, pointLightHelper_02, torus, torus_02 } from './ex02/Light.js';

export function runEx02() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    addPointLight_02(scene);
    scene.add(pointLight_02, pointLightHelper_02, torus, torus_02);

    camera.position.z = 5;

    const gui = new GUI();
    const rotationSpeeds = { x: 0.01, y: 0.01 };
    gui.add(rotationSpeeds, 'x', -0.1, 0.5).name('Rotation Speed X');
    gui.add(rotationSpeeds, 'y', -0.1, 0.5).name('Rotation Speed Y');

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += rotationSpeeds.x;
        cube.rotation.y += rotationSpeeds.y;

        renderer.render(scene, camera);
    }

    animate();
}
