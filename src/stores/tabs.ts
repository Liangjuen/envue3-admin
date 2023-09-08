import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Names } from './store-name'

export type Command = 'other' | 'left' | 'right' | 'all'
export type MenuItem = {
    icon: string,
    title: string,
    command: Command
}
export type Tab = {
    path: string
    routeName?: string | null
    icon: string
    title: string
}

export default defineStore(Names.TABS, () => {
    const tabs = ref<Array<Tab>>([])

    // has tab item?
    const hasTab = (path: string): boolean => {
        return !!tabs.value.find(t => t.path == path)
    }

    // add tabItem
    function addTab(item: Tab) {
        tabs.value.push(item)
    }

    // clean current tab
    function cleanCurrent(item: Tab) {
        const list = tabs.value.filter(e => item.path !== e.path)
        tabs.value = list
    }
    // clean all tabs
    function cleanAllTabs() {
        tabs.value = []
    }
    // clean other tabs
    function cleanOtherTabs(item: Tab) {
        const list = tabs.value.filter(e => e.path === item.path)
        tabs.value = list
    }
    // clean left tabs
    function cleanLeftTabs(item: Tab) {
        const index = tabs.value.findIndex(e => e.path === item.path)
        if (index > 0) {
            tabs.value.splice(0, index)
        }
    }
    // clean right tabs
    function cleanRightTabs(item: Tab) {
        const index = tabs.value.findIndex(e => e.path === item.path)
        if (index <= tabs.value.length - 1) {
            tabs.value.splice(index + 1, tabs.value.length - 1 - index)
        } else {
            tabs.value = []
        }
    }

    return {
        tabs,
        hasTab,
        addTab,
        cleanCurrent,
        cleanAllTabs,
        cleanOtherTabs,
        cleanLeftTabs,
        cleanRightTabs
    }
}, {
    lasting: {
        enabled: true,
        strategies: {
            storage: localStorage,
            key: Names.TABS,
            exclude: []
        }
    }
})
