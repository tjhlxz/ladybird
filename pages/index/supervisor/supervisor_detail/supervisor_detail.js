var app = getApp();
// pages/index/supervisor/supervisor_detail/supervisor_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {},
        date: []
    },
  download(e) {
    var _this = this;
    wx.showLoading({
      title: '正在打开',
      mask: true
    })
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: _this.data.detail.form_attachment,
      success: function (res) {
        wx.hideLoading();
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
          },
          fail: function (res) {
            wx.showToast({
              title: '文件打开失败',
              image: '/static/ico/fail.png',
              mask: true,
            })
          }
        })
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '文件打开失败',
          image: '/static/ico/fail.png',
          mask: true,
        })
      }
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      var _this = this;
      var detail = JSON.parse(options.detail);
      _this.setData({
        detail: detail
      })
      var data = _this.data.detail

      if (data.form_status == 0) {
        data.form_status = '待审批'
      } else if (data.form_status == 1) {
        data.form_status = '已同意'
      } else if (data.form_status == -1) {
        data.form_status = '已拒绝'
      }

      _this.setData({
        detail: data
      })
        var date_before = [];
        var date_after = [];
        var date_before = detail.form_before_adjust.split(',');
        var date_after = detail.form_later_adjust.split(',');
        var date = [];
        for (var i = 0; i < date_before.length; i++) {
            var arr = [];
            arr[0] = date_before[i];
            arr[1] = date_after[i];
            date.push(arr);
        }
        this.setData({
            date: date,
        });

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
      var a;
      if (a = wx.getStorageSync('user')) {
        //强制注销
        wx.request({
          url: app.globalData.config + 'force_logout?staff_id=' + a.staff_id,
          success(res) {
            if (res.data.status == 400) {
              wx.showModal({
                content: res.data.message,
                mask: true,
                showCancel: false,
                success: function (res) {
                  wx.clearStorageSync('user');
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                }
              })
            }
          }
        })
      }
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