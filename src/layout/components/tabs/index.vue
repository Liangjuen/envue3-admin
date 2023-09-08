<template>
    <div class="tabs">
        <span v-show="showMakeRollBtn" class="make-roll action-item" @click="handleMakeRoll('left')">
            <svg-icon icon="chevron-left" :size="20"></svg-icon>
        </span>

        <ul class="tabs-wrapper scroll-wrapper card" ref="scrollbarRef">
            <li class="tab-item" :class="{ 'is-active': isActive('/index') }" @click="router.push('/')">
                <span>首页</span>
            </li>
            <li v-for="item in tabs" class="tab-item" :key="item.path" :class="{ 'is-active': isActive(item.path) }"
                @click="handleClickItem(item)">
                <span class="icon" v-if="item.icon">
                    <svg-icon :icon="item.icon" :size="16"></svg-icon>
                </span>
                <span>{{ item.title }}</span>
                <span class="close" @click.stop="cleanItem(item)">
                    <svg-icon icon="x" :size="12"></svg-icon>
                </span>
            </li>
        </ul>

        <span v-show="showMakeRollBtn" class="make-roll action-item" @click="handleMakeRoll('right')">
            <svg-icon icon="chevron-right" :size="20"></svg-icon>
        </span>
        <div class="controls">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link action-item">
                    <svg-icon icon="more-horizontal" :size="20"></svg-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :command="item.command" v-for="item in menuList" :key="item.icon">
                            <svg-icon :icon="item.icon" :size="16"></svg-icon>
                            <span class="ml-12">{{ item.title }}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, watch, ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, onBeforeRouteUpdate, useRouter, type RouteLocationNormalized } from "vue-router"
import type { MenuItem, Command, Tab } from '@/stores/tabs'
import useTabsStore from '@/stores/tabs'
import { useResizeObserver, useDebounceFn } from '@vueuse/core'

const indexPath = '/index'

const router = useRouter()
const route = useRoute()
const tabStore = useTabsStore()
const { tabs } = storeToRefs(tabStore)
const {
    addTab,
    hasTab,
    cleanCurrent,
    cleanAllTabs,
    cleanOtherTabs,
    cleanLeftTabs,
    cleanRightTabs
} = tabStore

const showMakeRollBtn = ref(false)
const scrollbarRef = ref<HTMLElement>()

const menuList: Array<MenuItem> = [
    { icon: 'x', title: '关闭其它', command: 'other' },
    { icon: 'corner-down-left', title: '关闭左侧', command: 'left' },
    { icon: 'corner-down-right', title: '关闭右侧', command: 'right' },
    { icon: 'x-circle', title: '关闭全部', command: 'all' }
]

const routeToTab = (route: RouteLocationNormalized): Tab => (
    {
        routeName: (route.name || '') as string,
        path: route.path,
        title: (route.meta.title || '未知页面') as string,
        icon: (route.meta.icon || '') as string
    }
)

const notIndex = (route: RouteLocationNormalized) => (route.path !== '/' && route.path !== indexPath)

const isActive = (path: string) => (
    path === indexPath
    && route.fullPath === '/'
    || path === route.path
)

const handleClickItem = (tabItem: Tab) => {
    router.push(tabItem.path)
}

// 关闭页面
const cleanItem = (item: Tab) => {
    // 关闭当前页面
    if (item.path === route.fullPath) {
        cleanCurrent(item)
        if (tabs.value.length >= 1) {
            router.go(-1)
        } else {
            router.push(indexPath)
        }
    } else {
        cleanCurrent(item)
    }

}

const handleCommand = (command: Command) => {
    if (tabs.value.length) {
        const tabItem: Tab = {
            routeName: (route.name || '') as string,
            path: route.path,
            title: (route.meta.title || '未知页面') as string,
            icon: (route.meta.icon || '') as string
        }
        switch (command) {
            case 'other':
                cleanOtherTabs(tabItem)
                break
            case 'left':
                cleanLeftTabs(tabItem)
                break
            case 'right':
                cleanRightTabs(tabItem)
                break
            case 'all':
                cleanAllTabs()
                break
        }
    }
}

