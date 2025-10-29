<script setup lang="ts">
import { ref } from "vue";

let rootRem = ref(16);
function onZoomInClick() {
	rootRem.value += 2;
	document.querySelector("html")!.style.fontSize = `${rootRem.value}px`;
}

function onZoomOutClick() {
	rootRem.value -= 2;
	document.querySelector("html")!.style.fontSize = `${rootRem.value}px`;
}
</script>

<template>
	<section class="app-zoom-controls">
		<i class="bi bi-zoom-out" @click="onZoomOutClick"></i>
		<span>{{ rootRem }}</span>
		<i class="bi bi-zoom-in" @click="onZoomInClick"></i>
	</section>
</template>

<style scoped>
.app-zoom-controls {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
</style>
