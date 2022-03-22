<template>
    <!-- <div class="noOrder" v-show="noOrder"></div>
    <article v-show="!noOrder" ref="orderWrapper">
        <div class="container">
            <router-link v-for="item in ordersList" :key="item.id" tag="section" :to="'/order_detail?id='+ item.id">
                <div class="title">
                    <span class="restaurant-picture">
                        <img :src="item.restaurant.pic_url" />
                    </span>
                    <router-link :to="'/store/menu?id='+ item.restaurant.id" class="restaurant_name"> {{item.restaurant.name}} <strong> > </strong> </router-link>
                    <span class="order-status">订单已完成</span>
                </div>
                <div class="info-container" v-for="food in item.foods" :key="food._id">
                    <div>
                        <span class="foods-name">{{food.name}}</span>
                        <span class="num">x{{food.num}}</span>
                    </div>
                </div>
                <div class="price-container">
                    <span>共{{item.foods.length}}件商品，实付</span><span>￥{{item.total_price}}</span>
                </div>
                <div class="footer">
                    <router-link :to="{path:'/store',query:{id:item.restaurant.id}}" tag="span">再来一单</router-link>
                    <router-link v-if="!item.has_comment" class="make_comment" :to="{path:'/order/comment',query:{order_id:item.id}}">评价 </router-link>
                </div>
            </router-link>
        </div>
    </article> -->
</template>

<script lang="ts" setup>
import { getOrder } from '@/api/order'

getOrder().then(data => {
    console.log(data)
})
</script>
