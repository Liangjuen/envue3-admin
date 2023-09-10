import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Names } from './store-name'

export default defineStore(Names.GLOBAL, () => {
    const themeStyle = ref<THEME.Style>({
        theme: 'light',
        // 顶部(header、nav)是否固定
        topFixed: true,
        // 菜单模式 [vertical, horizontal]
        menuMode: 'vertical',
        // 主题颜色
        colorMode: 'blue-black',
        // 标签显示
        showTabs: true,
        // 移动端时(默认当屏幕宽度小于980px)
        smallScreen: false,
        // 菜单背景模式为深色
        menuBackDark: false,
    })
    // 菜单栏是否折起
    let isCollapse = ref(false)
    // 菜单栏抽屉形态是否悬浮
    let asideFloat = ref(true)
    // 全局资源搜索
    let showSearch = ref(false)
    // 重新加载应用
    let reload = ref(false)
    // 控制加载动画
    let loading = ref(false)
    // 主题配置
    let showSettings = ref(false)
    // 显示Tabbar
    let showTabbar = ref(false)

    return {
        themeStyle,
        isCollapse,
        showSearch,
        reload,
        loading,
        showSettings,
        asideFloat,
        showTabbar
    }
}, {
    lasting: {
        enabled: true,
        strategies: {
            storage: sessionStorage,
            key: Names.GLOBAL,
            exclude: []
        }
    }
})