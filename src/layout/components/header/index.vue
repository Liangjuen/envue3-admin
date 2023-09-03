<template>
    <header>
        <el-switch v-model="isDark" @change="toggleDark"></el-switch>
        <el-switch v-model="globalStore.isCollapse" @change="changeMenuCollapse"></el-switch>
    </header>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import useGlobalStore from '@/stores/global'
const globalStore = useGlobalStore()
const changeMenuCollapse = (v: boolean) => globalStore.isCollapse = v
// 暗黑主题切换
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style></style>