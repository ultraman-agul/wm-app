import { _get } from './index'

export const getAllResturant = () => {
    const req = {
        url: '/v1/all_restaurant',
    }

    return _get(req)
}
