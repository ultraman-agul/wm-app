import { defineStore } from 'pinia'
import { getLocation } from '@/api/location'

export const useAddressStore = defineStore('address', {
    state: () => ({
        lat: '', // 当前位置纬度
        lng: '', // 当前位置经度
        address: '定位中...',
        deliveryAddress: '',
    }),

    actions: {
        // 获取用户当前位置
        async getNowlocation() {
            try {
                // 将用户此时的ip传递过去后端,获取经纬度,然后再获取当前位置
                const result: any = await getLocation({ ip: sessionStorage.getItem('ip') })
                if (result.status === 200) {
                    this.address = result.data.address
                    this.lat = result.data.location.lat
                    this.lng = result.data.location.lng
                    console.log(this.address)
                }
            } catch (e) {
                console.log(e)
            }
        },

        // 更改收货地址
        setAddress(address: any) {
            this.address = address.title
            this.lat = address.location.lat
            this.lng = address.location.lng
        },

        // 添加收货地址
        setAddAddress(address: any) {
            this.deliveryAddress = address
        },
    },
})
