import * as THREE from 'https://unpkg.com/three@0.143.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.143.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x020204 );
const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(300, 300);
const canvasWrapper = document.querySelector('.canvasWrapper');
canvasWrapper.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({
	color: 0x0ffffff,
	wireframe: true,
	specular: 0xcacaca,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.AmbientLight(0xffffff, 1);
light.position.z = 2;
light.position.y = 2;
scene.add(light);

camera.position.z = 5;
cube.rotation.x = 0.5;

function animate() {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.01
	cube.rotation.z += 0.001
	renderer.render(scene, camera);
}

animate();



// The following library has been used: ThreeJs - https://threejs.org/