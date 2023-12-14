import * as Dat from 'dat.gui';
import { Scene, Color, SphereGeometry, MeshPhongMaterial, Mesh, BoxGeometry, MeshLambertMaterial} from 'three';
import { Flower, Land } from 'objects';
import { BasicLights } from 'lights';

var LEVEL = [
    '# # # # # # # # # # # # # # # # # # # # # # # # # # # #',
    '# . . . . . . . . . . . . # # . . . . . . . . . . . . #',
    '# . # # # # . # # # # # . # # . # # # # # . # # # # . #',
    '# . # # # # . # # # # # . # # . # # # # # . # # # # . #',
    '# . # # # # . # # # # # . # # . # # # # # . # # # # . #',
    '# . . . . . . . . . . . . . . . . . . . . . . . . . . #',
    '# . # # # # . # # . # # # # # # # # . # # . # # # # . #',
    '# . # # # # . # # . # # # # # # # # . # # . # # # # . #',
    '# . . . . . . # # . . . . # # . . . . # # . . . . . . #',
    '# # # # # # . # # # # #   # #   # # # # # . # # # # # #',
    '          # . # # # # #   # #   # # # # # . #          ',
    '          # . # #                     # # . #          ',
    '          # . # #   # # # # # # # #   # # . #          ',
    '# # # # # # . # #   #             #   # # . # # # # # #',
    '            .       #             #       .            ',
    '# # # # # # . # #   #             #   # # . # # # # # #',
    '          # . # #   # # # # # # # #   # # . #          ',
    '          # . # #                     # # . #          ',
    '          # . # #   # # # # # # # #   # # . #          ',
    '# # # # # # . # #   # # # # # # # #   # # . # # # # # #',
    '# . . . . . . . . . . . . # # . . . . . . . . . . . . #',
    '# . # # # # . # # # # # . # # . # # # # # . # # # # . #',
    '# . # # # # . # # # # # . # # . # # # # # . # # # # . #',
    '# . . . # # . . . . . . . .   . . . . . . . # # . . . #',
    '# # # . # # . # # . # # # # # # # # . # # . # # . # # #',
    '# # # . # # . # # . # # # # # # # # . # # . # # . # # #',
    '# . . . . . . # # . . . . # # . . . . # # . . . . . . #',
    '# . # # # # # # # # # # . # # . # # # # # # # # # # . #',
    '# . # # # # # # # # # # . # # . # # # # # # # # # # . #',
    '# . . . . . . . . . . . . . . . . . . . . . . . . . . #',
    '# # # # # # # # # # # # # # # # # # # # # # # # # # # #'
    ];

var createDot = function () {
    var dotGeometry = new SphereGeometry(0.05);
    var dotMaterial = new MeshPhongMaterial({ color: 0xFFDAB9 });
    return function () {
        var dot = new Mesh(dotGeometry, dotMaterial);
        dot.isDot = true;

        return dot;
    };
}();

var createWall = function () {
    var wallGeometry = new BoxGeometry(1, 1, 1);
    var wallMaterial = new MeshLambertMaterial({ color: 'blue' });

    return function () {
        var wall = new Mesh(wallGeometry, wallMaterial);
        wall.isWall = true;

        return wall;
    };
}();

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
        this.background = new Color(0x000000);

        // make the level map in the scene
        var map = {};
        map.bottom = -(LEVEL.length - 1);
        map.top = 0;
        map.left = 0;
        map.right = 0;
        map.numDots = 0;
        // map.pacmanSpawn = null;
        // map.ghostSpawn = null;

        var x, y;
        for (var row = 0; row < LEVEL.length; row++) {
            // Set the coordinates of the map so that they match the
            // coordinate system for objects.
            y = -row;

            map[y] = {};

            // Get the length of the longest row in the level definition.
            var length = Math.floor(LEVEL[row].length / 2);
            //map.right = Math.max(map.right, length - 1);
            map.right = Math.max(map.right, length);

            // Skip every second element, which is just a space for readability.
            for (var column = 0; column < LEVEL[row].length; column += 2) {
                x = Math.floor(column / 2);

                var cell = LEVEL[row][column];
                var object = null;

                if (cell === '#') {
                    object = createWall();
                } else if (cell === '.') {
                    object = createDot();
                    map.numDots += 1;
                }
                // } else if (cell === 'o') {
                //     object = createPowerPellet();
                // } else if (cell === 'P') {
                //     map.pacmanSpawn = new THREE.Vector3(x, y, 0);
                // } else if (cell === 'G') {
                //     map.ghostSpawn = new THREE.Vector3(x, y, 0);
                // }

                if (object !== null) {
                    object.position.set(x, y, 0);
                    map[y][x] = object;
                    this.add(object);
                }
            }
        }

        map.centerX = (map.left + map.right) / 2;
        map.centerY = (map.bottom + map.top) / 2;

        // Add meshes to scene
        // const land = new Land();
        // const flower = new Flower(this);
        const lights = new BasicLights();
        this.add(lights);

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
