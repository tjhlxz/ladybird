// pages/user/user.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
      storage_data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login',
      })
    }
    
      var storage_data = wx.getStorageSync("data");
        this.setData({
            storage_data:storage_data
        })
    
  },
    updateTap(event){
        wx.navigateTo({
            url: 'updatepwd/updatepwd',
        })
    },
    aboutTap(event){
        wx.navigateTo({
            url: 'about/about',
        })
    },
    helpTap(event){
        wx.navigateTo({
            url: 'help/help',
        })
    },
    logout(event){
        wx.showModal({
            title: '注销',
            content: '确定要注销当前账户吗？',
            showCancel: 'true',
            cancelText: '取消',
            cancelColor: '#666',
            confirmText: '确定',
            confirmColor: '#0ab179',
            success: function (res) {
                if (res.confirm) {
                    wx.clearStorageSync();
                    wx.switchTab({
                        url: '../index/index',
                    })
                }
            },
            fail: function (res) { },
            complete: function (res) { },
        })
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
    if (!wx.getStorageSync('user')) {

      wx.switchTab({
        url: '../index/index',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
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