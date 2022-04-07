<template>
    <div id="cart">
        <v-head title="购物车" bg-color="#f4f4f4">
            <template v-if="!editStatus" slot:edit-cart class="edit" @click="editStatus = true;"> 编辑 </template>
            <template v-else slot:cancel-edit-cart class="edit" @click="editStatus = false;"> 取消 </template>
        </v-head>

        <div v-if="emptyCart" class="empty-cart">
            <div class="info-container">
                <img src="../../assets/nothing.png" />
                <span class="text">购物车空空如也，快去逛逛吧</span>
                <router-link class="redirect-index" to="/index"><span>去逛逛</span></router-link>
            </div>
        </div>

        <!-- <article v-for="(item,restaurant_id) in cartList" :key="restaurant_id">
            <section class="title">
                <span v-if="editStatus && deleteSelectFood[restaurant_id]['allSelect'] === true" class="delete-selected selected" @click="allSelectDelete(restaurant_id,false)">
                    <i class="iconfont">&#xe6da;</i>
                </span>
                <span v-else-if="editStatus" class="select" @click="allSelectDelete(restaurant_id,true)"> </span>
                <span v-if="!editStatus && selectFood[restaurant_id]['allSelect'] === true" class="selected" @click="allSelect(restaurant_id,false)">
                    <i class="iconfont">&#xe6da;</i>
                </span>
                <span v-else-if="!editStatus" class="select" @click="allSelect(restaurant_id,true)"> </span>
                <span class="restaurant-picture">
                    <img :src="item.pic_url" />
                </span>
                <span class="restaurant-name">{{ item.restaurant_name }}</span>
            </section>
            <section v-for="(food,foodKey) in item" v-if="Number(foodKey)" :key="foodKey" class="main-container">
                <div class="foods">
                    <span v-if="editStatus && deleteSelectFood[restaurant_id][foodKey] === true" class="selected delete-selected" @click="cancelSelectDelete(restaurant_id,foodKey)">
                        <i class="iconfont">&#xe6da;</i>
                    </span>
                    <span v-else-if="editStatus" class="select delete-select" @click="selectDelete(restaurant_id,foodKey)"> </span>
                    <span v-if="!editStatus && selectFood[restaurant_id][foodKey] === true" class="selected" @click="cancelSelect(restaurant_id,foodKey)">
                        <i class="iconfont">&#xe6da;</i>
                    </span>
                    <span v-else-if="!editStatus" class="select" @click="select(restaurant_id,foodKey)"> </span>
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
            <div v-show="!editStatus" class="bottom">
                <span class="submit" :class="{active:!selectFood[restaurant_id]['totalPrice']}" @click="submit(restaurant_id)">去结算 </span>
                <span class="total-price">￥{{ selectFood[restaurant_id]['totalPrice'].toFixed(2) }}</span>
            </div>
        </article> -->

        <footer v-show="editStatus" class="btn-delete" @click="deleteCart()">
            <span>删除</span>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, toRefs } from 'vue'
import { useCartStore } from '@/store/cart'
import router from '@/router/index'

const state = reactive({
    totalPrice: 0,
    selectFood: {}, // 选中列表
    deleteSelectFood: {}, // 选中删除列表
    editStatus: false, // 编辑状态
    emptyCart: true // 购物车为空
})
let { totalPrice, selectFood, deleteSelectFood, editStatus, emptyCart } = toRefs(state)
const store = useCartStore()
const cartList = computed(() => store.cartList)

emptyCart = !Object.keys(cartList.value).length
console.log(cartList.value)
Object.keys(cartList.value).forEach(restaurant_id => { // 初始化选中列表
    selectFood[restaurant_id] = {
        allSelect: true,
        totalPrice: 0
    }
    deleteSelectFood[restaurant_id] = {
        allSelect: false
    }
    let restaurant = cartList.value[restaurant_id]
    Object.keys(restaurant).forEach(data => {
        if (Number(data)) {
            deleteSelectFood[restaurant_id][data] = false
            selectFood[restaurant_id][data] = true
            selectFood[restaurant_id].totalPrice += Number(restaurant[data].price) * Number(restaurant[data].num)
        }
    })
})

