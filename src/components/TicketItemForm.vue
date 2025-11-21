<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TicketItem, TicketItemDraft } from '@/models/TicketItem';
import { useNumberFormat } from "@/composables/useNumberFormat";
const { formatCurrency } = useNumberFormat('fr-FR');

const props = defineProps<{
	draft?: TicketItem,
	submitText: string,
}>();

const emit = defineEmits<{
	(e: "submit", draft: TicketItemDraft): void,
}>();

const draft = ref<TicketItemDraft>(props.draft ? { ...props.draft } : { quantity: 1 });

const fullPrice = computed(() => {
	if (draft.value.price == undefined || draft.value.quantity == undefined) {
		return 0;
	}

	return draft.value.price * draft.value.quantity;
});

function decreaseQuantity() {
	if (draft.value.quantity != undefined) {
		draft.value.quantity -= 1;
	} else {
		draft.value.quantity = 1;
	}
}

function increaseQuantity() {
	if (draft.value.quantity != undefined) {
		draft.value.quantity += 1;
	} else {
		draft.value.quantity = 1;
	}
}

function onFormSubmit() {
	if (
		draft.value.label == undefined
		|| draft.value.label.length === 0
		|| draft.value.price == undefined
		|| draft.value.quantity == undefined
	) {
		return;
	}

	emit("submit", draft.value);
}
</script>

<template>
	<form @submit.prevent="onFormSubmit" class="new-ticket-item-form">
		<input class="input-control" v-model="draft.label" type="text" placeholder="Article">
		<div class="form-price">
			<input class="price-input input-control" v-model="draft.price" type="number" placeholder="Prix" min="0" step="0.01">
			<span>{{ formatCurrency(fullPrice) }}</span>
		</div>
		<div class="form-quantity flex row">
			<input class="quantity-input input-control" v-model="draft.quantity" type="number" placeholder="Quantité" min="0">
			<span class="input-spinner" @click="decreaseQuantity">-</span>
			<span class="input-spinner" @click="increaseQuantity">+</span>
		</div>
		<button class="btn submit-button">{{ props.submitText }}</button>
	</form>
</template>

<style scoped>
.new-ticket-item-form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.form-price {
	display: flex;
	align-items: baseline;
	gap: 1rem;
}
.price-input {
	flex-grow: 1;
}

.form-quantity {
	display: flex;
}
.quantity-input {
	flex-grow: 1;
}
.input-spinner {
	display: inline-block;
	border: 1px solid #eee;
	border-left: none;
	padding-top: 0.375rem;
	width: 2.5rem;
	font-size: 1.25rem;
	text-align: center;
	color: #555;
}
</style>
