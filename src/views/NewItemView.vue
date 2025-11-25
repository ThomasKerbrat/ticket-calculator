<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { type TicketItemDraft } from '@/models/TicketItem';
import { useTicketsStore } from "@/stores/tickets.ts";
import TicketItemForm from '@/components/TicketItemForm.vue';

const router = useRouter();
const route = useRoute();
const ticketId = Number(route.params.id);
const ticketsStore = useTicketsStore();

function onCancelClick() {
	router.push({ name: "tickets.edit", params: { id: ticketId } });
}

function onFormSubmit(draft: TicketItemDraft) {
	ticketsStore.addItem(ticketId, draft);
	router.push({ name: "tickets.edit", params: { id: ticketId } });
}
</script>

<template>
	<section>
		<div class="heading">
			<h1 class="heading-title">Ajouter un article</h1>
			<span class="btn btn-outlined btn-sm" @click="onCancelClick">annuler</span>
		</div>
		<TicketItemForm submit-text="Ajouter" @submit="onFormSubmit"></TicketItemForm>
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
