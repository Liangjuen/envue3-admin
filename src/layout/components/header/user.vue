<template>
    <div class="user">
        <el-dropdown>
            <span class="el-dropdown-link">
                <div class="link-box">
                    <img class="portrait" :src="user.avatar || pic" />
                    <span>{{ user.nickname }}</span>
                </div>
            </span>
            <template #dropdown>
                <el-dropdown-item>
                    <a @click="logout">退出登录</a>
                </el-dropdown-item>
                <el-dropdown-item>
                    <router-link to="/personal">个人中心</router-link>
                </el-dropdown-item>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import pic from '@/assets/images/portrait.jpeg'

const userStore = useUserStore()
const router = useRouter()

let user = computed(() => userStore.data)

const logout = () => {
    router.replace('/login')
}
</script>

<style scoped>
.link-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.link-box>span {
    font-size: 16px;
    margin-left: 8px;
}

.iconfont {
    font-size: 16px;
}

.user .portrait {
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
}
</style>