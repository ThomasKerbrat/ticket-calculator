import type { TicketItem } from "./TicketItem";

export interface Ticket {
    id: number;
    created: Date;
    name?: string;
    items: TicketItem[];
}
