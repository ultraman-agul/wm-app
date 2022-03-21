<template>
    <v-head title="我的收货地址"></v-head>
    <div id="myAddress">
        <ul>
            <li v-for="item in state.addressList" :key="item.id">
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

const state = reactive({
    addressList: []
})
getAllAddress().then(data => {
    if(data.status === 200){
        state.addressList = data.address
    }
}).catch(e => { console.log(e) })
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
</style>
