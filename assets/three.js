import * as THREE from 'https://unpkg.com/three@0.143.0/build/three.module.js';
import { EffectComposer } from 'https://unpkg.com/three@0.143.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.143.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.143.0/examples/jsm/postprocessing/UnrealBloomPass.js';

// Glowing effect >>> https://threejs.org/docs/#manual/en/introduction/How-to-use-post-processing
// the EffectComposer screws the renderer's alpha channel, thus the background stays black
//

const scene = new THREE.Scene();
// scene.background.color = 0x060606;
scene.background = new THREE.Color( 0x060606 )

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//  https://stackoverflow.com/questions/20899326/how-do-i-stop-effectcomposer-from-destroying-my-transparent-background
// var width = window.innerWidth || 1; 
// var height = window.innerHeight || 1;
// const parameters = {
// 	minFilter: THREE.LinearFilter,
// 	magFilter: THREE.LinearFilter,
// 	format: THREE.RGBAFormat,
// 	stencilBuffer: !1
// };

// var renderTarget = new THREE.WebGLRenderTarget( width, height, parameters );
// end of borrowed code
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
let canvasWrapper = document.querySelector('.canvasWrapper');
canvasWrapper.appendChild(renderer.domElement);

const renderScene = new RenderPass(scene, camera);
// renderer.autoClear=false;
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);

let bloomPass = new UnrealBloomPass(
	new THREE.Vector2(window.innerWidth, window.innerHeight),
	1.6,
	0.1,
	0.1
);
bloomPass.clearColor = false;
console.log(bloomPass);

// composer.material.transparent = true;
composer.addPass(bloomPass);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({
	color: 0x088ffff,
	specular: 0xcacaca,
	// emissive: 0x088ffff,
});

const dotGeometry = new THREE.SphereGeometry(0.2, 32, 32);
let sun = new THREE.PointLight(0xf00230, 0.2, 100, 2);
let moon = new THREE.PointLight(0x0249ba, 0.2, 100, 2);

let sunMat = new THREE.MeshPhongMaterial({
	emissive: 0xf00230,
	emissiveIntensity: 1,
	color: 0x0249ba,
});
let moonMat = new THREE.MeshPhongMaterial({
	emissive: 0x0249ba,
	emissiveIntensity: 1,
	color: 0x0000ff,
});
sun.add(new THREE.Mesh(dotGeometry, sunMat));
moon.add(new THREE.Mesh(dotGeometry, moonMat));

const cube = new THREE.Mesh(geometry, material.clone());
scene.add(cube);
cube.add(sun);
cube.add(moon);
moon.position.y = -2;
sun.position.y = 2;

let SphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
cube.material.visible = false;
const newCube = new THREE.Mesh(SphereGeometry, material.clone());
scene.add(newCube);

camera.position.z = 5;
newCube.rotation.x = 0.5;
let mouseX = 0
let mouseY = 0
let moveanimation = (e) => {
	mouseX = e.clientX - window.innerWidth / 2
	mouseY = e.clientY - window.innerHeight / 2
}

document.addEventListener( 'mousemove', moveanimation);

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.002 + (mouseX * 0.00002);
	cube.rotation.z += 0.002 + (mouseY * 0.00002);
	cube.rotation.y += 0.0005;
	newCube.rotation.x += 0.001;
	composer.render(); //background black ??????????????????????????????????
	// renderer.render(scene, camera); //background transparent
}

animate();

// The following library has been used: ThreeJs - https://threejs.org/
// https://threejs.org/examples/webgl_postprocessing_unreal_bloom_selective.html

