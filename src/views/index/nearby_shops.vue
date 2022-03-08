<template>
    <div class="nearby">
        <ul>
            <li>综合排序<var-icon name="chevron-down" /></li>
            <li>销量最高</li>
            <li>距离最近</li>
            <li>筛选<var-icon name="chevron-down" /></li>

            <var-button @click="getResturant"> 获取餐馆列表 </var-button>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { getAllResturant } from '@/api/restaurant'

function getResturant() {
    getAllResturant().then(data => {
        console.log(data)
    }).catch(e => {
        console.log(e)
    })
}
</script>

<style lang="scss">
.nearby {
    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
