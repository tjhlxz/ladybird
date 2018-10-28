var app = getApp();
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
      var items = JSON.parse(options.Form);
      // console.log(items)
      _this.setData({items: items});
      
  },
  detail(e){
    var _this = this;
    var form_id = _this.data.items[e.currentTarget.dataset.index].form_id;
    var detail = JSON.stringify(_this.data.items[e.currentTarget.dataset.index]);
    
    if (_this.data.items[e.currentTarget.dataset.index].status == 1) {
      wx.request({
        url: app.globalData.config + 'edu_read_msg' + '?form_id=' + form_id,
        success() {
          //将这条表单置位已读
          _this.data.items[e.currentTarget.dataset.index].status = 0;
          getCurrentPages()[0].data.f[e.currentTarget.dataset.index].status = 0;
        }
      })
    }
    wx.navigateTo({
        url: './supervisor_detail/supervisor_detail?detail='+detail
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
    var _this = this;
    var items = _this.data.items;
    _this.setData({items: items})
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