import { defineStore } from "pinia";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { Category } from "@/models/Category";

function readCategoriesSerializer(raw: string): Category[] {
	const rawArray: any[] = JSON.parse(raw);
	const dataArray: Category[] = rawArray.map(item => Category.fromJSON(item));
	return dataArray;
}

export const useCategoryStore = defineStore("categories", () => {
	const categories = useLocalStorage<Category[]>("categories", [], { serializer: { read: readCategoriesSerializer } });
    let nextId = categories.value.length > 0 ? Math.max(...categories.value.map((category: any) => category.id)) + 1 : 1;

	function createCategory(name: string): void {
		const category = new Category(nextId, name);
		categories.value.push(category);
		nextId++;
	}

	function editCategory(id: number, name: string): void {
		const index = categories.value.findIndex(cat => cat.id == id);
		if (index == -1) { return; }
		categories.value[index]!.name = name;
	}

	function deleteCategory(index: number): void {
		if (index == -1) { return; }
		categories.value.splice(index, 1);
	}

	function moveUp(id: number) {
		const index = categories.value.findIndex(cat => cat.id == id);
		if (index == -1 || index == 0) { return; }
		const category = categories.value.splice(index, 1)[0] as Category;
		categories.value.splice(index - 1, 0, category);
	}

	function moveDown(id: number) {
		const index = categories.value.findIndex(cat => cat.id == id);
		if (index == -1 || index == categories.value.length - 1) { return; }
		const category = categories.value.splice(index, 1)[0] as Category;
		categories.value.splice(index + 1, 0, category);
	}

	return {
		categories,
		createCategory,
		editCategory,
		deleteCategory,
		moveUp,
		moveDown,
	};
});
