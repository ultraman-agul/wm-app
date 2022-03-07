export function getInfo() {
    return localStorage.getItem('userInfo')
}
// 只保存username到localStorage中,用于判断是否登录,存在token过期的情况,如果过期则重新登陆
export function setInfo(username: string) {
    localStorage.setItem('userInfo', username)
}

export function removeInfo() {
    localStorage.removeItem('userInfo')
}
