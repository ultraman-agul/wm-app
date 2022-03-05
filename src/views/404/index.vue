<template>
    <div class="error">
        <v-head title="出错" go-back="true"></v-head>
        <div class="info-container">
            <img src="@/assets/404.png" />
            <span class="tip">找不到此页面</span>
            <router-link class="redirect-index" to="/index">
                <span>回到首页</span>
            </router-link>
        </div>
        <div class="service"><span>美团外卖客服：10109777</span></div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>

.error {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;

    .info-container {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        img {
            width: 240px;
            height: 240px;
        }

        .tip {
            display: block;
            margin: 10px;
            font-size: 20px;
        }

        .redirect-index {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 140px;
            height: 30px;
            margin: 24px auto;
            background: $mtYellow;

            span {
                font-size: 16px;
            }
        }
    }

    .service {
        width: 100%;
        position: absolute;
        bottom: 20px;
        left: 0;
        text-align: center;

        span {
            font-size: 16px;
            text-decoration: underline;
        }
    }
}
</style>
