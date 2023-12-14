import { Group, Vector3, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './raccoon.gltf';
import { SIDEWALK_SIZE } from '../Sidewalk';

const scale = new Vector3(1, 1, 1);

class Raccoon extends Group {
    constructor(parent, position, rotation) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'raccoon';
        this.p = position;
        this.parent = parent;

        loader.load(MODEL, (gltf) => {
            let model = gltf.scene;
            model.scale.set(scale.x, scale.y, scale.z);
            this.add(model);
            this.box = new Box3().setFromObject(gltf.scene, true);
            console.log(this.box.min);
        });
        this.position.x = position.x;
        this.position.y = position.x;
        this.position.z = position.x;
        this.rotateY(rotation);
        // parent.addToUpdateList(this);
    }

    changeLanes(dir) {
        if (dir == -1) {
            this.position.z -= SIDEWALK_SIZE.z;
        }
        if (dir == 1) {
            this.position.z += SIDEWALK_SIZE.z;
        }
    }
}

export default Raccoon;