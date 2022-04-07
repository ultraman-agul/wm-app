<template>
    <v-head title="支付"></v-head>
    <div id="pay">
        <div>
            剩余支付时间：
            <var-countdown :time="time">
                <template #default="timeData">
                    <span class="block">{{ timeData.minutes }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.seconds }}</span>
                </template>
            </var-countdown>
            请尽快支付
        </div>

        <var-button block type="success" @click="payFn">支付</var-button>
    </div>
</template>

<script lang="ts" setup>
import { pay, successPay } from '@/api/order'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { Snackbar } from '@varlet/ui'
import router from '@/router'

const route = useRoute()
const time = ref(15 * 60 * 1000)
const payFn = () => {
    console.log(time.value)
    successPay({ id: route.query.orderId }).then(res => {
        if (res.status === 200) {
            Snackbar.success(res.message)
            router.push('/order')
        } else {
            Snackbar.error(res.message)
        }
    })
    // pay({ id: route.query.orderId }).then(res => {
    //     console.log(res)
    //     if (res.status === 200) {
    //         console.log(res.url)
    //         window.location = res.url
    //     }
    // }).catch(e => {
    //     console.log(e)
    // })
}
</script>

<style lang="scss" scoped>
#pay{
    background-color: #f4f4f4;
    padding: 20px;
    text-align: center;
    height: calc(100% - 40px);

    .var-button{
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        margin: 0 auto;
        width: 80%;
    }
}
</style>
