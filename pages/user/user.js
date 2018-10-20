// pages/user/user.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
      storage_userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      var storage_userInfo=wx.getStorageSync("userInfo");
        this.setData({
            storage_userInfo:storage_userInfo
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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