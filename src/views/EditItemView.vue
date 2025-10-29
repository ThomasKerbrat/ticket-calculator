<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { type TicketItemDraft } from '@/models/TicketItem';
import { useTicketsStore } from "@/stores/tickets.ts";
import TicketItemForm from '@/components/TicketItemForm.vue';

const router = useRouter();
const route = useRoute();
const ticketsStore = useTicketsStore();
const itemId = Number(route.params.id);
const item = ticketsStore.getItemById(itemId);

if (item == undefined) {
    router.replace({ name: "tickets.edit" });
}

function onCancelClick() {
    router.push({ name: "tickets.edit" });
}

function onFormSubmit(draft: TicketItemDraft) {
    ticketsStore.editItem(itemId, draft);
    router.push({ name: "tickets.edit" });
}

function onDeleteClick() {
    ticketsStore.removeItem(itemId);
    router.push({ name: "tickets.edit" });
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
