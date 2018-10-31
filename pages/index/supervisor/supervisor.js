var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    windowHeight: 0,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      var items = JSON.parse(options.Form);
      _this.setData({items: items});

      //获取屏幕高度
      wx.getSystemInfo({
        success: function (res) {
          _this.setData({
            windowHeight: res.windowHeight
          });
          console.log("屏幕高度: " + res.windowHeight)
        }
      })    
  },

  load: function () {
    var _this = this;
    _this.setData({
      page: _this.data.page + 1
    });
    _this.loading();
  },
  
  loading: function () {
    var _this = this;
    var staff_id = wx.getStorageSync('user').staff_id;
    wx.request({
      method: 'GET',
      url: app.globalData.config + 'edu_stu_list' + '?edu_id=' + staff_id + '&page=' + _this.data.page,
      success: function (res) {
        if (res.data.status == '200') {
            var words = _this.data.items.concat(res.data.data);
            _this.setData({
              items: words
            })
        } else if (res.data.status == '202') {
          wx.showToast({
            title: res.data.message,
          })
        }
      }
    });
  },

  detail(e) {
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
      url: './supervisor_detail/supervisor_detail?detail=' + detail
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    var items = _this.data.items;
    _this.setData({ items: items })
  },
})
