const THREE = require('three')

import Initializable from '../contracts/initializable.ts'
import LightInterface from '../contracts/environments/light.ts'
import Scene from '../scene.ts'

export default class MainLight implements Initializable, LightInterface
{
	private light! : any;
	private color : any = new THREE.Color("rgb(224, 224, 224)");
	private intensity : number = 1;
	private scene! : any;
	private position : any = new THREE.Vector3(25, 15, 80)

	constructor(scene: Scene)
	{
		this.scene = scene

		let _this = this
		// document.addEventListener('ticks', () => {
		// 	_this.light.position
		// })
	}

	init()
	{
		this.light = new THREE.DirectionalLight(this.color, this.intensity)

		this.light.position.set(this.position.x, this.position.y, this.position.z)

		this.light.castShadow = true

		// this.light.intensity = 1.6
		// this.light.angle = Math.PI / 3
		// this.light.penumbra = 0
		// this.light.distance = 2000
		// this.light.focus = 1
		// this.light.decay = 1

		this.light.shadow.mapSize.width = 2048
		this.light.shadow.mapSize.height = 2048
		this.light.shadow.camera.near = 0
		this.light.shadow.camera.far = (this.position.y + this.position.x + this.position.z) * 1.5
		this.light.shadow.camera.visible = true
		this.light.shadow.camera.left = 500
		this.light.shadow.camera.right = -500
		this.light.shadow.camera.top = 500
		this.light.shadow.camera.bottom = -500
		// this.light.shadow.camera.fov = 70

		let target = new THREE.Object3D()
		target.position.x = 0
		target.position.y = 0
		target.position.z = 0

		this.scene.add(this.light)
		this.scene.add(target)
		this.light.target = target

		console.log(this.light)

		// debug
		// this.scene.add(new THREE.CameraHelper(this.light.shadow.camera))
	}

	getColor()
	{
		return this.color
	}

	getIntensity()
	{
		return this.intensity;
	}

	updateXZ(x : number, z : number)
	{
		this.light.position.x = x + this.position.x
		this.light.position.z = z + this.position.z

		let target = new THREE.Object3D()
		target.position.x = x
		target.position.y = 0
		target.position.z = z

		this.scene.add(target)
		this.light.target = target
	}
}