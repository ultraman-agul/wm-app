import { _get, _post } from './index'

type user = {
    username: string
    password: string
}

export const userLogin = (data: user) => {
    const req = {
        url: 'admin/user_login',
        data,
    }
    return _post(req)
}

export const addUser = (data: user) => {
    const req = {
        url: 'admin/add_user',
        data,
    }
    return _post(req)
}

export const getAllAddress = () => {
    const req = {
        url: 'admin/get_all_address',
    }
    return _get(req)
}
