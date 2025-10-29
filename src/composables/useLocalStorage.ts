import { ref, watch } from "vue";

export function useLocalStorage<T>(
	storageKey: string,
	defaultValue: T,
	options?: {
		serializer: {
			read?: (raw: string) => T,
			write?: (value: T) => string,
		},
	},
) {
	const payload = init();

	watch(payload, write, { deep: true });

	function init() {
		let candidateInitialValue = read();
		return ref<T>(candidateInitialValue != null ? candidateInitialValue : defaultValue);
	}

	function read(): T | null {
		const str = localStorage.getItem(storageKey);
		let parsed: T | null = null;

		if (str != null) {
			try {
				parsed = options?.serializer.read ? options.serializer.read(str) : JSON.parse(str);
			} catch { }
		}

		return parsed;
	}

	function write(): void {
		if (payload.value) {
			localStorage.setItem(storageKey, options?.serializer.write ? options.serializer.write(payload.value) : JSON.stringify(payload.value));
		}
	}

	return payload;
};
