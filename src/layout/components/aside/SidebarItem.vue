<template>
    <!-- 此处注意，不要多嵌套层级，否则可能导致菜单样式错乱,建议直接在父级组件v-for时直接判断 -->
    <el-menu-item v-if="itemData.meta.type == 2" :index="itemData.path">
        <el-icon><svg-icon :icon="itemData.meta.icon"></svg-icon></el-icon>
        <span>{{ itemData.meta.title }}</span>
    </el-menu-item>
    <el-sub-menu v-else-if="itemData.meta.type == 1" :index="itemData.path">
        <template #title>
            <el-icon><svg-icon :icon="itemData.meta.icon"></svg-icon></el-icon>
            <span>{{ itemData.meta.title }}</span>
        </template>
        <sidebar-item v-for="item in itemData.children" :key="item.path" :item-data="item"></sidebar-item>
    </el-sub-menu>
    <sidebar-item v-else-if="itemData?.children?.length" :item-data="itemData"></sidebar-item>
</template>
  
<script setup lang="ts">
import { useRoute } from 'vue-router'
defineProps<{
    itemData: API.Menu
}>()
const route = useRoute()
</script>
<script lang="ts">
export default {
    name: 'SidebarItem'
}
</script>
<style scoped lang="scss">
.menu-icon {
    font-size: 16px;
}
</style>
  