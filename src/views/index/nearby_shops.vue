<template>
    <div class="nearby">
        <ul class="top-sort">
            <li>综合排序<var-icon name="chevron-down" /></li>
            <li>销量最高</li>
            <li>距离最近</li>
            <li>筛选<var-icon name="chevron-down" /></li>
        </ul>
        <div class="container">
            <ul>
                <li v-for="(item) in state.shopList" :key="item.id" class="shop-item" @click="router.push({path: '/store', query: {id:item.id}})">
                    <div class="img-show">
                        <img :src="item.pic_url" />
                    </div>
                    <div class="detail">
                        <h4>{{ item.name }}</h4>
                        <div class="shops-message">
                            <div class="score">
                                <var-icon name="star" color="#ff8000" size="15" />
                                <span class="score-num">{{ item.wm_poi_score }}</span>
                                <span class="sell-num">{{ item.month_sales_tip }}</span>
                            </div>
                            <div class="delivery-info">
                                <span class="deliver-time">{{ item.delivery_time_tip }}</span>
                                &nbsp;
                                <span class="distance">{{ item.distance }}</span>
                            </div>
                        </div>
                        <div class="price-message">
                            <span>{{ item.min_price_tip }} &nbsp;</span>
                            <span>{{ item.shipping_fee_tip }} &nbsp;</span>
                            <span>{{ item.average_price_tip }}</span>
                        </div>
                        <div class="active-message">
                            <ul>
                                <li v-for="(discount, index) in item.discounts2.slice(0, 1)" :key="index">
                                    <div class="discount-left">
                                        <img :src="discount.icon_url" class="icon" />
                                        <span class="info">{{ discount.info }}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <var-button style="margin-top: 50px;" @click="getResturant"> 获取餐馆列表 </var-button>
    </div>
</template>

<script lang="ts" setup>
import { getAllResturant } from '@/api/restaurant'
import { Snackbar } from '@varlet/ui'
import { reactive, computed, watch } from 'vue'
import { useAddressStore } from '@/store/address'
import { useRouter } from 'vue-router'

const router = useRouter()
const addressStore = useAddressStore()
let lat = computed(() => addressStore.lat)
let lng = computed(() => addressStore.lng)
watch(() => addressStore.address, async () => {
    if (!lat.value && !lng.value) { // 先判断如果当前没有位置信息,则获取当前位置,位置获取成功后会重新调用这个函数
        await addressStore.getNowlocation()
    } else {
        getResturant()
    }
}, { immediate: true, deep: true })
const state = reactive({
    shopList: [
        {
            address: '万达广场2楼1号商铺',
            average_price_tip: '人均20',
            bulletin: '欢迎下单',
            call_center: '1122-2334578',
            comment_number: 1,
            created_at: '2022-03-05T05:08:44.533Z',
            delivery_score: 2.8,
            delivery_time_tip: '50分钟',
            discounts2: [
                {
                    icon_url: 'http://p0.meituan.net/xianfu/f8bc8dffdbc805878aa3801a33f563cd1001.png',
                    info: '满20减18;满45减40;满60减53',
                    promotion_type: 2
                },
                {
                    icon_url: 'http://p1.meituan.net/xianfu/9c997ecce6150671b8459738a26f8bd9767.png',
                    info: '折扣商品7.33折起',
                    promotion_type: 2
                },
                {
                    icon_url: 'http://p0.meituan.net/xianfu/019d1bbb1310b1531e6af6172c9a5095581.png',
                    info: '新用户立减2元,首次使用银行卡支付最高再减3元',
                    promotion_type: 2
                }
            ],
            distance: '',
            food_score: 0.3,
            id: 1,
            lat: '23.13170',
            lng: '113.26626',
            min_price: 20,
            min_price_tip: '起送 ￥20',
            month_sales: 32,
            month_sales_tip: '月售1笔',
            name: '麦当劳',
            pack_score: 3.6,
            pic_url: 'http://p0.meituan.net/xianfu/851a8deb169f4f8aab16a7688932328f5634.jpg',
            quality_score: 3.4,
            shipping_fee: 3,
            shipping_fee_tip: '配送 ￥3',
            shopping_time_end: '24:00',
            shopping_time_start: '8:00',
            third_category: '中式简餐',
            wm_poi_score: 2.8
        }
    ]
})
function getResturant() {
    getAllResturant({ lat: lat.value, lng: lng.value }).then((data:any) => {
        console.log(data)
        if (data.status === 200) {
            state.shopList = data.data
        } else {
            Snackbar.error(data.message)
        }
    }).catch(e => {
        console.log(e)
    })
}
</script>

<style lang="scss" scoped>
.nearby {
    .top-sort {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .container {
        .shop-item {
            display: flex;
            justify-content: flex-start;
            width: 100%;
            // align-items: center;
            height: 90px;
            padding: 10px 0;

            .img-show {
                height: 60px;
                width: 80px;

                img {
                    overflow: hidden;
                    height: 100%;
                    width: 100%;
                    border-radius: 4px;
                }
            }

            .detail {
                width: calc(100% - 90px);
                font-size: 12px;
                margin-left: 10px;
                color: #666;

                h4 {
                    font-weight: bold;
                    font-size: 16px;
                    color: #222;
                }

                .shops-message {
                    display: flex;
                    justify-content: space-between;

                    .score {
                        display: flex;
                        align-items: center;

                        .score-num {
                            color: #ff8000;
                            margin-right: 10px;
                        }
                    }
                }

                .active-message {
                    margin-top: 5px;

                    .discount-left {
                        img {
                            width: 18px;
                            height: 18px;
                            vertical-align: middle;
                        }

                        .info {
                            color: red;
                            border: 1px solid red;
                            border-radius: 2px;
                            margin-left: 2px;
                            padding: 1px 2px;
                        }
                    }
                }
            }
        }
    }
}
</style>
