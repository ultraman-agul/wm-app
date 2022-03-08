import { _get } from './index'

export const getLocation = (data: object) => {
    const req = {
        url: '/v1/location',
        data,
    }
    return _get(req)
}

export const locationSearch = (data: object) => {
    const req = {
        url: '/v1/location_search',
        data,
    }
    return _get(req)
}
