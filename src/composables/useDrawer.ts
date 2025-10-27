import { readonly, ref, shallowRef } from "vue";

const isOpen = ref(true);
const currentComponent = shallowRef<object | null>(null);
const currentProps = ref({});
const title = ref("");

export function useDrawer() {
	function open(options: { component: object, props?: object, title?: string }) {
		currentComponent.value = options.component;
		currentProps.value = options.props || {};
		title.value = options.title || "";
		isOpen.value = true;
	}

	function close() {
		isOpen.value = false;
		// TODO: Delay to wait for animation
        currentComponent.value = null;
        currentProps.value = {};
        title.value = "";
	}

	return {
		isOpen: readonly(isOpen),
		currentComponent: readonly(currentComponent),
		currentProps: readonly(currentProps),
		title: readonly(title),
		open,
		close,
	};
};
