//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  myRequest: function() {
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  myApproval: function() {
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  demo: function() {
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  bindViewTap: function() {
   
  },
  onLoad: function () {
   
  }
})
