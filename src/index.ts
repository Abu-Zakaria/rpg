import Scene from './scene.ts';
import Camera from './camera.ts';
import Renderer from './renderer.ts';
import '../css/style.scss'

let scene: Scene = new Scene()

scene.init()

let camera: Camera = new Camera()

camera.init();

let renderer: Renderer = new Renderer(scene, camera)

renderer.init()

renderer.startRendering()