import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartList: {}, // 加入购物车列表
        /*  这样可以记录多个餐馆以及每个餐馆的加购数据
            cartList 结构 {
                餐馆id：{
                    食品id: {
                        foods_pic: ,
                        id: ,
                        name: ,
                        num: ,
                        price: ,
                    },
                    .....
                    pic_url: ,
                    restaurant_name: ,
                    totalNum: ,
                    totalPrice: ,
                },
                .....
            }
         */
    }),

    actions: {
        // 食物数量加一
        addCart(food) {
            const { restaurant_id, restaurant_name, pic_url, food_id, price, name, foods_pic } = food
            if (!this.cartList[restaurant_id]) {
                // 如果购物车还没有这个餐馆的食品则初始化
                this.cartList[restaurant_id] = {
                    restaurant_name,
                    pic_url,
                    totalNum: 0,
                    totalPrice: 0,
                }
            }
            let restaurant = this.cartList[restaurant_id] // 餐馆信息
            restaurant.totalPrice = (Number(restaurant.totalPrice) + Number(price)).toFixed(2) // 计算总价格
            restaurant.totalNum++
            if (restaurant[food_id]) {
                // 如果已经存在该食物，则食物数量加一
                restaurant[food_id].num++
            } else {
                restaurant[food_id] = {
                    // 初始化该食物
                    name,
                    price,
                    foods_pic,
                    num: 1,
                    id: food_id,
                }
            }
            localStorage.setItem('cartList', JSON.stringify(this.cartList)) // 存储到本地存储中
        },

        // 食物数量减一
        reduceCart(food) {
            const { restaurant_id, food_id } = food
            const restaurant = this.cartList[restaurant_id]
            restaurant[food_id].num--
            restaurant.totalNum--
            if (restaurant[food_id].num === 0) {
                delete restaurant.food_id
            }
            if (restaurant.totalNum === 0) {
                delete this.cartList[restaurant_id]
            }

            localStorage.setItem('cartList', JSON.stringify(this.cartList))
        },

        // 清空购物车
        emptyCart(id) {
            delete this.cartList[id]
            localStorage.setItem('cartList', JSON.stringify(this.cartList))
        },
    },
})
