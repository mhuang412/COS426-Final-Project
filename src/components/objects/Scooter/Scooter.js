import { Group, Vector3, Box3} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './scooter.gltf';
import { SIDEWALK_SIZE } from '../Sidewalk';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

const scale = new Vector3(0.3, 0.3, 0.3);

class Scooter extends Group {
    constructor(parent, position) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'scooter';
        this.p = position;
        this.parent = parent;

        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(scale.x, scale.y, scale.z);
            // let model = gltf.scene;
            // model.position.setX(position.x);
            // model.position.setY(position.y);
            // model.position.setZ(position.z);
            // this.add(model);
            // gltf.scene.scale.set(
            //     1.5, 1.5 * window.innerHeight / originalHeight, 1.5 * window.innerWidth / originalWidth
            // );
            gltf.scene.rotation.set(0, -1.75, 0);
            gltf.scene.position.set(0, 0.5, 0);
            this.add(gltf.scene);
        });

        this.boundingBox = new Box3();
        const floatingLeft = new TWEEN.Tween(this.position)
            .to({ z: -SIDEWALK_SIZE.z }, 2000);
        const floatingRight = new TWEEN.Tween(this.position)
            .to({ z: SIDEWALK_SIZE.z }, 2000);

        floatingLeft.onComplete(() => floatingRight.start());
        floatingRight.onComplete(() => floatingLeft.start());

        floatingLeft.start();

        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.position.x -= 0.01;
        this.boundingBox.setFromObject(this);
        TWEEN.update();
    }
}

export default Scooter;