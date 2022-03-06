import TopHead from './TopHead.vue'
import TabBar from './TabBar.vue'

export default {
    // 注册全局组件
    install(app: any) {
        app.component('VHead', TopHead)
        app.component('VBar', TabBar)
    },
}
