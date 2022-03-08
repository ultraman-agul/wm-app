<template>
    <v-head title="请选择收货地址"></v-head>
    <div class="location">
        <div class="search">
            <var-input v-model="address" placeholder="请输入收货地址" @input="search">
                <template #prepend-icon>
                    <var-icon name="magnify" />
                </template>
            </var-input>
            <var-button type="primary">搜索</var-button>
        </div>

        <var-button block @click="getNowLocation"><var-icon name="map-marker-radius" />点击定位当前位置</var-button>
    </div>
</template>

<script setup lang="ts">
import { useAddressStore } from '@/store/address'
import { locationSearch } from '@/api/location'
import { debounce } from '@/utils/tools'
import { ref } from 'vue'

let address = ref('')
const store = useAddressStore()

function getNowLocation() {
    store.getNowlocation()
}

const debounceSearch = debounce(locationSearch, 1000) // 这个函数起到防抖的作用，短时间多次触发，只执行最后一次
function search(val:any) {
    console.log(111)
    debounceSearch(({ keyword: val }))
}
</script>

<style lang="scss" scoped>
.location {
    button {
        margin-top: 20px;
        padding: 30px 0;
    }

    .search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;

        button {
            margin: 0;
            width: 100px;
            padding: 10px;
            margin-left: 10px;
        }
    }
}
</style>
