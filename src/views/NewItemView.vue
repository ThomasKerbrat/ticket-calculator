<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from "vue-router";
import { type TicketItemDraft } from '@/models/TicketItem';
import { useNumberFormat } from "@/composables/useNumberFormat";
import { useItemsStore } from "@/stores/items";

const router = useRouter();

const { formatCurrency } = useNumberFormat('fr-FR');

const itemsStore = useItemsStore();
const draft = ref<TicketItemDraft>({ quantity: 1 });

const fullPrice = computed(() => {
    if (draft.value.price == undefined || draft.value.quantity == undefined) {
        return 0;
    }

    return draft.value.price * draft.value.quantity;
});

function decreaseQuantity() {
    if (draft.value.quantity != undefined) {
        draft.value.quantity -= 1;
    } else {
        draft.value.quantity = 1;
    }
}

function increaseQuantity() {
    if (draft.value.quantity != undefined) {
        draft.value.quantity += 1;
    } else {
        draft.value.quantity = 1;
    }
}

function onFormSubmit() {
    if (
        draft.value.label == undefined
        || draft.value.label.length === 0
        || draft.value.price == undefined
        || draft.value.quantity == undefined
    ) {
        return;
    }

    itemsStore.addItem(draft.value);

    draft.value.label = "";
    draft.value.price = undefined;
    draft.value.quantity = undefined;

    router.push("/");
}
</script>

<template>
    <form @submit.prevent="onFormSubmit" class="new-ticket-item-form flex col">
        <h1>Nouvelle ligne</h1>
        <input v-model="draft.label" type="text" placeholder="Article">
        <div class="form-price flex row">
            <input class="price-input" v-model="draft.price" type="number" placeholder="Prix" min="0" step="0.01">
            <span class="item-full-price">{{ formatCurrency(fullPrice) }}</span>
        </div>
        <div class="form-quantity flex row">
            <input class="quantity-input" v-model="draft.quantity" type="number" placeholder="Quantité" min="0">
            <span class="input-spinner" @click="decreaseQuantity">-</span>
            <span class="input-spinner" @click="increaseQuantity">+</span>
        </div>
        <button class="submit-button">Ajouter</button>
    </form>
</template>

<style scoped>
.new-ticket-item-form {
    margin: 1rem;
    gap: 1rem;
}

.form-price {
    align-items: baseline;
    gap: 1rem;
}
.price-input {
    flex-grow: 1;
}
.quantity-input {
    flex-grow: 1;
}
.input-spinner {
    display: inline-block;
    border: 1px solid #eee;
    border-left: none;
    padding-top: 0.375rem;
    width: 2.5rem;
    font-size: 1.25rem;
    text-align: center;
    color: #555;
}

.submit-button {
    background-color: #eee;
    padding: 0.5rem;
}

input {
    border: 1px solid #eee;
    padding: 0.5rem;
}
</style>
