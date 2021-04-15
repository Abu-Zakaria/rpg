export default class Object
{
	static objects : any = [];

	static addObject(object: any): void
	{
		this.objects[object.uuid] = object
	}

	static getObjects(): any
	{
		return this.objects
	}
}