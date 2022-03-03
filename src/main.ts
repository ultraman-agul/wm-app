import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index' // 路由
import store from './store/index' // 状态管理工具
import './style/common.scss'
import components from './components/index'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(components) // 注册全局组件
app.mount('#app')
