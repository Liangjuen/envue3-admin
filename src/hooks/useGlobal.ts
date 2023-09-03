import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useGlobalStore from '@/stores/global'

export default () => {
    const globalStore = useGlobalStore()

    const useBackDark = () => computed(() => (globalStore.themeStyle.menuBackDark ? {
        'background-color': "var(--theme-dark-bgc-color)",
        'text-color': "#fff"
    } : {}))

    const useSideBackDark = () => computed(() => globalStore.themeStyle.menuBackDark ? 'dark' : '')

    const useIsCollapse = () => computed(() => globalStore.isCollapse)

    const useGlobalStoreToRefs = () => storeToRefs(globalStore)

    return {
        useBackDark,
        useIsCollapse,
        useGlobalStoreToRefs,
        useSideBackDark
    }
}


