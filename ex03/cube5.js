// cube5.js
import * as THREE from '../three.module.js';

const geometry5 = new THREE.BoxGeometry(5, 10, 2);
const material5 = new THREE.MeshPhysicalMaterial({ color: 0x55ff00 });
const cube5 = new THREE.Mesh(geometry5, material5);
cube5.castShadow = true;
cube5.receiveShadow = true
cube5.position.y = 2;
cube5.position.z = -5;

export default cube5;