function cancelSelect(restaurant_id, foodKey) { // 取消选中商品
    selectFood[restaurant_id][foodKey] = false // 该商品取消选中
    selectFood[restaurant_id].allSelect = false // 全选标志为false
    let cartFoodData = cartList[restaurant_id][foodKey] // 购物车中 该商品信息
    selectFood[restaurant_id].totalPrice -= cartFoodData.num * cartFoodData.price // 修改价格
    selectFood = { ...selectFood } // 拓展运算符使vue更新视图
}
function cancelSelectDelete(restaurant_id, foodKey) { // 取消删除选中
    deleteSelectFood[restaurant_id][foodKey] = false // 该商品删除选中为false
    deleteSelectFood[restaurant_id].allSelect = false // 全选标志为false
    deleteSelectFood = { ...deleteSelectFood } // 拓展运算符使vue更新视图
}
function select(restaurant_id, foodKey) { // 选中商品
    selectFood[restaurant_id][foodKey] = true // 该商品选中置true
    let cartFoodData = cartList[restaurant_id][foodKey] // 购物车中 该商品信息
    selectFood[restaurant_id].totalPrice += cartFoodData.num * cartFoodData.price // 修改价格

    // 判读是否全选
    let newObj = { ...selectFood[restaurant_id] }
    let allSelect = isAllSelect(newObj, restaurant_id)
    selectFood[restaurant_id].allSelect = allSelect
    selectFood = { ...selectFood } // 拓展运算符使vue更新视图
}
function selectDelete(restaurant_id, foodKey) { // 选中删除商品
    deleteSelectFood[restaurant_id][foodKey] = true // 该商品选中置为true
    // 判读是否全选
    let newObj = { ...deleteSelectFood[restaurant_id] }
    let allSelect = isAllSelect(newObj, restaurant_id)
    deleteSelectFood[restaurant_id].allSelect = allSelect
    deleteSelectFood = { ...deleteSelectFood } // 拓展运算符使vue更新视图
}
function isAllSelect(newObj) { // 判断商品是否全选中了 如果全选中那么商家头像左边的按钮对应选中
    delete newObj.allSelect
    let values = Object.values(newObj)
    let noAllSelect = values.some((el) => {
        if (el === false) { return true }
    })
    return !noAllSelect
}
function allSelect(restaurant_id, boolean) { // 全选
    selectFood[restaurant_id].allSelect = boolean // 全选标志
    Object.keys(selectFood[restaurant_id]).forEach(el => { // 每个商品都选中
        if (Number(el)) { selectFood[restaurant_id][el] = boolean }
    })

    if (boolean) { // 如果是选中 计算价格
        let restaurant = cartList[restaurant_id]
        Object.keys(restaurant).forEach(el => {
            if (Number(el)) {
                selectFood[restaurant_id].totalPrice += restaurant[el].num * restaurant[el].price
            }
        })
    } else { // 取消全选
        selectFood[restaurant_id].totalPrice = 0
    }
    selectFood = { ...selectFood } // 拓展运算符使vue更新视图
}
function allSelectDelete(restaurant_id, boolean) { // 删除状态下的全选
    // deleteSelectFood[restaurant_id].allSelect = boolean
    // Object.keys(deleteSelectFood[restaurant_id]).forEach(el => {
    //     if (Number(el)) { deleteSelectFood[restaurant_id][el] = boolean }
    // })
    // deleteSelectFood = { ...deleteSelectFood } // 拓展运算符使vue更新视图
}
function submit(restaurant_id) { // 提交订单
    if (!selectFood[restaurant_id].totalPrice) // 如果没有选中食物 不能提交订单
    { return }
    let restaurant = selectFood[restaurant_id] // 选中食物的餐馆
    let foods = {
        totalPrice: 0,
        totalNum: 0
    }
    Object.keys(restaurant).forEach(el => { // 计算价格
        if (Number(el) && restaurant[el]) {
            let food = cartList[restaurant_id][el]
            foods[el] = food
            foods.totalPrice += food.num * food.price
            foods.totalNum += food.num
        }
    })
    let data = {
        restaurant_id,
        foods
    }
    localStorage.setItem('confirmOrderData', JSON.stringify(data))
    router.push({ path: '/confirm_order' })
}
function deleteCart() { // 删除购物车
    Object.keys(deleteSelectFood).forEach((restaurant_id) => {
        let restaurant = deleteSelectFood[restaurant_id] // 商店
        Object.keys(restaurant).forEach(food_id => { // 要删除的商品
            if (Number(food_id) && restaurant[food_id]) { // 删除购物车数据
                store.deleteFood({ restaurant_id, food_id })
                delete selectFood[restaurant_id][food_id]
            }
            allSelect(restaurant_id, false) // 重置选中列表为false
            delete restaurant[food_id]
        })
    })
    editStatus = false
    emptyCart = !Object.keys(cartList).length
}
</script>

<style lang="scss" scoped></style>
