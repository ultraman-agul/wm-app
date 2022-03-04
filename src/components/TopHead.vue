<template>
    <div class="head">
        <var-icon
            name="chevron-left"
            class="go-back"
            :size="26"
            @click="goBack()"
        />
        <span class="title">{{ title }}</span>
        <var-icon v-if="true" name="dots-vertical" class="more" :size="26" />
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineProps<{
    title: string,
    more?: boolean
}>()

const router = useRouter() // 先实例化再调用方法，不能连写作 userRouter().back()
const goBack = () => {
    router.back()
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
            font-size: .7rem;
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

    .more {
        right: 15px;
    }
}
</style>
