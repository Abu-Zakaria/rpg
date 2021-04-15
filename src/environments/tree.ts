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

				_this.scene.add(obj)
			})

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

				obj.position.x = 20

				_this.scene.add(obj)


			})
		})

		// loader.load(this.tree_2_resource, (tree: any) => {

		// 	console.log("<<<<<<<<<", tree)
		// 	tree.scale.x = 10
		// 	tree.scale.y = 10
		// 	tree.scale.z = 10

		// 	_this.scene.add(tree)

		_this.isLoaded = true

		if(_this.onLoadFunc) _this.onLoadFunc()
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
}