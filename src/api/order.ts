import { _get, _post } from './index'

export const makeOrder = (data: object) => {
    const req = {
        url: 'v1/order',
        data,
    }
    return _post(req)
}

export const getOrder = () => {
    const req = {
        url: '/v1/getOrder',
    }
    return _get(req)
}

export const orderInfo = (data: any) => {
    const req = {
        url: '/v1/orderInfo',
        data,
    }
    return _get(req)
}

// 订单评论
export const makeComment = (data: any) => {
    const req = {
        data,
        url: 'v1/makeComment',
    }
    return _post(req)
}

export const pay = (data: any) => {
    const req = {
        data,
        url: 'alipay/pay',
    }
    return _post(req)
}

export const successPay = (data: any) => {
    const req = {
        data,
        url: 'alipay/successPay',
    }
    return _get(req)
}
