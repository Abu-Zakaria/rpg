const THREE = require('three')
const KeyDrown = require('keydrown')

const GUI = require('../../node_modules/three/examples/jsm/libs/dat.gui.module.js')

import Scene from '../scene.ts'
import Camera from '../camera.ts'
import XObject from '../object.ts'

export default class Player
{
	private body_size : any = new THREE.Vector3(1, 3, 0.5)
	private body_scale: any = new THREE.Vector3(0.5, 0.5, 0.5)
	private scene! : any;
	private camera! : any;
	private control! : any;
	private position : any = new THREE.Vector3(0, 0, 0);
	private mass: number = 3;
	private velocity: any = new THREE.Vector3();
	private direction: any = new THREE.Vector3();
	private gui! : any;
	private gravity : number = 9.8
	private fpp! : any;
	private cannon_body! : any;
	private movement_speed : number = 30
	private sprinting : boolean = false
	private player_height : number = 2;
	private main_light! : any;

	private movingForward: boolean = false;
	private movingLeft: boolean = false;
	private movingBack: boolean = false;
	private movingRight: boolean = false;
	private canJump: boolean = false;

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

		this.setUpKeyControls()
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

		let clock = new THREE.Clock()
		clock.autoStart = true

		// per tick
		// body_mesh.position.copy(body.position)
		// body_mesh.quaternion.copy(body.quaternion)

		this.control = this.fpp.getControl()

		let raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, this.player_height )

		document.addEventListener('ticks', () => {
			_this.updateMovement(clock.getDelta(), raycaster)
		})
		// body_mesh.quaternion.copy(_this.camera.get().quaternion)
	}

	setFPP(fpp: any)
	{
		this.fpp = fpp
	}

	setUpKeyControls()
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

		KeyDrown.SHIFT.down(() => {
			_this.sprinting = true
		})
		KeyDrown.SHIFT.up(() => {
			_this.sprinting = false
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

	private updateMovement(delta: any, raycaster: any)
	{
		if(this.control.isLocked != true)
		{
			return;
		}

		const onObject = this.detectVerticalIntersection(raycaster) > 0

		let horz_intersection = this.detectHorizontalIntersection()

		let movement_speed = this.movement_speed

		if(this.sprinting) movement_speed /= 2

		this.velocity.x -= this.velocity.x * movement_speed / 2 * delta;
		this.velocity.z -= this.velocity.z * movement_speed / 2 * delta;

		this.direction.z = Number(this.movingForward) - Number(this.movingBack)
		this.direction.x = Number(this.movingRight) - Number(this.movingLeft)

		if(this.movingForward || this.movingBack)
		{
			this.velocity.z += this.direction.z
		}

		if(this.movingLeft || this.movingRight)
		{
			this.velocity.x += this.direction.x
		}

		this.velocity.y -= this.gravity * 2 * delta

		if(onObject === true)
		{
			this.velocity.y = Math.max(0, this.velocity.y)
			this.canJump = true
		}
		else
		{
			this.canJump = false
		}

		this.control.moveRight(this.velocity.x * delta)
		this.control.moveForward(this.velocity.z * delta)

		this.control.getObject().position.y += this.velocity.y * delta

		if(this.control.getObject().position.y < this.player_height && onObject)
		{
			this.velocity.y = 0
			this.control.getObject().position.y = this.player_height

			this.canJump = true
		}

		// if(this.main_light)
		// {
		// 	this.main_light.updateXZ(this.control.getObject().position.x, this.control.getObject().position.z)
		// }
	}

	addMainLight(main_light : any)
	{
		this.main_light = main_light
	}

	private jump()
	{
		if(this.canJump == true)
		{
			this.velocity.y = 20 / this.mass
		}
		this.canJump = false
	}

	private detectVerticalIntersection(raycaster : any) : number
	{
		raycaster.ray.origin.copy(this.control.getObject().position)

		let objects = Object.keys(XObject.getObjects()).map((key) => {
			return XObject.getObjects()[key]
		})

		return raycaster.intersectObjects(objects).length
	}

	private detectHorizontalIntersection() : any
	{
		let position = this.control.getObject().position.clone()
		// +x
		position.y = 1

		let raycaster = new THREE.Raycaster( position,
			new THREE.Vector3(0, 0, 1), 0, this.player_height );

		let objects = Object.keys(XObject.getObjects()).map((key) => {
			return XObject.getObjects()[key]
		})

		console.log('asd', raycaster)
		console.log('aaaaaa',  raycaster.intersectObjects(objects))
		if(raycaster.intersectObjects(objects).length > 0)
		{
			console.log('worked')
		}

		return {
			z : true
		}
	}
}