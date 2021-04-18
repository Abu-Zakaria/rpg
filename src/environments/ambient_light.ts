const THREE = require('three')

import Initializable from '../contracts/initializable.ts'
import LightInterface from '../contracts/environments/light.ts'
import Scene from '../scene.ts'

export default class AmbientLight implements Initializable, LightInterface
{
	private color: any = new THREE.Color("rgb(180, 215, 222)");
	private intensity: number = 0.3;
	private scene: Scene;

	constructor(scene: Scene)
	{
		this.scene = scene
	}

	init()
	{
		const light = new THREE.AmbientLight(this.color, this.intensity)

		this.scene.addLight(light)
	}

	getColor(): any
	{
		return this.color
	}

	getIntensity(): number
	{
		return this.intensity
	}
}