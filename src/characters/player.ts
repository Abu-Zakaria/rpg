const THREE = require('three')
const KeyDrown = require('keydrown')

const GUI = require('../../node_modules/three/examples/jsm/libs/dat.gui.module.js')

import Scene from '../scene.ts'
import Camera from '../camera.ts'

export default class Player
{
	private body_size : any = new THREE.Vector3(1, 3, 0.5)
	private body_scale: any = new THREE.Vector3(0.5, 0.5, 0.5)
	private scene! : any;
	private camera! : any;
	private position : any = new THREE.Vector3(0, 3, 0);
	private mass: number = 1;
	private gui! : any;
	private cannon_body! : any;
	private movement_speed : number = Math.pow(10, -2)

	private movingForward: boolean = false;
	private movingLeft: boolean = false;
	private movingBack: boolean = false;
	private movingRight: boolean = false;

	constructor(scene: Scene, camera: Camera)
	{
		this.scene = scene
		this.camera = camera
		// let position = this.gui.addFolder('position')
		// position.add(this.position, "y", 0, 10)
		// position.open()
	}
	make()
	{
		this.makeBody()

		this.setUpControls()
	}

	makeBody(): void
	{
		const body_geo = new THREE.BoxGeometry(this.body_size.x, this.body_size.y, this.body_size.z)
		const body_mat = new THREE.MeshStandardMaterial({ color: new THREE.Color('rgb(255, 0, 255)')})

		const body_mesh = new THREE.Mesh(body_geo, body_mat)

		body_mesh.scale.x = this.body_scale.x
		body_mesh.scale.y = this.body_scale.y
		body_mesh.scale.z = this.body_scale.z

		body_mesh.position.x = this.position.x
		body_mesh.position.y = this.position.y
		body_mesh.position.z = this.position.z

		let _this = this
		let params = this.scene.add(body_mesh, {
			mass: this.mass,
			position: this.position
		}, (body: any) => {
			// per tick
			body_mesh.position.copy(body.position)
			body_mesh.quaternion.copy(body.quaternion)

			_this.updateMovement()
		})

		this.cannon_body = params.cannon_body
	}

	setUpControls()
	{
		let _this = this
		
		KeyDrown.W.down(() => {
			_this.movingForward = true
		})
		KeyDrown.W.up(() => {
			_this.movingForward = false
		})

		KeyDrown.A.down(() => {
			_this.movingLeft = true
		})
		KeyDrown.A.up(() => {
			_this.movingLeft = false
		})

		KeyDrown.S.down(() => {
			_this.movingBack = true
		})

		KeyDrown.S.up(() => {
			_this.movingBack = false
		})

		KeyDrown.D.down(() => {
			_this.movingRight = true
		})
		KeyDrown.D.up(() => {
			_this.movingRight = false
		})

		document.addEventListener('keypress', e => {
			if(e.keyCode == 32)
			{
				_this.jump()
			}
		})

		KeyDrown.run(() => {
			KeyDrown.tick()
		})
	}

	private updateMovement()
	{
		if(this.movingForward)
		{
			this.cannon_body.position.z -= this.movement_speed;
		}
		if(this.movingLeft)
		{
			this.cannon_body.position.x -= this.movement_speed;
		}
		if(this.movingBack)
		{
			this.cannon_body.position.z += this.movement_speed;
		}
		if(this.movingRight)
		{
			this.cannon_body.position.x += this.movement_speed;
		}

		if(this.movingForward || this.movingRight || this.movingLeft || this.movingBack)
		{
			this.updateCamera()
		}
	}

	private jump()
	{
		this.cannon_body.velocity.y = this.mass + 3
	}

	private updateCamera(): any
	{
		this.camera.updatePosition(this.cannon_body.position)
	}
}