// pages/index/approve/approve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var _form = JSON.parse(options.form);
    _this.setData({items: _form})
    var data = _this.data.items
    
    var len = data.length;
    for(var i=0;i<len;i++){
      if (data[i].form_status == 0) {
        data[i].form_status = '待审批'
      } else if (data[i].form_status == 1) {
        data[i].form_status = '已同意'
      } else {
        data[i].form_status = '已拒绝'
      }
    }
    _this.setData({items: _this.data.items})

  },
  detail: function(e) {
    var index = e.currentTarget.dataset.index;
    var form = JSON.stringify(e.currentTarget.dataset.form[index]);

    wx.navigateTo({
      url: './approve_detail/approve_detail?form=' + form,
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