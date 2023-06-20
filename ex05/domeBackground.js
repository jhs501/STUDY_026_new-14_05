//domeBackground.js
import * as THREE from "../three.module.js";
import { Water } from './Water.js';

export function createDomeBackground(scene) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./sky2.jpg');
    scene.background = texture;

    // Water 효과 추가
    const domeGeometry = new THREE.SphereGeometry(400, 400, 400);
    const domeMaterial = new THREE.MeshBasicMaterial({ color: 0x3399ff });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.y = -10; // 원하는 위치로 조정
    scene.add(dome);

    const waterGeometry = new THREE.CircleGeometry(200, 32);
    const water = new Water(waterGeometry, {
        color: 0x3399ff,
        scale: 4,
        flowDirection: new THREE.Vector2(1000, 1000),
        textureWidth: 1024,
        textureHeight: 1024
    });
    water.position.y = -30; // 원하는 위치로 조정
    water.rotation.x = -Math.PI / 2; // 바닥으로 배치하기 위해 회전
    water.receiveShadow = true;
    scene.add(water);
}
