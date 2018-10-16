//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  myRequest: function() {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else {
      wx.navigateTo({
        url: './require/require',
      })
    }
  },
  myApproval: function() {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else {
      wx.navigateTo({
        url: './approve/approve',
      })
    }
  },
  demo: function() {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else {
      wx.navigateTo({
        url: './supervisor/supervisor',
      })
    }
  },
  bindViewTap: function() {
  },
  
  onLoad: function () {
    if (wx.getStorageSync('userInfo')) {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          // this.globalData.userInfo = res.userInfo

          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        }
      })
    } else {
      wx.redirectTo({
        url: '../test/test',
      })
    }
  }
})
