<template>
    <div id="cart">
        <v-head title="购物车" go-back="true" bg-color="#f4f4f4">
            <template v-if="!editStatus" #edit-cart>
                <span class="edit" @click="editStatus = true;">编辑</span>
            </template>
            <template v-else #cancel-edit-cart>
                <span class="edit" @click="editStatus = false;">取消</span>
            </template>
        </v-head>

        <div v-if="emptyCart" class="empty-cart">
            <div class="info-container">
                <img src="../../assets/nothing.png" />
                <span class="text">购物车空空如也，快去逛逛吧</span>
                <router-link class="redirect-index" to="/index">
                    <var-button type="success">去逛逛</var-button>
                </router-link>
            </div>
        </div>

        <article v-for="(item,restaurant_id) in cartList" :key="restaurant_id">
            <section class="title">
                <span v-if="editStatus && deleteSelectFood[restaurant_id]['allSelect'] === true" class="delete-selected selected" @click="allSelectDelete(restaurant_id,false)">
                    <var-icon name="checkbox-marked-circle-outline" />
                </span>
                <span v-else-if="editStatus" class="select" @click="allSelectDelete(restaurant_id,true)"> <var-icon name="radio-blank" /> </span>
                <span v-if="!editStatus && selectFood[restaurant_id]['allSelect'] === true" class="selected" @click="allSelect(restaurant_id,false)">
                    <var-icon name="checkbox-marked-circle-outline" />
                </span>
                <span v-else-if="!editStatus" class="select" @click="allSelect(restaurant_id,true)"> <var-icon name="radio-blank" /> </span>
                <span class="restaurant-picture">
                    <img :src="item.pic_url" />
                </span>
                <span class="restaurant-name">{{ item.restaurant_name }} &gt;</span>
            </section>
            <section v-for="(food,foodKey) in item" :key="foodKey" class="main-container">
                <div v-if="Number(foodKey)" class="foods">
                    <span v-if="editStatus && deleteSelectFood[restaurant_id][foodKey] === true" class="selected delete-selected" @click="cancelSelectDelete(restaurant_id,foodKey)">
                        <var-icon name="checkbox-marked-circle-outline" />
                    </span>
                    <span v-else-if="editStatus" class="select delete-select" @click="selectDelete(restaurant_id,foodKey)"> <var-icon name="radio-blank" /> </span>
                    <span v-if="!editStatus && selectFood[restaurant_id][foodKey] === true" class="selected" @click="cancelSelect(restaurant_id,foodKey)">
                        <var-icon name="checkbox-marked-circle-outline" />
                    </span>
                    <span v-else-if="!editStatus" class="select" @click="select(restaurant_id,foodKey)"><var-icon name="radio-blank" /> </span>
                    <div class="picture-container">
                        <img :src="food.foods_pic" />
                    </div>
                    <div class="info">
                        <span class="name">{{ food.name }}</span>
                        <div>
                            <span class="num">x{{ food.num }}</span>
                            <span class="price">￥{{ food.price }}</span>
                        </div>
                    </div>
                </div>
            </section>
            <div v-show="!editStatus" class="bottomBox">
                <div class="bottom">
                    <span class="total-price">￥{{ selectFood[restaurant_id]['totalPrice'].toFixed(2) }}</span>
                    <span class="submit" :class="{active:!selectFood[restaurant_id]['totalPrice']}" @click="submit(restaurant_id)">去结算 </span>
                </div>
            </div>
        </article>

        <footer v-show="editStatus" class="btn-delete" @click="deleteCart()">
            <var-button type="danger">删除</var-button>
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter()
        const store = useCartStore()
        const cartList = computed(() => store.cartList)
        const state = reactive({
            totalPrice: 0,
            selectFood: {}, // 选中列表
            deleteSelectFood: {}, // 选中删除列表
            editStatus: false, // 编辑状态
            emptyCart: true, // 购物车为空
            cancelSelect(restaurant_id: number, foodKey: number) { // 取消选中商品
                state.selectFood[restaurant_id][foodKey] = false // 该商品取消选中
                state.selectFood[restaurant_id].allSelect = false // 全选标志为false
                let cartFoodData = cartList.value[restaurant_id][foodKey] // 购物车中 该商品信息
                state.selectFood[restaurant_id].totalPrice -= cartFoodData.num * cartFoodData.price // 修改价格
                state.selectFood = { ...state.selectFood } // 拓展运算符使vue更新视图
            },
            cancelSelectDelete(restaurant_id: number, foodKey: number) { // 取消删除选中
                state.deleteSelectFood[restaurant_id][foodKey] = false // 该商品删除选中为false
                state.deleteSelectFood[restaurant_id].allSelect = false // 全选标志为false
                state.deleteSelectFood = { ...state.deleteSelectFood } // 拓展运算符使vue更新视图
            },
            select(restaurant_id: number, foodKey: number) { // 选中商品
                state.selectFood[restaurant_id][foodKey] = true // 该商品选中置true
                let cartFoodData = cartList.value[restaurant_id][foodKey] // 购物车中 该商品信息
                state.selectFood[restaurant_id].totalPrice += cartFoodData.num * cartFoodData.price // 修改价格

                // 判读是否全选
                let newObj = { ...state.selectFood[restaurant_id] }
                let allSelect = state.isAllSelect(newObj, restaurant_id)
                state.selectFood[restaurant_id].allSelect = allSelect
                state.selectFood = { ...state.selectFood } // 拓展运算符使vue更新视图
            },
            selectDelete(restaurant_id, foodKey) { // 选中删除商品
                state.deleteSelectFood[restaurant_id][foodKey] = true // 该商品选中置为true
                // 判读是否全选
                let newObj = { ...state.deleteSelectFood[restaurant_id] }
                let allSelect = state.isAllSelect(newObj, restaurant_id)
                state.deleteSelectFood[restaurant_id].allSelect = allSelect
                state.deleteSelectFood = { ...state.deleteSelectFood } // 拓展运算符使vue更新视图
            },
            isAllSelect(newObj) { // 判断商品是否全选中了 如果全选中那么商家头像左边的按钮对应选中
                delete newObj.allSelect
                let values = Object.values(newObj)
                let noAllSelect = values.some((el) => {
                    if (el === false) { return true }
                })
                return !noAllSelect
            },
            allSelect(restaurant_id: number, boolean: boolean) { // 全选
                state.selectFood[restaurant_id].allSelect = boolean // 全选标志
                Object.keys(state.selectFood[restaurant_id]).forEach(el => { // 每个商品都选中
                    if (Number(el)) { state.selectFood[restaurant_id][el] = boolean }
                })

                if (boolean) { // 如果是选中 计算价格
                    let restaurant = cartList.value[restaurant_id]
                    Object.keys(restaurant).forEach(el => {
                        if (Number(el)) {
                            state.selectFood[restaurant_id].totalPrice += restaurant[el].num * restaurant[el].price
                        }
                    })
                } else { // 取消全选
                    state.selectFood[restaurant_id].totalPrice = 0
                }
                state.selectFood = { ...state.selectFood } // 拓展运算符使vue更新视图
            },
            allSelectDelete(restaurant_id, boolean) { // 删除状态下的全选
                state.deleteSelectFood[restaurant_id].allSelect = boolean
                Object.keys(state.deleteSelectFood[restaurant_id]).forEach(el => {
                    if (Number(el)) { state.deleteSelectFood[restaurant_id][el] = boolean }
                })
                state.deleteSelectFood = { ...state.deleteSelectFood } // 拓展运算符使vue更新视图
            },
            submit(restaurant_id) { // 提交订单
                if (!state.selectFood[restaurant_id].totalPrice) // 如果没有选中食物 不能提交订单
                { return }
                let restaurant = state.selectFood[restaurant_id] // 选中食物的餐馆
                let foods = {
                    totalPrice: 0,
                    totalNum: 0
                }
                Object.keys(restaurant).forEach(el => { // 计算价格
                    if (Number(el) && restaurant[el]) {
                        let food = cartList.value[restaurant_id][el]
                        foods[el] = food
                        foods.totalPrice += food.num * food.price
                        foods.totalNum += food.num
                    }
                })
                let data = {
                    restaurant_id,
                    foods
                }
                localStorage.setItem('comfirmOrder', JSON.stringify(data))
                router.push('/comfirmOrder')
            },
            deleteCart() { // 删除购物车
                Object.keys(state.deleteSelectFood).forEach((restaurant_id) => {
                    let restaurant = state.deleteSelectFood[restaurant_id] // 商店
                    Object.keys(restaurant).forEach(food_id => { // 要删除的商品
                        if (Number(food_id) && restaurant[food_id]) { // 删除购物车数据
                            store.deleteFood({ restaurant_id, food_id })
                            delete state.selectFood[restaurant_id][food_id]
                        }
                        state.allSelect(restaurant_id, false) // 重置选中列表为false
                        delete restaurant[food_id]
                    })
                })
                state.editStatus = false
                state.emptyCart = !Object.keys(cartList.value).length
            }
        })
        state.emptyCart = !Object.keys(cartList.value).length
        Object.keys(cartList.value).forEach(restaurant_id => { // 初始化选中列表
            state.selectFood[restaurant_id] = {
                allSelect: true,
                totalPrice: 0
            }
            state.deleteSelectFood[restaurant_id] = {
                allSelect: false
            }
            let restaurant = cartList.value[restaurant_id]
            Object.keys(restaurant).forEach(data => {
                if (Number(data)) {
                    state.deleteSelectFood[restaurant_id][data] = false
                    state.selectFood[restaurant_id][data] = true
                    state.selectFood[restaurant_id].totalPrice += Number(restaurant[data].price) * Number(restaurant[data].num)
                }
            })
        })
        return {
            ...toRefs(state),
            cartList
        }
    }
})
</script>

