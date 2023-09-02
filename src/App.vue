<template>
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { useUserLogin } from '@/hooks/useLogin'
const userLogin = useUserLogin()
userLogin()
useDark()
</script>

<style lang="scss" scoped></style>
