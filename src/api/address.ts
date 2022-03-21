import { _get, _post } from './index'

export const addAddress = (data: object) => {
    const req = {
        url: 'address/addAddress',
        data,
    }
    return _post(req)
}
