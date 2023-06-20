// init.js
import * as THREE from './three.module.js';
import { params } from './params.js';

export function init(hdrEquirect) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = params.exposure;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 0, 1200);
    scene.background = hdrEquirect;

    return { renderer, camera, scene };
}
