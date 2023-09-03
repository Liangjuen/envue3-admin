import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { Names } from './store-name'
import { getRolePermission } from '@/mock/permission'
import { rolePermissionToTree, getMenus } from '@/utils'
import Layout from '@/layout/index.vue'

//双星号是递归解释器遍历文件和文件夹的占位符或指令。它是一个简单的递归通配符，而只有一个星号表示全部没有递归
const modules = import.meta.glob('../views/**/**.vue')

export const usePermissionStore = defineStore(Names.PERMISSTION, {
    state: () => ({
        routes: new Array<RouteRecordRaw>(),
        permissions: new Array<API.RolePermiss>()
    }),
    actions: {
        getPermissions() {
            const permissions = getRolePermission()
            this.permissions = rolePermissionToTree(permissions)
        },
        getRoutes() {
            const permissions = getRolePermission()
            // 过滤出按钮权限
            const list = permissions.filter(item => item.type !== 3)
            const menus = getMenus(rolePermissionToTree(list))
            const mapMenu = (menu: API.Menu): RouteRecordRaw => {
                const { path, name, component, children, meta, } = menu
                return {
                    path,
                    name,
                    meta: { ...meta, requiresAuth: true },
                    component: component ? (() => import(`@/views/${component}/index.vue`)) : Layout,
                    children: children?.map(mapMenu)
                }
            }
            const routes = menus.map(mapMenu)
            this.routes = routes
            return routes
        }
    },
    lasting: {
        enabled: true,
        strategies: {
            storage: localStorage,
            key: Names.PERMISSTION,
            exclude: []
        }
    }
})
