<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { type TicketItemDraft } from '@/models/TicketItem';
import { useItemsStore } from "@/stores/items";
import TicketItemForm from '@/components/TicketItemForm.vue';

const router = useRouter();
const route = useRoute();
const itemsStore = useItemsStore();
const itemId = Number(route.params.id);
const item = itemsStore.getItemById(itemId);

if (item == undefined) {
    router.replace({ name: "items.home" });
}

function onCancelClick() {
    router.push({ name: "items.home" });
}

function onFormSubmit(draft: TicketItemDraft) {
    itemsStore.editItem(itemId, draft);
    router.push({ name: "items.home" });
}

function onDeleteClick() {
    itemsStore.removeItem(itemId);
    router.push({ name: "items.home" });
}
</script>

<template>
    <section>
        <div class="heading">
            <h1 class="heading-title">Modifier l'article</h1>
            <span class="btn btn-outlined btn-sm" @click="onCancelClick">annuler</span>
        </div>
        <TicketItemForm :draft="item" submit-text="Modifier" @submit="onFormSubmit"></TicketItemForm>
        <span class="btn btn-danger" @click="onDeleteClick">Supprimer</span>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    gap: 1rem;
}
</style>
