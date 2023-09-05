<template>
    <div class="nav">
        <el-row align="middle" justify="space-between">
            <el-col :xs="16" :sm="14" :md="14" :lg="14" :xl="16">
                <slot name="left"></slot>
            </el-col>
            <el-col class="top-right" :xs="4" :sm="6" :md="6" :lg="6" :xl="4">
                <slot name="right">
                    <Theme />
                    <Settings />
                </slot>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import Theme from '../Theme.vue'
import Settings from './Settings.vue'
</script>

<style>
.nav {
    height: var(--nav-height);
    padding: 0 var(--theme-padding);
}
</style>

<style scoped>
.el-row {
    height: 100%;
}

.top-right {
    min-width: 160px;
    display: flex;
    justify-content: flex-end;
}
</style>