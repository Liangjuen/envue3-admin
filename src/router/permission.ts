import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import type { Router, RouteRecordRaw } from 'vue-router'

export default (router: Router) => {
    router.beforeEach(async (to, from, next) => {
        const userStore = useUserStore()
        const permissionStore = usePermissionStore()

        // 需要登录才能访问
        const token = userStore.token
        if (token) {
            // 如果是登录页
            if (to.path === '/login') {
                // 跳转到首页
                next('/')
            } else {
                // 添加动态路由
                if (!permissionStore.routes || permissionStore.routes.length == 0) {
                    const accessRoutes = permissionStore.getRoutes()
                    accessRoutes.forEach((route: RouteRecordRaw) => {
                        router.addRoute('Layout', route)
                    })
                    return next({ ...to, replace: true })
                } else {
                    next()
                }
            }
        } else {
            // 不需要鉴权在路由直接访问
            if (!to.meta.requiresAuth) {
                return next()
            } else {
                next('/login')
            }
        }
    })

    router.afterEach((to, from) => {
        document.title = to.meta.title + ' | ' + '后台管理系统'
    })
}