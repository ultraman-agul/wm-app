<template>
    <v-head :title="shopInfo.name" :more="true" :store="true"></v-head>
    <div class="store">
        <!--商家信息-->
        <div class="store-info">
            <div class="logo">
                <img :src="shopInfo.pic_url" />
            </div>
            <div class="deliver-info">
                <span>{{ shopInfo.min_price_tip }} &nbsp;{{ shopInfo.shipping_fee_tip }} &nbsp;{{ shopInfo.delivery_time_tip }}</span>
                <p><var-icon size="16" name="message-processing-outline" />{{ shopInfo.bulletin }}</p>
            </div>
        </div>
        <!--活动列表-->
        <div v-if="shopInfo.discounts2&&shopInfo.discounts2.length" class="actives">
            <ul
                :style="
                'transform: translateY(' +
                (positionY % shopInfo.discounts2.length) * -30 +
                'px)'
            "
            >
                <li v-for="(item, index) in shopInfo.discounts2" :key="index">
                    <i class="icon" :style="{ backgroundImage: 'url(' + item.icon_url + ')' }"></i>
                    <span>{{ item.info }}</span>
                </li>
            </ul>
            <span class="active-number" @click="showStoreDetail()">{{ shopInfo.discounts2.length }}个活动 > </span>
        </div>

        <!--导航 有3个路由  点菜 评价 和商家-->
        <div class="nav">
            <router-link :to="{ path: '/store/menu', query: { id } }" class="menu" active-class="active">
                <span>点菜</span>
            </router-link>
            <router-link :to="{ path: '/store/comment', query: { id } }" class="comment" active-class="active">
                <span>评价</span>
            </router-link>
            <router-link :to="{ path: '/store/shop', query: { id } }" class="seller" active-class="active">
                <span>商家</span>
            </router-link>
        </div>

        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
        <transition name="fade">
            <shop-detail v-show="showFlag" :shop-info="shopInfo" @close="showFlag=!showFlag">关闭</shop-detail>
        </transition>
    </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useRestaurantStore } from '@/store/restaurant'
import shopDetail from './shop_detail.vue'

let showFlag = ref(false)
let shopInfo = computed(() => restaurantStore.shopInfo)

const route = useRoute()
const restaurantStore = useRestaurantStore()
let positionY = ref(0)
let timer
const { id } = route.query
restaurantStore.getResturantById(id)
timer = setInterval(() => {
    positionY.value++
}, 4000)

function showStoreDetail() {
    showFlag.value = true
}
</script>

<style lang="scss" scoped>
.store {
    // background-color: #f4f4f4;

    // 商家详情的渐入渐出
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .4s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .store-info {
        display: flex;
        justify-content: start;
        align-items: center;
        background-color: #333;
        padding: 10px 5px;
        color: #aaa;
        font-size: 14px;

        .logo {
            width: 40px;
            height: 40px;
            margin-right: 4px;

            img {
                height: 100%;
                width: 100%;
            }
        }

        .deliver-info {
            p {
                margin-top: 4px;
                width: 300px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }

    .actives {
        background-color: #333;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        position: relative;

        ul {
            transition: all 2s;

            li {
                display: flex;
                align-items: center;

                .icon {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    background-size: cover;
                    margin-right: 4px;
                }

                span {
                    font-size: 14px;
                }
            }
        }

        span {
            color: $mtGrey;
            display: inline-block;
        }

        .active-number {
            font-size: 14px;
            position: absolute;
            top: 0;
            right: 0;
        }
    }

    .nav {
        height: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .active {
            position: relative;
            color: #fc3;

            &::after {
                height: 4px;
                width: 40px;
                background-color: #fc3;
                content: '';
                position: absolute;
                top: 26px;
                left: 50%;
                transform: translateX(-50%);
            }

            span {
                font-weight: bolder;
            }
        }
    }
}
</style>
