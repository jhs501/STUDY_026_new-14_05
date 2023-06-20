// createGui.js
import { GUI } from '../lil-gui.module.min.js';

function createGuiForCube(cube) {
    // GUI 생성
    const gui = new GUI();

    // 컨트롤러 추가
    const cubeFolder = gui.addFolder('Cube');
    cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name('Rotation X');
    cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name('Rotation Y');
    cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name('Rotation Z');
    cubeFolder.open();
}

export default createGuiForCube;
