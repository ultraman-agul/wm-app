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
        path: '/login',
        name: '登录',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/location',
        name: '定位',
        component: () => import('@/views/location/index.vue'),
    },
    {
        path: '/store',
        name: '商店',
        component: () => import('@/views/store/index.vue'),
        children: [
            {
                path: '/store/menu',
                name: '菜单',
                component: () => import('@/views/store/menu.vue'),
            },
            {
                path: '/store/comment',
                name: '评论',
                component: () => import('@/views/store/comment.vue'),
            },
            {
                path: '/store/shop',
                name: '商家',
                component: () => import('@/views/store/shop.vue'),
            },
            {
                path: '', // 默认是点菜页面
                redirect: '/store/menu',
            },
        ],
    },
    {
        path: '/comfirmOrder',
        name: '订单',
        component: () => import('@/views/confirmOrder/index.vue'),
    },
    {
        path: '/order',
        name: '我的订单',
        component: () => import('@/views/order/index.vue'),
    },
    {
        path: '/address',
        name: '我的收货地址',
        component: () => import('@/views/address/address.vue'),
    },
    {
        path: '/addAddress',
        name: '添加收货地址',
        meta: {
            keepAlive: true,
        },
        component: () => import('@/views/address/addAddress.vue'),
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
