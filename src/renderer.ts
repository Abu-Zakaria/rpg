const THREE = require('three');

import Initializable from './contracts/initializable'
import Scene from './scene.ts'
import Camera from './camera.ts'
import Cannon from './cannon.ts'
import Event from './event.ts'

export default class Renderer implements Initializable
{
	private scene: Scene;
	private camera: Camera;
	private cannon: Cannon;
	private renderer! : any;
	private width: number = window.innerWidth;
	private height: number = window.innerHeight;
	private playground_id: string = 'playground'
	private fps: number = 20;
	private anti_alias: boolean = true;

	constructor(scene: Scene, camera: Camera, cannon: Cannon)
	{
		this.scene = scene;
		this.camera = camera;
		this.cannon = cannon;
	}

	init()
	{
		this.renderer = new THREE.WebGLRenderer({
			antialias: this.anti_alias
		})

		this.renderer.setSize(this.width, this.height);

		const playground_el: SelectPlayground = {
			element: document.getElementById(this.playground_id)
		}

		if(playground_el.element != null)
		{
			playground_el.element.appendChild(this.renderer.domElement)
		}
	}

	startRendering()
	{
		console.log('starting rendering...')

		this.animate()
	}

	private animate()
	{
		let _this = this

		setTimeout(() => {
			_this.animate()
		}, this.fps)

		this.cannon.step(this.fps)

		Event.fire('ticks')

		this.renderer.render(this.scene.get(), this.camera.get())
	}
}

interface SelectPlayground
{
	readonly element: Element | null
}