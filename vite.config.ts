import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        components({
            resolvers: [VarletUIResolver()],
        }),
    ],
    resolve: {
        alias: {
            //别名
            '@': resolve('./src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/style/variables.scss";',
            },
        },
    },

    base: './', // 打包路径
    server: {
        port: 4000, // 服务端口号
        open: true, // 服务启动时是否自动打开浏览器
        cors: true, // 允许跨域
    },
})
