<template>
    <router-view v-slot="{ Component, route }">
        <transition name="zoom-in-center" appear mode="out-in">
            <component :is="Component" :key="route.path" />
        </transition>
    </router-view>
</template>