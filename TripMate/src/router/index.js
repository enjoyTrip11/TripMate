import PlanCreatePage from '@/views/Plan/PlanCreatePage.vue'
import PlanListPage from '@/views/Plan/PlanListPage.vue'
import PlanMainPage from '@/views/Plan/PlanMainPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView
    },
    {
      path: '/plan',
      name: 'plan',
      component: PlanMainPage
    },
    {
      path: '/plancreate',
      name: 'plancreate',
      component: PlanCreatePage
    },
    {
      path: '/planlist',
      name: 'planlist',
      component: PlanListPage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
