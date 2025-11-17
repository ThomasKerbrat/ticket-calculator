<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { useDrawer } from '@/composables/useDrawer';
import { useDateTimeFormat } from "@/composables/useDateTimeFormat.ts"
import { useNumberFormat } from "@/composables/useNumberFormat";
import { useTicketsStore } from "@/stores/tickets.ts";
import DrawerNav from "@/components/DrawerNav.vue";

const route = useRoute();
const router = useRouter();
const { tickets, createTicket } = useTicketsStore();

if (tickets.length === 0) {
	const ticket = createTicket();
	router.push({ name: "tickets.edit", params: { id: ticket.id }});
}

const { open } = useDrawer();
const { formatDateTime } = useDateTimeFormat("fr-FR");
const { formatCurrency } = useNumberFormat('fr-FR');

function onTicketClick(id: number) {
	router.push({ name: "tickets.edit", params: { id }});
}
</script>

<template>
	<!-- Top toolbar -->
	<div class="toolbar toolbar-top toolbar-primary">
		<svg class="bi" width="24" height="24" fill="currentColor" @click="open({ component: DrawerNav, title: 'Menu' })">
			<use xlink:href="@bi#list"/>
		</svg>
		<span>Tickets</span>
		<!-- <span class="toolbar-spacer"></span> -->
	</div>

	<main>
		<section class="list">
			<div class="list-item" style="display: flex; gap: var(--size-050);" v-for="ticket in tickets" @click="onTicketClick(ticket.id)">
				<span>{{ formatDateTime(ticket.created, { dateStyle: "short", timeStyle: "short" }) }}</span>
				<span style="color: #777;">{{ ticket.totalQuantity }} article(s)</span>
				<span style="flex-grow: 1;"></span>
				<span>{{ formatCurrency(ticket.totalPrice) }}</span>
			</div>
		</section>
	</main>
</template>

<style scoped>
main {
	margin: var(--size-100);
}
</style>
