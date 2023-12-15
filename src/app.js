/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';
import './app.css';

// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
let keypress = null;


// Set up camera
camera.position.set(-8, 5, 0);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.enabled = false;
controls.update();

// Add music
let listener = new THREE.AudioListener();
camera.add(listener);
let sounds = [];
let audioLoader = new THREE.AudioLoader();

let bgmusic = new THREE.Audio(listener);
sounds['bgmusic'] = bgmusic;
audioLoader.load(
    'https://raw.githubusercontent.com/mhuang412/COS426-Final-Project/main/src/components/sounds/eyeofthetiger.mp3',
    function (buffer) {
        bgmusic.setBuffer(buffer);
        bgmusic.setLoop(true);
        bgmusic.setVolume(0.50);
    }
);

// // Game states
let gameStart = true;
// let gameOver = false;
// let gameRunning = false;
// //let gamePaused = false;

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    // check if game is over
    if (scene.gameOver) {
        console.log("game OVER");
        sounds['bgmusic'].pause();
    }
    scene.update && scene.update(timeStamp);

    coinText.innerText = "Coins: " + scene.coinsCollected;

    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Start theme music - spacebar click
document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        if (gameStart) {
            scene.gameStart = false;
            scene.gameRunning = true;
            sounds['bgmusic'].play();
        }
    }
});

// Set up coins counter
var coinDiv = document.createElement('div');
coinDiv.id = 'coinscollected';
document.body.appendChild(coinDiv);

let coinText = document.createElement('h1');
coinText.innerText = "Coins: " + scene.coinsCollected;
coinDiv.appendChild(coinText);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

window.addEventListener('keydown', (event) => {
    // if (event.repeat) return;
    if (event.key == "ArrowLeft") scene.state.character.changeLanes(-1);
    if (event.key == "ArrowRight") scene.state.character.changeLanes(1);
    //console.log(keypress);
}
, false);

// window.addEventListener('keyup', (event) => {
//     if (event.key == keypress) keypress = null;
// }
// , false);