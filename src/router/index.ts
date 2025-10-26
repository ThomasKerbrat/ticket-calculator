import { createRouter, createWebHistory } from "vue-router";
import CalculatorView from "@/views/CalculatorView.vue";
import NewItemView from "@/views/NewItemView.vue";
import EditItemView from "@/views/EditItemView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: "items.home",
            path: "/",
            component: CalculatorView,
        },
        {
            name: "items.add",
            path: "/new-item",
            component: NewItemView,
        },
        {
            name: "items.edit",
            path: "/edit-item/:id",
            component: EditItemView,
        }
    ],
});

export default router;
