<template>
    <div class="app-wrapper" ref="appWrapperRef">
        <Aside v-if="themeStyle.menuMode == 'vertical'" />
        <el-scrollbar :class="['main-wrapper', mainclass]" width="">
            <div class="layout-header fixed">
                <Nav>
                    <template #left>
                        <Aside v-if="themeStyle.menuMode == 'horizontal'" />
                    </template>
                </Nav>
                <Tabs v-show="showTabbar" />
            </div>
            <div class="app-main">
                <AppMain />
                <Footer />
            </div>
        </el-scrollbar>
        <SetOptDrawer />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppMain from './components/AppMain.vue'
import Aside from './components/aside/index.vue'
import Nav from './components/nav/index.vue'
import Footer from './components/Footer.vue'
import Tabs from './components/tabs/index.vue'
import SetOptDrawer from './components/setOptDrawer/index.vue'
import { useGlobalStore } from './use'
import { useResizeObserver } from '@vueuse/core'
import useGlobal from '@/hooks/useGlobal'
const { useGlobalStoreToRefs } = useGlobal()
const { themeStyle, showTabbar } = useGlobalStoreToRefs()
const appWrapperRef = ref<HTMLDivElement>()

const { useMainWrapperClass, useOnWrapperResize } = useGlobalStore()
useResizeObserver(appWrapperRef, (entries) => useOnWrapperResize(entries as ResizeObserverEntry[]))
const mainclass = useMainWrapperClass()
</script>
<style>
@import './style/index.scss';

.app-wrapper {
    width: 100vw;
    height: 100vh;
}

.main-wrapper {
    height: 100%;
    transition: margin-left var(--el-transition-duration);
    width: auto;
    overflow-y: auto;
}

.menu-is-opened-main {
    margin-left: var(--left-menu-width);
}

.menu-is-collapse-main {
    margin-left: var(--collapse-left-menu-width);
}

.layout-header {
    position: relative;
    top: 0;
    right: 0;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    z-index: var(--header-z-index);
}

.fixed {
    position: sticky;
}

.app-main {
    padding: var(--theme-padding);
}
</style>