<template>
    <v-head title="订单"></v-head>
    <div id="order">
        <div class="noOrder" v-show="noOrder"></div>
        <article v-show="!noOrder" ref="orderWrapper">
            <div class="container">
                <router-link v-for="item in state.orderList" :key="item.id" class="section" :to="'/order_detail?id='+ item.id">
                    <div class="title">
                        <span class="restaurant-picture">
                            <img :src="item.restaurant.pic_url" />
                        </span>
                        <router-link :to="'/store/menu?id='+ item.restaurant.id" class="restaurant_name">
                            {{item.restaurant.name}}
                            <var-icon :size="22" name="chevron-right" class="rightArrow" />
                        </router-link>
                        <span class="order-status">已完成</span>
                    </div>
                    <div class="orderBox">
                        <div class="info-container" v-for="food in item.foods" :key="food._id">
                            <img :src="food.pic_url" alt="" />
                            <p>{{food.name}}</p>
                        </div>
                        <div class="price-container">
                            <span>￥{{item.total_price}}</span>
                            <span>共{{item.foods.length}}件</span>
                        </div>
                    </div>
                    <div class="footer">
                        <router-link :to="{path:'/store',query:{id:item.restaurant.id}}">再来一单</router-link>
                        <a>小问卷</a>
                        <router-link v-if="!item.has_comment" class="make_comment" :to="{path:'/order/comment',query:{order_id:item.id}}">评价 </router-link>
                    </div>
                </router-link>
            </div>
        </article>
    </div>
</template>

<script lang="ts" setup>
import { getOrder } from '@/api/order'
import { reactive, ref } from 'vue';
const state = reactive({
    orderList: []
})
const noOrder = ref(false)
getOrder().then(data => {
    // console.log(data)
    if(data.status === 200) {
        state.orderList = data.data
        if(data.data.length > 0){
            noOrder.value = false
        }else{
            noOrder.value = true
        }
    }
})
</script>

<style lang="scss" scoped>
#order{
    background-color: #f4f4f4;
    padding: 10px;
    height: calc(100% - 40px);
    .container{
        .section{
            display: block;
            border-radius: 8px;
            margin-bottom: 10px;
            background-color: #fff;
            overflow: hidden;
            padding: 10px;
            .title{
                span{
                    img{
                        height: 30px;
                        width: 30px;
                        border-radius: 10px;
                        overflow: hidden;
                        vertical-align: middle;
                    }
                }
                .restaurant_name{
                    font-weight: bold;
                    .rightArrow{
                        vertical-align: middle;
                    }
                }
                .order-status{
                    float: right;
                    color: #666;
                }
            }

            .orderBox{
                padding-top: 10px;
                position: relative;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                overflow: hidden;
                flex-wrap: nowrap;
                .info-container{
                    margin-right: 10px;
                    img{
                        height: 60px;
                        width: 68px;
                        border-radius: 6px;
                    }
                    p{
                        width: 70px;
                        font-size: 14px;
                        color: #666;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .price-container{
                    width: 40px;
                    height: 100px;
                    font-size: 14px;
                    background-color: rgba(255, 255, 255, 0.5);
                    position: absolute;
                    right: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    span{
                        &:first-child{
                            font-weight: bold;
                        }
                        &:last-child{
                            font-size: 12px;
                        }
                    }
                }
            }

            .footer{
                display: flex;
                justify-content: flex-end;
                align-items: center;
                a{
                    display: inline-block;
                    padding: 6px;
                    font-weight: bold;
                    font-size: 12px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    margin-left: 6px;
                }
            }
        }

    }
}
</style>
