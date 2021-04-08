export default interface Loadable
{
	isLoaded: boolean;
	onLoadFunc: any;

	onLoad(func : any): void;
}