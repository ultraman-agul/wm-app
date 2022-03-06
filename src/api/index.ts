import axioss from 'axios'
import config from '@/config'
import router from '@/router'

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
    (req) => {
        if (req.status === 403) {
            router.push('/login')
        }
        return req.data
    },
    (err) => {
        console.log(err)
    }
)

interface req {
    url: string
    data?: object
}

export const _get = (req: req) => axios.get(req.url, { params: req.data })

// axios.post(req.url, data: {req.data}) 不能这么写，会导致多一层data嵌套
export const _post = (req: req) => axios({ method: 'post', url: `/${req.url}`, data: req.data })
