<script setup lang="ts">
import AppZoomControls from './components/AppZoomControls.vue';
import Drawer from './components/drawer.vue';
import { useDrawer } from './composables/useDrawer';

const { open } = useDrawer();
</script>

<template>
	<div class="navbar">
		<i id="btn-drawer" class="bi bi-list" @click="open({ component: {}, title: 'Menu' })"></i>
		<input style="flex-grow: 1;" type="text" value="ticket">
		<AppZoomControls></AppZoomControls>
	</div>
	<RouterView></RouterView>
	<Drawer></Drawer>
</template>

<style scoped>
.navbar {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	border-bottom: 1px solid #ddd;
	padding: 0.5rem;
	background-color: #eee;
}

#btn-drawer {
	font-size: 1.5rem;
}
</style>
