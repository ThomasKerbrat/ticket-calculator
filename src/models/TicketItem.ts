export class TicketItem {
    constructor(
        public id: number,
        public label: string,
        public price: number,
        public quantity: number,
    ) { }

    get total() {
        return this.price * this.quantity;
    }
}

export interface TicketItemDraft {
    id?: number;
    label?: string;
    price?: number;
    quantity?: number;
}
