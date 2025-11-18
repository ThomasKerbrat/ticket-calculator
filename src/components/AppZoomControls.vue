<script setup lang="ts">
import { ref } from "vue";

let rootRem = ref(16);
function onZoomInClick() {
	rootRem.value += 2;
	document.querySelector("html")!.style.setProperty("--sizing", `${rootRem.value}px`);
}

function onZoomOutClick() {
	rootRem.value -= 2;
	document.querySelector("html")!.style.setProperty("--sizing", `${rootRem.value}px`);
}
</script>

<template>
	<section class="app-zoom-controls">
		<bi icon="zoom-out" @click="onZoomOutClick" />
		<span>{{ rootRem }}</span>
		<bi icon="zoom-in" @click="onZoomInClick" />
	</section>
</template>

<style scoped>
.app-zoom-controls {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
</style>
