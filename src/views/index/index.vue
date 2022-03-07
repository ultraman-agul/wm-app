<template>
    <div ref="scrollWrapper" class="index">
        <div class="main-container">
            <!-- 头部定位和搜索 -->
            <div class="guide-container">
                <router-link to="/location?fromIndex=true" class="location">
                    <var-icon name="map-marker" />
                    <span class="address">{{ address }}</span>
                    <var-icon name="chevron-right" />
                </router-link>
                <router-link to="/search" class="search">
                    <div class="left-content">
                        <var-icon name="magnify" />
                        <span>请输入商家或商品名称</span>
                    </div>

                    <var-button type="primary" class="search-btn"> 搜索 </var-button>
                </router-link>
            </div>
            <div class="main">
                <div class="navigator">
                    <!--导航轮播部分-->
                    <v-nav></v-nav>
                </div>

                <!--附近商家-->
                <div class="head">
                    <span class="line"></span>
                    <h3>附近商家</h3>
                    <span class="line"></span>
                </div>
                <!-- <nearby-shops
                :scrollWrapper="scrollWrapper"
                v-if="locationReady"
            ></nearby-shops> -->
                <nearby-shops></nearby-shops>
            </div>
        </div>

        <!-- 底部 -->
        <v-bar></v-bar>
    </div>
</template>

<script lang="ts" setup>
import vNav from './nav.vue'
import nearbyShops from './nearby_shops.vue'
import { computed } from 'vue'
import { useAddressStore } from '@/store/address'

const addressStore = useAddressStore()
const address = computed(() => addressStore.address)
</script>

<style lang="scss">
.index {
    .main-container {
        font-size: 16px;

        .guide-container {
            padding: 20px 10px;
            background-color: $mtYellow;

            .location {
                display: flex;
                align-items: center;

                .address {
                    font-weight: bolder;
                }
            }

            .search {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #fff;
                height: 40px;
                margin: 10px 0;
                border-radius: 20px;
                padding: 20px;
                color: #999;

                .left-content {
                    display: flex;
                    align-items: center;

                    span {
                        margin-left: 5px;
                    }
                }

                .search-btn {
                    height: 30px;
                    width: 60px;
                    top: -1px;
                    border-radius: 35px;
                    margin-right: -15px;
                    color: #000;
                }
            }
        }

        .main {
            margin-top: -20px;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px 10px;

            .head {
                width: 120px;
                margin: 10px auto;
                position: relative;
                text-align: center;

                h3 {
                    font-weight: bold;
                }

                .line {
                    position: absolute;
                    top: 8px;
                    left: 0;
                    border-bottom: 2px solid #333;
                    width: 18px;

                    &:last-child {
                        left: 100px;
                    }
                }
            }
        }
    }
}
</style>
