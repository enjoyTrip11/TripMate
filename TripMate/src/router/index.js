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
      path: '/',
      name: 'map',
      component: MainPage
    },
    {
      path: '/',
      name: 'plan',
      component: MainPage
    },
    {
      path: '/',
      name: 'hotplace',
      component: MainPage
    },
    {
      path: '/board',
      name: 'board',
      component: import('@/views/board/BoardMainPage.vue')
      // component: import('@/views/board/BoardDetail.vue')
    },
    {
      path: '/board/createId',
      name: 'boardCreate',
      component: import('@/views/board/BoardCreate.vue')
    },
    {
      path: '/board/detailId',
      name: 'boardDetail',
      component: import('@/views/board/BoardDetail.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      component: import('@/views/weather/WeatherMainPage.vue')
    },
    {
      path: '/',
      name: 'login',
      component: MainPage
    },
    {
      path: '/',
      name: 'logout',
      component: MainPage
    },
    {
      path: '/',
      name: 'join',
      component: MainPage
    },
    {
      path: '/',
      name: 'profile',
      component: MainPage
    },
  ]
})

export default router
