<script setup lang="ts">
import { useRouter, type RouteParamsRawGeneric, type RouteRecordNameGeneric } from 'vue-router';
import { useDrawer } from '@/composables/useDrawer';
import { useDateTimeFormat } from "@/composables/useDateTimeFormat";
import { useNumberFormat } from "@/composables/useNumberFormat";
import { useTicketsStore } from '@/stores/tickets';

const router = useRouter();
const drawer = useDrawer();
const { formatDateTime } = useDateTimeFormat();
const { formatCurrency } = useNumberFormat('fr-FR');
const ticketsStore = useTicketsStore();

const lastThreeTickets = ticketsStore.getLastNTickets(3);

function onLinkClick(routeName: RouteRecordNameGeneric, routeParams?: RouteParamsRawGeneric) {
	drawer.close();
	router.push({ name: routeName, params: routeParams });
}
</script>

<template>
	<section id="drawer-nav-stack">
		<div class="menu-header">Derniers tickets :</div>
		<div class="list list-flush">
			<span
				v-for="ticket in lastThreeTickets"
				class="list-item list-item-action"
				@click="onLinkClick('tickets.edit', { id: ticket.id })"
			>
				<span style="display: flex; flex-direction: row; gap: var(--size-050);">
					<span v-if="ticket.name">{{ ticket.name }}</span>
					<span v-else>{{ formatDateTime(ticket.created, { dateStyle: "short", timeStyle: "short" }) }}</span>
					<span style="color: #777">{{ ticket.totalQuantity }} articles</span>
					<span style="flex-grow: 1;"></span>
					<span>{{ formatCurrency(ticket.totalPrice) }}</span>
				</span>
			</span>
			<span class="list-item list-item-action" @click="onLinkClick('tickets.list')">Tous les tickets</span>
		</div>
		<div class="menu-header">Configuration :</div>
		<div class="list list-flush">
			<span class="list-item list-item-action" @click="onLinkClick('categories.home')">Catégories</span>
		</div>
	</section>
</template>

<style scoped>
section#drawer-nav-stack {
	display: flex;
	flex-direction: column;
	align-items: stretch;
}

.list {
	border-bottom: 1px solid #ddd;
}

.menu-header {
	margin-top: var(--size-200);
	margin-bottom: var(--size-050);
	padding-left: var(--size-100);
	font-size: calc(var(--size-100) * 0.9);
	font-weight: bold;
	color: #777;
}
</style>
