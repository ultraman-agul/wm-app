<template>
    <v-head title="我的收货地址" :add="true">
        <template v-slot:add>
            <span @click="addAddress" class="add">新增地址</span>
        </template>
    </v-head>
    <div id="myAddress">
        <ul>
            <li v-for="item in state.addressList" :key="item.id" @click="pickAddress(item)">
                <div class="left">
                    <h3>{{item.address + ' ' + item.house_number}}</h3>
                    <p>{{`${item.name}  ${item.gender === 1 ? '先生' : '女生'}     ${item.phone}`}}</p>
                </div>
                <div class="right">
                    <var-icon name="cog-outline" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { getAllAddress } from '@/api/address'
import { reactive } from 'vue'
import { useAddressStore } from '@/store/address';
import router from '@/router';

const state = reactive({
    addressList: []
})
const store = useAddressStore()
getAllAddress().then(data => {
    if(data.status === 200){
        state.addressList = data.address
    }
}).catch(e => { console.log(e) })

function pickAddress(item){
    console.log(item)
    store.setAddAddress(item)
    router.go(-1)
}

const addAddress = () => {
    router.push('/addAddress')
}
</script>

<style lang="scss" scoped>
#myAddress{
    padding: 0 10px;
    li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 6px;
        h3{
            font-size: 16px;
            padding: 10px 0;
            font-weight: bold;
        }
        p{
            font-size: 12px;
            color: #666;
        }
    }
}

.add {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    font-size: 14px;
}
</style>
