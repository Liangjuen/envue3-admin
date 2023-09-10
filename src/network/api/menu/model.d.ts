declare namespace API {
    /**
     *  菜单类型 1: 菜单目录, 2: 页面, 3: 按钮
     */
    export type MenuType = 1 | 2 | 3

    export interface Menu {
        id: string
        pid: string | null
        path: string
        name: string
        redirect?: string
        type: MenuType
        title: string
        icon: string
        sort: number | null
        hidden: 0 | 1
        cache: 0 | 1
        component: string,
        children?: Menu[]
    }
}