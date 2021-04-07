const THREE = require('three')
import Initializable from './contracts/initializable.ts'

export default class Camera implements Initializable
{
	private camera! : Camera;
	private pov: number = 60;
	private aspectRatio: number = window.innerWidth / window.innerHeight;
	private near: number = 0.1;
	private far: number = 100;

	init(): any 
	{
		this.camera = new THREE.PerspectiveCamera(this.pov, this.aspectRatio, this.near, this.far)
	}

	get(): Camera
	{
		return this.camera;
	}
}