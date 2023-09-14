<template>
    <el-popover :width="280" trigger="click">
        <template #reference>
            <slot></slot>
        </template>
        <div class="svg-selector-wrap">
            <div class="select-top">
                <el-input class="mr-12" v-model.trim="state.icon" @input="onChange" @keyup.enter="search"></el-input>
                <el-button type="primary" @click="search">
                    <svg-icon icon="search"></svg-icon>
                </el-button>
            </div>
            <div class="select-svg-content">
                <div class="svg-item" v-for="item in state.currentData" @click="onSelect(item)">
                    <svg-icon :icon="item" :size="22"></svg-icon>
                </div>
            </div>
            <div class="select-footer">
                <span class="total">共计{{ state.total }}个</span>
                <el-pagination :page-size="pageSize" :current-page="state.currentPage" background layout="prev, next"
                    :total="state.total" @current-change="pageChange" />
            </div>
        </div>
    </el-popover>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue'
const props = withDefaults(defineProps<{
    data: string[],
    modelValue: string,
    pageSize?: number
}>(), {
    pageSize: 24
})

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

defineOptions({
    name: 'SvgSelector'
})
const state = reactive<{
    currentData: string[],
    icon: string,
    currentPage: number,
    total: number
}>({
    currentData: [],
    icon: '',
    currentPage: 1,
    total: props.data.length
})

const onChange = (v: string) => emits('update:modelValue', v)
const pageChange = (v: number) => state.currentPage = v
const onSelect = (v: string) => {
    state.icon = v
    onChange(v)
}
const search = () => {
    const list = props.data.filter(item => item.includes(state.icon))
    getCurrentData(1, list)
    state.total = list.length
}

const getCurrentData = (val: number, list: string[]) => {
    state.currentData = []
    list.forEach((item, index) => {
        if ((val - 1) * props.pageSize <= index && index < val * props.pageSize) {
            state.currentData.push(item)
        }
    })
}

watch(() => state.currentPage, (val) => {
    getCurrentData(val, props.data)
}, {
    immediate: true
})
</script>

<style lang="scss">
.svg-selector-wrap {

    .select-top,
    .select-svg-content,
    .select-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .select-svg-content {
        margin: 18px 0;
        display: flex;
        flex-wrap: wrap;

        .svg-item {
            padding: 8px;
            line-height: 1;
            border-radius: 6px;
            transition: background-color var(--animate-duration);
            cursor: pointer;

            &:hover,
            &.active {
                background-color: var(--el-border-color);
            }
        }
    }

    .select-footer {
        .total {
            font-size: 12px;
        }
    }
}
</style>