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

    }

    return {
        items,
        getItemById,
        addItem,
        editItem,
    };
});
