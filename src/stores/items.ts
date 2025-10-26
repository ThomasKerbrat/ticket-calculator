import { ref } from "vue";
import { defineStore } from "pinia";
import { TicketItem, type TicketItemDraft } from "@/models/TicketItem";

export const useItemsStore = defineStore("items", () => {
    const items = ref<TicketItem[]>([]);

    function addItem(draft: TicketItemDraft) {
        if (draft.label && draft.price && draft.quantity) {
            items.value.push(new TicketItem(draft.label, draft.price, draft.quantity));
        }
    }

    return {
        items,
        addItem,
    };
});
