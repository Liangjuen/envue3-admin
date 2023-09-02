import { createRouter, createWebHistory } from 'vue-router'
import permission from './permission'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: { title: '首页', icon: 'home', affix: true, sort: 1, requiresAuth: true },
        },
      ],
      meta: { requiresAuth: false }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/notfound/index.vue'),
      meta: { title: '未找到', icon: 'notfound', affix: true, sort: 1, requiresAuth: false }
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('@/views/login/index.vue'),
      meta: { title: '未找到', icon: 'notfound', affix: true, sort: 1, requiresAuth: false }
    }
  ]
})

permission(router)
export default router
