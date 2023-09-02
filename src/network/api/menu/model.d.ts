declare namespace API {
    /**
     *  菜单类型 1: 菜单目录, 2: 页面, 3: 按钮
     */
    export type MenuType = 1 | 2 | 3

    export interface MenuMeta {
        type: MenuType
        title: string
        icon: string
        sort: number | null
        hidden: 0 | 1
        cache: 0 | 1
    }

    export interface Menu {
        path: string
        name: string
        meta: MenuMeta,
        component: string,
        children?: Menu[]
    }
}