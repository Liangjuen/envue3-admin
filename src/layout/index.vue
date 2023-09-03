<template>
    <div class="app-wrapper">
        <Aside />
        <div :class="['main-wrapper', mainclass]">
            <div class="layout-header fixed">
                <Nav />
                <Tabs />
            </div>
            <div class="app-main">
                <AppMain />
                <Footer />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppMain from './components/AppMain.vue'
import Aside from './components/aside/index.vue'
import Nav from './components/nav/index.vue'
import Footer from './components/Footer.vue'
import Tabs from './components/tabs/index.vue'
import { useGlobalStore } from './use'
const { useMainWrapperClass } = useGlobalStore()
const mainclass = useMainWrapperClass()
</script>
<style>
@import './style//index.scss';

.app-wrapper {
    width: 100vw;
    height: 100vh;
}

.main-wrapper {
    height: 100%;
    transition: margin-left var(--transation);
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
    border-radius: 0 0 8px 8px;
}

.fixed {
    position: sticky;
}

.app-main {
    padding: var(--theme-padding);
}
</style>