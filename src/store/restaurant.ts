import { defineStore } from 'pinia'
import { getResturantById } from '@/api/restaurant'

export const useRestaurantStore = defineStore('restaurant', {
    state: () => ({
        shopInfo: {},
    }),

    actions: {
        getResturantById(id: any) {
            getResturantById({ id })
                .then((data) => {
                    if (data.status === 200) {
                        this.shopInfo = data.data
                    }
                })
                .catch((e) => console.log(e))
        },
    },
})
