<template>
    <var-style-provider :style-vars="successTheme" style="height: 100%;">
        <KeepAlive>
            <router-view v-if="route.meta.keepAlive"></router-view>
        </KeepAlive>
        <router-view v-if="!route.meta.keepAlive"></router-view>
    </var-style-provider>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useCartStore } from '@/store/cart'

const route = useRoute()
const store = useCartStore()
const cartList = localStorage.getItem('cartList')
if (cartList) {
    store.cartList = JSON.parse(cartList)
}
const successTheme = {
    '--rate-primary-color': '#ffd161',
    '--button-primary-color': '#ffd161',
    '--switch-handle-active-background': '#ffd161',
    '--switch-track-active-background': '#ffd161',
    '--form-details-length-color': '#ffd161',
    '--color-primary': '#ffd161',
}
</script>

<style>
#app {
    width: 100%;
    height: 100%;
}
</style>
