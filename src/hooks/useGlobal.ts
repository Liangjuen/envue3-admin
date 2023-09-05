import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useGlobalStore from '@/stores/global'

export default () => {
    const globalStore = useGlobalStore()

    const useGlobalStoreToRefs = () => storeToRefs(globalStore)

    const { showSettings } = useGlobalStoreToRefs()

    const useBackDark = () => computed(() => (globalStore.themeStyle.menuBackDark ? {
        'background-color': "var(--theme-dark-bgc-color)",
        'text-color': "#fff"
    } : {}))

    const useSideBackDark = () => computed(() => globalStore.themeStyle.menuBackDark ? 'dark' : '')
    const changeSetDrawer = (v: boolean) => showSettings.value = v

    return {
        useBackDark,
        useGlobalStoreToRefs,
        useSideBackDark,
        changeSetDrawer
    }
}


