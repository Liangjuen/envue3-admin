import { storeToRefs } from 'pinia'

import useGlobalStore from '@/stores/global'

export default () => {
    const globalStore = useGlobalStore()

    const useGlobalStoreToRefs = () => storeToRefs(globalStore)
    const toggleMenuBackMode = (v: boolean) => globalStore.themeStyle.menuBackDark = v
    const toggleMenuCollapse = (v: boolean) => globalStore.isCollapse = v
    return {
        useGlobalStoreToRefs,
        toggleMenuBackMode,
        toggleMenuCollapse
    }
}


