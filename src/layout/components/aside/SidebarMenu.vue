<template>
    <el-menu :class="[ms]" :default-active="$route.fullPath" :unique-opened="true" router :collapse="isCollapse"
        v-bind="backDark">
        <template v-for="item in menus" :key="item.path">
            <sidebar-item :item-data="item" v-if="!item?.meta?.hidden"></sidebar-item>
        </template>
    </el-menu>
</template>
  
<script setup lang="ts">
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'
import useSideMenu from './useSideMenu'
import useGlobal from '@/hooks/useGlobal'

const { useBackDark, useGlobalStoreToRefs } = useGlobal()
const { useMenus } = useSideMenu()
const menus = useMenus()
const backDark = useBackDark()
const { isCollapse, themeStyle } = useGlobalStoreToRefs()
const ms = computed(() => themeStyle.value.smallScreen ? 'drawer-menu' : '')
</script>
<style>
.el-menu.el-menu--vertical {
    margin-top: var(--nav-height);
    border-right: none !important;
}

.el-menu.el-menu--vertical:not(.el-menu--collapse) {
    width: var(--left-menu-width);
    min-height: 400px;
}

.el-sub-menu__title {
    transition: none;
}

.drawer-menu {
    width: 0;
    z-index: 999;
}
</style>
  