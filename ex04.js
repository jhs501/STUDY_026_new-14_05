import * as THREE from './three.module.js';
import { GUI } from './lil-gui.module.min.js';
import { OrbitControls } from './OrbitControls.js';
import { TransformControls } from './TransformControls.js';
import { RectAreaLightHelper } from './RectAreaLightHelper.js';

export function runEx04() {
    const scene = new THREE.Scene();
    let cameraPersp, currentCamera;
    let renderer, control, orbit;
    let cube;
    let aspect = window.innerWidth / window.innerHeight;


    cameraPersp = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    currentCamera = cameraPersp
    currentCamera.position.x = -3;
    currentCamera.position.y = 3;
    currentCamera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true; 
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 큐브 생성
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 실린더 생성
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x5555ff });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.x = 2; 
    scene.add(cylinder);

    // 토러스 생성
    const torusGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.x = -2; 
    scene.add(torus);

    //plane 생성
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const material1 = new THREE.MeshStandardMaterial({ color: 'white' });
    const plane = new THREE.Mesh(planeGeometry, material1);
    plane.position.y = -1;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    // Light 생성
    const ambientLight = new THREE.AmbientLight('white', 0.1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('white', 0.1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const light = new THREE.RectAreaLight('orange', 10, 4, 4);
    light.position.y = -2;
    light.position.z = 4;
    scene.add(light);
    const lightHelper = new RectAreaLightHelper(light);
    scene.add(lightHelper);

    // controls 생성
    orbit = new OrbitControls(currentCamera, renderer.domElement);
    control = new TransformControls(currentCamera, renderer.domElement);
    control.attach(light);
    scene.add(control);

    control.addEventListener('dragging-changed', function (event) {
        orbit.enabled = !event.value;
    });  // TransformControls 사용 중에 orbit 비활성화

    // GUI 생성
    const gui = new GUI();

    let controls = {
        translate: true,
        rotate: false,
        scale: false
    };

    let gizmoControls = {
        objectName: 'cube', 
        attach: function() {
            let objectToAttach = scene.getObjectByName(this.objectName);
            if (objectToAttach) {
                control.attach(objectToAttach);
            }
        },
        detach: function() {
            let objectToDetach = scene.getObjectByName(this.objectName);
            if (objectToDetach) {
                control.detach(objectToDetach);
            }
        }
    };

    // 3. 그림자를 받을 객체에서 그림자 활성화
    cube.receiveShadow = true;
    cylinder.receiveShadow = true;
    torus.receiveShadow = true;
    plane.receiveShadow = true;

    // 4. 그림자를 생성하는 객체에서 그림자 활성화
    cube.castShadow = true;
    cylinder.castShadow = true;
    torus.castShadow = true;

    gui.add(directionalLight, 'intensity', 0, 2).name('Light');
    gui.add(gizmoControls, 'objectName', ['cube', 'cylinder', 'torus']).name('Object');
    gui.add(gizmoControls, 'attach').name('Attach Gizmo');
    gui.add(gizmoControls, 'detach').name('Detach Gizmo');

    gui.add(controls, 'translate').name('Translation Gizmo').onChange((value) => {
        controls.translate = value;
        controls.rotate = !value;
        controls.scale = !value;
        updateGizmo();
    });

    gui.add(controls, 'rotate').name('Rotation Gizmo').onChange((value) => {
        controls.rotate = value;
        controls.translate = !value;
        controls.scale = !value;
        updateGizmo();
    });

    gui.add(controls, 'scale').name('Scale Gizmo').onChange((value) => {
        controls.scale = value;
        controls.translate = !value;
        controls.rotate = !value;
        updateGizmo();
    });

    gui.add(light.position, 'x', -5, 5);
    gui.add(light.position, 'y', -5, 5);
    gui.add(light.position, 'z', -5, 5);

    function updateGizmo() {
        if (controls.translate) {
            control.setMode("translate");
        } else if (controls.rotate) {
            control.setMode("rotate");
        } else if (controls.scale) {
            control.setMode("scale");
        }
    }

    updateGizmo();

    let positionDisplay = {
        x: 0,
        y: 0,
        z: 0
    };

    let positionX = gui.add(positionDisplay, 'x').listen();
    let positionY = gui.add(positionDisplay, 'y').listen();
    let positionZ = gui.add(positionDisplay, 'z').listen();

    positionX.onChange(function(value) {
        if(control.object) {
            control.object.position.x = value;
        }
    });

    positionY.onChange(function(value) {
        if(control.object) {
            control.object.position.y = value;
        }
    });

    positionZ.onChange(function(value) {
        if(control.object) {
            control.object.position.z = value;
        }
    });

    let objects = [cube, cylinder, torus];
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    let gizmoVisibility = {
        hideGizmo: false,
        toggleGizmo: function() {
            this.hideGizmo = !this.hideGizmo;
            control.visible = !this.hideGizmo;
            control.enabled = !this.hideGizmo;
        }
    };

    gui.add(gizmoVisibility, 'toggleGizmo').name('Toggle Gizmo');

    window.addEventListener('mousedown', function (event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, currentCamera); 
        let intersects = raycaster.intersectObjects(objects); 
        
        if (intersects.length > 0) {
            control.detach(control.object); 
            control.attach(intersects[0].object); 
            
            // Update position display
            positionDisplay.x = intersects[0].object.position.x;
            positionDisplay.y = intersects[0].object.position.y;
            positionDisplay.z = intersects[0].object.position.z;
        }
    });

    control.addEventListener('objectChange', function() {
        if(control.object) {
            positionDisplay.x = control.object.position.x;
            positionDisplay.y = control.object.position.y;
            positionDisplay.z = control.object.position.z;
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, currentCamera);
    }

    animate();

    function onWindowResize() {
        aspect = window.innerWidth / window.innerHeight;
        cameraPersp.aspect = aspect;
        cameraPersp.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);
}
