import axioss from 'axios'
import config from '@/config'
import router from '@/router/index'

const { baseURL } = config
const axios = axioss.create({
    baseURL,
    timeout: 0,
    withCredentials: true, // 允许跨域 cookie
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    maxContentLength: 2000,
})
axios.interceptors.request.use((config) => {
    config.headers = {
        // 请求头带上token，用于后端验证
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
    return config
})
axios.interceptors.response.use(
    (res) => {
        if (res.data.status === 403) {
            // token身份验证不通过,跳转登录页,删除token
            router.push('/login')
            localStorage.removeItem('token')
        }
        return res.data
    },
    (err) => {
        console.error(err)
    }
)

interface req {
    url: string
    data?: object
}

export const _get = (req: req) => axios.get(req.url, { params: req.data })

// axios.post(req.url, data: {req.data}) 不能这么写，会导致多一层data嵌套
export const _post = (req: req) => axios({ method: 'post', url: `/${req.url}`, data: req.data })

export const _postImg = (req: req) =>
    axios({
        method: 'post',
        url: `/${req.url}`,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: req.data,
    })
