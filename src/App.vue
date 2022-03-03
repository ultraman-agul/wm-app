<template>
  <KeepAlive>
    <router-view v-if="route.meta.keepAlive"></router-view>
  </KeepAlive>
  <router-view v-if="!route.meta.keepAlive"></router-view>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
