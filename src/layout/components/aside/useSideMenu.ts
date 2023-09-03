import { computed } from 'vue'
import { getMenus } from '@/utils'
import { usePermissionStore } from '@/stores/permission'

export default () => {
    const permissionStore = usePermissionStore()
    permissionStore.getPermissions()
    permissionStore.getRoutes()

    const useMenus = () => computed(() => getMenus(permissionStore.permissions))

    return {
        useMenus,
    }
}


