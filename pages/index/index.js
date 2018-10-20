//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    items: []
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
  detail: function() {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: './require/require',
      })
    }
  },
  bindViewTap: function() {
  },
  
  onLoad: function () {
    if (!wx.getStorageSync('userInfo')) {
      wx.redirectTo({
        url: '../test/test',
      })
    }
  },
  onShow: function() {
    var _this = this;
    // wx.request({
    //   url: '',
    //   success(res) {
        
    //   }
    // })
    var data = wx.getStorageSync('data')
    _this.setData({items: data})

  }
})
