import { ref } from "vue";
import { defineStore } from "pinia";
import { TicketItem, type TicketItemDraft } from "@/models/TicketItem";
import { useLocalStorage } from "@/composables/useLocalStorage";

const serializer = {
    read(str: string) {
        const items: TicketItem[] = [];
        let list;

        try {
            list = JSON.parse(str);

            for (let item of list) {
                items.push(new TicketItem(item.id, item.label, item.price, item.quantity));
            }
        } catch { }

        return items;
    },
};

export const useItemsStore = defineStore("items", () => {
    const items = useLocalStorage<TicketItem[]>("ticket-items", [], { serializer });
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
            items.value.push(new TicketItem(nextId, draft.label, draft.price, draft.quantity));
            nextId++;
            console.log(items.value, nextId);
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
