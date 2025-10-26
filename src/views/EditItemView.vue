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

function onCancelClick() {
    router.push({ name: "items.home" });
}

function onFormSubmit(draft: TicketItemDraft) {
    itemsStore.editItem(itemId, draft);
    router.push("/");
}
</script>

<template>
    <section class="flex col">
        <div class="flex row" style="align-items: center;">
            <h1 style="flex-grow: 1;">Modifier l'article</h1>
            <span class="btn btn-outlined btn-sm" @click="onCancelClick">annuler</span>
        </div>
        <TicketItemForm :draft="item" @submit="onFormSubmit"></TicketItemForm>
    </section>
</template>

<style scoped>
section {
    margin: 1rem;
    gap: 1rem;
}
</style>
