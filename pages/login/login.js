var app = getApp();
Page({

    data: {
        username: null,
        password: null
    },

    usernameInput: function(e) {
        var _this = this;
        _this.setData({
            username: e.detail.value
        })
    },

    passwordInput: function(e) {
        var _this = this;
        _this.setData({
            password: e.detail.value
        })
    },

    click: function(e) {
        var _this = this;
        if (this.data.username == null) {
            wx.showToast({
                title: '教工号不能为空',
                icon: 'none'
            })
        } else {
            var num = this.data.username;
            var pas = this.data.password;
            //向服务器发送请求 由此用户则登录
            wx.showLoading({
              title: '正在登陆',
              mask: true
            }),
            wx.request({
                url: app.globalData.config + "login?staff_id=" + num + '&pwd=' + pas,
                success(res) {
                    if (res.data.status == 200) {
                      wx.hideLoading();
                        wx.setStorageSync('user', {
                            staff_id: _this.data.username
                        });
                        wx.setStorageSync('first_request', 'first');
                        wx.setStorageSync('data', res.data.data);
                        wx.showModal({
                            title: res.data.message,
                            icon: 'none',
                            showCancel: false,
                            success: function() {
                              wx.setStorageSync('homeShow', 'readyShow');
                              wx.switchTab({
                                  url: '../index/index'
                              })
                            }
                        });
                    } else {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail() {
                    wx.hideLoading();
                    wx.showToast({
                        title: '网络中断',
                        mask: true,
                        image: '/static/ico/fail.png'
                    })
                }
            })
        }
    },
    // bindTap: function (e) {
    //   wx.navigateTo({
    //     url: '../forget/forget',
    //   })
    // }
})