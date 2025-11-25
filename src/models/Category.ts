export class Category {
	constructor(
		public id: number,
		public name: string,
	) { }

	static fromJSON(data: any): Category {
		return new Category(data.id, data.name);
	}
}
