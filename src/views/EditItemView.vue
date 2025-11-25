<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { type TicketItemDraft } from '@/models/TicketItem';
import { useTicketsStore } from "@/stores/tickets.ts";
import TicketItemForm from '@/components/TicketItemForm.vue';

const router = useRouter();
const route = useRoute();
const ticketsStore = useTicketsStore();
const ticketId = Number(route.params.ticketId);
const itemId = Number(route.params.itemId);
const item = ticketsStore.getTicket(ticketId)?.items[itemId];

if (item == undefined) {
	router.replace({ name: "tickets.edit", params: { id: ticketId } });
}

function onCancelClick() {
	router.push({ name: "tickets.edit", params: { id: ticketId } });
}

function onFormSubmit(draft: TicketItemDraft) {
	ticketsStore.editItem(ticketId, itemId, draft);
	router.push({ name: "tickets.edit", params: { id: ticketId } });
}

function onDeleteClick() {
	ticketsStore.removeItem(ticketId, itemId);
	router.push({ name: "tickets.edit", params: { id: ticketId } });
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
