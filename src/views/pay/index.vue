<template>
    <v-head title="支付"></v-head>
    <div id="pay">
        <div>剩余支付时间: {{}}</div>
        <var-button @click="payFn">支付</var-button>
    </div>
</template>

<script lang="ts" setup>
import { pay } from '@/api/order'
import { useRoute } from 'vue-router'

const route = useRoute()
const payFn = () => {
    pay({ id: route.query.orderId }).then(res => {
        console.log(res)
        if (res.status === 200) {
            console.log(res.url)
            window.location = res.url
        }
    }).catch(e => {
        console.log(e)
    })
}
</script>
