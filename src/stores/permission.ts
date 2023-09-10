import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { Names } from './store-name'
import { getRolePermission } from '@/mock/permission'
import { rolePermissionToTree, getMenus } from '@/utils'
import PageLayout from '@/components/Page/index.vue'

//双星号是递归解释器遍历文件和文件夹的占位符或指令。它是一个简单的递归通配符，而只有一个星号表示全部没有递归
const modules = import.meta.glob('../views/**/**.vue')

export const usePermissionStore = defineStore(Names.PERMISSTION, {
    state: () => ({
        routes: new Array<RouteRecordRaw>(),
        permissions: new Array<API.RolePermiss>(),
        points: new Array<string>()
    }),
    actions: {
        getPermissions() {
            const permissions = getRolePermission()
            // 将所有按钮权限过滤处理存储为 ['x:y'] 格式 x 为页面唯一标识，y为控制点(按钮权限)
            this.points = permissions.filter(i => i.type == 3).map(p => p.permission)
            this.permissions = rolePermissionToTree(permissions)
            return rolePermissionToTree(permissions)
        },
        getRoutes() {
            const permissions = getRolePermission()
            // 过滤出按钮权限(第一层级)
            const list = permissions.filter(item => item.type !== 3)
            const menus = getMenus(rolePermissionToTree(list))
            const mapMenu = (menu: API.Menu): RouteRecordRaw => {
                const {
                    path,
                    name,
                    component,
                    children,
                    type,
                    title,
                    icon,
                    sort,
                    hidden,
                    cache,
                    redirect
                } = menu
                return {
                    path,
                    name,
                    redirect: redirect ? redirect : undefined,
                    meta: {
                        type,
                        title,
                        icon,
                        sort,
                        hidden,
                        cache,
                        requiresAuth: true
                    },
                    component: component ? modules[`../views/${component}/index.vue`] : PageLayout,
                    children: children?.map(mapMenu).filter(item => item.meta?.type !== 3) || []
                }
            }
            const routes = menus.map(mapMenu).filter(item => item.meta?.type !== 3)
            this.routes = routes
            return routes
        }
    },
    lasting: {
        enabled: true,
        strategies: {
            storage: localStorage,
            key: Names.PERMISSTION,
            exclude: ['routes']
        }
    }
})
