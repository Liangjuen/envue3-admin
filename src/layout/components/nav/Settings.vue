<template>
    <div @click="changeSetDrawer(true)">
        <svg-icon icon="settings"></svg-icon>
    </div>
</template>

<script setup lang="ts">
import useGlobalStore from '@/hooks/useGlobal'

const { changeSetDrawer } = useGlobalStore()
</script>
