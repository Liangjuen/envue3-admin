<template>
    <el-drawer title="设置项" direction="rtl" v-model="showSettings" size="268px">
        <SetItem label="菜单模式">
            <el-select v-model="themeStyle.menuMode" :disabled="themeStyle.smallScreen">
                <el-option label="纵向" value="vertical"></el-option>
                <el-option label="横向" value="horizontal"></el-option>
            </el-select>
        </SetItem>
        <SetItem label="暗黑模式">
            <Theme />
        </SetItem>
        <SetItem label="菜单深色">
            <el-switch v-model="themeStyle.menuBackDark" @change="change"></el-switch>
        </SetItem>
        <SetItem label="标签">
            <el-switch v-model="showTabbar" @change="toggleTabbar"></el-switch>
        </SetItem>
    </el-drawer>
</template>

<script setup lang="ts">
import SetItem from './SetItem.vue'
import Theme from '../Theme.vue'
import useGlobalStore from '@/hooks/useGlobal'

const { showSettings, themeStyle, showTabbar } = useGlobalStore().useGlobalStoreToRefs()

const change = (v: boolean) => themeStyle.value.menuBackDark = v
const toggleTabbar = (v: boolean) => showTabbar.value = v
</script>
