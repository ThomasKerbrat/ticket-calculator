<script setup lang="ts">
import { computed } from "vue";
import sprites from "@bi/bootstrap-icons.svg?url";

const {
	icon,
	width = 24,
	height = 24,
} = defineProps<{
	icon: string;
	width?: number;
	height?: number;
}>();

const href = computed(() => `${sprites}#${icon}`);
</script>

<template>
	<svg class="bi" :width="width" :height="height" fill="currentColor">
		<use v-bind:xlink:href="href"/>
	</svg>
</template>
