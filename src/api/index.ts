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
    transformResponse: [
        (data) => {
            try {
                JSON.parse(data) // 转换成json格式
            } catch (e) {
                data = {}
            }
            if (data.status === 403) {
                // 没有权限，重定向到登录页
                router.push('/login')
            }
            return data
        },
    ],
})

interface req {
    url: string
    data: object
}

export const _get = (req: req) => axios.get(req.url, { params: req.data })

// axios.post(req.url, data: {req.data}) 不能这么写，会导致多一层data嵌套
export const _post = (req: req) => {
    axios({
        method: 'post',
        url: `/${req.url}`,
        data: req.data,
    })
}
