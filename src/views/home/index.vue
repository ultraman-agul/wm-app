<template>
    <v-head title="home"></v-head>
    <h3>{{username.name}}</h3>
    <div class="box">
        <button @click="handleClick">按钮</button>
        <div></div>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { _get } from '@/api/index'
const username = useUserStore()
const handleClick = () => {
    const content = _get({url:'test', data: {}})
    console.log(content)
}
console.log()
</script>

<style lang="scss">
.box {
    background-color: $mtYellow;
    button{
        width: 1rem;
        margin-left: 2.5rem
    }
    div{
        width: 1rem;
        background-color: red;
        height: 2rem;
    }
}
</style>
