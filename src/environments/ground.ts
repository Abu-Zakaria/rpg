const THREE = require('three')

import Initializable from '../contracts/initializable.ts'
import Loadable from '../contracts/loadable.ts'
import Object from '../object.ts'
import Scene from '../scene.ts'
import Cannon from '../cannon.ts'

export default class Ground extends Object implements Initializable, Loadable
{
	private scene! : Scene;
	private cannon! : Cannon;
	private ground_mesh!: any;
	private width: number = 1000;
	private height: number = 0.2;
	private depth: number = 1000;
	isLoaded: boolean = false;
	onLoadFunc!: any;

	private texture: string = '../../resources/textures/ground.jpg'

	constructor(scene: Scene, cannon: Cannon)
	{
		super()
		this.scene = scene
		this.cannon = cannon
	}
	init()
	{
		this.loadTexture()
	}

	private loadTexture(): void
	{
		let _this = this
		const texture_loader = new THREE.TextureLoader()

		texture_loader.load(this.texture, (texture: any) => {
			texture.encoding = THREE.sRGBEncoding
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping
			texture.repeat.set(_this.width / 3, _this.depth / 3)

			let geometry = _this.getGeometry()
			let material = _this.getMaterial(texture)

			_this.ground_mesh = new THREE.Mesh(geometry, material)

			_this.ground_mesh.name = "ground"
			_this.ground_mesh.receiveShadow = true
			// _this.ground_mesh.castShadow = true

			_this.scene.add(_this.ground_mesh)

			_this.addPhysics()

			_this.isLoaded = true;
			_this.onLoadFunc()

			console.log('ground', _this.ground_mesh)
			Object.addObject(_this.ground_mesh)
		})
	}

	getGeometry()
	{
		return new THREE.BoxGeometry(this.width, this.height, this.depth)
	}

	getMaterial(texture: any)
	{
		return new THREE.MeshStandardMaterial({map: texture, metalness: 0.2})
	}

	addPhysics(): void
	{
		let _this = this;
		let body = this.cannon.addBoxPhysics(
				this.ground_mesh,
				{
					mass: 0,
					position: this.ground_mesh.position
				}
			)

		document.addEventListener('ticks', () => {
			_this.ground_mesh.position.copy(body.position)
		})
		console.log("BODY", body);
	}

	onLoad(func : any)
	{
		if(this.isLoaded)
		{
			func()
		}
		else
		{
			this.onLoadFunc = func
		}
	}
}