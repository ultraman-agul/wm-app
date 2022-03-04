import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        name: '首页',
        component: () => import('@/views/index/index.vue'),
    },
    {
        path: '/home',
        name: '个人中心',
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue'),
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
