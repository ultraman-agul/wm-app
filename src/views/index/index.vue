<template>
    <div class="index" ref="scrollWrapper">
        <div class="main-container">
            <!-- 头部 -->
            <v-head title="美团外卖"></v-head>
            <var-button type="primary">主要按钮</var-button>
            <var-button type="success">成功按钮</var-button>
            <div class="guide-container">
                <router-link to="/location?fromIndex=true" class="location">
                    <i class="iconfont icon-map"></i>
                    <span class="address">{{}}</span>
                    <i class="iconfont">&#xe6d7;</i>
                </router-link>
                <router-link to="/search" class="search">
                    <i class="iconfont icon-search"></i>
                    <span>请输入商家、商品名</span>
                </router-link>
            </div>
            <!--导航轮播部分-->
            <v-nav></v-nav>
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
        <!-- 底部 -->
        <v-bar></v-bar>
    </div>
</template>

<script lang="ts" setup></script>
