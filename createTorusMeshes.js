// createTorusMeshes.js
import * as THREE from './three.module.js';
import { createMaterial } from './material.js';

export function createTorusMeshes(params, hdrEquirect, texture) {
    const torusGeometry = new THREE.TorusGeometry(25, 10, 32, 64);

    const material = createMaterial(params, hdrEquirect, texture);
    const material_02 = new THREE.MeshPhysicalMaterial( { color: 0xff0000 } );

    const torusMesh = new THREE.Mesh(torusGeometry, material_02);
    const torusMesh_02 = new THREE.Mesh(torusGeometry, material);
    const torusMesh_03 = new THREE.Mesh(torusGeometry, material);

    torusMesh_02.scale.set(5, 5, 10);
    torusMesh_03.scale.set(10, 10, 10);
    torusMesh_03.position.set(0, 0, 0);

    return { torusMesh, torusMesh_02, torusMesh_03 };
}
