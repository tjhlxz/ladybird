//app.js
App({
    globalData:{
        userInfo: null,
        openid: 0,
        config:"http://www.flowhandsome.cn/ladybird/public/"
    },
  onLaunch: function () {
    if(wx.getStorageSync('user')) {
      // 登录过则渲染首页
    //  wx.request({
    //    url: '', 
    //  })
    }
    
    // if(!wx.getStorageSync('userInfo')) {
    //   // 登录
    //   wx.login({
    //     success: res => {
    //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     }
    //   })
    // }
  }
})