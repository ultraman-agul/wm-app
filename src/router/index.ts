import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: '首页',
        component: () => import('@/views/index/index.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
