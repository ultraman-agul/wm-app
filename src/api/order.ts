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
