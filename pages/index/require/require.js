var app = getApp();
// pages/index/require/require.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []
  },

  myRequest: function(e) {
    
    
    var index = e.currentTarget.dataset.index;

    var form = JSON.stringify(e.currentTarget.dataset.form[index]);

    wx.navigateTo({
      url: './require_detail/require_detail?form=' + form + '&id=2',
    })
  },
    modelUseTap(event) {
        if (!wx.getStorageSync('user')) {
            wx.navigateTo({
                url: '../login/login',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
            })
        } else {
            wx.navigateTo({
                url: '../../model/model_detail/model_detail',
            })
        }
    },
  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        
        
    var _this = this;
    var _form = JSON.parse(options.form);
    _this.setData({ items: _form })
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
      wx.showLoading({
        title: '正在加载',
        mask: "true"
      })
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
                wx.hideLoading();
                wx.clearStorageSync('user');
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            })
          }else{
            wx.hideLoading();
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