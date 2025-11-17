import { computed, readonly, type ComputedRef } from "vue";
import { defineStore } from "pinia";

import { Ticket } from "@/models/Ticket.ts";
import { TicketItem, type TicketItemDraft } from "@/models/TicketItem.ts";
import { useLocalStorage } from "@/composables/useLocalStorage";

function ticketReadSerialize(raw: string): Ticket[] {
    const rawArray: any[] = JSON.parse(raw);
    const dataArray: Ticket[] = rawArray.map(item => Ticket.fromJSON(item));
    return dataArray;
}

export const useTicketsStore = defineStore("tickets", () => {
    const tickets = useLocalStorage<Ticket[]>("tickets", [], { serializer: { read: ticketReadSerialize } });
    const items = useLocalStorage<TicketItem[]>("tickets", []);
    let nextId = tickets.value.length > 0 ? Math.max(...tickets.value.map((ticket: any) => ticket.id)) + 1 : 1;

    function createTicket(): Ticket {
        const ticket = new Ticket(nextId, new Date(), []);
        tickets.value.push(ticket);
        nextId++;
        return ticket;
    }

    function getTicket(id: number): Ticket | undefined {
        return tickets.value.find(ticket => ticket.id === id);
    }

    function getLastNTickets(quantity: number): ComputedRef<Ticket[]> {
        if (quantity <= tickets.value.length) {
            return computed(() => (tickets.value));
        } else {
            return computed(() => (tickets.value.filter((_, index) => index >= tickets.value.length - quantity)));
        }
    }

    function addItem(ticketId: number, draft: TicketItemDraft): void {
        const ticket = getTicket(ticketId);

        if (ticket && draft.label && draft.price && draft.quantity) {
            const item = new TicketItem(draft.label, draft.price, draft.quantity);
            ticket.items.push(item);
        }
    }

    function editItem(ticketId: number, itemId: number, draft: TicketItemDraft): void {
        const ticket = getTicket(ticketId);
        if (!ticket) { return; }
        const item = ticket.items[itemId];
        if (!item) { return; }

        if (draft.label) { item.label = draft.label; }
        if (draft.price) { item.price = draft.price; }
        if (draft.quantity) { item.quantity = draft.quantity; }
    }

    function removeItem(ticketId: number, itemId: number): void {
        const ticket = getTicket(ticketId);
        if (!ticket) { return; }

        if (itemId < ticket.items.length) {
            ticket.items.splice(itemId, 1);
        }
    }

    return {
        tickets: readonly(tickets),
        items,
        createTicket,
        getTicket,
        getLastNTickets,
        addItem,
        editItem,
        removeItem,
    };
});
