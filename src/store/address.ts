import { defineStore } from 'pinia'
import { getLocation } from '@/api/location'

export const useAddressStore = defineStore('address', {
    state: () => ({
        lat: '', // 当前位置纬度
        lng: '', // 当前位置经度
        address: '定位中...',
    }),

    actions: {
        // 获取用户当前位置
        async getNowlocation() {
            try {
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
    },
})
