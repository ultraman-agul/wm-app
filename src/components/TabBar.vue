<template>
    <div id="bottom">
        <ul>
            <router-link v-slot="{ navigate }" to="/index" custom>
                <li class="index" role="link" @click="navigate">
                    <div class="item-box">
                        <img
                            v-if="active ==='index'"
                            src="../assets/index-active.png"
                        />
                        <img v-else src="../assets/index.png" />
                        <span>首页</span>
                    </div>
                </li>
            </router-link>

            <router-link v-slot="{ navigate }" to="/order" custom>
                <li class="order" role="link" @click="navigate">
                    <div class="item-box">
                        <img
                            v-if="active ==='order'"
                            src="../assets/order-active.png"
                        />
                        <img v-else src="../assets/order.png" />
                        <span>订单</span>
                    </div>
                </li>
            </router-link>

            <router-link v-slot="{ navigate }" to="/home" custom>
                <li role="link" @click="navigate">
                    <div class="item-box">
                        <img
                            v-if="active ==='home'"
                            src="../assets/home-active.png"
                        />
                        <img v-else src="../assets/home.png" />
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

<style lang="scss" scoped>
#bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999; //保证底部在商家列表上层 当点击综合排序时  不会被遮罩挡住
    span {
        font-size: 24px;
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
            text-align: center;

            .item-box {
                width: 36px;
                margin: 8px auto;

                img {
                    width: 100%;
                }
            }

            span {
                font-size: 14px;
            }
        }
    }
}
</style>
