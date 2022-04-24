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
        url: '/v1/restaurant',
        data,
    }
    return _get(req)
}

export const getFoods = (data: object) => {
    const req = {
        url: '/v1/getFoods',
        data,
    }
    return _get(req)
}

export const restaurantComment = (data: object) => {
    const req = {
        url: '/v1/restaurantComment',
        data,
    }
    return _get(req)
}

export const searchRestaurant = (data: object) => {
    const req = {
        url: '/v1/searchRestaurant',
        data,
    }
    return _get(req)
}
