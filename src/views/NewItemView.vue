<script setup lang="ts">
import { useRouter } from "vue-router";
import { type TicketItemDraft } from '@/models/TicketItem';
import { useItemsStore } from "@/stores/items";
import TicketItemForm from '@/components/TicketItemForm.vue';

const router = useRouter();
const itemsStore = useItemsStore();

function onCancelClick() {
    router.push({ name: "items.home" });
}

function onFormSubmit(draft: TicketItemDraft) {
    itemsStore.addItem(draft);
    router.push({ name: "items.home" });
}
</script>

<template>
    <section class="flex col">
        <div class="flex row" style="align-items: center;">
            <h1 style="flex-grow: 1;">Ajouter un article</h1>
            <span class="btn btn-outlined btn-sm" @click="onCancelClick">annuler</span>
        </div>
        <TicketItemForm submit-text="Ajouter" @submit="onFormSubmit"></TicketItemForm>
    </section>
</template>

<style scoped>
section {
    margin: 1rem;
    gap: 1rem;
}
</style>
