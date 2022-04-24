<!--搜索餐馆-->
<template>
    <div class="search-foods">
        <v-head title="搜索"></v-head>
        <div class="search">
            <var-input v-model="keyword" placeholder="请输入搜索内容" @input="search">
                <template #prepend-icon>
                    <var-icon name="magnify" />
                </template>
            </var-input>
            <var-button type="primary">搜索</var-button>
        </div>
        <div class="lists">
            <ul>
                <router-link v-for="(item,index) in searchList" :key="index" :to="{path:'store',query:{id:item.id}}" tag="li">
                    <span class="avatar"><img :src="item.pic_url" /></span>
                    <span class="name" v-html="high_light(item.name)"></span>
                    <span class="delivery-time">{{ item.delivery_time_tip }}送达</span>
                    <var-icon name="chevron-right" />
                </router-link>
            </ul>
            <p>暂无更多~换个关键词试试~</p>
        </div>
    </div>
</template>

<script lang="ts">
import { searchRestaurant } from '@/api/restaurant'
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
    setup() {
        const state = reactive({
            keyword: '',
            searchList: [],
            search() {
                if (!state.keyword) { return }
                searchRestaurant({ keyword: state.keyword }).then((res) => {
                    if (res.status === 200) {
                        if (res.data.length) {
                            state.searchList = res.data
                        } else {

                        }
                    } else {

                    }
                })
            },
            high_light(value) {
                return value.replace(state.keyword, `<span style="color:#ffd161;">${state.keyword}</span>`)
            }
        })
        return {
            ...toRefs(state)
        }
    }
})
</script>

<style lang="scss" scoped>

.search-foods {
  background-color: #f4f4f4;
  height: calc(100%);
  .search{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .lists{
    ul{
      margin-top: 20px;
      a{
        line-height: 50px;
        height: 50px;
        padding: 0 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fff;
        img{
          width: 50px;
          vertical-align: middle;
        }
      }
    }
    p{
      text-align: center;
      font-size: 12px;
      margin-top: 30px;
    }
  }
}
</style>
