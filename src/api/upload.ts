import { Form } from '@varlet/ui'
import { _post, _postImg } from './index'
// 上传
export const upload = (data: any) => {
    console.log(data)
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
    })
    const req = {
        data: formData,
        url: 'upload/upload',
    }
    return _postImg(req)
}

export const uploadCommentPic = (data: any) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => formData.append(key, data[key]))
    const req = {
        data: formData,
        url: 'upload/uploadCommentPic',
    }
    return _postImg(req)
}
