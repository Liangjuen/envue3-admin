import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import type { Router } from 'vue-router'

export default (router: Router) => {
    router.beforeEach(async (to, from, next) => {
        const userStore = useUserStore()
        // 未找到路由元信息跳转到 404
        if (to.matched.length === 0) {
            router.replace('/404')
            return next()
        }
        // 不需要鉴权在路由直接访问
        if (!to.meta.requiresAuth) {
            return next()
        }
        // 
        // 需要登录才能访问
        const token = userStore.token
        if (token) {
            // 如果是登录页
            if (to.path === '/login') {
                // 跳转到首页
                next('/')
            } else {
                const permissionStore = usePermissionStore()
                if (!permissionStore.routes || permissionStore.routes.length == 0) {
                    const accessRoutes = permissionStore.getRoutes()
                    accessRoutes.forEach((route) => {
                        router.addRoute(route)
                    })
                    next({ path: to.fullPath, replace: true, query: to.query })
                } else {
                    next()
                }
            }
        } else {
            next('/login')
        }
    })

    router.afterEach((to, from) => {
        document.title = to.meta.title + ' | ' + '后台管理系统'
    })
}