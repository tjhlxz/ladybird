var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      form:[],
    items: [{
      name: '课程表变更审批表',
      date: '2018-10-11',
      state: '审批成功'
    }, {
      name: '课程表变更审批表',
      date: '2018-10-16',
      state: '审批中'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      if (options.pgzx === '1') {
          wx.request({
              url: app.globalData.config + "assessment_center",
              success(res) {
                  wx.showLoading({
                      title: '正在加载',
                      mask: true
                  })
                  if (res.data.status === 200) {
                      wx.hideLoading();
                      var form=[];
                      for(var i=0;i<res.data.data.length;i++){
                          form[i]=res.data.data[i];
                      }
                      that.setData({
                          form:form
                      })
                  }
                  else if (res.data.status === 400) {
                      wx.showToast({
                          title: res.data.msg,
                      })
                  }
              }
          })
      }
      else if (options.dd=== '1') {
          wx.showToast({
              title: '督导的请求没写呢',
          })
      }
  },
  detail_info(e){
      var detail = JSON.stringify(this.data.form[e.currentTarget.dataset.index]);
      wx.navigateTo({
          url: './supervisor_detail/supervisor_detail?detail='+detail,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
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