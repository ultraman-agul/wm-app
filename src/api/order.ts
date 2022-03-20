import { _get } from './index'

export const getOrder = (data: object) => {
    const req = {
        url: '/v1/getOrder',
        data,
    }
    return _get(req)
}
