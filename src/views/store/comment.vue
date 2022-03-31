<!--商店评论-->
<template>
    <div id="comment">
        <!--评分部分-->
        <article>
            <var-row>
                <var-col :span="12">
                    <span class="comment-score">{{ state.shopInfo.wm_poi_score?(state.shopInfo.wm_poi_score).toFixed(1):'' }}</span>
                    <div class="rightRate">
                        <h3>商家评分</h3>
                        <var-rate v-model="state.shopInfo.wm_poi_score" :size="16" readonly />
                    </div>
                </var-col>
                <var-col :span="12" class="orderScore">
                    <div>
                        <span>口味</span>
                        <span class="food-score">{{ state.shopInfo.food_score }}</span>
                    </div>
                    <div>
                        <span>包装</span>
                        <span class="pack-score">{{ state.shopInfo.pack_score }}</span>
                    </div>
                    <div>
                        <span>配送</span>
                        <span class="delivery-score">{{ state.shopInfo.delivery_score }}</span>
                    </div>
                </var-col>
            </var-row>
            <!--评分类型部分-->
            <div class="comment-score-type-info">
                <var-chip :round="false" size="mini" type="warning">全部</var-chip>
                <var-chip :round="false" size="mini" color="#faecd8">最新</var-chip>
                <var-chip :round="false" size="mini" color="#faecd8">有图</var-chip>
                <var-chip :round="false" size="mini" color="#faecd8">好评</var-chip>
                <var-chip :round="false" size="mini" color="#faecd8">差评</var-chip>
            </div>

            <!--评价部分-->
            <var-list v-model:loading="loading" :finished="finished" @load="load">
                <var-cell v-for="item in state.commentData" :key="item.id">
                    <div class="user-pic-url">
                        <img :src="item.avatar" />
                        <div>
                            <p class="user-name">{{ item.user_name }}</p>
                            <p class="comment-time">{{ item.comment_time.slice(0, 10) }}</p>
                        </div>
                    </div>
                    <div class="order-comment-score">
                        <span><var-rate v-model="item.food_score" :size="16" readonly /></span>
                    </div>
                    <div class="comment-main-part">
                        <p class="comment">{{ item.comment_data }}</p>
                        <div class="comment-pic">
                            <div v-for="(pic,index) in item.pic_url" :key="index" @click="show_big_pic_event(pic)">
                                <img :src="pic" />
                            </div>
                        </div>
                        <div v-if="item.add_comment_list" class="poi-reply-contents-container"></div>
                    </div>
                </var-cell>
            </var-list>
        </article>
        <!--图片大图-->
        <transition>
            <div v-show="state.show_big_pic" class="show-big-pic" @click="state.show_big_pic = false;">
                <div>
                    <img :src="state.big_pic_url" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { restaurantComment, getResturantById } from '@/api/restaurant'
import { useRoute } from 'vue-router'

const finished = ref(false)
const loading = ref(false)
const route = useRoute()
const state = reactive({
    restaurant_id: 0,
    commentData: [],
    shopInfo: {}, // 商店信息
    offset: 0,
})
state.restaurant_id = route.query.id

onMounted(() => {
    // 根据商店id获取店家信息
    getResturantById({ id: state.restaurant_id }).then((res) => {
        state.shopInfo = res.data
    })
})
const load = () => {
    console.log('触发了load')
    loading.value = true
    restaurantComment({ restaurant_id: state.restaurant_id, offset: state.offset, limit: 5 }).then((res) => {
        if (!res.data.length) {
            finished.value = true
        }
        state.commentData = state.commentData.concat(res.data)
        state.offset++
        loading.value = false
    }).catch(e => {
        loading.value = false
    })
}
</script>

<style lang="scss" scoped>
#comment{
    article{
        .var-row{
            height: 40px;
            padding: 10px;
            .var-col{
                display: flex;
                justify-content: space-around;
                align-items: center;
                .comment-score{
                    font-size: 26px;
                    font-weight: bold;
                    color: tomato;
                }
                .rightRate{
                    h3{
                        margin-right: 4px;
                        font-size: 16px;
                    }
                }
            }
            .orderScore{
                div{
                    text-align: center;
                    span{
                        display: block;
                    }
                    span:last-child{
                        margin-top: 4px;
                        font-weight: bolder;
                    }
                }
            }
        }
        .comment-score-type-info{
            padding: 0 10px;
            margin-top: 16px;
            .var-chip{
                margin-right: 8px;
            }
        }

        .var-list{
            .var-cell{
                .user-pic-url{
                    display: flex;
                    justify-content: flex-start;
                    img{
                        height: 46px;
                        width: 46px;
                        border-radius: 23px;
                    }
                    div{
                        p{
                            line-height: 23px;
                        }
                    }
                }
                .comment-main-part{
                    line-height: 30px;
                    .comment-pic{
                        div{
                            display: inline-block;
                            img{
                                height: 110px;
                                width: 110px;
                                border-radius: 6px;
                            }
                            padding: 4px;
                        }
                    }
                }
            }
        }
    }
}
</style>
