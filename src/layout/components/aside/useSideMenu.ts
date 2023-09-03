import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { getMenus } from '@/utils'
import { usePermissionStore } from '@/stores/permission'
import useGlobalStore from '@/stores/global'

export const useSideMenu = () => {
    const globalStore = useGlobalStore()
    const permissionStore = usePermissionStore()
    permissionStore.getPermissions()
    permissionStore.getRoutes()

    const useBackDark = () => computed(() => (globalStore.themeStyle.menuBackDark ? {
        'background-color': "var(--theme-dark-bgc-color)",
        'text-color': "#fff"
    } : {}))

    const useMenus = () => computed(() => getMenus(permissionStore.permissions))

    const useIsCollapse = () => computed(() => globalStore.isCollapse)

    const useGlobalStoreToRefs = () => storeToRefs(globalStore)

    return {
        useBackDark,
        useMenus,
        useIsCollapse,
        useGlobalStoreToRefs
    }
}


