<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useNumberFormat } from "@/composables/useNumberFormat";
import { useItemsStore } from "@/stores/items";

const router = useRouter();

const { formatCurrency } = useNumberFormat('fr-FR');

const itemsStore = useItemsStore();
const totalPrice = computed(() => itemsStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0));

function onAddItemClick() {
    router.push({ name: "items.add" });
}

function onEditItemClick(id: number) {
    router.push({ name: "items.edit", params: { id } });
}
</script>

<template>
    <section class="items-summary flex row">
        <div class="items-quantity">{{ itemsStore.items.length }} articles</div>
        <div class="items-total-price">{{ formatCurrency(totalPrice) }}</div>
    </section>

    <template v-if="itemsStore.items.length > 0">
        <button class="new-item" @click="onAddItemClick">+</button>
    
        <div class="ticket-item-list flex col">
            <div class="ticket-item-list-element flex row" v-for="item in itemsStore.items" :key="item.id" @click="onEditItemClick(item.id)">
                <div>{{ item.quantity }}</div>
                <div style="flex-grow: 1;">
                    {{ item.label }}
                    <span class="text-mutted" v-if="item.quantity > 1"> ({{ formatCurrency(item.price) }})</span>
                </div>
                <div>{{ formatCurrency(item.total) }}</div>
            </div>
        </div>
    </template>
    <section v-else class="new-item-hero">
        <p>Aucun article pour le moment</p>
        <button @click="onAddItemClick">Ajouter un article</button>
    </section>
</template>

<style scoped>
.items-summary {
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    background-color: #eee;
}
.items-quantity {
    display: inline-block;
    flex-grow: 1;
}
.items-total-price {
    display: inline-block;
    font-weight: bold;
}

.new-item {
    position: fixed;
    right: 16px;
    bottom: 16px;
    display: inline-block;
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    background-color: #eee;
    font-size: 2rem;
    user-select: none;
}

.new-item-hero {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    margin: 0 1rem;
    margin-top: 20vh;
    padding: 1rem 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
}
.new-item-hero > * {
    margin-top: 1rem;
}
.new-item-hero > button {
    width: 100%;
    padding: 0.5rem;
    background-color: #eee;
}

.ticket-item-list {
    margin: 1rem;
    border: 1px solid #eee;
    border-radius: 0.75rem;
}

.ticket-item-list > * + * {
    border-top: 1px solid #eee;
}

.ticket-item-list-element {
    padding: 0.75rem;
    gap: 0.5rem;
}
</style>
