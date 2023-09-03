<template>
    <div class="app-wrapper">
        <Aside />
        <div class="main-wrapper">
            <Header />
            <AppMain />
        </div>

    </div>
</template>

<script setup lang="ts">
import AppMain from './components/AppMain.vue'
import Aside from './components/aside/index.vue'
import Header from './components/header/index.vue'
</script>
<style>
.app-wrapper {
    width: 100%;
    height: 100%;
}

.main-wrapper {
    height: 100%;
    transition: margin-left var(--transation);
    width: auto;
    margin-left: var(--left-menu-width);
}
</style>