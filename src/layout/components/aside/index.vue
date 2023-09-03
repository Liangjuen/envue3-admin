<template>
    <div :class="['aside', themeStyle.menuMode]">
        <sidebar-menu />
    </div>
</template>

<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue'
import { useSideMenu } from './useSideMenu'
const { useGlobalStoreToRefs } = useSideMenu()
const { themeStyle } = useGlobalStoreToRefs()
</script>

<style lang="scss">
.aside {
    position: absolute;
    z-index: 990;
}

.vertical {
    height: 100%;
    overflow-x: hidden;
}

.horizontal {
    width: 100%;
}
</style>