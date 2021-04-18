const THREE = require('three')

const GLTFLoader = require('../loaders/GLTFLoader.js')
const OBJLoader = require('../loaders/OBJLoader.js')
const MTLLoader = require('../loaders/MTLLoader.js')
import Initializable from '../contracts/initializable.ts'
import Loadable from '../contracts/loadable.ts'
import Object from '../object.ts'
import Scene from '../scene.ts'

export default class Tree extends Object implements Initializable, Loadable
{
	public scene! : Scene
	public isLoaded : boolean = false
	public onLoadFunc! : any
	private tree_1_resource : string = './resources/models/trees/tree_1/tree'
	private tree_2_resource : string = './resources/models/trees/tree_2/tree'
	private tree_object! : any;

	private tree_locations : any = [];

	constructor(scene: Scene)
	{
		super()
		this.scene = scene
	}

	init()
	{
		this.loadTexture()
	}

	loadTexture()
	{
		const _this = this
		const mtl_loader = new MTLLoader.MTLLoader()
		const loader = new OBJLoader.OBJLoader()

		mtl_loader.load(this.tree_2_resource + '.mtl', (mtl : any) => {
			mtl.preload()

			loader.setMaterials(mtl)

			loader.load(_this.tree_2_resource + '.obj', (obj : any) => {

				obj.traverse((child : any) => {
					if(child instanceof THREE.Mesh)
					{
						child.castShadow = true
					}
				})
				obj.scale.x = 0.1
				obj.scale.y = 0.1
				obj.scale.z = 0.1

				_this.tree_object = obj

				_this.isLoaded = true

				if(_this.onLoadFunc) _this.onLoadFunc()
			})
		})

		// loader.load(this.tree_2_resource, (tree: any) => {

		// 	console.log("<<<<<<<<<", tree)
		// 	tree.scale.x = 10
		// 	tree.scale.y = 10
		// 	tree.scale.z = 10

		// 	_this.scene.add(tree)
	}

	onLoad(func: any)
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

	private setTreesLocation()
	{
		let length : number = 100
		let random_x! : number;
		let random_z! : number;
		let area_length : any = { x : 100, z : 100 }

		for(let i: number = 0; i < length; i++)
		{
			random_x = (Math.random() * area_length.x) - (area_length.x / 2)
			random_z = (Math.random() * area_length.z) - (area_length.z / 2)

			this.tree_locations.push(new THREE.Vector3(random_x, 0, random_z))
		}
	}

	setupTrees()
	{
		console.log("WORKED")
		this.setTreesLocation()
		for(let i = 0; i < this.tree_locations.length; i++ )
		{
			let location = this.tree_locations[i]
			let tree = this.tree_object.clone()

			tree.position.set(location.x, location.y, location.z)

			this.scene.add(tree)
			console.log('tree', tree)
		}
	}
}