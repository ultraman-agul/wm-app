<template>
    <v-head title="支付成功"></v-head>
    <var-popup v-model:show="center">
        <div class="popup-example-block">恭喜你，支付成功！</div>
    </var-popup>
</template>

<script>
import { successPay } from '@/api/order'
import { ref, defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const center = ref(true)
        const route = useRoute()
        const router = useRouter()
        successPay({ id: route.query.id }).then(res => {
            if (res.status === 200) {
                setTimeout(() => {
                    router.push('/order')
                }, 1000)
            }
        })
        return {
            center
        }
    }
})
</script>

<style>
.popup-example-block {
  padding: 20px 24px;
  width: 250px;
}
</style>
