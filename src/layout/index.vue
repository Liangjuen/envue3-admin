<template>
    <div class="app-wrapper">
        <Aside />
        <div :class="['main-wrapper', mainclass]">
            <Header />
            <AppMain />
            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">
import AppMain from './components/AppMain.vue'
import Aside from './components/aside/index.vue'
import Header from './components/header/index.vue'
import Footer from './components/Footer.vue'
import { useGlobalStore } from './use'
const { useMainWrapperClass } = useGlobalStore()
const mainclass = useMainWrapperClass()
</script>
<style>
.app-wrapper {
    width: 100vw;
    height: 100vh;
}

.main-wrapper {
    height: 100%;
    transition: margin-left var(--transation);
    width: auto;
}

.menu-is-opened-main {
    margin-left: var(--left-menu-width);
}

.menu-is-collapse-main {
    margin-left: var(--collapse-left-menu-width);
}
</style>