<template>
    <v-head title="请选择收货地址"></v-head>
    <div class="location">
        <var-button block type="primary" @click="getNowLocation"><var-icon name="map-marker-radius" />点击定位当前位置</var-button>
    </div>
</template>

<script setup lang="ts">
import { useAddressStore } from '@/store/address'

const store = useAddressStore()
function getNowLocation() {
    store.getNowlocation()
}
</script>

<style lang="scss" scoped>
.location {
    button {
        margin-top: 20px;
        padding: 30px 0;
    }
}
</style>
