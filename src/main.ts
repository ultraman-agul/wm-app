import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index' // 路由
import store from './store/index' // 状态管理工具
import './style/common.scss'
// px2rem 自适应
// import 'lib-flexible'
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
