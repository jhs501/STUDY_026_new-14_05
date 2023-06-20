import * as THREE from './three.module.js';
import Stats from './ex05/stats.module.js';
import { GUI } from './lil-gui.module.min.js';
import { OrbitControls } from './OrbitControls.js';
import { EXRLoader } from './EXRLoader.js';
import { createDomeBackground } from './ex05/domeBackground.js';

export function runEx05() {
    const params = {
        envMap: 'EXR',
        roughness: 0.0,
        metalness: 0.0,
        lightMapIntensity: 0.0, 
        opacity: 1.0,
        clearCoat: 1.0,
        emissiveIntensity: 1.0,
        debug: false,
        exposure: 1.0,
    };
    
    let container, stats;
    let camera, scene, renderer, controls;
    let torusMesh, planeMesh;
    let pngCubeRenderTarget, exrCubeRenderTarget;
    let pngBackground, exrBackground;
    
    init();
    animate();
    
    function init() {
    
        container = document.createElement( 'div' );
        document.body.appendChild( container );
    
        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set( 120, 0, 0 );
    
        scene = new THREE.Scene();
    
    
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
    
        container.appendChild( renderer.domElement );
    
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
    
        let geometry = new THREE.TorusGeometry(10,3, 24, 32);
        let material = new THREE.MeshPhysicalMaterial( {
            color: 0x999999,
            metalness: params.metalness,
            roughness: params.roughness,
            envMapIntensity: 1.0,
            clearCoat: params.clearCoat,
            emissiveIntensity: params.emissiveIntensity,
            transparent: true, 
        } );
    
        torusMesh = new THREE.Mesh( geometry, material );
        scene.add( torusMesh );
    
        let sphereGeometry = new THREE.SphereGeometry(5, 32, 32); 
        let sphereMaterial = new THREE.MeshPhysicalMaterial({ metalness: params.metalness, roughness: params.roughness, envMapIntensity: 1.0 });
        let sphereMesh = new THREE.Mesh(sphereGeometry, material);
        sphereMesh.position.z = 30; 
        scene.add(sphereMesh);
    
        let boxGeometry = new THREE.BoxGeometry(10, 10, 10); 
        let boxMaterial = new THREE.MeshPhysicalMaterial({ metalness: params.metalness, roughness: params.roughness, envMapIntensity: 1.0 });
        let boxMesh = new THREE.Mesh(boxGeometry, material);
        let boxMesh_02 = new THREE.Mesh(boxGeometry, material);
        let boxMesh_03 = new THREE.Mesh(boxGeometry, material);
        boxMesh.position.z = -30; 
        boxMesh_02.position.set(-100, 0, 0);
        boxMesh_02.scale.set(0.1, 20, 20);
        boxMesh_03.position.set(0, -30, 0);
        boxMesh_03.scale.set(20, 0.1, 20);
        scene.add(boxMesh);
        scene.add(boxMesh_02);
        scene.add(boxMesh_03);
    
        geometry = new THREE.PlaneGeometry( 200, 200 );
        material = new THREE.MeshPhysicalMaterial();
    
        planeMesh = new THREE.Mesh( geometry, material );
        planeMesh.position.y = - 50;
        planeMesh.rotation.x = - Math.PI * 0.5;
    
        new THREE.TextureLoader().load('./black_white_03.png', function (texture) {
            texture.mapping = THREE.UVMapping;
            torusMesh.material.metalnessMap = texture;
              torusMesh.material.needsUpdate = true;
        });
    
        new THREE.TextureLoader().load('./black_white_02.png', function (texture) { 
            texture.mapping = THREE.UVMapping;
            torusMesh.material.roughnessMap = texture; // roughnessMap 추가
            torusMesh.material.needsUpdate = true;
        });
    
        new THREE.TextureLoader().load('./black_white_03.png', function (texture) { 
            texture.mapping = THREE.UVMapping;
            torusMesh.material.opacityMap = texture; // opacityMap 추가
            torusMesh.material.needsUpdate = true;
        });
    
        new THREE.TextureLoader().load('./black_white_03.png', function (texture) {
            torusMesh.material.lightMap = texture;
            torusMesh.material.needsUpdate = true;
        });
    
        new THREE.TextureLoader().load('./black_white_03.png', function (texture) {
            texture.mapping = THREE.UVMapping;
            torusMesh.material.clearCoatMap = texture; // clearCoatMap 추가
            torusMesh.material.needsUpdate = true;
        });
    
        new THREE.TextureLoader().load('./black_white_03.png', function (texture) {
            texture.mapping = THREE.UVMapping;
            torusMesh.material.emissiveMap = texture; // emissiveMap 추가
            torusMesh.material.needsUpdate = true;
        });
    
    
        scene.add( planeMesh );
    
        THREE.DefaultLoadingManager.onLoad = function ( ) {
    
            pmremGenerator.dispose();
        };
    
        new EXRLoader().load( './piz_compressed.exr', function ( texture ) {
    
            texture.mapping = THREE.EquirectangularReflectionMapping;
    
            exrCubeRenderTarget = pmremGenerator.fromEquirectangular( texture );
            exrBackground = texture;
    
            createDomeBackground(scene);
        } );
    
        new THREE.TextureLoader().load( './sky2.jpg', function ( texture ) {
    
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;
    
            pngCubeRenderTarget = pmremGenerator.fromEquirectangular( texture );
            pngBackground = texture;
    
        } );
    
        createDomeBackground(scene);
    
        const pmremGenerator = new THREE.PMREMGenerator( renderer );
        pmremGenerator.compileEquirectangularShader();
    
        stats = new Stats();
        container.appendChild( stats.dom );
    
        controls = new OrbitControls( camera, renderer.domElement );
        controls.minDistance = 50;
        controls.maxDistance = 300;
    
        window.addEventListener( 'resize', onWindowResize );
    
        const gui = new GUI();
    
        gui.add( params, 'envMap', [ 'EXR', 'PNG' ] );
        gui.add( params, 'roughness', 0, 1, 0.01 );
        gui.add( params, 'metalness', 0, 1, 0.01 );
        gui.add( params, 'lightMapIntensity', 0, 2, 0.01); 
        gui.add( params, 'opacity', 0, 1, 0.01 ); 
        gui.add( params, 'clearCoat', 0, 1, 0.01);
        gui.add( params, 'emissiveIntensity', 0, 2, 0.01);
        gui.add( params, 'debug', false );
        gui.open();
        gui.add( params, 'exposure', 0, 2, 0.01 );
    
    }
    
    function onWindowResize() {
    
        const width = window.innerWidth;
        const height = window.innerHeight;
    
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    
        renderer.setSize( width, height );
    
    }
    
    function animate() {
    
        requestAnimationFrame( animate );
    
        stats.begin();
        render();
        stats.end();
    
    }
    
    function render() {
    
        torusMesh.material.roughness = params.roughness;
        torusMesh.material.metalness = params.metalness;
        torusMesh.material.opacity = params.opacity;
        torusMesh.material.lightMapIntensity = params.lightMapIntensity;
        torusMesh.material.clearCoat = params.clearCoat; 
        torusMesh.material.emissiveIntensity = params.emissiveIntensity;
    
        let newEnvMap = torusMesh.material.envMap;
        let background = scene.background;
    
        switch ( params.envMap ) {
    
            case 'EXR':
                newEnvMap = exrCubeRenderTarget ? exrCubeRenderTarget.texture : null;
                background = exrBackground;
                break;
            case 'PNG':
                newEnvMap = pngCubeRenderTarget ? pngCubeRenderTarget.texture : null;
                background = pngBackground;
                break;
    
        }
    
        if ( newEnvMap !== torusMesh.material.envMap ) {
    
            torusMesh.material.envMap = newEnvMap;
            torusMesh.material.needsUpdate = true;
    
            planeMesh.material.map = newEnvMap;
            planeMesh.material.needsUpdate = true;
    
        }
    
        torusMesh.rotation.y += 0.005;
        planeMesh.visible = params.debug;
    
        scene.background = background;
        renderer.toneMappingExposure = params.exposure;
        renderer.physicallyCorrectLights = true;
    
    
        renderer.render( scene, camera );
    }
}