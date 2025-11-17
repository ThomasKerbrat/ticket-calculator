import { TicketItem } from "./TicketItem";

export class Ticket {
    constructor(
        public id: number,
        public created: Date,
        public items: TicketItem[],
        public name?: string,
    ) { }

    static fromJSON(data: any): Ticket {
        const id = Number(data.id);
        const created = new Date(data.created);
        const items = data.items.map((item: any) => TicketItem.fromJSON(item));
        return new Ticket(id, created, items);
    }
}
