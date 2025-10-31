export interface TicketItem {
    label: string;
    price: number;
    quantity: number;
    categoryId?: number;
}

export function ticketItemTotal(item: TicketItem) {
    return item.price * item.quantity;
}

export interface TicketItemDraft {
    label?: string;
    price?: number;
    quantity?: number;
    categoryId?: number;
}
