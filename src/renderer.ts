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
	private playground_el!: SelectPlayground;
	private width: number = window.innerWidth;
	private height: number = window.innerHeight;
	private playground_id: string = 'playground'
	private cannon_steps: number = 50;
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

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = true;

		this.renderer.outputEncoding = THREE.sRGBEncoding

		this.renderer.setSize(this.width, this.height);

		this.playground_el = {
			element: document.getElementById(this.playground_id)
		}

		if(this.playground_el.element != null)
		{
			this.playground_el.element.appendChild(this.renderer.domElement)
		}
	}

	startRendering()
	{
		console.log('starting rendering...')

		this.animate()
	}

	animate()
	{
		let _this = this

		requestAnimationFrame(() => { return _this.animate() })

		this.cannon.step(this.cannon_steps)

		Event.fire('ticks')

		this.renderer.render(this.scene.get(), this.camera.get())
	}

	getPlayground(): any
	{
		return this.playground_el
	}
}

interface SelectPlayground
{
	readonly element: Element | null
}