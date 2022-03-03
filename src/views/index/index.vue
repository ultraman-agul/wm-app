<template>
    <div ref="scrollWrapper" class="index">
        <div class="main-container">
            <!-- 头部定位和搜索 -->
            <div class="guide-container">
                <router-link to="/location?fromIndex=true" class="location">
                    <var-icon name="map-marker" />
                    <span class="address">广州南</span>
                    <var-icon name="chevron-right" />
                </router-link>
                <router-link to="/search" class="search">
                    <div class="left-content">
                        <var-icon name="magnify" />
                        <span>请输入商家或商品名称</span>
                    </div>

                    <var-button type="primary" class="search-btn">
                        搜索
                    </var-button>
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
                    <h2>附近商家</h2>
                    <span class="line"></span>
                </div>
                <var-button>默认按钮</var-button>
                <!-- <nearby-shops
                :scrollWrapper="scrollWrapper"
                v-if="locationReady"
            ></nearby-shops> -->
            </div>
        </div>

        <!-- 底部 -->
        <v-bar></v-bar>
    </div>
</template>

<script lang="ts" setup>
import vNav from './nav.vue'
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
        }
    }
}
</style>
