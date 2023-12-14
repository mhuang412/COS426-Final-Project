import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './star_coin.glb';

const scale = new THREE.Vector3(1, 1, 1);

class Coin extends THREE.Group {
    constructor(parent, position,) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'coin';
        this.p = position;
        this.parent = parent;

        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(scale.x, scale.y, scale.z);
 
            let model = gltf.scene;
            model.position.setX(position.x);
            model.position.setY(position.y);
            model.position.setZ(position.z);

            this.add(model);
        });


        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.rotateY(Math.PI/100);
    }
}

export default Coin;