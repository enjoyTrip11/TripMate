import Login from '@/views/login/Login.vue'
import PlanCreatePage from '@/views/plan/PlanCreatePage.vue'
import PlanListPage from '@/views/plan/PlanListPage.vue'
import PlanMainPage from '@/views/plan/PlanMainPage.vue'
import MainPage from '@/views/MainPage.vue';

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/map',
      name: 'map',
      component: () => import ('@/views/map/MapMainPage.vue')
    },
    {
      path: '/hotplace',
      name: 'hotplace',
      component: () => import ('@/views/hotplace/HotPlaceMainPage.vue')
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/board/BoardMainPage.vue')
      // component: import('@/views/board/BoardDetail.vue')
    },
    {
      path: '/board/write',
      name: 'boardCreate',
      component: () => import('@/views/board/BoardCreate.vue')
    },
    {
      path: '/board/detail/:boardId',
      name: 'boardDetail',
      component: () => import('@/views/board/BoardDetail.vue')
    },
    {
      path: '/board/write/:boardId',
      name: 'boardModify',
      component: () => import('@/views/board/BoardModify.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('@/views/weather/WeatherMainPage.vue')
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
    {
      path: '/plan',
      name: 'plan',
      component: PlanMainPage
    },
    {
      path: '/plan/create',
      name: 'planCreate',
      component: PlanCreatePage
    },
    {
      path: '/plan/list',
      name: 'planList',
      component: PlanListPage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
