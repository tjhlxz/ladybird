//app.js
App({
  onLaunch: function () {
    // if(!wx.getStorageSync('userInfo')) {
    //   // 登录
    //   wx.login({
    //     success: res => {
    //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     }
    //   })
    // }
    
  },
  globalData: {
    userInfo: null,
    openid: 0
  }
})