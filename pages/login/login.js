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
            console.log(app);
            //向服务器发送请求 由此用户则登录
            wx.request({
                url: app.globalData.config + "login?staff_id=" + num,
                success(res) {
                    if (res.data.status == 200) {
                        wx.setStorageSync('user', {
                            username: _this.data.username,
                            password: _this.data.password
                        });
                        wx.setStorageSync('data', res.data.data)
                        console.log(res.data)
                        wx.showModal({
                            title: res.data.message,
                            icon: 'none',
                            showCancel: false,
                            success: function() {
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