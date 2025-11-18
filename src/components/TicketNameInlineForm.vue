<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
	name?: string,
}>();

const emit = defineEmits<{
	submit: [name: string],
	cancel: [],
}>();

const ticketName = ref(props.name || "");

function onSubmit() {
	if (ticketName.value.length > 0) {
		emit('submit', ticketName.value);
	}
}
</script>

<template>
	<section>
		<input v-model="ticketName" type="text" placeholder="Nom du ticket" autofocus>
		<span style="flex-grow: 1;"></span>
		<bi icon="check2" @click="onSubmit" />
		<bi icon="x" @click="emit('cancel')" />
	</section>
</template>

<style scoped>
section {
	display: flex;
	gap: var(--size-050);
}
</style>
