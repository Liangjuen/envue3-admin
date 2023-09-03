<template>
    <ul class="actions">
        <li><i class="iconfont icon-search1" @click="openSearch"></i></li>
        <li v-show="!fullscreen"><i class="iconfont icon-full-screen" @click="requestFullscreen"></i></li>
        <li v-show="fullscreen"><i class="iconfont icon-exit-full-screen" @click="exitFullscreen"></i></li>
        <li><i class="iconfont icon-setup" @click="openSetup"></i></li>
    </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useStore from '@/store/index.js'
import { ElMessage } from 'element-plus'

const store = useStore()
let fullscreen = ref(false)

const openSearch = () => {
    store.showSearch = true
}

const openSetup = () => {
    store.showSetup = true
}

const requestFullscreen = () => {
    if (document.documentElement.RequestFullScreen) {
        document.documentElement.RequestFullScreen()
            .then(() => {
            },
                () => {
                    ElMessage({
                        type: 'error',
                        message: '开启全屏失败'
                    })
                })
    }
    //兼容火狐
    if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
    }
    //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
    if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen()
    }
    //兼容IE,只能写msRequestFullscreen
    if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen()
    }
}
const exitFullscreen = () => {
    if (document.exitFullScreen) {
        document.exitFullscreen().then(() => {
        },
            () => {
                ElMessage({
                    type: 'error',
                    message: '退出全屏失败'
                })
            })
    }
    //兼容火狐
    if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    }
    //兼容谷歌等
    if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
    //兼容IE
    if (document.msExitFullscreen) {
        document.msExitFullscreen()
    }
}
const FShandler = () => {
    fullscreen.value = (document.fullscreenElement == null) ? false : true
}
onMounted(() => {
    if (document.documentElement.mozRequestFullScreen) {
        document.addEventListener("mozfullscreenchange", FShandler)
    }
    if (document.documentElement.webkitRequestFullScreen) {
        document.addEventListener("webkitfullscreenchange", FShandler)
    }
    if (document.documentElement.msRequestFullscreen) {
        document.addEventListener("MSFullscreenChange", FShandler)
    }
})
</script>

<style scoped>
.actions li {
    display: inline-block;
    margin-right: 18px;
    cursor: pointer;
}

.iconfont {
    font-size: 16px;
}
</style>