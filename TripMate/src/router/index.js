import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/views/MainPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/board',
      name: 'board',
      component: import('@/views/board/BoardMainPage.vue')
    },
  ]
})

export default router
