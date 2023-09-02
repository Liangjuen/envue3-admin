import { usePermissionStore } from '@/stores/permission'
import { useUserStore } from '@/stores/user'

export const useUserLogin = () => {
    return () => {
        const userStore = useUserStore()
        userStore.token = 'token'
        const permissionStore = usePermissionStore()
        permissionStore.getPermissions()
        permissionStore.getRoutes()
    }
}