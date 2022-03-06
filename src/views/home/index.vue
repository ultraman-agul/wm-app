<template>
    <v-head title="home"></v-head>
    <h3>{{ username.name }}</h3>
    <div class="box">
        <button @click="handleClick">按钮</button>
        <div></div>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { getAllAddress } from '@/api/user'

const username = useUserStore()
const handleClick = async () => {
    const content = await getAllAddress()
    console.log(content)
}
</script>

<style lang="scss">
.box {
    background-color: $mtYellow;

    button {
        display: block;
        width: 50px;
        margin: 0 auto;
    }
}
</style>
