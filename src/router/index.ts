import { createRouter, createWebHistory } from 'vue-router'
import CalculatorView from '@/views/CalculatorView.vue'
import NewItemView from '@/views/NewItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: CalculatorView,
    },
    {
      path: "/new-item",
      component: NewItemView,
    },
  ],
})

export default router
