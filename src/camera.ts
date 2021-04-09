const THREE = require('three')
import Initializable from './contracts/initializable.ts'

export default class Camera implements Initializable
{
	private camera! : any;
	private pov: number = 60;
	private aspectRatio: number = window.innerWidth / window.innerHeight;
	private near: number = 0.1;
	private far: number = 1000;
	private position: any = new THREE.Vector3(0, 3, 4)
	private lookAt: any = new THREE.Vector3(0, 0, 0)

	init(): any 
	{
		this.camera = new THREE.PerspectiveCamera(this.pov, this.aspectRatio, this.near, this.far)

		this.camera.position.x = this.position.x
		this.camera.position.y = this.position.y
		this.camera.position.z = this.position.z

		this.camera.lookAt(this.lookAt)
	}

	get(): Camera
	{
		return this.camera;
	}

	updatePosition(position: any): void
	{
		this.camera.position.x = position.x
		this.camera.position.y = position.y
		this.camera.position.z = position.z
	}
}