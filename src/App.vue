<template>
  <el-config-provider :zIndex="2000">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useUserLogin } from '@/hooks/useLogin'
const userLogin = useUserLogin()
userLogin()
</script>

<style lang="scss" scoped></style>
