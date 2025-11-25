import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import BootstrapIcon from "./components/BootstrapIcon.vue";

import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "./styles/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("bi", BootstrapIcon);

declare module "vue" {
	interface GlobalComponents {
		bi: typeof BootstrapIcon;
	}
}

app.mount("#app");
