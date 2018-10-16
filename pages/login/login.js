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
    if (this.data.username == null) {
      wx.showToast({
        title: '教工号不能为空',
        icon: 'none'
      })
    }else {
      //向服务器发送请求 由此用户则登录
      // wx.request({
      //   url: '',
      //   success(res) {}
      // }),
        wx.setStorageSync('user', { username: this.data.username, password: this.data.password });
      wx.switchTab({
        url: '../index/index'
      })
    }
  },
  // bindTap: function (e) {
  //   wx.navigateTo({
  //     url: '../forget/forget',
  //   })
  // }
})