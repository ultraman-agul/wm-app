<template>
    <div id="bottom">
        <ul>
            <router-link to="/index" custom v-slot="{ navigate }">
                <li class="index" @click="navigate" role="link">
                    <div class="item-box">
                        <img
                            src="../assets/index-active.png"
                            v-if="active ==='index'"
                        />
                        <img src="../assets/index.png" v-else />
                        <span>首页</span>
                    </div>
                </li>
            </router-link>

            <router-link to="/order" custom v-slot="{ navigate }">
                <li class="order" @click="navigate" role="link">
                    <div class="item-box">
                        <img
                            src="../assets/order-active.png"
                            v-if="active ==='order'"
                        />
                        <img src="../assets/order.png" v-else />
                        <span>订单</span>
                    </div>
                </li>
            </router-link>

            <router-link to="/home" custom v-slot="{ navigate }">
                <li @click="navigate" role="link">
                    <div class="item-box">
                        <img
                            src="../assets/home-active.png"
                            v-if="active ==='home'"
                        />
                        <img src="../assets/home.png" v-else />
                        <span>我的</span>
                    </div>
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
let active = computed(() => useRoute().path.slice(1))
</script>

<style lang="scss">
#bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999; //保证底部在商家列表上层 当点击综合排序时  不会被遮罩挡住
    span {
        font-size: 0.3rem;
    }
    ul {
        display: flex;
        background: rgb(250, 250, 250);
        justify-content: space-around;
        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            line-height: 0.75;
            text-align: center;
            .item-box {
                width: .75rem;
                margin: 0.1rem auto;
                img {
                    width: 100%;
                }
            }
            span {
                font-size: 0.2rem;
            }
        }
    }
}
</style>
