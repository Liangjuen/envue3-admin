import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from '@/stores/global'

export const useGlobalStore = () => {
    const globalStore = useStore()
    const { isCollapse, asideFloat, themeStyle } = storeToRefs(globalStore)

    const useMainWrapperClass = () => computed(() => {
        if (themeStyle.value.menuMode === 'horizontal') return 'menu-is-hid-main'
        if (isCollapse.value && !asideFloat.value) return 'menu-is-collapse-main'
        if (!asideFloat.value && !isCollapse.value) return 'menu-is-opened-main'
        return ''
    })

    return {
        useMainWrapperClass
    }
}