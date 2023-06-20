// addPointLight.js
import * as THREE from '../three.module.js';

export default function addPointLight_02(scene) {
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 2, 0);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);  // Helper 
    pointLightHelper.position.set(0, 2, 0);
    scene.add(pointLight, pointLightHelper);
    return pointLight;
}

export const pointLight_02 = new THREE.PointLight(0xffffff, 1, 100);
pointLight_02.position.set(1, 2, 0);
export const pointLightHelper_02 = new THREE.PointLightHelper(pointLight_02);  // Helper 
pointLightHelper_02.position.set(1, 2, 0);


const torusGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
export const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(1, 1, 0);

const torusMaterial_02 = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
export const torus_02 = new THREE.Mesh(torusGeometry, torusMaterial);
torus_02.position.set(2, 1, 0);
