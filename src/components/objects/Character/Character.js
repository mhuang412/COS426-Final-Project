import { Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Raccoon from '../Raccoon';

const scale = new Vector3(1, 1, 1);

class Character extends Group {
    constructor(parent, position) {
        super();

        const loader = new GLTFLoader();

        this.p = position;
        this.parent = parent;

        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(scale.x, scale.y, scale.z);
            let model = gltf.scene;
            this.add(model);
            this.add()
        });
        this.position.x = this.p.x;
        this.position.y = this.p.y;
        this.position.z = this.p.z;
    }

    update(timeStamp) {
        // console.log(this.name);
        this.p.x -= SIDEWALK_SIZE.x/10;
        this.position.x -= SIDEWALK_SIZE.x/10;
        if (this.p.x < this.min_pos * SIDEWALK_SIZE.x) {
            console.log(this.name);
            console.log(this.position.x);
            console.log(this.p.x);
            this.position.x = this.max_pos * SIDEWALK_SIZE.x;
            this.p.x = this.max_pos * SIDEWALK_SIZE.x;
        }
    }
}

export default Character;

