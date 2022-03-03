<template>
    <div class="head">
        <span class="iconfont icon-arrow-left-bold go-back"></span>
        <span class="title">{{title}}</span>
        <span class="more iconfont icon-elipsis" v-if="more"></span>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    title: string,
    more: boolean
    }>()
</script>

<style lang="scss">
.head{
    position: relative;
    background-color: yellow;
    text-align: center;
    line-height: 1rem;
    padding: 0 0.2rem;
    .go-back,
    .more {
        position: absolute;
        i {
        font-size: 0.7rem;
        }
    }
    .go-back {
        left: 10px;
    }
    .title {
        flex: 1;
        font-size: 0.5rem;
        font-weight: bold;
        text-align: center;
    }
    .more {
        right: 15px;
    }
}
</style>
