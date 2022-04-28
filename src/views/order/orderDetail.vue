<!--订单详情-->
<template>
    <v-head go-back="true" title="订单详情"></v-head>
    <div id="order-detail">
        <section class="tip">
            <h3>{{ state.orderStatus }}</h3>
            <h4>{{ state.statusDesc }}</h4>
            <router-link class="buy-again" :to="{path:'/store',query:{id:state.restaurantInfo.id}}" tag="span">
                <var-button type="success">再来一单</var-button>
            </router-link>
        </section>
        <section class="foods-info-container">
            <div class="title">
                <span class="restaurant-picture">
                    <img :src="state.restaurantInfo.pic_url" />
                </span>
                <span class="restaurant-name">{{ state.restaurantInfo.name }}</span>
                <var-icon name="chevron-right" />
            </div>
            {{ state.restaurantInfo.foods }}
            <div v-for="(item,index) in state.foods" :key="index" class="foods-container">
                <span class="foods-picture">
                    <img :src="item.pic_url" />
                </span>
                <div class="main-container">
                    <div>
                        <span class="foods-name">{{ item.name }}</span>
                        <span class="price">￥{{ Number(item.price * item.num).toFixed(2) }}</span>
                    </div>
                    <!--<span>正常</span>-->
                    <span class="num">x{{ item.num }}</span>
                </div>
            </div>
            <div class="other-fee">
                <div class="food-container-fee">
                    <span class="fee-name">餐盒费</span>
                    <span class="price">￥0</span>
                </div>
                <div class="delivery-fee">
                    <span class="fee-name">配送费</span>
                    <span class="price">￥{{ state.restaurantInfo.shipping_fee }}</span>
                </div>
            </div>
            <div class="total-price border-top">
                <span class="total-price ">总计￥{{ state.orderData.total_price.toFixed(2) }} </span><span class="discount-price">优惠￥0</span
                ><span class="pay-price">
                    实付 <strong>￥{{ state.orderData.total_price.toFixed(2) }}</strong></span
                >
            </div>
            <div class="call-seller-container border-top">
                <var-button size="mini"><span>联系商家</span></var-button>
                <var-button size="mini"><span>致电商家</span></var-button>
            </div>
        </section>

        <section class="delivery-info-container">
            <div class="title">
                <h3>配送信息</h3>
            </div>
            <div class="expect-delivery-time">
                <span class="item-name">期望时间</span>
                <span class="item-value">立即配送</span>
            </div>
            <div class="delivery-address">
                <div>
                    <span class="item-name">配送地址</span>
                    <span class="item-value" style="display: block;">&nbsp;</span>
                </div>
                <div class="address-info">
                    <span class="person-info item-value">{{ state.address.name }}({{ state.address.gender === 1 ? '先生' : '女士' }}){{ state.address.phone }}</span>
                    <span class="address item-value">{{ state.address.address }}</span>
                </div>
            </div>
            <div class="delivery-service">
                <span class="item-name">配送服务</span>
                <span class="item-value">由 商家 提供配送服务</span>
            </div>
            <div class="call">
                <var-button size="mini"><span>联系骑手</span></var-button>
                <var-button size="mini"><span>致电骑手</span></var-button>
            </div>
        </section>

        <section class="order-info-container">
            <div class="title">
                <h3>订单信息</h3>
            </div>
            <div class="order-number">
                <span class="item-name">订单号码</span>
                <span class="item-value">{{ state.orderData.id }}</span>
                <span class="copy-order-number">复制</span>
            </div>
            <div class="order-time">
                <span class="item-name">订单时间</span>
                <span class="item-value">{{ state.orderData.create_time }}</span>
            </div>
            <div class="delivery-way">
                <span class="item-name">支付方式</span>
                <span class="item-value">在线支付</span>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { orderInfo } from '@/api/order'
import { Snackbar } from '@varlet/ui'
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const state = reactive({
    orderStatus: '', // 订单状态
    statusDesc: '', // 状态描述
    restaurantInfo: {}, // 餐馆信息
    foods: [], // 食物列表
    orderData: { // 订单数据
        total_price: 0
    },
    address: {}, // 地址信息
})
onMounted(() => {
    const route = useRoute()
    let id = route.query.id
    orderInfo({ order_id: id }).then((res) => {
        if (res.status === -1) {
            Snackbar.error('获取订单失败')
            return
        }
        state.orderData = res.data
        if (res.data.code === 200) {
            state.orderStatus = '订单已完成'
            state.statusDesc = '感谢您对美团外卖的支持，欢迎再次光临'
        } else {
            state.orderStatus = '订单已取消'
            state.statusDesc = '支付超时，订单已取消'
        }
        state.restaurantInfo = res.data.restaurant
        state.foods = res.data.foods
        state.address = res.data.address
    })
})
</script>

<style lang="scss" scoped>
#order-detail{
   background-color: #f4f4f4;
   padding: 20px 10px;
   .tip{
       text-align: center;
       h3{
        font-weight: bolder;
       }

       h4{
           margin: 20px 0;
       }
       .buy-again{
           margin: 10px;
       }
   }

   .foods-info-container{
       margin-top: 10px;
       background-color: #fff;
       border-radius: 6px;
       padding: 10px;
        border-bottom: 1px solid #f4f4f4;
       .title{
           .restaurant-name{
            font-weight: bolder;
            border-bottom: 1px solid #f4f4f4;
           }
           .var-icon{
               vertical-align: middle;
           }
           .restaurant-picture{
               img{
                   vertical-align: middle;
                   height: 30px;
                   width: 30px;
                   border-radius: 6px;

               }
           }
       }
       .foods-container{
           display: flex;
           justify-content: flex-start;
           align-items: center;
           margin: 10px 0;
           .foods-picture{
               img{
                   width: 40px;
                   height: 40px;
                   border-radius: 6px;
               }
           }
           .main-container{
               margin-left: 10px;
               flex: 1;
               div{
                   display: flex;
                   justify-content: space-between;
               }
           }
       }
       .other-fee{
           div{
               margin: 10px 0;
               display: flex;
               justify-content: space-between;
               align-content: center;
           }
       }
       .total-price{
           text-align: right;
            .pay-price{
                font-size: 18px;
                font-weight: bold;
            }
            .discount-price{
                color: red;
            }
       }

       .call-seller-container{
           display: flex;
           margin-top: 10px;
           justify-content: space-evenly;
       }
   }

   .delivery-info-container, .order-info-container{
        margin-top: 10px;
       background-color: #fff;
       border-radius: 6px;
       padding: 10px;
        border-bottom: 1px solid #f4f4f4;
       .title{
           h3{
               font-size: 16px;
                font-weight: bolder;
                padding-bottom: 10px;
                border-bottom: 1px solid #f4f4f4;
           }
       }
       div{
           display: flex;
           justify-content: space-between;
           margin: 5px 0;
       }
       .call{
           display: flex;
           justify-content: space-around;
           margin-top: 10px;
       }
   }
}
</style>
