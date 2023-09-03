<template>
    <div :class="['aside', themeStyle.menuMode, dark]">
        <sidebar-menu />
    </div>
</template>

<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue'
import useGlobal from '@/hooks/useGlobal'

const { useGlobalStoreToRefs, useSideBackDark } = useGlobal()
const { themeStyle } = useGlobalStoreToRefs()
const dark = useSideBackDark()
</script>

<style lang="scss">
.aside {
    position: absolute;
    z-index: 990;
}

.vertical {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
}

.aside.dark {
    background-color: var(--theme-dark-bgc-color);
}

.horizontal {
    width: 100%;
}
</style>