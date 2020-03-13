import qs from 'qs'
import router from '@/router'
import store from '@/store'
import wechatAuth from '@/plugins/wechatAuth'
// 设置APPID
wechatAuth.setAppId("wx6c38a95bdc2f7e35")
const whiteList = ['/404']
router.beforeEach(async (to, from, next) => {
    // 在白名单，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
        return next()
    }
    const { loginStatus } = store.getters
    // const loginStatus = 0
    console.log('%c 🦐 loginStatus: ', 'font-size:20px;background-color: #ED9EC7;color:#fff;', loginStatus);
    switch (Number(loginStatus)) {
        case 0:
            // 获取跳转地址
            wechatAuth.redirect_uri = processUrl()
            await store.dispatch('user/setLoginStatus', 1)
            window.location.href = wechatAuth.authUrl
            break
        case 1:
            try {
                wechatAuth.returnFromWechat(to.fullPath)
                const code = wechatAuth.code
                console.log('code==', code)
                // 通过code换取token
                await store.dispatch('user/loginWechatAuth', code)
                await store.dispatch('user/setLoginStatus', 2)
                next()
            } catch (err) {
                await store.dispatch('user/setLoginStatus', 0)
                next('/404')
            }
            break
        case 2:
            next()
            break
        default:
            break
    }
})

/**
 * 处理url链接
 * @returns {string}
 */
function processUrl() {
    // 本地环境换通过auth.html拿code
    // if (process.env.NODE_ENV === 'development') {
    //     // 中间授权页地址
    //     return `${process.env.VUE_APP_WECHAT_AUTH_URL}?backUrl=${window.location.href}`
    // }
    const url = window.location.href
    // 解决多次登录url添加重复的code与state问题
    const urlParams = qs.parse(url.split('?')[1])
    let redirectUrl = url
    if (urlParams.code && urlParams.state) {
        delete urlParams.code
        delete urlParams.state
        const query = qs.stringify(urlParams)
        if (query.length) {
            redirectUrl = `${url.split('?')[0]}?${query}`
        } else {
            redirectUrl = `${url.split('?')[0]}`
        }
    }
    return redirectUrl
}
