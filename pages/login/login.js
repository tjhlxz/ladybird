var app = getApp();
Page({

  data: {
    username: null,
    password: null
  },

  usernameInput: function (e) {
    var _this = this;
    _this.setData({ username: e.detail.value })
  },

  passwordInput: function (e) {
    var _this = this;
    _this.setData({ password: e.detail.value })
  },

  click: function (e) {

    //向服务器发送请求 由此用户则登录
    app.globalData.userInfo = { username: this.data.username, password: this.data.password };
    wx.switchTab({
      url: '../index/index'
    })
  },
  // bindTap: function (e) {
  //   wx.navigateTo({
  //     url: '../forget/forget',
  //   })
  // }
})