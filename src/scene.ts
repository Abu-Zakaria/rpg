const THREE = require("three")
import Initializable from './contracts/initializable.ts'
import CannonData from './contracts/cannonData.ts'
import Cannon from './cannon.ts'

export default class Scene implements Initializable
{
	private scene!: any;
	private background: any = new THREE.Color("rgb(255, 255, 255)");
	private cannon! : Cannon;

	constructor(cannon: Cannon)
	{
		this.cannon = cannon
	}

	init()
	{
		this.scene = new THREE.Scene()
		this.scene.background = this.background
	}

	get(): Scene
	{
		return this.scene;
	}

	add(object: any, cannon_data?: CannonData, onTick? : any): any
	{
		this.scene.add(object)
		console.log("Added a mesh - ", object)

		if(cannon_data)
		{
			let body = this.cannon.addBoxPhysics(object, cannon_data)

			document.addEventListener('ticks', () => {
				onTick(body)
			})
			return {
				cannon_body: body
			}
		}
	}

	addLight(light: any)
	{
		console.log("Adding light: ", light.name)
		this.scene.add(light)
	}
}