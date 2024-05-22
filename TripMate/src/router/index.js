import Login from '@/views/Login/Login.vue'
import SignUp from '@/views/Login/SignUp.vue'
import PlanCreatePage from '@/views/Plan/PlanCreatePage.vue'
import PlanListPage from '@/views/Plan/PlanListPage.vue'
import PlanMainPage from '@/views/Plan/PlanMainPage.vue'
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
      name: 'hotplace',
      component: MainPage
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/Board/BoardMainPage.vue')
      // component: import('@/views/board/BoardDetail.vue')
    },
    {
      path: '/board/createId',
      name: 'boardCreate',
      component: () => import('@/views/Board/BoardCreate.vue')
    },
    {
      path: '/board/detailId',
      name: 'boardDetail',
      component: () => import('@/views/Board/BoardDetail.vue')
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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
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
