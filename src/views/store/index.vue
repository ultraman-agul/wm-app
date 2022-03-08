<template>
    hello

    <router-view></router-view>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { getResturantById } from '@/api/restaurant'

const route = useRoute()

onMounted(() => {
    console.log(route.query)
    const { id } = route.query
    getResturantById({ id }).then(data => {
        console.log(data)
    }).catch(e => console.log(e))
})
</script>
