<template>
    <div :class="['aside', themeStyle.menuMode, dark]" :style="{ 'z-index': 2000 }">
        <div class="sidebar-top">
            <slot>
                <div class="sys-name">Admin</div>
            </slot>
        </div>
        <el-scrollbar class="sidebar-wrapper">
            <sidebar-menu />
        </el-scrollbar>
    </div>
    <div v-show="!isCollapse && asideFloat" class="el-overlay" :style="{ 'z-index': 1997 }" @click="isCollapse = true">
    </div>
</template>

<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue'
import useGlobal from '@/hooks/useGlobal'

const { useGlobalStoreToRefs, useSideBackDark } = useGlobal()
const { themeStyle, asideFloat, isCollapse } = useGlobalStoreToRefs()
const dark = useSideBackDark()
</script>

<style lang="scss">
.aside {
    position: absolute;

    .sidebar-top {
        color: var(--el-text-color-);
        height: var(--nav-height);
        position: absolute;
        width: 100%;

        .sys-name {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }
    }
}

.vertical {
    height: 100%;
    max-width: var(--left-menu-width);
    overflow-x: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
}

.aside.dark {
    background-color: var(--theme-dark-bgc-color);
    color: #fff;
}

.horizontal {
    width: 100%;
}

.el-scrollbar {
    margin-top: var(--nav-height);
    height: calc(100% - var(--nav-height));
    z-index: 1997;
}
</style>