export class TicketItem {
	constructor(
		public label: string,
		public price: number,
		public quantity: number,
		public categoryId?: number,
	) { }

	get total() {
		return this.price * this.quantity;
	}

	static fromJSON(data: any): TicketItem {
		const price = Number(data.price);
		const quantity = Number(data.quantity);
		const categoryId = Number(data.categoryId);
		return new TicketItem(data.label, price, quantity, categoryId);
	}
}

export interface TicketItemDraft {
	label?: string;
	price?: number;
	quantity?: number;
	categoryId?: number;
}
