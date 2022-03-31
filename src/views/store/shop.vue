<!--商家信息-->
<template>
    <div class="shop-info">
        <!--地址信息-->
        <div class="position container">
            <var-icon name="map-marker-outline" />
            <span>{{ shopInfo.address }}</span>
            <var-icon name="phone" />
        </div>
        <!--安全档案-->
        <div class="safe-file container">
            <var-icon name="notebook" />
            <span class="describe">查看食品安全档案</span>
            <var-icon name="chevron-right" />
        </div>
        <!--配送服务-->
        <div class="delivery-info container">
            <var-icon name="shopping-outline" />
            <span class="describe">配送服务:由 商家 提供配送服务</span>
            <var-icon name="chevron-right" />
        </div>
        <!--配送时间-->
        <div class="delivery-time container">
            <var-icon name="bell-outline" />
            <span class="describe">配送时间: {{ shopInfo.shopping_time_start }} - {{ shopInfo.shopping_time_end }}</span>
            <var-icon name="chevron-right" />
        </div>
        <!--公告-->
        <div v-if="shopInfo.bulletin" class="notification container">
            <var-icon name="message-processing-outline" />
            <span class="describe ellipsis">{{ shopInfo.bulletin }}</span>
            <var-icon name="chevron-right" />
        </div>
        <!--商家服务-->
        <div class="poi-service container">
            <var-icon name="shopping-outline" />
            <span class="service">商家服务: 可开发票 到店自取</span>
        </div>
        <div class="discount container">
            <ul>
                <li v-for="(discount,index) in shopInfo.discounts2" :key="index">
                    <span class="active-icon" :style="{backgroundImage:'url('+ discount.icon_url +')'}"></span>
                    <span>{{ discount.info }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRestaurantStore } from '@/store/restaurant'
import { computed } from 'vue'

const store = useRestaurantStore()
const shopInfo = computed(() => store.shopInfo)
</script>

<style lang="scss" scoped>
.shop-info{
    background-color: #f4f4f4;
    padding-top: 10px;
    height: 497px;
    .container{
        background-color: #fff;
        padding: 10px;
        border-bottom: 1px solid #f4f4f4;
        .var-icon{
            padding: 0 10px;
            &:last-child{
                float: right;
            }
        }
    }
    .delivery-info{
        margin-top: 10px;
    }
    .delivery-time{
        margin-bottom: 10px;
    }
    .discount{
        padding-left: 20px;
    }
}
</style>
