const THREE = require("three")

import Initializable from '../contracts/initializable.ts'
import Scene from '../scene.ts'

export default class Sky 
{
	private resource_path : string = './resources/textures/sky/wrath';
	private scene! : Scene;

	constructor(scene: Scene)
	{
		this.scene = scene
	}

	init()
	{
		let geo = new THREE.BoxGeometry(1000, 1000, 1000)

		let texture_front = new THREE.TextureLoader().load(this.resource_path + "_ft.jpg")
		let texture_back = new THREE.TextureLoader().load(this.resource_path + "_bk.jpg")
		let texture_up = new THREE.TextureLoader().load(this.resource_path + "_up.jpg")
		// let texture_down = new THREE.TextureLoader().load(this.resource_path + "_dn.jpg")
		let texture_right = new THREE.TextureLoader().load(this.resource_path + "_rt.jpg")
		let texture_left = new THREE.TextureLoader().load(this.resource_path + "_lf.jpg")

		let materials = []

		materials.push(new THREE.MeshBasicMaterial({ map: texture_front, side: THREE.DoubleSide }))
		materials.push(new THREE.MeshBasicMaterial({ map: texture_back, side: THREE.DoubleSide }))
		materials.push(new THREE.MeshBasicMaterial({ map: texture_up, side: THREE.DoubleSide }))
		materials.push(new THREE.MeshBasicMaterial({ }))
		materials.push(new THREE.MeshBasicMaterial({ map: texture_right, side: THREE.DoubleSide }))
		materials.push(new THREE.MeshBasicMaterial({ map: texture_left, side: THREE.DoubleSide }))

		let sky_mesh = new THREE.Mesh(geo, materials)

		this.scene.add(sky_mesh)

		sky_mesh.position.y = - 200
	}
}