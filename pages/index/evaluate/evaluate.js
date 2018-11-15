var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    show: true,
    page: 1,
    windowHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  
  detail1(e) {
    var _this = this;
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
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              }
            })
          }
        }
      })
    }

    var data = this.data.items;
    var len = data.length;
    var index = e.currentTarget.dataset.index;
    var form_before = e.currentTarget.dataset.form[index]

    var form = JSON.stringify(form_before);
    wx.navigateTo({
      url: '../approve/approve_detail/approve_detail?form=' + form + '&pgzx=' + '1'
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
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
                wx.switchTab({
                  url: '/pages/login/login',
                })
              }
            })
          }
        }
      })
      //获取屏幕高度
      wx.getSystemInfo({
        success: function (res) {
          _this.setData({
            windowHeight: res.windowHeight
          });
        }
      })
    
      wx.request({
        url: app.globalData.config + 'edu_center_list_send?page=1',
        success(res) {
          if (res.data.status == 201) {
            var data = res.data.data;
            _this.setData({items: data});
          }
        }
      })
    }
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
      url: app.globalData.config + 'edu_center_list_send' + '?page=' + _this.data.page,
      success: function (res) {
        if (res.data.status == '201') {
          var words = _this.data.items.concat(res.data.data);
          _this.setData({
            items: words
          })
        } else if (res.data.status == '200') {
          wx.showToast({
            title: res.data.message,
          })
        }
      }
    });
  }
})