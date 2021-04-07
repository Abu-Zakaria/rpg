const THREE = require('three');

import Initializable from './contracts/initializable'
import Scene from './scene.ts'
import Camera from './camera.ts'

export default class Renderer implements Initializable
{
	private scene: Scene;
	private camera: Camera;
	private renderer! : any;
	private width: number = window.innerWidth;
	private height: number = window.innerHeight;
	private playground_id: string = 'playground'
	private fps: number = 20;

	constructor(scene: Scene, camera: Camera)
	{
		this.scene = scene;
		this.camera = camera;
	}

	init()
	{
		this.renderer = new THREE.WebGLRenderer()

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

		this.renderer.render(this.scene.get(), this.camera.get())
	}
}

interface SelectPlayground
{
	readonly element: Element | null
}