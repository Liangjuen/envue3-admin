<template>
    <div class="icon-list-container">
        <SvgSelector :data="svgNames" v-model="svg">
            <el-button type="primary">
                <svg-icon :icon="svg" :size="16" class="mr-12"></svg-icon>
                点击选择
            </el-button>
        </SvgSelector>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgSelector from '@/components/SvgSelector/index'
import svgNames from '@/assets/icons/index'
const svg = ref('home')
</script>