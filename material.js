import * as THREE from './three.module.js';

function createMaterial(params, hdrEquirect, texture) {
    const material = new THREE.MeshPhysicalMaterial( {
        color: params.color,
        metalness: params.metalness,
        roughness: params.roughness,
        ior: params.ior,
        alphaMap: texture,
        envMap: hdrEquirect,
        envMapIntensity: params.envMapIntensity,
        transmission: params.transmission, // for glass materials
        specularIntensity: params.specularIntensity,
        specularColor: params.specularColor,
        opacity: params.opacity,
        side: THREE.DoubleSide,
        transparent: true
    } );

    return material;
}

export { createMaterial };
