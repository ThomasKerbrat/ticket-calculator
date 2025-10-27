<script setup lang="ts">
import { useDrawer } from '@/composables/useDrawer';

const { isOpen, currentComponent, currentProps, title, close } = useDrawer();
</script>

<template>
	<Teleport to="body">
		<!-- Overlay -->
		<div v-if="isOpen" class="drawer-overlay" @click="close"></div>

		<!-- Panel -->
		<aside :class="['drawer', { 'drawer-open': isOpen }]">
			<div class="drawer-header">
				<i class="close-btn bi bi-x" @click="close"></i>
				<h3 v-if="title">{{ title }}</h3>
			</div>

			<div class="drawer-content">
				<component :is="currentComponent" v-bind="currentProps"></component>
			</div>
		</aside>
	</Teleport>
</template>

<style scoped>
.drawer-overlay {
	position: fixed;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
}

.drawer {
	position: fixed;
	top: 0;
	left: 0;
	width: 320px;
	height: 100%;
	background-color: white;
	transform: translateX(-100%);
	z-index: 1000;
	display: flex;
	flex-direction: column;
}

.drawer-open {
	transform: translateX(0);
	box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.drawer-header {
	padding: 0.5rem;
	border-bottom: 1px solid #eee;
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 1rem;
	font-weight: 600;
}

.close-btn {
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}

.drawer-content {
	flex: 1;
	overflow-y: auto;
	padding: 1rem;
}
</style>
