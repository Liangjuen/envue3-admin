<template>
    <SvgIcon :icon="icon" :style="{ fontSize }" :color="color">
    </SvgIcon>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon as SvgIcon } from '@iconify/vue'
import { svgIconProps } from './svgIcon'
const props = defineProps(svgIconProps)
defineOptions({
    name: ' SvgIcon'
})

const fontSize = computed(() => {
    let fSize = '1em'
    const size = props.size
    if (size) {
        fSize = (size < 12 ? '12px' : (size > 42 ? '42px' : size + 'px'))
    }
    return fSize
})
</script>
