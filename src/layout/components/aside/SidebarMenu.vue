<template>
    <el-menu :default-active="$route.fullPath" :unique-opened="true" router :collapse="isCollapse" v-bind="backDark">
        <template v-for="item in menus" :key="item.path">
            <sidebar-item :item-data="item" v-if="!item?.meta?.hidden"></sidebar-item>
        </template>
    </el-menu>
</template>
  
<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import useSideMenu from './useSideMenu'
import useGlobal from '@/hooks/useGlobal'

const { useBackDark, useIsCollapse } = useGlobal()
const { useMenus } = useSideMenu()
const menus = useMenus()
const backDark = useBackDark()
const isCollapse = useIsCollapse()

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
</style>
  