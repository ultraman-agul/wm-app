<template>
    <div class="head">
        <var-icon
            name="chevron-left"
            @click="goBack()"
            class="go-back"
            :size="26"
        />
        <span class="title">{{title}}</span>
        <var-icon name="dots-vertical" v-if="true" class="more" :size="26" />
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
defineProps<{
    title: string,
    more?: boolean
}>()

const router = useRouter()  //先实例化再调用方法，不能连写作 userRouter().back()
const goBack = () => {
    router.back()
}
</script>

<style lang="scss">
.head{
    position: relative;
    background-color: $mtYellow;
    text-align: center;
    line-height: 1rem;
    padding: 0 0.2rem;
    .go-back,
    .more {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
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
