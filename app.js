//app.js
App({
  onLaunch: function () {
    if(wx.getStorageSync('user')) {
      // 登录
      wx.request({
        
      })
    }
    
  },
  globalData: {
    userInfo: null,
    openid: 0
  }
})