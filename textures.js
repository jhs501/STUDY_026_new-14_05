import * as THREE from './three.module.js';

export function loadTexture(path, callback) {
    new THREE.TextureLoader().load(path, function (texture) {
        texture.mapping = THREE.UVMapping;
        if (callback) {
            callback(texture);
        }
    });
}
