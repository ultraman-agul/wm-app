<!--商店底部购物栏-->
<template>
    <!--购物车详细列表-->
    <article v-show="cartDetail && foodNum" class="cart-list-container">
        <section class="head">
            <span>餐盒费0元</span>
            <span @click="emptyCart()"><var-icon name="trash-can-outline" />清空购物车</span>
        </section>
        <section v-for="item in restaurantCartList" :key="item.id" class="cart-list">
            <div>
                <span>{{ item.name }} </span>
                <span class="price">￥{{ Number((item.price * item.num).toFixed(2)) }}</span>
            </div>
            <pick-food :name="item.name" :food_id="item.id" :price="item.price" style=""></pick-food>
        </section>
    </article>
    <div id="bottom" :style="{backgroundColor: foodNum ? '#ffd161' : '#222426'}">
        <!--底部bar-->
        <div class="bottom-bar">
            <div class="left" @click="showCartDetail();">
                <div ref="iconCartContainer" class="shopping-cart" :class="{cartActive:totalPrice>0}">
                    <img v-if="!foodNum" src="../../assets/cart_default.png" alt="" />
                    <img v-if="foodNum" src="../../assets/cart_active.png" alt="" />
                    <span v-if="foodNum" class="food-num">{{ foodNum }}</span>
                </div>
                <div class="price-container" :style="{color:foodNum?'#fff':'#aaa'}">
                    <span v-if="totalPrice" class="total-price">￥{{ totalPrice }}</span>
                    <span v-if="!shipping_fee" class="deliver-fee">免配送费</span>
                    <span v-else class="deliver-fee">另需要配送费￥{{ shipping_fee }}</span>
                </div>
            </div>
            <span v-if="!totalPrice" class="submit">{{ min_price_tip }}</span>
            <span v-else-if="totalPrice < min_price" class="submit">还差{{ min_price - totalPrice }}</span>
            <span v-else class="submit go-buy" @click="prepareOrder()">去结算</span>
        </div>
    </div>
    <div v-show="cartDetail && foodNum" class="shade" @click="cartDetail=false;"></div>
</template>

<script lang="ts" setup>
import { getInfo } from '@/utils/auth'
import PickFood from '@/components/PickFood.vue'
import { reactive, computed, watch, toRefs } from 'vue'
import { useCartStore } from '@/store/Cart'
import { useRestaurantStore } from '@/store/restaurant'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useCartStore()
const shopStore = useRestaurantStore()
const state = reactive({
    cartDetail: false,
    restaurant_id: 0,
    shipping_fee: 0,
    shipping_fee_tip: 0,
    min_price: 0,
    min_price_tip: '￥0起送',
})
let { cartDetail, restaurant_id, shipping_fee, shipping_fee_tip, min_price, min_price_tip } = toRefs(state)

watch(() => shopStore.shopInfo, (val) => { // 监听pinia的reataurant_info信息
    shipping_fee = val.shipping_fee // 配送信息
    min_price = val.min_price // 最低价起送信息
    min_price_tip = val.min_price_tip
    shipping_fee_tip = val.shipping_fee_tip
})

restaurant_id = route.query.id // 进入时获取商店id

const totalPrice = computed(() => (store.cartList[restaurant_id] ? store.cartList[restaurant_id].totalPrice : 0)) // 计算购物车总价格，购物车没有这个商店则0

const foodNum = computed(() => (store.cartList[restaurant_id] ? store.cartList[restaurant_id].totalNum : 0)) // 商品数量

const restaurantCartList = computed(() => { // 当前商店购物车商品,转换成数组格式
    const restaurantObj = store.cartList[restaurant_id]
    const result = []
    for (let key in restaurantObj) {
        if (Number(key)) { result.push(restaurantObj[key]) }
    }
    return result
})

const showCartDetail = () => { // 点击底部显示购物车详情
    if (cartDetail.value) { // 如果当前是显示状态 再次点击为隐藏
        cartDetail.value = false
    } else { // 如果当前是关闭状态   判断购物车有没有商品 如果有才能显示详情
        cartDetail.value = totalPrice.value > 0
    }
}
const prepareOrder = () => { // 准备下订单
    let data = {
        restaurant_id,
        foods: store.cartList[restaurant_id]
    }
    console.log('准备下单')
}
const emptyCart = () => {
    store.emptyCart(restaurant_id)
    cartDetail.value = false
}
// watch(() => totalPrice.value, (val) => { // watch totalPrice 如果为0 就隐藏购物车底部点击后显示出来的商品
//     if (val === 0) { this.cartDetail = false }
// })
</script>

<style lang="scss" scoped>
#bottom {
    z-index: 101;
    height: 50px;
    background-color: #222426;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 30px;

    .bottom-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 20px;
        height: 100%;
        color: #fff;
        .left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .shopping-cart {
                position: relative;
                img {
                    height: 70px;
                    width: 50px;
                    vertical-align: middle;
                }
                span{
                    position: absolute;
                    display: inline-block;
                    top: 50%;
                    right: -8px;
                    transform: translateY(-50%);
                    padding: 2px;
                    width: 20px;
                    background-color: #fb4e44;
                    border-radius: 10px;
                    text-align: center;
                    font-size: 12px;
                }
            }

            .price-container{
                color: #aaa;
                margin-left: 20px;
                font-size: 14px;
                .total-price{
                    margin-right: 10px;
                }
            }
        }
    }
}

 .cart-list-container {
    z-index: 100;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 20px;
    padding-bottom: 50px;
    position: fixed;
    bottom: 0px;
    left: 0;
    background-color: #fff;
    width: 100%;
    .head{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .cart-list{
        position: relative;
        margin: 20px 0;
    }
}
.shade {
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(75, 75, 75, 0.9);
}
</style>
