import { TicketItem } from "./TicketItem";

export class Ticket {
    constructor(
        public id: number,
        public created: Date,
        public items: TicketItem[],
        public name?: string,
    ) { }

    get totalPrice() {
        return this.items.reduce((price, item) => price += item.total, 0);
    }

    get totalQuantity() {
        return this.items.reduce((quantity, item) => quantity += item.quantity, 0);
    }

    static fromJSON(data: any): Ticket {
        const id = Number(data.id);
        const created = new Date(data.created);
        const items = data.items.map((item: any) => TicketItem.fromJSON(item));
        return new Ticket(id, created, items);
    }
}
