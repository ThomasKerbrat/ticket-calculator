<script setup lang="ts">
import { useDrawer } from '@/composables/useDrawer';
import { useRouter, type RouteParamsRawGeneric, type RouteRecordNameGeneric } from 'vue-router';

const router = useRouter();
const drawer = useDrawer();

function onLinkClick(routeName: RouteRecordNameGeneric, routeParams?: RouteParamsRawGeneric) {
	drawer.close();
	router.push({ name: routeName, params: routeParams });
}
</script>

<template>
	<section id="drawer-nav-stack">
		<div class="list list-flush">
			<span class="list-item list-item-action" @click="onLinkClick('items.home')">Ticket</span>
			<span class="list-item list-item-action" @click="onLinkClick('categories.home')">Catégories</span>
		</div>
		<div class="menu-header">Derniers tickets :</div>
		<div class="list list-flush">
			<span class="list-item list-item-action" @click="onLinkClick('tickets.home', { id: null })">01/02/0304</span>
			<span class="list-item list-item-action">01/02/0304</span>
			<span class="list-item list-item-action">01/02/0304</span>
			<span class="list-item list-item-action" @click="onLinkClick('tickets.home')">Tous les tickets</span>
		</div>
	</section>
</template>

<style scoped>
section#drawer-nav-stack {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	margin-top: var(--size-100);
}

.list {
	border-bottom: 1px solid #ddd;
}

.menu-header {
	margin-top: var(--size-100);
	margin-bottom: var(--size-050);
	padding-left: var(--size-100);
	font-size: calc(var(--size-100) * 0.9);
	font-weight: bold;
	color: #777;
}
</style>
