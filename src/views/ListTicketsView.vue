<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDrawer } from '@/composables/useDrawer';
import { useDateTimeFormat } from "@/composables/useDateTimeFormat.ts"
import { useNumberFormat } from "@/composables/useNumberFormat";
import { useTicketsStore } from "@/stores/tickets.ts";
import DrawerNav from "@/components/DrawerNav.vue";

const router = useRouter();
const { tickets: _tickets, createTicket } = useTicketsStore();
const tickets = computed(() => _tickets.filter(() => true).reverse());

if (tickets.value.length === 0) {
	createTicketAndNavigateToTicketEdit();
}

const { open } = useDrawer();
const { formatDateTime } = useDateTimeFormat("fr-FR");
const { formatCurrency } = useNumberFormat('fr-FR');

function createTicketAndNavigateToTicketEdit() {
	const ticket = createTicket();
	router.push({ name: "tickets.edit", params: { id: ticket.id }});
}

function onTicketClick(id: number) {
	router.push({ name: "tickets.edit", params: { id }});
}

function onNewTicketClick() {
	createTicketAndNavigateToTicketEdit();
}
</script>

<template>
	<!-- Top toolbar -->
	<div class="toolbar toolbar-top toolbar-primary">
		<bi icon="list" @click="open({ component: DrawerNav, title: 'Menu' })" />
		<span>Tickets</span>
	</div>

	<main>
		<section class="list">
			<div class="list-item list-item-action" style="display: flex; gap: var(--size-050);" v-for="ticket in tickets" @click="onTicketClick(ticket.id)">
				<span v-if="ticket.name">{{ ticket.name }}</span>
				<span v-else>{{ formatDateTime(ticket.created, { dateStyle: "short", timeStyle: "short" }) }}</span>
				<span style="color: #777;">{{ ticket.totalQuantity }} article(s)</span>
				<span style="flex-grow: 1;"></span>
				<span>{{ formatCurrency(ticket.totalPrice) }}</span>
			</div>
		</section>
	</main>

	<div id="new-ticket">
		<span class="btn btn-primary" @click="onNewTicketClick">Nouveau ticket</span>
	</div>
</template>

<style scoped>
main {
	margin: var(--size-100);
}

#new-ticket {
	position: fixed;
	bottom: 0px;
	width: 100%;
	padding: var(--size-100);
}
#new-ticket > .btn {
	width: 100%;
}
</style>
