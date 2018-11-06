// pages/model/model.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

    modelUseTap(event){
      if (!wx.getStorageSync('user')) {
        wx.navigateTo({
          url: '../login/login',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }else {
        wx.navigateTo({
            url: 'model_detail/model_detail',
        })
      }
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
                wx.redirectTo({
                  url: '../login/login',
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
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})