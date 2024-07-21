// import * as THREE from "./three.module.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.131.3/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

// target container
const container = document.getElementById("showFormButton");
const WIDTH = 400;
const HEIGHT = 500;

// Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xffffff); // Set background color to white
container.appendChild(renderer.domElement);

const loader = new GLTFLoader();

let meshIndex = 0;

let model;
loader.load(
  "./assets/fridge.glb",
  function (gltf) {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        console.log(child.mesh);
        if (meshIndex === 0) {
          child.material = new THREE.MeshStandardMaterial({ color: 0xd1cdcd });
        } else {
          child.material = new THREE.MeshStandardMaterial({ color: 0x4f4f4f });
        }
        meshIndex++;
      }
    });
    model = gltf.scene;
    model.rotation.y = Math.PI / -2;
    scene.add(model);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error("An error happened", error);
  }
);

camera.position.z = 4.5;

const ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 0.2, 1).normalize();
scene.add(directionalLight);

// Cursor position
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update cube rotation based on mouse position
  model.rotation.y = (mouseX - Math.PI / 2) * Math.PI * 0.3;
  model.rotation.x = mouseY * Math.PI * -0.3;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(WIDTH, HEIGHT);
});
