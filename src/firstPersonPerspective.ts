const PointerLockControls = require('../node_modules/three/examples/jsm/controls/PointerLockControls.js')

import Camera from './camera.ts'
import Renderer from './renderer.ts'

export default class FirstPersonPerspective
{
	private pointerLock!: any;
	private camera!: any;
	private renderer!: any;

	constructor(camera: Camera, renderer: Renderer)
	{
		this.camera = camera
		this.renderer = renderer
	}

	initPointerLock()
	{
		let _this = this;

		this.pointerLock = new PointerLockControls.PointerLockControls(this.camera.get(), document.body)
		console.log(PointerLockControls);

		document.body.addEventListener('click', e => {
			_this.pointerLock.lock();
		})
	}

	getControl()
	{
		return this.pointerLock
	}
}