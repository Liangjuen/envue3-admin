<template>
    <section>
        <router-view v-slot="{ Component, route }">
            <transition name="fade-in-right" appear mode="out-in">
                <component :is="Component" :key="route.path" />
            </transition>
        </router-view>
    </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
section {
    height: auto;
}
</style>