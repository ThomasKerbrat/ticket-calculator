import { defineStore } from "pinia";
import type { TicketItem, TicketItemDraft } from "@/models/TicketItem";
import { useLocalStorage } from "@/composables/useLocalStorage";

export const useTicketsStore = defineStore("tickets", () => {
    const items = useLocalStorage<TicketItem[]>("tickets", []);
    let nextId = items.value.length > 0 ? Math.max(...items.value.map((item: any) => item.id)) + 1 : 1;

    function getItemById(id: number): TicketItem | undefined {
        for (let item of items.value) {
            if (item.id === id) {
                return item;
            }
        }
    }

    function addItem(draft: TicketItemDraft): void {
        if (draft.label && draft.price && draft.quantity) {
            items.value.push({ id: nextId, label: draft.label, price: draft.price, quantity: draft.quantity });
            nextId++;
        }
    }

    function editItem(id: number, draft: TicketItemDraft): void {
        const item = getItemById(id);
        if (!item) { return; }

        if (draft.label) { item.label = draft.label; }
        if (draft.price) { item.price = draft.price; }
        if (draft.quantity) { item.quantity = draft.quantity; }
    }

    function removeItem(id: number): void {
        const index = items.value.findIndex(item => item.id === id);

        if (index != undefined) {
            items.value.splice(index, 1);
        }
    }

    return {
        items,
        getItemById,
        addItem,
        editItem,
        removeItem,
    };
});
