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

<script lang="ts">
import { pay } from '@/api/order'
import { useRoute } from 'vue-router'
import { ref, defineComponent, reactive, toRefs } from 'vue'
import { Snackbar } from '@varlet/ui'
import router from '@/router'

export default defineComponent({
    setup() {
        const route = useRoute()
        const state = reactive({
            time: ref(15 * 60 * 1000),
            payFn() {
                console.log(state)
                pay({ id: route.query.orderId }).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        console.log(res.url)
                        window.location = res.url
                    }
                }).catch(e => {
                    console.log(e)
                })
            },
        })
        return {
            ...toRefs(state)
        }
    }
})
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
