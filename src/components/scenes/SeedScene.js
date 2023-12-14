import * as Dat from 'dat.gui';
import { Scene,
         Color,
         PlaneGeometry,
         TextureLoader,
         RepeatWrapping,
         Mesh,
         DoubleSide,
         MeshStandardMaterial,
         Texture} from 'three';
import { Flower, Land } from 'objects';
import { BasicLights } from 'lights';


function createFloor() {
    let floor;
    const geometry = new PlaneGeometry(1000, 1000, 10, 10);
    const texture = new TextureLoader().load("src/assets/dirt.jpg");
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(100, 100);

    const material = new MeshStandardMaterial({
      map: texture,
      color: 0xc4733b,
    });

    floor = new Mesh(geometry, material);
    floor.material.side = DoubleSide;
    floor.rotation.x = -Math.PI / 2;

    floor.castShadow = false;
    floor.receiveShadow = true;

    return floor;
}

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
            // rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0xADD8E6);

        // Add meshes to scene
        // const land = new Land();
        // const flower = new Flower(this);
        const lights = new BasicLights();
        this.add(lights);

        // add floor
        const floor = createFloor();
        this.add(floor);

        // Populate GUI
        // this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
