import * as Dat from 'dat.gui';
import { Scene, Color, Vector3 } from 'three';
import { Scooter, Raccoon, Coin, Sidewalk, SIDEWALK_SIZE } from 'objects';
import { BasicLights } from 'lights';

const nightColor = new Color(0x000000);
const dayColor = new Color(0x7ec0ee);

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
            character: null,
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const flower = new Flower(this);
        const lights = new BasicLights(this);
        this.add(lights);
        let min_pos = -2;
        let max_pos = 10;
        let sidewalk;
        for (let i = min_pos; i < max_pos; i++) {
            sidewalk = new Sidewalk(this, new Vector3(SIDEWALK_SIZE.x * i, 0, 0), min_pos, max_pos, i);
            this.add(sidewalk);
            this.state.terrainList.push(sidewalk);
        }

        const coin = new Coin(this, new Vector3(0, 0, 0));
        this.add(coin);
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
        this.background = new Color().lerpColors(nightColor, dayColor, Math.sin(timeStamp/1000));
    }
}

export default SeedScene;
