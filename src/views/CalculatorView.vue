<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useDrawer } from '@/composables/useDrawer';
import { useNumberFormat } from "@/composables/useNumberFormat";
import { Ticket } from "@/models/Ticket.ts";
import { useTicketsStore } from "@/stores/tickets.ts";
import DrawerNav from "@/components/DrawerNav.vue";
import TicketNameInlineForm from "@/components/TicketNameInlineForm.vue";

const { formatCurrency } = useNumberFormat('fr-FR');

const { open } = useDrawer();
const router = useRouter();
const route = useRoute();

const ticketsStore = useTicketsStore();
const ticket = ref(tryGetOrCreateTicket(Number(route.params.id)));

const editingTicketName = ref(false);
const morePopoverShow = ref(false);

watch(
	() => route.params.id,
	(id) => {
		ticket.value = tryGetOrCreateTicket(Number(id))
	},
);

function tryGetOrCreateTicket(id: number): Ticket {
	const maybeTicket = ticketsStore.getTicket(id);

	if (maybeTicket) {
		return maybeTicket;
	} else {
		return ticketsStore.createTicket();
	}
}

function onTicketNameSubmit(name: string) {
	ticketsStore.editTicket(ticket.value.id, name);
	editingTicketName.value = false;
}

function togglePopoverShow() {
	morePopoverShow.value = !morePopoverShow.value;
}

function deleteTicket() {
	ticketsStore.deleteTicket(ticket.value.id);
	router.push({ name: "tickets.list" });
}

function onAddItemClick() {
	router.push({ name: "items.add", params: { id: ticket.value.id } });
}

function onEditItemClick(itemId: number) {
	router.push({ name: "items.edit", params: { ticketId: ticket.value.id, itemId: itemId } });
}
</script>

<template>
	<!-- Top toolbar -->
	<div class="toolbar toolbar-fixed-top">
		<bi icon="list" @click="open({ component: DrawerNav, title: 'Menu' })" />
		<template v-if="editingTicketName == false">
			<span>{{ ticket.name || "Ticket" }}</span>
			<bi icon="pencil" :width="16" :height="16" @click="editingTicketName = true" />
			<span class="toolbar-spacer"></span>
			<div class="popover-container">
				<bi icon="three-dots-vertical" :width="20" :height="20" @click="togglePopoverShow" />
				<div class="popover-content" :class="{ 'show': morePopoverShow }">
					<div class="list">
						<div class="list-item" @click="deleteTicket">Supprimer</div>
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<TicketNameInlineForm style="flex-grow: 1;" :name="ticket.name" @submit="onTicketNameSubmit" @cancel="editingTicketName = false" />
		</template>
	</div>

	<!-- New item Hero -->
	<section v-if="ticket.items.length == 0" class="new-item-hero">
		<p>Aucun article pour le moment</p>
		<button class="btn btn-primary" @click="onAddItemClick">Ajouter un article</button>
	</section>
	<template v-else>
		<!-- Ticket items list -->
		<section class="ticket-list list">
			<div class="ticket-element list-item list-item-action" v-for="(item, index) in ticket.items" @click="onEditItemClick(index)">
				<div>{{ item.quantity }}</div>
				<div style="flex-grow: 1;">
					{{ item.label }}
					<span class="ticket-element-unit-price" v-if="item.quantity > 1"> ({{ formatCurrency(item.price) }})</span>
				</div>
				<div>{{ formatCurrency(item.total) }}</div>
			</div>
		</section>

		<!-- Floating action button -->
		<span class="new-item btn btn-icon btn-primary" @click="onAddItemClick">
			<bi icon="plus" />
		</span>
	</template>

	<!-- Bottom toolbar -->
	<div class="toolbar toolbar-fixed-bottom">
		<span>{{ ticket.items.length }} lignes - {{ ticket.totalQuantity }} articles</span>
		<span class="toolbar-spacer"></span>
		<span class="items-total-price">{{ formatCurrency(ticket.totalPrice) }}</span>
	</div>
</template>

<style scoped>
.items-total-price {
	font-weight: bold;
}

.new-item {
	position: fixed;
	right: calc(var(--space-4) + env(safe-area-inset-right));
	bottom: calc(3.5rem + env(safe-area-inset-bottom));
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
}

.new-item-hero {
	display: flex;
	flex-direction: column;
	gap: var(--space-4);
	justify-content: center;
	align-items: center;

	margin: 20vh var(--space-4);
	border-radius: var(--space-4);
	background-color: var(--color-surface-neutral);
	padding: var(--space-4) var(--space-4);
}
.new-item-hero > * {
	margin-top: var(--space-4);
}
.new-item-hero > p {
	color: var(--color-text-body);
}
.new-item-hero > button {
	width: 100%;
}

.ticket-list {
	margin: 1rem;
	margin-top: calc(var(--size-100) * 4);
	margin-bottom: calc(var(--size-100) * 7);
}

.ticket-element {
	display: flex;
	gap: 0.5rem;
}
.ticket-element-unit-price {
	color: var(--color-text-disabled);
}

.popover-container {
	position: relative;
}
.popover-content {
	display: none;
	position: absolute;
	top: 100%;
	right: 0;
}
.popover-content.show {
	display: block;
}
</style>
