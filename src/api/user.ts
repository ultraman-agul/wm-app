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

export const changeAvatar = (data: object) => {
    const req = {
        url: 'admin/change_avatar',
        data,
    }
    return _post(req)
}

export const userInfo = () => {
    const req = {
        url: 'admin/user_info',
    }
    return _get(req)
}
