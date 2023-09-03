
declare namespace THEME {
    export type MenuModeValue = 'vertical' | 'horizontal'
    export type MenuModeName = '横向' | '纵向'
    export type Theme = 'dark' | 'light'
    export type MenuMode = {
        name: MenuModeName
        value: MenuModeValue
    }

    export type ThemeColor = {
        name: string
        value: string
    }

    export type Style = {
        /**
         *  @description 深色(dark)、浅色(light)
         * */
        theme: Theme
        /**
         *  @description 顶部(header、nav)是否固定
         * */
        topFixed: boolean
        /**
         *  @description 菜单模式 [vertical, horizontal]
         * */
        menuMode: MenuModeValue
        /**
         *  @description 主题颜色
         * */
        colorMode: string
        /**
         *  @description 标签显示
         * */
        showTabs: boolean
        /**
         *  @description 移动端时(默认当屏幕宽度小于750px)
         * */
        smallScreen: boolean
        /**
         *  @description 菜单背景模式为深色
         * */
        menuBackDark: boolean
    }
}