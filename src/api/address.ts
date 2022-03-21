import { _get, _post } from './index'

export const addAddress = (data: object) => {
    const req = {
        url: 'address/addAddress',
        data,
    }
    return _post(req)
}

export const getAllAddress = () => {
    const req = {
        url: 'address/get_all_address',
    }
    return _get(req)
}
