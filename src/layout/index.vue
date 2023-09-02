<template>
    <div class="app-wrapper">
        <Aside />
        <AppMain />
    </div>
</template>

<script setup lang="ts">
import AppMain from './components/AppMain.vue'
import Aside from './components/aside/index.vue'
</script>
<style  scoped>
.app-wrapper {
    width: 100%;
    height: 100%;
}
</style>