//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    unreadNum: 0,
    items:{
      approve_forms_deal: [],
      sub_forms_deal: [],
    },
    form_data: {},
  },
  //事件处理函数
  myRequest: function(e) {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else {
      var form = JSON.stringify(e.currentTarget.dataset.form);
      wx.navigateTo({
        url: './require/require?form=' + form,
      })
    }
  },
  myApproval: function(e) {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else {
      var data = e.currentTarget.dataset.form;
      var userId = wx.getStorageSync('user').staff_id;
      var obj = {};
      var len = data.length;
      

      var form = JSON.stringify(e.currentTarget.dataset.form);
      // console.log(form)
      wx.navigateTo({
        url: './approve/approve?form=' + form,
      })
    }
  },
  demo: function(e) {
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else {
      var form = JSON.stringify(e.currentTarget.dataset.form);
      wx.navigateTo({
        url: './supervisor/supervisor?form=' + form,
      })
    }
  },
  detail: function(e) {

    var index = e.currentTarget.dataset.index;
    var form = JSON.stringify(e.currentTarget.dataset.form[index]);
    
    wx.navigateTo({
      url: './require/require_detail/require_detail?form=' + form + '&id=1',
    })
  },

  bindViewTap: function() {
  },
  
  onLoad: function () {
    var _this = this;
    if (!wx.getStorageSync('userInfo')) {
      wx.redirectTo({
        url: '../test/test',
      })
    }
    //如果用户登录了
    if (wx.getStorageSync('user')) {

      var staff_id = wx.getStorageSync('user').staff_id;
      wx.request({
        url: app.globalData.config + 'onload' + '?staff_id=' + staff_id,
        success(res) {
          if (res.data.status == 200) {
            _this.setData({ items: res.data.data });

            var a = _this.data.items.approve_forms_deal ? _this.data.items.approve_forms_deal : [];
            var s = _this.data.items.sub_forms_deal ? _this.data.items.sub_forms_deal : [];
            // _this.setData({ a: a, s: s });

            //处理未读消息状态小红点
            var unreadNum = a.length;
            _this.setData({ unreadNum: unreadNum, a: a, s: s });

            var arr = [];
            var num = 0;
            for (var d of _this.data.s) {
              var name = d.form_flow_name.split(',');
              s[num].name = name;
              _this.setData({ s: s });
              num++;
            }
          }
        }
      })
    }
  },
  onShow: function(options) {
    var _this = this;
    // console.log(options)

    // var a = _this.data.items.approve_forms_deal ? _this.data.items.approve_forms_deal : [];
    // var s = _this.data.items.sub_forms_deal ? _this.data.items.sub_forms_deal : [];
    // _this.setData({ a: a, s: s });

    //处理未读消息状态小红点
    // var unreadNum = a.length;
    // _this.setData({ unreadNum: unreadNum });

    // var arr = [];
    // var num = 0;
    // for (var d of _this.data.s) {
    //   var name = d.form_flow_name.split(',');
    //   s[num].name = name;
    //   _this.setData({ s: s });
    //   num++;
    // }
    
  }
})
