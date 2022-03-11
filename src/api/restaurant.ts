import { _get } from './index'

export const getAllResturant = (data: object) => {
    const req = {
        url: '/v1/all_restaurant',
        data,
    }

    return _get(req)
}

export const getResturantById = (data: any) => {
    const req = {
        url: '/v1/restaurant/' + data.id,
    }
    return _get(req)
}

export const getFoods = (data: object) => {
    const req = {
        url: '/v1/getFoods/',
        data,
    }
    return _get(req)
}
