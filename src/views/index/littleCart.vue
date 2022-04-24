<template>
    <div id="little-cart" @click="toCart">
        <var-button round size="large">
            <var-icon name="cart-outline" />
        </var-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function toCart() {
    router.push('/cart')
}
</script>

<style lang="scss">
#little-cart{
    position: fixed;
    bottom: 100px;
    right: 6px;
    text-align: center;
}
</style>
