import * as Dat from 'dat.gui';
import { Scene, Color, Vector3 } from 'three';
import * as THREE from 'three';
import { Scooter, Raccoon, Coin, Cone, Worker, Csign, Sidewalk, SIDEWALK_SIZE } from 'objects';
import { BasicLights } from 'lights';

const nightColor = new Color(0x000000);
const dayColor = new Color(0x7ec0ee);
const max_pos = 10;
const min_pos = -2;
const lanes = [-1, 0, 1];

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 0,
            updateList: [],
            terrainList: [],
            hittableList: [],
            character: null,
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // game status
        this.gameStart = true;
        this.gameRunning = false;
        this.gameOver = false;
        this.gamePaused = false;
        this.coinsCollected = 0;

        // Add meshes to scene
        // const flower = new Flower(this);
        const lights = new BasicLights(this);
        this.add(lights);
        let sidewalk;
        for (let i = min_pos; i < max_pos; i++) {
            sidewalk = new Sidewalk(this, new Vector3(SIDEWALK_SIZE.x * i, 0, 0), min_pos, max_pos, i);
            this.add(sidewalk);
            this.state.terrainList.push(sidewalk);
        }

        const raccoon = new Raccoon(this, new Vector3(0, 0, 0), Math.PI / 2);
        this.add(raccoon);
        this.state.character = raccoon;

        console.log(this.state.updateList);

        // Populate GUI
        // this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        // Call update for each object in the updateList
        for (const obj of this.state.updateList) {
            obj.update(timeStamp);
        }
        for (const obj of this.state.terrainList) {
            obj.update(timeStamp);
        }
        for (const obj of this.state.hittableList) {
            obj.update(timeStamp);
            if (obj.deactivate) {
                if (obj.isHit && obj.name == 'coin') {
                    this.coinsCollected += 1;
                    this.state.hittableList.splice(this.state.hittableList.indexOf(obj), 1);
                    this.remove(obj);
                // TODO: stop game when we hit any other obstacle
                }
            }
        }
        this.background = new Color().lerpColors(nightColor, dayColor, Math.sin(timeStamp/1000));

        // SPAWN COINS + OBSTACLES
        // generate coins
        if (Math.random() < 0.01) {
            lanes[Math.floor(Math.random() * lanes.length)];
            const coin = new Coin(this, new Vector3(SIDEWALK_SIZE.x * max_pos, 0, SIDEWALK_SIZE.z * lanes[Math.floor(Math.random() * lanes.length)]), min_pos, max_pos, timeStamp);
            this.add(coin);
            this.state.hittableList.push(coin);
        }

        // generate cones
        if (Math.random() < 0.005) {
            lanes[Math.floor(Math.random() * lanes.length)];
            const cone = new Cone(this, new Vector3(SIDEWALK_SIZE.x * max_pos, 0, SIDEWALK_SIZE.z * lanes[Math.floor(Math.random() * lanes.length)]), min_pos, max_pos, timeStamp);
            this.add(cone);
            this.state.hittableList.push(cone);
        }

        // generate csigns
        if (Math.random() < 0.005) {
            lanes[Math.floor(Math.random() * lanes.length)];
            const csign = new Csign(this, new Vector3(SIDEWALK_SIZE.x * max_pos, 0, SIDEWALK_SIZE.z * lanes[Math.floor(Math.random() * lanes.length)]), min_pos, max_pos, timeStamp);
            this.add(csign);
            this.state.hittableList.push(csign);
        }

        // generate workers
        if (Math.random() < 0.0005) {
            lanes[Math.floor(Math.random() * lanes.length)];
            const worker = new Worker(this, new Vector3(SIDEWALK_SIZE.x * max_pos, 0, SIDEWALK_SIZE.z * lanes[Math.floor(Math.random() * lanes.length)]), min_pos, max_pos, timeStamp);
            this.add(worker);
            this.state.hittableList.push(worker);
        }

        // generate scooters
        if (Math.random() < 0.0005) {
            lanes[Math.floor(Math.random() * lanes.length)];
            const scooter = new Scooter(this, new Vector3(SIDEWALK_SIZE.x * max_pos, 0, SIDEWALK_SIZE.z * lanes[Math.floor(Math.random() * lanes.length)]), min_pos, max_pos, timeStamp);
            this.add(scooter);
            this.state.hittableList.push(scooter);
        }

    }
}

export default SeedScene;
