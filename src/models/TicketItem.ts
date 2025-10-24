export class TicketItem {
    constructor(
        public label: string,
        public price: number,
        public quantity: number,
    ) { }

    get total() {
        return this.price * this.quantity;
    }
}

export interface TicketItemDraft {
    label?: string;
    price?: number;
    quantity?: number;
}
