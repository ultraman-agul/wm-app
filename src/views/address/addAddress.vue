<template>
    <v-head title="添加收货地址"></v-head>
    <var-form ref="form" class="addAddressForm">
        <p>联系人</p>
        <div class="box">
            <var-input id="username" v-model="formData.username" placeholder="姓名" :rules="[v => !!v || '姓名不能为空']" />
            <var-input id="phone" v-model="formData.phone" placeholder="电话" :rules="[v => !!v || '电话不能为空']" />
            <var-radio-group v-model="formData.gender" :rules="[v => !!v || '必须选择一个性别']">
                <var-radio :checked-value="1">先生</var-radio>
                <var-radio :checked-value="2">女士</var-radio>
            </var-radio-group>
        </div>

        <p>收货地址</p>
        <div class="box">
            <div class="pick" @click="toPickAddress">
                <div class="address-info">
                    <span>小区/大厦/学校：</span>
                    <span v-if="!address" class="add-text"><var-icon name="map-marker" />点击选择</span>
                    <span v-else>{{ address }}</span>
                </div>
                <var-icon name="chevron-right" />
            </div>
            <var-input id="house_number" v-model="formData.house_number" placeholder="楼号-门牌号" :rules="[v => !!v || '不能为空']" />
        </div>
        <var-button block type="success" @click="submit">保存</var-button>
    </var-form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAddressStore } from '@/store/address'
import { addAddress } from '@/api/address'
import { Snackbar } from '@varlet/ui'

const store = useAddressStore()
const address = computed(() => store.deliveryAddress.title)
const formData = reactive({
    username: '',
    department: '',
    gender: 1,
    phone: '',
    house_number: ''
})
const form = ref(null)
const router = useRouter()
function toPickAddress() {
    router.push({
        path: '/location',
        query: {
            addAddress: 1
        }
    })
}
function submit() {
    if (form.value.validate()) {
        addAddress({
            name: formData.username,
            phone: formData.phone,
            address: address.value,
            gender: formData.gender,
            house_number: formData.house_number,
            lng: store.deliveryAddress.location.lng,
            lat: store.deliveryAddress.location.lat
        }).then(data => {
            if (data.status === 200) {
                Snackbar.success(data.message)
                store.defaultAddress = data.address
                router.go(-1)
            } else {
                Snackbar.error(data.message)
            }
        }).catch(e => {
            Snackbar.error(data.message)
        })
    }
}
</script>

<style lang="scss" scoped>
.addAddressForm{
    background-color: #f4f4f4;
    height: calc(100% - 40px);
    p{
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        padding-left: 10px;
    }

    .box{
        background-color: #fff;
        padding: 0 10px;

        .var-radio-group__wrap{
            :deep(.var-radio-group){
                justify-content: center;
                height: 50px;
                line-height: 50px;
                .var-radio__wrap{
                    width: 100px;
                }
            }
        }

        .pick{
            height: 40px;
            align-items: center;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #aaa;
            .add-text{
                color: #aaa;
            }
        }
    }
    .var-button{
        margin-top: 50px;
    }
}
</style>
