<script setup lang="ts">
import { computed, ref } from "vue";
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

let rootRem = ref(16);
function onZoomInClick() {
    rootRem.value += 2;
    document.querySelector("html")!.style.fontSize = `${rootRem.value}px`;
}

function onZoomOutClick() {
    rootRem.value -= 2;
    document.querySelector("html")!.style.fontSize = `${rootRem.value}px`;
}
</script>

<template>
    <section class="items-summary flex row">
        <div class="items-quantity">{{ itemsStore.items.length }} articles</div>
        <div class="items-total-price">{{ formatCurrency(totalPrice) }}</div>
    </section>

    <section class="app-zoom-controls">
        <span style="flex-grow: 1;"></span>
        <i class="bi bi-zoom-out" @click="onZoomOutClick"></i>
        <span>{{ rootRem }}</span>
        <i class="bi bi-zoom-in" @click="onZoomInClick"></i>
    </section>

    <section v-if="itemsStore.items.length == 0" class="new-item-hero">
        <p>Aucun article pour le moment</p>
        <button class="btn" @click="onAddItemClick">Ajouter un article</button>
    </section>
    <template v-else>
        <i class="new-item bi bi-plus" @click="onAddItemClick"></i>
    
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
</template>

<style scoped>
.items-summary {
    position: fixed;
    bottom: 0px;
    width: 100%;
    padding: 1rem;
    border-top: 1px solid #ddd;
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
    right: 1rem;
    bottom: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
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
    /* padding: 0.5rem; */
    /* background-color: #eee; */
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

.app-zoom-controls {
    display: flex;
    align-items: center;
}
.app-zoom-controls > i {
    font-size: 1.5rem;
    padding: 0.5rem;
}
</style>
