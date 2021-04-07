const THREE = require("three")
import Initializable from './contracts/initializable.ts'

export default class Scene implements Initializable
{
	private scene!: any;
	private background: any = new THREE.Color("rgb(255, 255, 255)");

	init()
	{
		this.scene = new THREE.Scene()
		this.scene.background = this.background
	}

	get(): Scene
	{
		return this.scene;
	}
}