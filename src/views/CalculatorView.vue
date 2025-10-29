<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useDrawer } from '@/composables/useDrawer';
import { useNumberFormat } from "@/composables/useNumberFormat";
import type { Ticket } from "@/models/Ticket.ts";
import { ticketItemTotal } from "@/models/TicketItem.ts";
import { useTicketsStore } from "@/stores/tickets.ts";
import AppZoomControls from '@/components/AppZoomControls.vue';
import DrawerNav from "@/components/DrawerNav.vue";

const { formatCurrency } = useNumberFormat('fr-FR');

const { open } = useDrawer();
const router = useRouter();
const route = useRoute();

const ticketsStore = useTicketsStore();
const _ticket = ticketsStore.getTicket(Number(route.params.id));
const ticket = _ticket ? _ticket as Ticket : ticketsStore.createTicket();
const totalPrice = computed(() => ticket.items.reduce((sum, item) => sum + item.price * item.quantity, 0));

function onAddItemClick() {
    router.push({ name: "items.add", params: { id: ticket.id } });
}

function onEditItemClick(itemId: number) {
    router.push({ name: "items.edit", params: { ticketId: ticket.id, itemId: itemId } });
}
</script>

<template>
    <!-- Top toolbar -->
	<div class="toolbar toolbar-top toolbar-primary">
		<svg class="bi" width="24" height="24" fill="currentColor" @click="open({ component: DrawerNav, title: 'Menu' })">
			<use xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#list"/>
		</svg>
		<span>Ticket</span>
		<span class="toolbar-spacer"></span>
		<AppZoomControls></AppZoomControls>
	</div>

    <!-- New item Hero -->
    <section v-if="ticket.items.length == 0" class="new-item-hero">
        <p>Aucun article pour le moment</p>
        <button class="btn" @click="onAddItemClick">Ajouter un article</button>
    </section>
    <template v-else>
        <!-- Ticket items list -->
        <section class="ticket-list list">
            <div class="ticket-element list-item" v-for="(item, index) in ticket.items" :key="item.id" @click="onEditItemClick(index)">
                <div>{{ item.quantity }}</div>
                <div style="flex-grow: 1;">
                    {{ item.label }}
                    <span class="ticket-element-unit-price" v-if="item.quantity > 1"> ({{ formatCurrency(item.price) }})</span>
                </div>
                <div>{{ formatCurrency(ticketItemTotal(item)) }}</div>
            </div>
        </section>

        <!-- Floating action button -->
        <!-- <i class="new-item bi bi-plus" @click="onAddItemClick"></i> -->
        <span class="new-item btn btn-icon" @click="onAddItemClick">
            <svg class="bi" width="24" height="24" fill="currentColor">
                <use xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#plus"/>
            </svg>
        </span>
    </template>

    <!-- Bottom toolbar -->
    <div class="toolbar toolbar-fixed-bottom toolbar-primary">
        <span>{{ ticket.items.length }} articles</span>
        <span class="toolbar-spacer"></span>
        <span class="items-total-price">{{ formatCurrency(totalPrice) }}</span>
    </div>
</template>

<style scoped>
.items-total-price {
    font-weight: bold;
}

.new-item {
    position: fixed;
    right: 1rem;
    bottom: 3.5rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}

.new-item-hero {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    margin: 0 1rem;
    margin-top: 20vh;
    padding: 1rem 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
}
.new-item-hero > * {
    margin-top: 1rem;
}
.new-item-hero > button {
    width: 100%;
}

.ticket-list {
    margin: 1rem;
}

.ticket-element {
    display: flex;
    gap: 0.5rem;
}
.ticket-element-unit-price {
    color: var(--text-mutted-color);
}
</style>