// 点击左右两侧滚动按钮实现滚动
const handleMakeRoll = (o: 'right' | 'left') => {
    const clientWidth = scrollbarRef.value!.clientWidth
    const scrollWidth = scrollbarRef.value!.scrollWidth
    if (scrollWidth - clientWidth <= 0) return
    const step = o == 'right' ? clientWidth : -clientWidth
    scrollbarRef.value?.scrollBy({ left: step, behavior: 'smooth' })
}

// 将当前tab滚动到可视区中间
const makeCurrentTabScrollToView = () => {
    const active = scrollbarRef.value?.querySelector('.is-active')
    if (active !== null && active !== undefined) {
        const clientWidth = scrollbarRef.value!.clientWidth
        const offsetLeft = (active as HTMLLIElement).offsetLeft
        const width = (active as HTMLLIElement).clientWidth
        scrollbarRef.value?.scrollTo({ left: offsetLeft - (clientWidth / 2) + (width / 2), behavior: 'smooth' })
    }
}

// 设置两侧按钮是否显示
const setMakeRoll = () => {
    const width = scrollbarRef.value!.clientWidth
    const scrollWidth = scrollbarRef.value!.scrollWidth
    showMakeRollBtn.value = scrollWidth > width
}

const debounceResize = useDebounceFn(() => {
    setMakeRoll()
    if (showMakeRollBtn.value) {
        makeCurrentTabScrollToView()
    }
}, 1200)

// 监听尺寸变化
useResizeObserver(scrollbarRef, (entries) => {
    debounceResize()
})

onBeforeRouteUpdate((to, from) => {
    if (from.path === '/404' || from.path === '/403') {
        cleanItem(routeToTab(from))
    } else if (!hasTab(to.path) && notIndex(to)) {
        addTab(routeToTab(to))
    }
})

watch(tabs, (val) => {
    if (val.length === 0) {
        router.push(indexPath)
    }
}, {
    deep: true
})

onMounted(() => {
    if (!hasTab(route.path) && notIndex(route)) addTab(routeToTab(route))
})

onUpdated(() => {
    setMakeRoll()
    makeCurrentTabScrollToView()
})

</script>

<Style lang="scss" scoped>
.tabs {
    --tab-item-height: 34px;

    display: flex;
    height: var(--tabs-wrapper-height);
    padding: 0 var(--theme-padding);
    border-top: var(--border);

    .action-item {
        padding: 4px;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 6px;
        transition: background-color var(--animate-duration);

        &:hover {
            background-color: var(--el-border-color);
        }
    }

    .make-roll {
        margin: 7px 4px 7px 0;
    }

    .controls {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tabs-wrapper {
        display: flex;

        .tab-item {
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding-right: var(--theme-padding);
            padding-left: var(--theme-padding);
            height: var(--tab-item-height);
            cursor: pointer;
            font-size: 14px;
            border-radius: 4px;
            margin: 7px 5px 7px 0;
            transition: all var(--animate-duration);
            border: var(--border);

            .icon,
            .close {
                display: flex;
                border-radius: 3px;
                padding: 2px;

            }

            .icon {
                margin-right: 2px;
            }

            .close {
                margin-left: 2px;
                transition: background-color var(--animate-duration);

                &:hover {
                    background-color: var(--el-border-color);
                }
            }

            a {
                color: var(--el-text-color);
            }
        }
    }

    .scroll-wrapper {
        position: relative;
        flex: 1;
        overflow-y: hidden;
        overflow-x: scroll;
        scrollbar-width: none;
    }

    .scroll-wrapper::-webkit-scrollbar {
        display: none;
    }

    .card {
        .is-active {
            background-color: var(--el-color-primary-light-9);
            border: 1px solid var(--el-color-primary);
            color: var(--el-color-primary) !important;
        }
    }
}
</Style>