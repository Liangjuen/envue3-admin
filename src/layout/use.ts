import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from '@/stores/global'

export const useGlobalStore = () => {
    const globalStore = useStore()
    const { isCollapse, themeStyle } = storeToRefs(globalStore)

    const useMainWrapperClass = () => computed(() => {
        if (themeStyle.value.menuMode === 'horizontal' || themeStyle.value.smallScreen) return 'menu-is-hid-main'
        if (isCollapse.value) return 'menu-is-collapse-main'
        if (!isCollapse.value) return 'menu-is-opened-main'
        return ''
    })

    const useOnWrapperResize = (entries: ResizeObserverEntry[]) => {
        const entry = entries[0]
        const { width } = entry.contentRect

        // 默认当视口尺寸小于 750 时: 设置小屏样式布局 隐藏右侧 navbar  (可自由修改)
        //  ...

        // 默认当视口尺寸小于 980 时: 设置小屏样式布局 设置菜单为纵向  (可自由修改)
        if (width < 980) {
            themeStyle.value.menuMode = 'vertical'
            themeStyle.value.smallScreen = true
        } else {
            themeStyle.value.smallScreen = false
        }

        // 当菜单栏为纵向时
        if (themeStyle.value.menuMode === 'vertical') {
            // 默认当视口尺寸小于 1080 时: 菜单悬浮、 小于 1440 时: 折叠、 大于 1440 时: 展开  (可自由修改)
            if (width < 1280) {
                isCollapse.value = true
            } else {
                isCollapse.value = false
            }
        }
    }

    return {
        useMainWrapperClass,
        useOnWrapperResize
    }
}
