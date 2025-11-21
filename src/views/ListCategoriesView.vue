<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDrawer } from '@/composables/useDrawer';
import { useCategoryStore } from '@/stores/category';
import DrawerNav from "@/components/DrawerNav.vue";

const { open } = useDrawer();
const categoriesStore = useCategoryStore();
const categoryName = ref("");

const editedCategoryIndex = ref(-1);
const editedCategoryMap = computed(() => categoriesStore.categories.map((_, index) => editedCategoryIndex.value == index));
const editedCategoryName = ref("");

function toggleEdit(index: number) {
	if (editedCategoryIndex.value == index) {
		editedCategoryIndex.value = -1;
		editedCategoryName.value = "";
	} else {
		editedCategoryIndex.value = index;
		editedCategoryName.value = categoriesStore.categories[editedCategoryIndex.value]!.name;
	}
}

function onCategoryNameSubmit() {
	categoriesStore.editCategory(categoriesStore.categories[editedCategoryIndex.value]!.id, editedCategoryName.value);
	toggleEdit(editedCategoryIndex.value);
}

function onCategoryDelete(index: number) {
	toggleEdit(index);
	categoriesStore.deleteCategory(index);
}

function onSubmit() {
	if (categoryName.value.length === 0) { return; }
	categoriesStore.createCategory(categoryName.value);
	categoryName.value = "";
}
</script>

<template>
	<!-- Top toolbar -->
	<div class="toolbar toolbar-fixed-top toolbar-primary">
        <bi icon="list" @click="open({ component: DrawerNav, title: 'Menu' })" />
		<span>Catégories</span>
	</div>

	<main>
		<!-- list -->
		<div id="categories-list" class="list" v-if="categoriesStore.categories.length > 0">
			<div class="list-item" v-for="(cat, index) in categoriesStore.categories">
				<template v-if="editedCategoryMap[index] == false">
					<span @click="toggleEdit(index)">{{ cat.name }}</span>
					<span class="spacer"></span>
					<bi icon="chevron-up" @click="categoriesStore.moveUp(cat.id)" :class="{ 'muted': index == 0 }"/>
					<bi icon="chevron-down" @click="categoriesStore.moveDown(cat.id)" :class="{ 'muted': index == categoriesStore.categories.length - 1 }"/>
				</template>
				<template v-else>
					<bi icon="trash" @click="onCategoryDelete(index)" />
					<form @submit.prevent="onCategoryNameSubmit">
						<input autofocus v-model="editedCategoryName">
					</form>
					<bi icon="check2" @click="onCategoryNameSubmit" />
					<bi icon="x" @click="toggleEdit(index)" />
				</template>
			</div>
		</div>

		<form @submit.prevent="onSubmit">
			<div class="category-form">
				<input class="input-control name-input" type="text" placeholder="Nom de la nouvelle catégorie" v-model="categoryName">
				<button class="btn">Ok</button>
			</div>
		</form>
	</main>
</template>

<style lang="css" scoped>
.spacer {
	flex-grow: 1;
}

main {
	margin: var(--size-100);
	margin-top: calc(var(--size-100) * 4);
}

#categories-list {
	margin-bottom: var(--size-100);
}
#categories-list .list-item {
	display: flex;
	align-items: center;
	gap: var(--size-050);
}
#categories-list .list-item form {
	flex-grow: 1;
	margin-left: var(--size-050);
}
#categories-list .muted {
	color: var(--text-disabled-color);
}

.category-form {
	display: flex;
	gap: var(--size-050);
}
.name-input {
	flex-grow: 1;
}
</style>
