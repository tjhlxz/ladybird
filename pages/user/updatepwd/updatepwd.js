// pages/user/updatepwd/updatepwd.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
    },
    formSubmit(event) {
        var storage_data = wx.getStorageSync("data");
        var that=this;
        var detail = event.detail.value;
        var oldpwd = detail.oldpwd;
        var newpwd = detail.newpwd;
        var newpwdagin = detail.newpwdagin;
        var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if (oldpwd.match(regRule) || newpwdagin.match(regRule) || newpwd.match(regRule)) {
            wx.showToast({
                title: '禁止输入表情',
                image: '/static/ico/fail.png',
                mask: true
            })
        } else{
        var re_n = /[^\d]/g;
        var re_t = /[^a-zA-z]/g;
        var n_result = re_n.test(newpwd);
        var t_result = re_t.test(newpwd);
        if (oldpwd === "") {
            wx.showModal({
                title: '密码无效',
                content: '您输入的原密码不正确',
                showCancel: false
            })
        } else if (newpwd.length < 6 || newpwd.length > 12) {
            wx.showModal({
                title: '密码无效',
                content: '密码由6-12个字符组成',
                showCancel: false
            })
        } else {
            if (!n_result) {
                wx.showModal({
                    title: '密码无效',
                    content: '密码不能全为数字',
                    showCancel: false
                })
            } else if (!t_result) {
                wx.showModal({
                    title: '密码无效',
                    content: '密码不能全为字母',
                    showCancel: false
                })
            } else {
                if (newpwd === newpwdagin) {
                    wx.showLoading({
                        title: '正在修改',
                        mask: true
                    })
                    wx.request({
                        url: app.globalData.config + "pwdChange",
                        method: "POST",
                        data: {
                            staff_id: storage_data[0].staff_id,
                            oldPwd: oldpwd,
                            newPwd: newpwd
                        },
                        success(res) {
                            console.log(res)
                            if (res.data.status == 200) {
                                wx.hideLoading();
                                wx.showToast({
                                    title: res.data.message,
                                    duration: 1000,
                                    mask: true
                                })
                                setTimeout(function() {
                                    wx.redirectTo({
                                        url: '../../login/login',
                                    })
                                }, 1000);
                            } else if (res.data.status == 400) {
                                wx.hideLoading();
                                wx.showToast({
                                    title: res.data.message,
                                    duration: 1000,
                                    mask: true,
                                    image: '/static/ico/fail.png'
                                })
                            } else {
                                wx.hideLoading();
                                wx.showToast({
                                    title: res.data.massge,
                                    duration: 1000,
                                    mask: true,
                                    image: '/static/ico/fail.png'
                                })
                            }
                        }
                    })
                } else {
                    wx.showModal({
                        title: '密码无效',
                        content: '两次输入密码不一致',
                        showCancel: false
                    })
                }
            }
        }
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})