var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        form: {},
        date: [],
        user: {},
        overflow: '',
        refuse_modal: 'false',
        show: false,
        disabled: ''
    },
    preView() {
      var _this = this;
      wx.previewImage({
        urls: [_this.data.form.form_picurl],
      })
    },
    agree(e) {
        var _this = this;
        var form = _this.data.form;
        wx.showModal({
          content: '是否同意此张审批单',
          success(res) {
            if(res.confirm){
              wx.showLoading({
                title: '正在审批',
                mask: true
              })
              if (_this.data.jwk == 0) {
                wx.request({
                  url: app.globalData.config + "relay",
                  method: "POST",
                  data: {
                    form_flow: form.form_flow,
                    form_flow_sign: form.form_flow_sign,
                    form_id: form.form_id,
                    from_userid: _this.data.user.staff_id,
                    update_time: form.update_time
                  },
                  success(res) {
                    if (res.data.status === 200) {

                      _this.setData({disabled:'disabled'});
                      wx.setStorageSync('lock_a', '1');
                      //用户是从approve.js跳转过来的
                      if (getCurrentPages().length == 3) {

                        var last_page_data = [];
                        var first_page_data = [];

                        //上一个页面的数据
                        last_page_data = getCurrentPages()[1].data.items;
                        //首页数据
                        first_page_data = getCurrentPages()[0].data.a;

                        //当前审批的form id
                        var this_page_id = _this.data.form.form_id;
                        //或取历史页面的长度，没有则为0
                        var last_length = last_page_data.length ? last_page_data.length : 0;
                        var first_length = first_page_data.length ? first_page_data.length : 0;

                        //把和当前审批表id相同的表给干掉
                        for (var del = 0; del < last_length; del++) {
                          if (last_page_data[del]) {
                            if (last_page_data[del].form_id == this_page_id) {
                              last_page_data.splice(del, 1);
                            }
                          }
                        }
                        for (var home_del = 0; home_del < first_length; home_del++) {
                          if (first_page_data[home_del]) {
                            if (first_page_data[home_del].form_id == this_page_id) {
                              first_page_data.splice(home_del, 1);
                            }
                          }
                        }
                        //用户是从首页跳转进来的
                      } else {
                        var first_page_data = [];

                        //首页数据
                        first_page_data = getCurrentPages()[0].data.a;

                        //当前审批的form id
                        var this_page_id = _this.data.form.form_id;
                        //或取历史页面的长度，没有则为0
                        var first_length = first_page_data.length ? first_page_data.length : 0;

                        //把和当前审批表id相同的表给干掉
                        for (var home_del = 0; home_del < first_length; home_del++) {
                          if (first_page_data[home_del]) {
                            if (first_page_data[home_del].form_id == this_page_id) {
                              first_page_data.splice(home_del, 1);
                            }
                          }
                        }
                      }
                      //======================================
                      setTimeout(function () {
                        wx.hideLoading();
                        wx.showToast({
                          title: res.data.message,
                        })
                        setTimeout(function () {
                          _this.setData({ disabled: '' });
                          wx.navigateBack({})
                        }, 1000);
                      }, 1000)
                    } else if (res.data.status === 401) {
                      wx.hideLoading();
                      wx.showModal({
                        content: res.data.message,
                        showCancel: false,
                        mask: true,
                        success() {
                          _this.setData({ disabled: '' });
                          wx.navigateBack();
                        }
                      });
                    } else {
                      wx.hideLoading();
                      wx.showModal({
                        content: res.data.message,
                        showCancel: false,
                        mask: true,
                        success() {
                          _this.setData({ disabled: '' });
                          wx.navigateBack();
                        }
                      });
                    }
                  }
                })
              } else {
                wx.request({
                  url: app.globalData.config + "last_relayForChangeCourse" + '?form_id=' + form.form_id,
                  success(res) {
                    if (res.data.status === 200) {
                      wx.hideLoading();
                      _this.setData({ disabled: 'disabled' });
                      wx.setStorageSync('lock_a', '1');
                      //用户是从approve.js跳转过来的
                      if (getCurrentPages().length == 3) {

                        var last_page_data = [];
                        var first_page_data = [];

                        //上一个页面的数据
                        last_page_data = getCurrentPages()[1].data.items;
                        //首页数据
                        first_page_data = getCurrentPages()[0].data.a;

                        //当前审批的form id
                        var this_page_id = _this.data.form.form_id;
                        //或取历史页面的长度，没有则为0
                        var last_length = last_page_data.length ? last_page_data.length : 0;
                        var first_length = first_page_data.length ? first_page_data.length : 0;

                        //把和当前审批表id相同的表给干掉
                        for (var del = 0; del < last_length; del++) {
                          if (last_page_data[del]) {
                            if (last_page_data[del].form_id == this_page_id) {
                              last_page_data.splice(del, 1);
                            }
                          }
                        }
                        for (var home_del = 0; home_del < first_length; home_del++) {
                          if (first_page_data[home_del]) {
                            if (first_page_data[home_del].form_id == this_page_id) {
                              first_page_data.splice(home_del, 1);
                            }
                          }
                        }
                        //用户是从首页跳转进来的
                      } else {
                        var first_page_data = [];

                        //首页数据
                        first_page_data = getCurrentPages()[0].data.a;

                        //当前审批的form id
                        var this_page_id = _this.data.form.form_id;
                        //或取历史页面的长度，没有则为0
                        var first_length = first_page_data.length ? first_page_data.length : 0;

                        //把和当前审批表id相同的表给干掉
                        for (var home_del = 0; home_del < first_length; home_del++) {
                          if (first_page_data[home_del]) {
                            if (first_page_data[home_del].form_id == this_page_id) {
                              first_page_data.splice(home_del, 1);
                            }
                          }
                        }
                      }
                      //======================================
                      setTimeout(function () {
                        wx.showToast({
                          title: res.data.message,
                        })
                        setTimeout(function () {
                          _this.setData({ disabled: '' });
                          wx.navigateBack({})
                        }, 1000);
                      }, 1000)
                    } else if (res.data.status === 401) {
                      wx.hideLoading();
                      wx.showModal({
                        content: res.data.message,
                        showCancel: false,
                        mask: true,
                        success() {
                          _this.setData({ disabled: '' });
                          wx.navigateBack();
                        }
                      });
                    } else {
                      wx.hideLoading();
                      wx.showModal({
                        content: res.data.message,
                        showCancel: false,
                        mask: true,
                        success() {
                          _this.setData({ disabled: '' });
                          wx.navigateBack();
                        }
                      });
                    }
                  }
                })
              }
            }else{}
          }
        })
        
    },
    refuse_confirm(e) {
        if (e.detail.value.reason_input === "") {
            wx.showToast({
                title: '请填写拒绝原因',
                image: '/static/ico/zhuyi.png',
                duration: 1500,
                mask: true
            })
        } else {
            var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
          if (e.detail.value.reason_input.match(regRule)) {
                wx.showToast({
                    title: '禁止输入表情',
                    image: '/static/ico/fail.png',
                    mask: true
                })
            } else {
            wx.showLoading({
                title: '审批中',
                mask: true,
            })
            var _this = this;
            var form = _this.data.form;
            var user_storage=wx.getStorageSync('user');
            
            wx.request({
                url: app.globalData.config + "refuse",
                method: "POST",
                data: {
                    form_id: form.form_id,
                    refuse_reason: e.detail.value.reason_input,
                    form_sign: form.form_flow_sign,
                    update_time: form.update_time,
                    to_userId: user_storage.staff_id,
                    form_proposer_id: form.form_proposer_id,
                    form_course: form.form_course
                },
                success(res) {
                    if (res.data.status === 200) {
                      wx.setStorageSync('lock_a', '1');
                      //用户是从approve.js跳转过来的
                      if (getCurrentPages().length == 3) {
                        var last_page_data = [];
                        var first_page_data = [];
                        //上一个页面的数据
                        last_page_data = getCurrentPages()[1].data.items;
                        //首页数据
                        first_page_data = getCurrentPages()[0].data.a;
                        //当前审批的form id
                        var this_page_id = _this.data.form.form_id;
                        //或取历史页面的长度，没有则为0
                        var last_length = last_page_data.length ? last_page_data.length : 0;
                        var first_length = first_page_data.length ? first_page_data.length : 0;

                        //把和当前审批表id相同的表给干掉
                        for (var del = 0; del < last_length; del++) {
                            if (last_page_data[del]) {
                                if (last_page_data[del].form_id == this_page_id) {
                                    last_page_data.splice(del, 1);
                                }
                            }
                        }
                        for (var home_del = 0; home_del < first_length; home_del++) {
                            if (first_page_data[home_del]) {
                                if (first_page_data[home_del].form_id == this_page_id) {
                                    first_page_data.splice(home_del, 1);
                                }
                            }
                        }
                        //用户是从首页跳转进来的
                      } else {
                        var first_page_data = [];

                        //首页数据
                        first_page_data = getCurrentPages()[0].data.a;

                        //当前审批的form id
                        var this_page_id = _this.data.form.form_id;
                        //或取历史页面的长度，没有则为0
                        var first_length = first_page_data.length ? first_page_data.length : 0;

                        //把和当前审批表id相同的表给干掉
                        for (var home_del = 0; home_del < first_length; home_del++) {
                          if (first_page_data[home_del]) {
                            if (first_page_data[home_del].form_id == this_page_id) {
                              first_page_data.splice(home_del, 1);
                            }
                          }
                        }
                      }
                        //======================================
                        setTimeout(function () {
                            wx.hideLoading();
                            wx.showToast({
                                title: res.data.message,
                                mask:true
                            })
                            setTimeout(function () {
                                wx.navigateBack({})
                            }, 1000);
                        }, 1000)
                    } else if (res.data.status === 400) {
                        wx.hideLoading();
                        wx.showToast({
                            title: res.data.message,
                            mask: true
                        })
                    } else if (res.data.status === 401) {
                        wx.hideLoading();
                        wx.showToast({
                            title: res.data.message,
                            mask: true,
                            image: '/static/ico/fail.png'
                        })
                    }
                }
            })
        }}
    },
    refuse(e) {
        this.setData({
            refuse_modal: 'true'
        })
    },
    cancle(e) {
        this.setData({
            refuse_modal: 'false'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        var user = wx.getStorageSync("user");
        var form = JSON.parse(options.form);
        if(options.jwk) {
        var jwk = options.jwk;
          _this.setData({
              form: form,
              user: user,
              jwk: jwk
          })
        } else if(options.pgzx) {
          var pgzx = options.pgzx;
          _this.setData({
            form: form,
            user: user,
            pgzx: pgzx
          })
        }

        var date_before = [];
        var date_after = [];
        var date_before = form.form_before_adjust.split(',');
        var date_after = form.form_later_adjust.split(',');
        var date = [];
        for (var i = 0; i < date_before.length; i++) {
            var arr = [];
            arr[0] = date_before[i];
            arr[1] = date_after[i];
            date.push(arr);
        }
        this.setData({
            date: date,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
      this.setData({show: true});
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      var _this = this;
      var a;
      if (a = wx.getStorageSync('user')) {
          wx.showLoading({
              title: '正在加载',
              duration: 500,
              mask: true
          })
        //强制注销
        wx.request({
          url: app.globalData.config + 'force_logout?staff_id=' + a.staff_id,
          success(res) {
              wx.hideLoading();
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
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
      
    }
})