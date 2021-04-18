const THREE = require('three')

import Scene from './scene.ts';
import Camera from './camera.ts';
import Renderer from './renderer.ts';
import Cannon from './cannon.ts';
import Object from './object.ts';
import FirstPersonPerspective from './firstPersonPerspective.ts';
import Ground from './environments/ground.ts';
import AmbientLight from './environments/ambient_light.ts';
import MainLight from './environments/main_light.ts';
import Tree from './environments/tree.ts';
import Sky from './environments/sky.ts';
import Player from './characters/player.ts';
import '../css/style.scss'

let cannon: Cannon = new Cannon()
cannon.init()

let scene: Scene = new Scene(cannon)
scene.init()


let camera: Camera = new Camera()
camera.init();

let renderer: Renderer = new Renderer(scene, camera, cannon)
renderer.init()
renderer.startRendering()

let ground: Ground = new Ground(scene, cannon)
ground.init()

let ambient_light: AmbientLight = new AmbientLight(scene)
ambient_light.init()

let main_light : MainLight = new MainLight(scene)
main_light.init()

let firstPersonPerspective = new FirstPersonPerspective(camera, renderer)
firstPersonPerspective.initPointerLock()

let player : Player = new Player(scene, camera)
ground.onLoad(() => {
	player.setFPP(firstPersonPerspective)
	player.addMainLight(main_light)
	player.make()
})

const tree : Tree = new Tree(scene)

tree.init()

tree.onLoad(() => {

	tree.setupTrees()
})

const sky = new Sky(scene)

sky.init()