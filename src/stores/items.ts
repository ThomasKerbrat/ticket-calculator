import { ref } from "vue";
import { defineStore } from "pinia";
import { TicketItem, type TicketItemDraft } from "@/models/TicketItem";

export const useItemsStore = defineStore("items", () => {
    let nextId = 1;
    const items = ref<TicketItem[]>([]);

    function getItemById(id: number): TicketItem | undefined {
        for (let item of items.value) {
            if (item.id === id) {
                return item;
            }
        }
    }

    function addItem(draft: TicketItemDraft) {
        if (draft.label && draft.price && draft.quantity) {
            items.value.push(new TicketItem(nextId, draft.label, draft.price, draft.quantity));
            nextId++;
        }
    }

    function editItem(id: number, draft: TicketItemDraft) {
        const item = getItemById(id);
        if (!item) { return; }

        if (draft.label) { item.label = draft.label; }
        if (draft.price) { item.price = draft.price; }
        if (draft.quantity) { item.quantity = draft.quantity; }
    }

    function removeItem(id: number) {
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
