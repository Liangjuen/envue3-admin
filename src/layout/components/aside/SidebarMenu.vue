<template>
    <el-menu :default-active="$route.fullPath" class="el-menu-vertical-demo" :unique-opened="true" router
        :collapse="isCollapse">
        <template v-for="item in menus" :key="item._id">
            <sidebar-item :item-data="item" v-if="!item?.meta?.hidden"></sidebar-item>
        </template>
    </el-menu>
</template>
  
<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import { computed } from 'vue'
import { getMenus } from '@/utils'
import { usePermissionStore } from '@/stores/permission'
import useGlobalStore from '@/stores/global'
const globalStore = useGlobalStore()
const permissionStore = usePermissionStore()
permissionStore.getPermissions()
permissionStore.getRoutes()
const menus = computed(() => getMenus(permissionStore.permissions))
const isCollapse = globalStore.isCollapse
</script>
<style scoped></style>
  