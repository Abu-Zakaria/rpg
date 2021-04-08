const CANNON = require('cannon')

import Initializable from './contracts/initializable.ts'
import CannonData from './contracts/cannonData.ts'

export default class cannon implements Initializable
{
	private world!: any;
	private gravityY: number = -5;
	private broadPhase: any = new CANNON.NaiveBroadphase()

	init()
	{
		this.world = new CANNON.World()

		this.world.gravity.set(0, this.gravityY, 0)
		// this.world.broadPhase = this.broadPhase
		console.log("init cannon world: ", this.world)
	}

	addBoxPhysics(object: any, data: CannonData): any
	{
		let params = object.geometry.parameters

		let shape = new CANNON.Box(
				new CANNON.Vec3(
						params.width / 2, params.height / 2, params.depth / 2
					)
			)
		let body = new CANNON.Body({ mass: data.mass })

		body.addShape(shape)

		body.position.x = data.position.x
		body.position.y = data.position.y
		body.position.z = data.position.z
		console.log("Setting", data.position)

		this.world.add(body)

		return body;
	}

	step(fps: number): void
	{
		this.world.step(1 / fps)
	}
}