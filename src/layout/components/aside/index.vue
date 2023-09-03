<template>
    <div :class="['aside', themeStyle.menuMode]">
        <sidebar-menu />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import SidebarMenu from './SidebarMenu.vue'
import useGlobalStore from '@/stores/global'
const globalStore = useGlobalStore()
const { themeStyle } = storeToRefs(globalStore)
</script>

<style lang="scss">
.aside {
    position: absolute;
    z-index: 990;
}

.vertical {
    width: var(--left-menu-width);
    height: 100%;
    overflow-x: hidden;
}

.horizontal {
    width: 100%;
}
</style>