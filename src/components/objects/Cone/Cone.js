import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cone.glb';
import { HittableObject } from '../HittableObject';

const scale = new THREE.Vector3(2, 2, 2);
const translation = new THREE.Vector3(0, 0.5, 0);

class Cone extends HittableObject {
    constructor(parent, position, min_pos, name) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'cone';
        this.p = position;
        this.p = position.add(translation);
        this.parent = parent;

        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(scale.x, scale.y, scale.z);
 
            let model = gltf.scene;
            model.position.setX(position.x);
            model.position.setY(position.y);
            model.position.setZ(position.z);

            this.add(model);
        });


        //parent.addToUpdateList(this);
    }

}

export default Cone;