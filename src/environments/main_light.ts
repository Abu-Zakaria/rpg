const THREE = require('three')

import Initializable from '../contracts/initializable.ts'
import LightInterface from '../contracts/environments/light.ts'
import Scene from '../scene.ts'

export default class MainLight implements Initializable, LightInterface
{
	private color : any = new THREE.Color("rgb(255, 255, 255)");
	private intensity : number = 2;
	private scene! : any;
	private position : any = new THREE.Vector3(10, 30, 0)

	constructor(scene: Scene)
	{
		this.scene = scene
	}

	init()
	{
		const light = new THREE.DirectionalLight(this.color, this.intensity)

		this.scene.add(light)

		light.position.set(this.position.x, this.position.y, this.position.z)
		console.log(light)
	}

	getColor()
	{
		return this.color
	}

	getIntensity()
	{
		return this.intensity;
	}
}