<style lang="scss" scoped>
#cart{
    height: 100%;
    background-color: #f4f4f4;
    .empty-cart{
        .info-container{
            height: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            img{
                height: 200px;
                width: 200px;
            }
        }
    }
    article{
        padding: 10px;
        background-color: #fff;
        margin: 10px;
        border-radius: 6px;
        .title{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .restaurant-name{
                font-weight: bolder;
            }

            img{
                margin: 0 20px;
                width: 30px;
                height: 30px;
                border-radius: 10px;
            }
        }

        .main-container{
            .foods{
                margin: 4px 0;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                img{
                    margin: 0 20px;
                    width: 50px;
                    height: 50px;
                    border-radius: 10px;
                }
            }
        }
        .bottomBox{
            border-top: 1px solid #ccc;
            padding-top: 10px;
            overflow: hidden;
            .bottom{
                float: right;
                height: 40px;
                width: 120px;
                line-height: 40px;
                span{
                    display: inline-block;
                    width: 60px;
                    text-align: center;
                    font-weight: bold;
                    font-size: 14px;
                }
                span:first-of-type{
                    background-color: lightyellow;
                    border-top-left-radius: 20px;
                    border-bottom-left-radius: 20px;
                }
                span:last-of-type{
                    background-color: $mtYellow;
                    border-top-right-radius: 20px;
                    border-bottom-right-radius: 20px;
                }
            }
        }

    }
    footer{
        background-color: #fff;
        width: 100%;
        text-align: right;
        padding: 10px;
        position: fixed;
        bottom: 0;
        right: 0;
    }
}
</style>
