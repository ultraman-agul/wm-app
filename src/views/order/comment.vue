<!--对订单进行评论页面-->
<template>
    <div id="comment">
        <v-head title="评论" go-back="true" bg-color="#f4f4f4"></v-head>
        <div class="deliver-comment">
            <div class="goodMan">
                <h2>您对骑手满意吗?</h2>
                <span>已对骑手匿名</span>
            </div>
            <div class="deliver-info">
                <div class="avatar">
                    <img src="http://5b0988e595225.cdn.sohucs.com/images/20190706/b4b3e0f0244849a59c2ef114308fae2c.jpeg" />
                </div>
                <div class="info-container">
                    <span class="deliver-type">美团快送</span>
                    <div class="deliver-time">
                        <span>今天19：10左右送达</span>
                        <span class="time-error">时间不准 <var-icon name="information-outline" size="14" /></span>
                    </div>
                </div>
            </div>
            <var-rate v-model="deliveryScore" :size="20" />
        </div>

        <div class="main-container">
            <div class="goodMan">
                <h2>您对商家/菜品满意吗?</h2>
                <span>匿名提交<var-switch v-model="anonymous" size="12" color="#ff9f00" close-color="#f5cb90" /></span>
            </div>
            <div class="restaurant-info">
                <span class="avatar">
                    <img :src="restaurant_info.pic_url" />
                </span>
                <span class="restaurant-name">{{ restaurant_info.name }}</span>
            </div>
            <var-rate v-model="foodScore" :size="20" />
            <div class="food-comment">
                <textarea v-model="commentData" class="comment-data" style="resize:none" placeholder="亲，菜品口味如何，对包装服务等还满意吗？" @input="input($event);"></textarea>
                <span class="tip">至少输入2个字</span>
            </div>

            <div class="upload-picture-container">
                <var-uploader v-model="files" :maxlength="3" :maxsize="10240" multiple @after-read="fileUpload" />
                <div v-show="!uploadList.length" class="upload-description">
                    <h3>上传图片</h3>
                    <p>内容丰富的评论有机会成为优质评价哦</p>
                </div>
            </div>
        </div>
        <var-button block type="primary" class="submit" :disabled="!satisfySubmit" @click="submit()"> 提交 </var-button>
    </div>
</template>

<script lang="ts" setup>
import { orderInfo, makeComment } from '@/api/order'
import { uploadCommentPic } from '@/api/upload'
import { reactive, toRefs } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import config from '@/config'
import { Snackbar } from '@varlet/ui'

const route = useRoute()
const state = reactive({
    restaurant_info: {}, // 商店信息
    deliveryScore: 1, // 配送评分
    foodScore: 1, // 食物评分
    commentValueLength: 0,
    satisfySubmit: false, // 长度大于等于2个字符才能提交
    commentData: '',
    uploadList: [], // 上传图片
    order_id: '',
    anonymous: false, // 匿名提交
    files: ''
})
let { restaurant_info, deliveryScore, foodScore, satisfySubmit, commentData, uploadList, order_id, anonymous, files } = toRefs(state)
order_id = route.query.order_id
if (!order_id) {
    setTimeout(() => {
        router.push('/index')
    }, 1000)
}
orderInfo({ order_id }).then((res) => {
    if (res.status === 200) {
        restaurant_info.value = res.data.restaurant
        console.log(restaurant_info.value)
    } else {
        Snackbar.error(res.message)
        setTimeout(() => {
            router.go(-1)
        }, 500)
    }
})
function input() {
    satisfySubmit.value = commentData.value.length >= 2
}

// 用户选择图片时添加进数组
async function fileUpload(file: any) {
    console.log(file.file)
    if (uploadList.value.length > 3) {
        Snackbar.warning('最多只能上传三张图片')
    } else {
        uploadList.value.push(file.file)
    }
}
let picList: any[] = []
// 上传图片
function uploadImgs() {
    const pArr = []
    for (let i of uploadList.value) {
        pArr.push(uploadCommentPic({ file: i }))
    }
    return Promise.all(pArr).then(data => {
        data.forEach(item => {
            picList.push(config.baseURL + item.url)
        })
    }).catch(e => {
        console.log(e)
    })
}

// 提交评论
async function submit() {
    if (!satisfySubmit) return
    try {
        await uploadImgs()
        const res = await makeComment({
            order_id,
            comment_data: commentData.value,
            food_score: foodScore.value,
            delivery_score: deliveryScore.value,
            pic_url: picList
        })
        if (res.status === 200) {
            Snackbar.success('评价成功')
            setTimeout(() => {
                router.push('/order')
            }, 1000)
        }
    } catch (e) {
        Snackbar.success('评价失败')
        console.log(e)
    }
}
</script>

<style lang="scss" scoped>
#comment {
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #f4f4f4;
  margin: 0 10px;
  .avatar {
    display: inline-block;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid $mtGrey;
    height: 40px;
    width: 40px;
    margin-right: 0.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .deliver-comment {
    margin-top: 10px;
    background: #fff;
    padding: 10px;
    border-radius: 6px;
    overflow: hidden;
    .goodMan{
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2{
        font-size: 16px;
        font-weight: bold;
      }
      span{
        font-size: 12px;
      }
    }
    .deliver-info {
      margin-top: 10px;
      display: flex;
      padding: 10px 0;

      .info-container {
        flex: 1;
        .deliver-type {
          font-size: 14px;
          font-weight: bold;
          display: inline-block;
          margin-bottom: 8px;
        }
        .deliver-time {
          font-size: 12px;
          .time-error {
            color: #508aca;
          }
        }
      }
    }
  }

  .main-container {
    border-radius: 6px;
    background: #fff;
    margin-top: 10px;
    padding: 10px;
     .goodMan{
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2{
        font-size: 16px;
        font-weight: bold;
      }
      span{
        font-size: 12px;
      }
    }
    .restaurant-info {
      display: flex;
      align-items: center;
      margin: 10px 0 0;
      .restaurant-name {
        font-size: 14px;
        font-weight: bold;
      }
    }

    .food-comment {
      position: relative;
      .comment-data {
        width: 100%;
        height: 100px;
        border: 1px solid $mtGrey;
        border-radius: 4px;
        padding: 10px;
      }
      .tip {
        color: $mtGrey;
        font-size: 12px;
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
    }

    .upload-picture-container {
      display: flex;
      margin: 10px 0;
      align-items: center;
      .upload-description {
        font-size: 12px;
        p {
          margin-top: 10px;
          color: $mtGrey;
        }
      }
    }
  }

  .submit {
    margin: 10px 0;
    line-height: 40px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>

<style>
.var-rate{
  justify-content: center;
}
</style>
