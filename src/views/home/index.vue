<template>
    <v-head title="个人中心"></v-head>
    <div class="home">
        <div class="top-container">
            <label class="user-info" for="file">
                <img :src="avatarUrl" alt="" />
                <input id="file" type="file" name="file" style="display: none;" @change="uploadPic($event)" />
                <span>{{ state.username }}</span>
            </label>
        </div>
        <div class="func-box">
            <ul>
                <li v-for="(item, index) in funcList" :key="index" @click="jumpSubView(item)">
                    <div>
                        <var-icon :name="item.icon" />
                        {{ item.name }}
                    </div>
                    <var-icon name="chevron-right" />
                </li>
                <li @click="router.push('/login')">
                    <div>
                        <var-icon name="power" />
                        {{ state.username === '未登录' ? "去登录" : "退出登录" }}
                    </div>
                    <var-icon name="chevron-right" />
                </li>
            </ul>
        </div>
        <div class="bottom">
            <div class="tel">客服电话: 10109777</div>
            <p>服务时间: 9:00 - 23:00</p>
        </div>
    </div>

    <v-bar></v-bar>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userInfo, changeAvatar } from '@/api/user'
import { upload } from '@/api/upload'
import { getInfo } from '@/utils/auth'
import { Snackbar } from '@varlet/ui'
import config from '@/config'

// 功能项的类型
type funcItem = {
    url: string,
    name: string,
    icon: string,
}
const router = useRouter()
const funcList: funcItem[] = [
    {
        name: '收货地址',
        url: '/home/address',
        icon: 'map-marker-outline'
    },
    {
        name: '我的收藏',
        url: '/home/collect',
        icon: 'star-outline'
    },
    {
        name: '常见问题',
        url: '/home/problem',
        icon: 'help-circle-outline',
    },
    {
        name: '我的评价',
        url: '/home/comment',
        icon: 'message-processing-outline',
    },
    {
        name: '我的足迹',
        url: '/home/histroy',
        icon: 'file-document-outline',
    },
]
let avatarUrl = ref('http://i.waimai.meituan.com/static/img/default-avatar.png')
const state = reactive({ username: '', file: '' })
onMounted(async () => {
    const name = await getInfo()
    if (name) { // 如果已经登录，则调用接口获取用户头像
        state.username = name
        userInfo().then((data:any) => {
            if (data.status === 200) {
                avatarUrl.value = data.data.avatar
            } else {
                Snackbar.error(data.message)
            }
        }).catch(e => {
            console.log(e)
        })
    } else {
        state.username = '未登录'
    }
})
const jumpSubView = (item: funcItem) => {
    router.push(item.url)
}

const uploadPic = async (event: any) => {
    let file = event.target.files[0]
    if (!file || file.size > 1024 * 1024 * 2) {
        // 只能传2M以内照片
        Snackbar.warning('上传失败，只能传2M以内图片')
        return false
    }
    const result: any = await upload({ file })
    console.log(result)
    if (result.status === 200) {
        avatarUrl.value = config.baseURL + result.url
        console.log(avatarUrl.value)
        // 更新到数据库
        changeAvatar({ avatarUrl: avatarUrl.value }).then(() => {
        }).catch(e => { console.log(e) })
    }
}
</script>

<style lang="scss" scoped>
.home {
    background-color: #f0f0f0;
    height: 100%;

    .top-container {
        background: url(@/assets/homeBG.png);
        height: 150px;

        .user-info {
            width: 120px;
            height: 100%;
            text-align: center;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
                height: 70px;
                width: 70px;
                margin-bottom: 10px;
                border-radius: 35px;
                background-color: #fff;
                border: 5px solid #ffe699;
            }
        }
    }

    .func-box {
        background-color: #fff;

        ul {
            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 20px 10px 10px;
                border-bottom: 2px solid #f0f0f0;
            }
        }
    }

    .bottom {
        text-align: center;
        height: 100%;

        .tel {
            color: $mtYellow;
            height: 30px;
            line-height: 30px;
            background-color: #fff;
        }

        p {
            font-size: 14px;
            color: #aaa;
            margin-top: 10px;
        }
    }
}
</style>
