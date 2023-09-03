<template>
    <div class="nav">
        <el-switch v-model="isDark" @change="toggleDark"></el-switch>
        <el-switch v-model="isCollapse" @change="toggleMenuCollapse"></el-switch>
        <el-switch v-model="themeStyle.menuBackDark" @change="toggleMenuBackMode"></el-switch>
    </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import useHeader from './useHeader'
const {
    useGlobalStoreToRefs,
    toggleMenuBackMode,
    toggleMenuCollapse
} = useHeader()

// 暗黑主题切换
const isDark = useDark()
const toggleDark = useToggle(isDark)
const { isCollapse, themeStyle } = useGlobalStoreToRefs()

</script>

<style>
.nav {
    height: var(--nav-height);
    padding: 0 var(--theme-padding);
}
</style>