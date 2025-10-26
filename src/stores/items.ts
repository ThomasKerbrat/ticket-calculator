import { ref } from "vue";
import { defineStore } from "pinia";
import { TicketItem, type TicketItemDraft } from "@/models/TicketItem";

export const useItemsStore = defineStore("items", () => {
    const items = ref<TicketItem[]>(_loadFromLocalStorage());
    let nextId = items.value.length > 0 ? Math.max(...items.value.map((item: any) => item.id)) + 1 : 1;

    function _loadFromLocalStorage(): TicketItem[] {
        const items: TicketItem[] = [];

        const str = localStorage.getItem("ticket-items");
        let json = null;

        if (str != null) {
            try {
                json = JSON.parse(str);

                for (let item of json) {
                    items.push(new TicketItem(item.id, item.label, item.price, item.quantity));
                }
            } catch { }
        }

        return items;
    }

    function _saveToLocalStorage(): void {
        localStorage.setItem("ticket-items", JSON.stringify(items.value));
    }

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
            _saveToLocalStorage()
            nextId++;
        }
    }

    function editItem(id: number, draft: TicketItemDraft): void {
        const item = getItemById(id);
        if (!item) { return; }

        if (draft.label) { item.label = draft.label; }
        if (draft.price) { item.price = draft.price; }
        if (draft.quantity) { item.quantity = draft.quantity; }

        _saveToLocalStorage()
    }

    function removeItem(id: number): void {
        const index = items.value.findIndex(item => item.id === id);

        if (index != undefined) {
            items.value.splice(index, 1);
            _saveToLocalStorage()
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
