import { isPermission } from '@/utils'
import { usePermissionStore } from '@/stores/permission'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'

export interface PermissionPoint {
    point: string,
    module: string
}
export type VPermissionPointTuple = [module: string, point: string]

export type VPermission = PermissionPoint | VPermissionPointTuple | string

export const usePermission = () => {
    const store = usePermissionStore()
    const { points } = storeToRefs(store)

    const permission = (value: VPermission, permissions: Ref<string[]>): boolean => {
        let code: string
        if (typeof value === 'string') {
            code = value
        } else if (Array.isArray(value)) {
            const [module, point] = value
            code = module + ':' + point
        } else {
            const { module, point } = value
            code = module + ':' + point
        }
        return isPermission(code, permissions.value)
    }

    const hasPermission = (point: VPermission): boolean => permission(point, points)

    return {
        hasPermission,
        permission
    }
}

