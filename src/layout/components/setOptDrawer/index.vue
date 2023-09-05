<template>
    <el-drawer title="设置项" direction="rtl" v-model="showSettings" size="268px">
        <SetItem label="暗黑模式">
            <Theme />
        </SetItem>
    </el-drawer>
</template>

<script setup lang="ts">
import SetItem from './SetItem.vue'
import Theme from '../Theme.vue'
import useGlobalStore from '@/hooks/useGlobal'

const { showSettings } = useGlobalStore().useGlobalStoreToRefs()
</script>
