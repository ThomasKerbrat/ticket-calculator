<script setup lang="ts">
import NewItemView from './views/NewItemView.vue';
import Drawer from './components/drawer.vue';
import { useDrawer } from './composables/useDrawer';

const { open } = useDrawer();
</script>

<template>
	<div class="navbar">
		<span class="navbar-primary-action" @click="open({ component: NewItemView })">☰</span>
		<input style="flex-grow: 1;" type="text" value="ticket">
		<span class="navbar-secondary-action btn btn-outlined">Nouveau ticket</span>
	</div>
	<RouterView></RouterView>
	<Drawer></Drawer>
</template>

<style scoped>
.navbar {
	display: flex;
	flex-direction: row;
	gap: 1rem;
	border-bottom: 1px solid #ddd;
	padding: 0.5rem;
	background-color: #eee;
}
.navbar-primary-action {
	width: 2.5rem;
	height: 2.5rem;

	/* border: 1px solid #ddd;
	border-radius: 0.25rem;
	padding: 0.5rem; */

	font-size: 1.5rem;
	text-align: center;
	vertical-align: middle;
}
.navbar-secondary-action {
	text-wrap: nowrap;
}
</style>
