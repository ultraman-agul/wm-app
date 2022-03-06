<!--登录页-->
<template>
    <div id="login">
        <v-head go-back="true" title="登录"> </v-head>
        <div class="main">
            <div class="logo-box">
                <img src="@/assets/shoploading.png" alt="" />
                <p>美团外卖</p>
            </div>
            <var-form ref="form">
                <var-input v-model="formData.username" placeholder="请输入用户名" :rules="[(v:any) => !!v || '用户名不能为空']" />
                <var-input v-model="formData.password" type="password" placeholder="请输入密码" :rules="[(v:any) => !!v || '密码不能为空']" />
                <div class="button" @click.prevent="login();">
                    <var-button block type="primary">登录</var-button>
                </div>
                <p class="tip">
                    <var-checkbox v-model="formData.agree" :rules="[(v:any) => !!v || '必须同意隐私协议']" :checked-value="1"> 未注册直接输入账号密码，自动注册！ </var-checkbox>
                </p>
            </var-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { userLogin } from '@/api/user'
import { Snackbar } from '@varlet/ui'
import { useRouter } from 'vue-router'

const router = useRouter()
const form:any = ref(null)
const data = reactive({
    formData: {
        username: '', // 用户名
        password: '', // 密码
        passwordVisible: false, // 显示密码
        agree: 0, // 是否同意协议
        alertText: '',
        showTip: false,
    },
})
const { formData } = toRefs(data)

const login = async () => {
    if (await form.value.validate()) {
        const result: any = await userLogin({
            username: formData.value.username,
            password: formData.value.password })
        if (result.status === 200) {
            localStorage.setItem('token', result.token)
            Snackbar.success('登陆成功')
            router.push('/index')
        } else {
            console.log(result.message)
            Snackbar.error(result.message)
        }
    }
}
</script>

<style lang="scss" scoped>
#login {
    .main {
        padding: 20px 30px;

        .logo-box {
            text-align: center;
            margin-bottom: 50px;

            img {
                width: 50px;
                height: 50px;
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 10px;
                margin-bottom: 10px;
            }
        }

        .button {
            margin: 20px;
        }

        .tip {
            text-align: center;
        }
    }
}
</style>
