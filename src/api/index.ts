import axioss from "axios";
import config from '@/config'
import router from "@/router";

const { baseURL } = config
const axios = axioss.create({
    baseURL,
    timeout: 6000,
    withCredentials: true, // 允许跨域 cookie
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    maxContentLength: 2000,
    transformResponse: [(data) => {
        try {
            JSON.parse(data)
        } catch (e) {
            data = {}
        }
        if (data.status === 403) { // 没有权限，重定向到登录页
            router.push('/login')
        }
        return data
    }]
})

interface req {
    url: string,
    data: object
}

export const _get = (req: req) => {
    return axios.get(req.url, { params: req.data })
}

export const _post = (req: req) => {
    return axios.post(req.url, { data: req.data })
}

