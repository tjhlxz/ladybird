//app.js
App({
    globalData:{
        userInfo: null,
        openid: 0,
        config:"https://www.flowhandsome.cn/ladybird/public/",
        Bucket: 'ladybird-1254250597',
        Region: 'ap-beijing',
        SecretId: 'AKIDIUSq8Fjzb2Im9QrTRNBqS0Nfp8e4Co9J',
        SecretKey: '8A1iFbmYBg0vfEfv1v35wcKrDYlpjS0Q'
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