declare namespace API {
    export type Permission = {
        id: string
        pid: string | null
        type: 1 | 2 | 3
        path: string
        name: string
        redirect?: string
        permission: string
        component: string | null
        title: string
        icon: string
        sort: number | null
        hidden: 0 | 1
        cache: 0 | 1
    }

    export type RolePermiss = {
        children?: RolePermiss[]
    } & Permission
}