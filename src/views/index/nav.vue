<template>
    <nav class="nav">
        <div v-for="item in categoryList" :key="item.type" class="item">
            <img :src="item.url" :alt="item.name" />
            <p>{{ item.name }}</p>
        </div>
    </nav>
    <img src="@/assets/banner.jpg" alt="" class="banner" />
</template>

<script lang="ts" setup>
const categoryList = [
    {
        name: '美食',
        url: 'http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png',
        type: 'food',
    },
    {
        name: '美团超市',
        url: 'http://p0.meituan.net/94.0.100/jungle/6b93ee96be3df7cf2bb6e661280b047d3975.png',
        type: 'supermarket',
    },
    {
        name: '生鲜果蔬',
        url: 'http://p0.meituan.net/94.0.100/jungle/f33ed552c52b4466b6308a2c14dbc62d4882.png',
        type: 'fruit',
    },
    {
        name: '下午茶',
        url: 'http://p0.meituan.net/94.0.100/jungle/af6cf63a5dfeb3557bf3099b03002ec34124.png',
        type: 'tea',
    },
    {
        name: '正餐优选',
        url: 'http://p1.meituan.net/94.0.100/jungle/1543bbcb048218424e2420a6934e17b24236.png',
        type: 'dinner',
    },
    {
        name: '汉堡披萨',
        url: 'http://p1.meituan.net/94.0.100/jungle/0e63b86b4ff14d214c1999a979fd21d14273.png',
        type: 'pizza',
    },
    {
        name: '跑腿代购',
        url: 'http://p1.meituan.net/94.0.100/jungle/b40b7d72233f7a76dd9d97af40b4b8975414.png',
        type: 'buyOnSomebody',
    },
    {
        name: '快餐简餐',
        url: 'http://p0.meituan.net/94.0.100/jungle/deeea00bb23e4fae31ea154678c7a8003838.png',
        type: 'fastFood',
    },
    {
        name: '地方菜',
        url: 'http://p1.meituan.net/94.0.100/jungle/b6033c2f9aa26cdf37ea24fb1346d2dc4690.png',
        type: 'localDish',
    },
    {
        name: '炸鸡美食',
        url: 'http://p0.meituan.net/94.0.100/jungle/0ce9a33a4accc536ac9e2d8d91951c924673.png',
        type: 'chicken',
    },
    // {
    //     name: '免配送费',
    //     url: 'http://p0.meituan.net/94.0.100/jungle/f5ef975cae40ecc1a21dae61f44575d59129.png',
    //     type: 'freeDeliver',
    // },
]
</script>

<style lang="scss" scoped>
.nav {
    display: grid;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(2, 88px);

    .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 14px;
        margin-bottom: 20px;

        img {
            width: 50px;
            height: 50px;
            margin-bottom: 10px;
        }
    }
}

.banner {
    height: 80px;
    width: 100%;
    border-radius: 10px;
}
</style>
