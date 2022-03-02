<template>
    <h2>pjh</h2>
    <h3>{{username.name}}</h3>
    <button @click="handleClick">按钮</button>
</template>

<script lang="ts" setup>
    import { useUserStore } from '@/store/user'
    import { _get } from '@/api/index'
    const username = useUserStore()
    const handleClick = () => {
        const content = _get({url:'test', data: {}})
        console.log(content)
    }
</script>