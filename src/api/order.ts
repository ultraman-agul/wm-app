import { _get, _post } from './index'

export const makeOrder = (data: object) => {
    const req = {
        url: 'v1/order',
        data,
    }
    return _post(req)
}

export const getOrder = (data: object) => {
    const req = {
        url: '/v1/getOrder',
        data,
    }
    return _get(req)
}
