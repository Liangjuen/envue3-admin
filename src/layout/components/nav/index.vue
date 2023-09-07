<template>
    <div class="nav" :class="navBgcIsDark ? 'menu-mode-horizontal-bg-dark-nav' : ''">
        <el-row align="middle" justify="space-between">
            <el-col class="top-left" :xs="8" :sm="18" :md="18" :lg="20" :xl="20">
                <slot name="left">
                    <button class="navbar-ham" @click="isCollapse = !isCollapse">
                        <span class="ham-container">
                            <span :class="['ham-top', activeClass]"></span>
                            <span :class="['ham-middle', activeClass]"></span>
                            <span :class="['ham-bottom', activeClass]"></span>
                        </span>
                    </button>
                </slot>
            </el-col>
            <el-col class="top-right" :xs="6" :sm="6" :md="4" :lg="4" :xl="4">
                <slot name="right">
                    <div class="right-tools">
                        <Theme />
                        <div class="ml-12" @click="toggleLanguage">
                            <svg-icon icon="Language"></svg-icon>
                        </div>
                        <FullScreen class="ml-12" />
                        <Settings class="ml-12" />
                    </div>
                </slot>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import Theme from '../Theme.vue'
import Settings from './Settings.vue'
import FullScreen from '@/components/FullScreen/index.vue'
import useGlobal from '@/hooks/useGlobal'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
const { useGlobalStoreToRefs, useNavIsDark } = useGlobal()
const { isCollapse } = useGlobalStoreToRefs()
const activeClass = computed(() => !isCollapse.value ? 'is-active' : '')
const navBgcIsDark = useNavIsDark()
const toggleLanguage = () => ElMessage({ message: '暂未实现，敬请期待', type: 'info' })
</script>

<style lang="scss">
.nav {
    height: var(--nav-height);
    padding: 0 var(--theme-padding);
}

.navbar-ham {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    height: 100%;
    width: 40px;
    background-color: transparent;
}

.ham-container {
    position: relative;
    width: 16px;
    height: 14px;
    overflow: hidden;

    .ham-top {
        top: 0;
    }

    .ham-middle {
        top: 6px;
    }

    .ham-bottom {
        top: 12px;
    }

    .ham-top.is-active {
        top: 6px;
        transform: translate(0) rotate(225deg);
    }

    .ham-middle.is-active {
        top: 6px;
        transform: translate(16px);
    }

    .ham-bottom.is-active {
        top: 6px;
        transform: translate(0) rotate(135deg);
    }
}

.ham-top,
.ham-middle,
.ham-bottom {
    position: absolute;
    left: 0;
    width: 16px;
    height: 2px;
    transition: top .25s, background-color .5s, transform .25s;
    background-color: var(--el-text-color-primary);
}
</style>

<style scoped lang="scss">
.el-row {
    height: 100%;
}

.top-left {
    height: 100%;
}

.top-right {
    display: flex;
    justify-content: flex-end;

    .right-tools {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        >div {
            cursor: pointer;
        }
    }
}

.menu-mode-horizontal-bg-dark-nav {
    background-color: var(--theme-dark-bgc-color);
    color: #fff;
}
</style>