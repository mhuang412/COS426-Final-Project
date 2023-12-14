import { Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './sidewalk.gltf';

const scale = new Vector3(1, 1, 1);

class Sidewalk extends Group {
    constructor(parent, position, min_pos, max_pos, pos) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'sidewalk';
        this.p = position;
        this.min_pos = min_pos;
        this.max_pos = max_pos;
        this.parent = parent;
        this.pos = pos;

        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(scale.x, scale.y, scale.z);
            if (this.pos == 5) {
                gltf.scene.scale.set(scale.x / 2, scale.y / 2, scale.z / 2);
            }
            let model = gltf.scene;
            model.position.setX(position.x);
            model.position.setY(position.y);
            model.position.setZ(position.z);
            this.add(model);
        });

        // parent.addToUpdateList(this);
    }

    update(timeStamp) {
        if (this.pos == 5) {
            console.log(this.position)
        }
        if (this.position.x < -8) {
            this.position.x = this.max_pos * SIDEWALK_SIZE.x;
        }
        this.position.x -= SIDEWALK_SIZE.x/100;
    }
}

export default Sidewalk;

export const SIDEWALK_SIZE = new Vector3(3.48, 3.48, 0.12);