export default class Event
{
	static fire(name: string): void
	{
		const event = new window.Event(name)

		document.dispatchEvent(event)
	}
}