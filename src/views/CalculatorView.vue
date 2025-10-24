<script setup lang="ts">
import { ref, computed, type Ref } from "vue";
import { useNumberFormat } from "@/composables/useNumberFormat";
import { TicketItem, type TicketItemDraft } from "@/models/TicketItem";

const { formatCurrency } = useNumberFormat('fr-FR');

const items: Ref<TicketItem[]> = ref([]);
const ticketItemDraf = ref<TicketItemDraft>({});

const itemFullPrice = computed(() => {
    if (ticketItemDraf.value.price == undefined || ticketItemDraf.value.quantity == undefined) {
        return 0;
    }

    return ticketItemDraf.value.price * ticketItemDraf.value.quantity;
});

const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0));

function onFormSubmit() {
    if (
        ticketItemDraf.value.label == undefined
        || ticketItemDraf.value.label.length === 0
        || ticketItemDraf.value.price == undefined
        || ticketItemDraf.value.quantity == undefined
    ) {
        return;
    }

    items.value.push(new TicketItem(ticketItemDraf.value.label, ticketItemDraf.value.price, ticketItemDraf.value.quantity));

    ticketItemDraf.value.label = "";
    ticketItemDraf.value.price = undefined;
    ticketItemDraf.value.quantity = undefined;
}
</script>

<template>
    <ul>
        <li v-for="item in items" :key="item.label">
            {{ item.label }} - {{ formatCurrency(item.total) }}
            ({{ item.quantity }} x {{ formatCurrency(item.price) }})
        </li>
    </ul>

    <form @submit.prevent="onFormSubmit">
        <div class="container">
            <div class="line1">
                <input v-model="ticketItemDraf.label" type="text" placeholder="Article">
                <span>{{ formatCurrency(itemFullPrice) }}</span>
            </div>
            <div class="line2">
                <input v-model="ticketItemDraf.price" type="number" placeholder="Prix" min="0" step="0.01">
                <input v-model="ticketItemDraf.quantity" type="number" placeholder="Quantité" min="0">
            </div>
        </div>
        <button>Ajouter</button>
    </form>

    <div class="total-price">{{ formatCurrency(totalPrice) }}</div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.line1 {
    display: flex;
    gap: 8px;
}
.line1 > input {
    flex-grow: 1;
}
.line1 > span {
    text-align: right;
}

.line2 {
    display: flex;
    gap: 8px;
}
.line2 > input {
    flex-grow: 1;
}

.total-price {
    position: fixed;
    bottom: 16px;
    right: 16px;
    padding: 8px;
    border: 1px solid green;
    border-radius: 8px;
}
</style>
