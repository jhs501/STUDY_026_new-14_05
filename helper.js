import * as THREE from './three.module.js';

export function onWindowResize(camera, renderer, render) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render();
}

export function generateTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, 2, 8);
    return canvas;
}

export function render(renderer, scene, camera, torusMesh, params) {
    renderer.render(scene, camera);
    torusMesh.material.roughness = params.roughness;
    torusMesh.material.metalness = params.metalness;
}
