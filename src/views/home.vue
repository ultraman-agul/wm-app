<template>
    <h2>pjh</h2>
    <h3>{{username.name}}</h3>
</template>

<script lang="ts" setup>
    import { useUserStore } from '@/store/user'
    const username = useUserStore()
</script>