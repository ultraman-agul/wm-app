import { _get } from './index'

export const getAllResturant = (data: object) => {
    const req = {
        url: '/v1/all_restaurant',
        data,
    }

    return _get(req)
}
