<template>
    <v-head title="提交订单"></v-head>
    <div id="confirm-order">
        <div class="delivery-info-container">
            <!--地址信息-->
            <router-link v-if="emptyAddress" class="info-container address-container" to="/addAddress">
                <div class="address-info">
                    <var-icon name="plus-circle-outline" />
                    <span class="add-text">新增收货地址</span>
                </div>
                <var-icon name="chevron-right" />
            </router-link>
            <router-link v-else class="info-container address-container" to="/address">
                <div class="address-info">
                    <div class="main-info">
                        <p class="address">
                            <var-icon name="map-marker" />
                            {{ deliveryAddress.address + deliveryAddress.house_number }}
                        </p>
                        <span class="name">{{ deliveryAddress.name }}</span>
                        <span class="gender">{{ deliveryAddress.gender }}</span>
                        <span class="phone">{{ deliveryAddress.phone }}</span>
                    </div>
                </div>
                <var-icon name="chevron-right" />
            </router-link>

            <!--送达信息-->
            <div class="info-container arrival-container">
                <div class="arrival-info">
                    <div class="main-info">
                        <var-icon name="bell-outline" />
                        <span class="date-type-tip">送达时间</span>
                        <span class="select-view-time">10：25分到</span>
                    </div>
                </div>
                <var-icon name="chevron-right" />
            </div>
        </div>

        <div class="container">
            <!--商家信息-->
            <div class="head">
                <i class="shop-icon" :style="{backgroundImage:'url('+pic_url +')'}"></i>
                <span class="shop-name">{{ name }}</span>
                <span class="delivery-type-icon" :style="{backgroundImage:'url(http://p0.meituan.net/aichequan/019c6ba10f8e79a694c36a474d09d81b2000.png)'}"> </span>
            </div>
            <!--商品列表-->
            <ul class="food-list">
                <li v-for="(item) in state.order_data" :key="item.id">
                    <div class="picture">
                        <img :src="item.foods_pic" />
                    </div>
                    <div class="food-list-right-part">
                        <div>
                            <span>{{ item.name }}</span>
                            <span>￥{{ item.price }}</span>
                        </div>
                        <div>
                            <span class="count">x{{ item.num }}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="other-fee-container">
                <li>
                    <span>包装费</span>
                    <span class="box-total-price">￥0</span>
                </li>
                <li>
                    <span>配送费</span>
                    <span>￥0</span>
                </li>
            </ul>
            <div class="total-price-container">
                <span>已优惠￥0</span>
                <span class="total-price"
                    >小计<strong>￥{{ totalPrice }}</strong></span
                >
            </div>
        </div>
        <div class="bottom">
            <div class="left">
                <span class="discount-fee">已优惠￥0</span>
                <span class="total"
                    >合计<strong>￥{{ totalPrice }}</strong></span
                >
            </div>
            <span class="submit" @click="submit()">提交订单</span>
        </div>
    </div>

    <router-view></router-view>
</template>

<script lang="ts" setup>
import { getAllAddress } from '@/api/address'
import { makeOrder } from '@/api/order'
import { ref, reactive, computed } from 'vue'
import { useAddressStore } from '@/store/address'
import { Snackbar } from '@varlet/ui';
import router from '@/router';

const emptyAddress = ref(false)
const comfirmOrder = JSON.parse(localStorage.getItem('comfirmOrder')) // 获取localstorage中的订单信息
console.log(comfirmOrder)
const totalNum = ref(0)
const totalPrice = ref(0)
const name = ref('')
const pic_url = ref('')
const state = reactive({
    order_data: [],
})
const store = useAddressStore()
const deliveryAddress = computed(() => store.deliveryAddress)
if (comfirmOrder) {
    totalNum.value = comfirmOrder.foods.totalNum
    totalPrice.value = comfirmOrder.foods.totalPrice
    name.value = comfirmOrder.foods.restaurant_name
    pic_url.value = comfirmOrder.foods.pic_url
    for (let key in comfirmOrder.foods) {
        if (Number(key)) {
            state.order_data.push(comfirmOrder.foods[key])
        }
    }
    console.log(state.order_data)
}

if(!deliveryAddress.value){
    getAllAddress().then(data => {
        console.log(data)
        if (data.address && data.address.length > 0) {
            store.setAddAddress(data.address[0])
            emptyAddress.value = false
        } else {
            emptyAddress.value = true
        }
    })
}


function submit() {
    if(emptyAddress.value){
        Snackbar.warning('收货地址不能为空')
        return;
    }
    const foods = []
    state.order_data.forEach(item => {
        foods.push({skus_id: item.id, num: item.num})
    })
    makeOrder({foods, restaurant_id: comfirmOrder.restaurant_id, address_id: deliveryAddress.value.id}).then(data => {
        if(data.status === 200){
            router.push('/pay')
        }
    }).catch(e => {
        Snackbar.error(e)
    })
}
</script>

<style lang="scss" scoped>
#confirm-order {
    background-color: #f4f4f4;
    height: calc(100% - 40px);
    .delivery-info-container{
        background-color: #fff;
        .info-container{
            height: 40px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            .select-view-time{
                color: #48abff;
            }
            &:first-child{
                border-bottom: 1px solid #ccc;
            }
        }
    }

    .container{
        margin-top: 10px;
        background-color: #fff;
        padding: 10px 0;
        .head{
            padding: 10px 0;
            .shop-icon,.delivery-type-icon{
                height: 30px;
                width: 30px;
                margin-right: 10px;
                display: inline-block;
                background-position: center center;
                background-size: 100%;
                vertical-align: middle;
            }
            .shop-name{
                font-size: 14px;
            }
            .delivery-type-icon{
                background-repeat: no-repeat;
                height: 30px;
                width: 50px;
                float: right;
            }
        }
        .food-list{
            li{
                background-color: #fbfbfb;
                padding: 6px;
                margin: 8px 0;
                display: flex;
                justify-content: flex-start;
                .picture{
                    img{
                        height: 50px;
                        width: 50px;
                    }
                }
                .food-list-right-part{
                    flex: 1;
                    padding-left: 10px;
                    div{
                        display: flex;
                        justify-content: space-between;
                        .count{
                            margin-top: 10px;
                            color: #666;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
        .other-fee-container{
            li{
                display: flex;
                justify-content: space-between;
                padding: 6px 10px;
            }
        }
        .total-price-container{
            border-top: 1px dashed #666;
            padding-top: 10px;
            display: flex;
            justify-content: flex-end;
            span{
                color: #666;
                margin-right: 6px;
                strong{
                    color: red;
                }
            }
        }
    }
    .bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 50px;
        width: 100%;
        background-color: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .left{
            flex: 1;
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            strong{
                color: red;
            }
        }
        .submit{
            background-color: $mtYellow;
            display: inline-block;
            height: 100%;
            line-height: 50px;
            padding: 0 10px;
        }
    }
}
</style>
