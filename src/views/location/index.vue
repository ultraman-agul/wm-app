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
        <ul>
            <li v-for="item in state.addressList" :key="item.id" @click="setAddress(item)">
                <p>{{ item.title }}</p>
                <p>{{ item.address }}</p>
            </li>
        </ul>
        <var-button v-if="!flag" block color="#fff" @click="getNowLocation"> <var-icon name="map-marker-radius" />点击定位当前位置 </var-button>
    </div>
</template>

<script setup lang="ts">
import { useAddressStore } from '@/store/address'
import { locationSearch } from '@/api/location'
import { ref, reactive } from 'vue'
import { Snackbar } from '@varlet/ui'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const flag = route.query.addAddress
let address = ref('')
let timer: any
const state = reactive({
    addressList: []
})

const store = useAddressStore()

function getNowLocation() {
    store.getNowlocation()
    // 首页点进来，点击后回退到首页
    router.push('/index')
}

function setAddress(item:any) {
    if (!flag) { // 首页点进来，点击后回退到首页
        store.setAddress(item)
        router.push('/index')
    } else { // 添加收货地址，回退上页
        store.setAddAddress(item)
        router.go(-1)
    }
}

function search(val:any) {
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        locationSearch({ keyword: val }).then((data:any) => {
            if (data.status === 200) {
                state.addressList = data.data.data
            } else {
                Snackbar.error('获取位置失败')
            }
        }).catch((e: string) => {
            Snackbar.error('获取位置失败' + e)
        })
    }, 1000)
}
</script>

<style lang="scss" scoped>
.location {
    background-color: #f4f4f4;
    height: 100%;

    button {
        padding: 30px 0;
    }

    .search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px;
        background-color: #fff;
        margin: 10px 0;

        button {
            width: 100px;
            padding: 10px;
            margin-left: 10px;
        }
    }

    ul {
        background-color: #fff;
        padding: 10px;

        li {
            padding: 10px;
            border-bottom: 1px solid #f4f4f4;

            p:nth-child(2) {
                padding-top: 4px;
                color: #aaa;
                font-size: 14px;
            }
        }
    }
}
</style>
