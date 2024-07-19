import * as THREE from "../node_modules/three/build/three.module.js";
// import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

console.log("hello this is three");

if (THREE) {
  console.log("THREE imported successfully:", THREE);
} else {
  console.error("THREE import failed");
}

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial();
material.color = { r: 0, g: 255, b: 0 };

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, 800 / 600);
camera.position.z = 20;

scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);
renderer.render(scene, camera);

// Step 4: Add OrbitControls for Rotation
// const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Animation Loop
function animate() {
  // requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
}

animate();
