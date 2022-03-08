<template>
    <v-head :title="shopInfo.name" :more="true"></v-head>
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
        <div class="actives">
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
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useRestaurantStore } from '@/store/restaurant'

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

function showStoreDetail() {}
</script>

<style lang="scss" scoped>
.store {
    background-color: #f4f4f4;

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
        padding: 0 16px;
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
                    font-size: .3rem;
                }
            }
        }

        span {
            color: $mtGrey;
            display: inline-block;
        }

        .active-number {
            font-size: .3rem;
            position: absolute;
            top: 0;
            right: 0;
        }
    }
}
</style>
