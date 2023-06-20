import { GUI } from './lil-gui.module.min.js';
import { loadTexture } from './textures.js';

export function createGUI(params, material, torusMesh_02, torusMesh_03, render) {
    const gui = new GUI();

    gui.add(params, 'envMap', ['EXR', 'PNG']);

    gui.add(params, 'roughness', 0, 1, 0.01);

    gui.addColor(params, 'color')
        .onChange(function () {
            material.color.set(params.color);
            render();
        });

    gui.add(params, 'transmission', 0, 1, 0.01)
        .onChange(function () {
            material.transmission = params.transmission;
            render();
        });

    gui.add(params, 'opacity', 0, 1, 0.01)
        .onChange(function () {
            material.opacity = params.opacity;
            render();
        });

    params.useMetalnessMap = true;

    gui.add(params, 'metalness', 0, 1, 0.01)
        .onChange(function () {
            if (!params.useMetalnessMap) {
                [torusMesh_02, torusMesh_03].forEach(function (meshItem) {
                    meshItem.material.metalness = params.metalness;
                    meshItem.material.needsUpdate = true;
                });
                render();
            }
        });

    gui.add(params, 'useMetalnessMap')
        .name('Use Metalness Map')
        .onChange(function () {
            if (params.useMetalnessMap) {
                loadTexture('./black_white_03.png', function (texture) {
                    material.metalnessMap = texture;
                    material.needsUpdate = true;
                    render();
                });
            }
        });

    return gui;
}
