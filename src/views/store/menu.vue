<template>
    <div id="menu">
        <div ref="left" class="left">
            <ul>
                <li v-for="(category,index) in state.foodsData" :key="category.id" :class="{'activity-menu': index == state.menuIndex}" @click="handleLeftCilck(index)">
                    {{ category.name }}
                </li>
            </ul>
        </div>
        <div ref="right" class="right">
            <article ref="categorys">
                <section v-for="category in state.foodsData" :key="category.id">
                    <h2>{{ category.name }}</h2>
                    <article>
                        <section v-for="spus in category.spus" :key="spus.id">
                            <div class="img">
                                <img :realsrc="spus.pic_url" src="@/assets/shoploading.png" />
                            </div>
                            <div class="info">
                                <div class="name">{{ spus.name }}</div>
                                <div class="sell-num">月售 {{ spus.month_saled_content }}</div>
                                <span class="price"> ￥{{ spus.skus[0].price }}</span>
                            </div>
                        </section>
                    </article>
                </section>
            </article>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BScroll from 'better-scroll'
import { getFoods } from '@/api/restaurant'
import { reactive, nextTick, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const state = reactive({
    foodsData: [], // 食品数据
    leftScroll: null, // 左边滚动对象
    rightScroll: null, // 右边滚动对象
    menuIndex: 0, // 左侧当前是第几个分类
    categoryPosition: [], // 存放各个分类的categoryPosition 为了点击左侧让右侧对应滚动
    categoryBoxList: [], // 存放右边元素的每一项
    loadedImg: [], // 图片已经加载过的index
})
const left = ref(null)
const right = ref(null)

const route = useRoute()

onMounted(() => { // 设置当前scrollwarp容器的高度
    let h = document.documentElement.clientHeight - 220 + 'px'
    right.value.style.height = h
})
// 获取分类以及食品数据
getFoods({ restaurant_id: route.query.id }).then(async data => {
    if (data.status === 200) {
        state.foodsData = data.data
        nextTick(() => {
            // 初始化better-scroll
            state.leftScroll = new BScroll(left.value, { click: true })
            state.rightScroll = new BScroll(right.value, { click: true,
                probeType: 3,
                tap: true,
                bounce: false,
                scrollbar: true,
                preventDefault: true,
                mouseWheel: true })
            let dom = (right.value.children)[0] // 确定各分类categoryPosition
            let listsArr = Array.from(dom.childNodes)
            listsArr = listsArr.slice(1, -1)
            state.categoryBoxList = listsArr
            listsArr.forEach((item, index) => {
                state.categoryPosition[index] = item.offsetTop // 将右边每个分类的元素的位置保存起来
            })
            listenScroll() // 监听右侧滚动
            loadImg(0) // 加载第一个分类的图片
        })
    }
}).catch(e => {
    console.log(e)
})

// 点击左侧的分类时右侧滚动到对应的位置
const handleLeftCilck = (index: number) => {
    state.rightScroll.off('scroll', handleRightScroll) // 因为要滚动右侧，所以先把取消监听滚动事件
    state.rightScroll.scrollTo(0, -state.categoryPosition[index], 500) // 参数： x坐标  y坐标  执行时长
    state.menuIndex = index
    setTimeout(listenScroll, 700) // 再次监听，延迟大于上方动画的500ms
    loadImg(index)
}

const handleRightScroll = (pos: any) => {
    // 右侧滚动时  判断当前左侧是第几个分类
    // 当右边分类位置小于当前页面上方卷出距离且下一个分类位置大于当前卷出距离， 或者已经最后一个分类
    // 满足上方条件更改左边菜单的样式，加载图片
    for (let i = 0; i < state.categoryPosition.length; i++) {
        if (
            (state.categoryPosition[i] <= Math.ceil(Math.abs(pos.y))
            && i === state.categoryPosition.length - 1)
          || state.categoryPosition[i + 1] > Math.ceil(Math.abs(pos.y))
        ) {
            state.menuIndex = i
            loadImg(i)
            loadImg(i + 1)
            break
        }
    }
}

// 监听滚动事件
const listenScroll = () => {
    state.rightScroll.on('scroll', handleRightScroll)
}

// 图片懒加载
// 当调此函数将当前分类下的食品图片src更换成真实图片，从而实现懒加载
// 三个地方调用此函数：
// 1.初始获取到数据时->第一个分类，
// 2.滚动右边食品时->加载当前分类以及下一个分类（预加载），
// 3.点击左边分类时->加载对应分类的食品图片
const loadImg = (index: number) => {
    // 如果已经加载过则return
    if (state.loadedImg.includes(index) || state.loadedImg.length === state.categoryBoxList.length) {
        return
    }
    state.loadedImg.push(index)
    const imgList = Array.from(state.categoryBoxList[index].querySelectorAll('img'))
    imgList.forEach(item => {
        item.src = item.getAttribute('realsrc')
    })
}
</script>

<style lang="scss" scoped>

#menu {
    height: 100%;
    display: flex;
    flex: 1;
    padding-bottom: 60px;
    overflow: hidden;

    .left,
    .right {
        overflow: hidden;
    }

    .left {
        width: 100px;
        background: rgb(244, 244, 244);

        ul {
            li {
                width: 100px;
                text-align: center;
                font-weight: bold;
                font-size: 14px;
                line-height: 30px;
                border-bottom: 1px dashed $mtGrey;

                &.activity-menu {
                    background: #fff;
                }
            }
        }
    }

    /* 右侧   商品样式 */
    .right {
        position: relative;
        flex: 1;

        article {
            & > section {
                padding-top: 4px;

                h2 {
                    font-size: 14px;
                    font-weight: bold;
                    margin: 0 4px;
                    padding-left: 4px;
                    border-left: 3px solid $mtYellow;
                }

                article {
                    section {
                        display: flex;
                        position: relative;
                        margin: 0 6px;
                        padding: 6px;
                        border-bottom: 1px solid $mtGrey;

                        .img {
                            width: 60px;
                            height: 60px;
                            margin-right: 6px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .info {
                            flex: 1;
                            vertical-align: top;

                            .name,
                            .price {
                                font-weight: bold;
                            }

                            .name {
                                font-size: 14px;
                            }

                            .sell-num {
                                font-size: 14px;
                                margin: 5px 0;
                            }

                            .price {
                                color: rgb(251, 79, 69);
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
