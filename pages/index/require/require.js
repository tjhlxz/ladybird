// pages/index/require/require.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
      num: '',
      name: '课程表变更审批表',
      date: '2018-10-11',
      state: '审批成功'
    },{
      num: '',
      name: '课程表变更审批表',
      date: '2018-10-16',
      state: '审批中'
    }]
  },

  myRequest: function() {
    wx.navigateTo({
      url: './require_detail/require_detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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