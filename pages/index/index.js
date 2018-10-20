//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    items:{
      approve_forms_deal: [],
      sub_forms_deal: []
    }
  },
  //事件处理函数
  myRequest: function() {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else {
      wx.navigateTo({
        url: './require/require',
      })
    }
  },
  myApproval: function() {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else {
      wx.navigateTo({
        url: './approve/approve',
      })
    }
  },
  demo: function() {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else {
      wx.navigateTo({
        url: './supervisor/supervisor',
      })
    }
  },
  detail: function() {
    wx.navigateTo({
      url: './require/require_detail/require_detail',
    })
  },

  bindViewTap: function() {
  },
  
  onLoad: function () {
    if (!wx.getStorageSync('userInfo')) {
      wx.redirectTo({
        url: '../test/test',
      })
    }
  },
  onShow: function() {
    var _this = this;
    //用户登录了
    if (wx.getStorageSync('user')) {
      var staff_id = wx.getStorageSync('user').staff_id;
      
      wx.request({
        url: app.globalData.config + 'onload' + '?staff_id=' + staff_id,
        success(res) {
          if(res.data.status == 200) {
            console.log(res.data.data)
            _this.setData({ items: res.data.data })
          }
          var a = _this.data.items.approve_forms_deal ? _this.data.items.approve_forms_deal:[];
          var s = _this.data.items.sub_forms_deal ? _this.data.items.sub_forms_deal:[];
          _this.setData({data: a.concat(s)})
        }
      })
    }
    var data = wx.getStorageSync('data')
    

  }
})
