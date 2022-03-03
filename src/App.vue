<template>
    <var-style-provider :style-vars="successTheme">
        <KeepAlive>
            <router-view v-if="route.meta.keepAlive"></router-view>
        </KeepAlive>
        <router-view v-if="!route.meta.keepAlive"></router-view>
    </var-style-provider>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const successTheme = {
      '--rate-primary-color': '#ffd161',
      '--button-primary-color': '#ffd161',
      '--switch-handle-active-background': '#ffd161',
      '--switch-track-active-background': '#ffd161',
    }
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
