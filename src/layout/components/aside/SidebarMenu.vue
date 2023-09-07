<template>
    <el-menu :class="[menuClass]" :mode="themeStyle.menuMode" :default-active="$route.fullPath" router
        :collapse="isCollapse" v-bind="backDark">
        <template v-for="item in menus" :key="item.path">
            <sidebar-item :item-data="item" v-if="!item?.meta?.hidden"></sidebar-item>
        </template>
    </el-menu>
</template>
  
<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import useSideMenu from './useSideMenu'
import useGlobal from '@/hooks/useGlobal'
import { computed } from 'vue'

const { useBackDark, useGlobalStoreToRefs } = useGlobal()
const { useMenus } = useSideMenu()
const menus = useMenus()
const backDark = useBackDark()
const { isCollapse, asideFloat, themeStyle } = useGlobalStoreToRefs()
const menuClass = computed(() => asideFloat.value && isCollapse.value ? 'closed-menu' : '')
</script>
<style>
.el-menu.el-menu--vertical {
    border-right: none !important;
    overflow-y: auto;
    min-height: 100%;
}

.el-menu.el-menu--vertical:not(.el-menu--collapse) {
    width: var(--left-menu-width);
}

.el-sub-menu__title {
    transition: none;
}

.el-menu.el-menu--collapse .el-sub-menu__title.el-tooltip__trigger.el-tooltip__trigger {
    padding: 0 var(--el-menu-base-level-padding) !important;
}

.closed-menu {
    width: 0;
    z-index: 1999;
}
</style>
  