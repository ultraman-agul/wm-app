<template>
    <div id="selector">
        <div v-if="foodNum" class="ball-container" @click="reduceCart">
            <var-icon name="minus-circle-outline" />
        </div>
        <span v-if="foodNum" class="number">{{ foodNum }}</span>
        <div class="ball-container" @click="addCart()">
            <var-icon name="plus-circle-outline" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/store/Cart'
import { useRestaurantStore } from '@/store/restaurant'
import { computed } from 'vue'
//    接收父组件传递进来的货物  和 商店 id 和图片url
const props = defineProps({
    food_id: Number,
    name: String,
    price: String,
    pic: String,
})
const store = useCartStore()
const shopStore = useRestaurantStore()
const addCart = () => {
    let { pic_url } = shopStore.shopInfo // 商店名字 图片
    let restaurant_name = shopStore.shopInfo.name
    store.addCart({
        restaurant_name,
        pic_url,
        name: props.name,
        price: props.price,
        foods_pic: props.pic,
        food_id: props.food_id,
        restaurant_id: shopStore.shopInfo.id,
    })
}
const reduceCart = () => {
    store.reduceCart({ restaurant_id: shopStore.shopInfo.id, food_id: props.food_id })
}

const foodNum = computed(() => {
    let restaurant = store.cartList[shopStore.shopInfo.id]
    return restaurant ? restaurant[props.food_id] ? restaurant[props.food_id].num : 0 : 0
})
</script>

<style lang="scss" scoped>

#selector {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .number {
        display: inline-block;
        margin: 0 4px;
        font-size: 16px;
    }

    .ball-container {
        padding: 10px;
        color: $mtGrey;
    }
}
</style>
