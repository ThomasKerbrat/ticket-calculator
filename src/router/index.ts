import { createRouter, createWebHistory } from "vue-router";
import CalculatorView from "@/views/CalculatorView.vue";
import NewItemView from "@/views/NewItemView.vue";
import EditItemView from "@/views/EditItemView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: { name: "tickets.edit" },
        },
        {
            name: "tickets.edit",
            path: "/tickets/:id?",
            component: CalculatorView,
        },
        {
            name: "items.add",
            path: "/tickets/:id/new-item",
            component: NewItemView,
        },
        {
            name: "items.edit",
            path: "/tickets/:ticketId/items/:itemId",
            component: EditItemView,
        }
    ],
});

export default router;
