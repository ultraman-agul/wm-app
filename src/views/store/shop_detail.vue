<!--商店详情页-->
<template>
    <div id="store-detail">
        <div class="main">
            <div class="logo">
                <img :src="shopInfo.pic_url" />
            </div>
            <h2 class="name">{{ shopInfo.name }}</h2>
            <div class="score">
                <var-icon name="star" color="#ff8000" size="15" />
                <span class="score-num">{{ shopInfo.wm_poi_score }}</span>
            </div>
            <span class="deliver-info">{{ shopInfo.min_price_tip }} &nbsp; {{ shopInfo.shipping_fee_tip }} &nbsp; {{ shopInfo.delivery_time_tip }}</span>
            <div class="active-lists">
                <ul>
                    <li v-for="(item, index) in shopInfo.discounts2" :key="index">
                        <i class="icon" :style="{backgroundImage:'url('+ item.icon_url+')'}"> </i>
                        <span>{{ item.info }}</span>
                    </li>
                </ul>
            </div>
            <div class="announcement">
                <h2>商家公告</h2>
                <p>{{ shopInfo.bulletin }}</p>
            </div>
        </div>

        <div class="close" @click="close();">
            <var-icon name="close-circle-outline" size="26" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    shopInfo: {
        type: Object
    }
})

const emit = defineEmits(['close'])

function close() { // 关闭详情页
    emit('close', true)
}
</script>

<style lang="scss" scoped>

#store-detail {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 8, 8, .4);
    z-index: 99;

    .main {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -60%);
        width: 300px;
        height: 300px;
        background: #151515;
        overflow: auto;
        border-radius: 6px;
        padding: 4px;

        .logo {
            width: 50px;
            height: 50px;
            margin: 10px auto;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .name {
            color: #fff;
            font-size: 18px;
            text-align: center;
        }

        .score {
            margin: 4px 0;
            text-align: center;

            span {
                font-size: 14px;
                color: #dcd7d6;
            }
        }

        .deliver-info {
            font-size: 14px;
            display: block;
            color: #dcd7d6;
            margin: 4px 0;
            text-align: center;
        }

        .active-lists {
            padding: 8px 0;
            margin: 0;
            border-top: 1px solid $mtGrey;
            border-bottom: 1px solid $mtGrey;

            ul {
                li {
                    color: #fff;
                    margin: .2rem;

                    i {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        background-size: cover;
                        vertical-align: middle;
                        margin-right: 2px;
                    }

                    span {
                        font-size: 16px;
                    }
                }
            }
        }

        .announcement {
            margin-top: 10px;
            color: #fff;

            h2 {
                text-align: center;
                font-size: 18px;
            }

            p {
                font-size: 14px;
                margin: 4px;
            }
        }
    }

    .close {
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
