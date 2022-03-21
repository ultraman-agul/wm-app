<template>
    <div class="head">
        <var-icon name="chevron-left" class="go-back" :size="26" @click="goBack()" />
        <span class="title">{{ title }}</span>
        <var-icon v-if="props.more" name="dots-vertical" class="more" :size="26" />
        <slot name="add"></slot>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const props = defineProps<{
    title: string,
    more?: boolean,
    store?: boolean,
}>()

const router = useRouter() // 先实例化再调用方法，不能连写作 userRouter().back()
const goBack = () => {
    // 如果是在商店内的路由,点击返回时跳转到主页面
    props.store ? router.push('/index') : router.back()
}
</script>
<style lang="scss" scoped>
.head {
    position: relative;
    background-color: $mtYellow;
    text-align: center;
    height: 40px;
    line-height: 40px;
    padding: 0 16px;

    .go-back,
    .more {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        i {
            font-size: 12px;
        }
    }

    .go-back {
        left: 10px;
    }

    .title {
        flex: 1;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
    }

    .more, .add {
        right: 15px;
    }
}
</style>
