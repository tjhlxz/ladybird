const app = getApp()

Page({
  data: {
    windowHeight: 0,
    page: 1,
    just_teacher: 1,
    unreadNum: 0,
    unreadForm: 0,
    items: {
      approve_forms_deal: [],
      sub_forms_deal: [],
    },
    form_data: {},
    first: 0,
    //下面是小仙女的代码不要乱动喔！
    ptzg: '0',
    jyszr: '0',
    jxyz: '0',
    jwccz: '0',
    jwk: '0',
    pgzx: '0',
    dd: '0',
    //上面是小仙女的代码不要乱动喔！
  },
  //事件处理函数
  myRequest: function (e) {
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
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            })
          }
        }
      })
    }
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login'
      })
    } else {
      var form = JSON.stringify(e.currentTarget.dataset.form);
      wx.navigateTo({
        url: './require/require?form=' + form,
      })
    }
  },
  myApproval: function (e) {
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
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            })
          }
        }
      })
    }
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login'
      })
    } else {
      var data = e.currentTarget.dataset.form;
      var userId = wx.getStorageSync('user').staff_id;
      var obj = {};
      var len = data.length ? data.length : 0;

      var form = JSON.stringify(e.currentTarget.dataset.form);
      wx.navigateTo({
        url: './approve/approve?form=' + form + '&jwk=' + _this.data.jwk,
      })
    }
  },
  detail: function (e) {
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
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            })
          }
        }
      })
    }
    var index = e.currentTarget.dataset.index;
    var form = JSON.stringify(e.currentTarget.dataset.form[index]);
    wx.navigateTo({
      url: './require/require_detail/require_detail?form=' + form + '&id=1',
    })
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
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            })
          }
        }
      })
    }
    var data = this.data.a;
    var len = data.length;
    if (_this.data.pgzx == 0) {
      for (var i = 0; i < len; i++) {
        if (data[i].form_status == 0) {
          data[i].form_status = '待审批'
        } else if (data[i].form_status == 1) {
          data[i].form_status = '已同意'
        } else if (data[i].form_status == -1) {
          data[i].form_status = '已拒绝'
        }
      }
      this.setData({
        a: data
      })
      var index = e.currentTarget.dataset.index;
      var form_before = e.currentTarget.dataset.form[index]
      switch (form_before.form_status) {
        case 0:
          form_before.form_status = '待审批'
          break;
        case 1:
          form_before.form_status = '已同意'
          break;
        case -1:
          form_before.form_status = '已拒绝'
          break;
      }
      var form = JSON.stringify(form_before);
      wx.navigateTo({
        url: './approve/approve_detail/approve_detail?form=' + form + '&jwk=' + _this.data.jwk
      })
    } else {
      var index = e.currentTarget.dataset.index;
      var form_before = e.currentTarget.dataset.form[index]
      switch (form_before.form_status) {
        case 0:
          form_before.form_status = '待审批'
          break;
        case 1:
          form_before.form_status = '已同意'
          break;
        case -1:
          form_before.form_status = '已拒绝'
          break;
      }
      var form = JSON.stringify(form_before);
      wx.navigateTo({
        url: './approve/approve_detail/approve_detail?form=' + form + '&pgzx=' + _this.data.pgzx
      })
    }
  },
  demo: function (e) {
    var _this = this;
    if (!wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../login/login'
      })
    }
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
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            })
          }
        }
      })
    }
    if (_this.data.pgzx == 0) {
      var Form = JSON.stringify(_this.data.f);
      wx.navigateTo({
        url: './supervisor/supervisor?Form=' + Form,
      })
    } else {
      wx.navigateTo({
        url: './evaluate/evaluate'
      })
    }
  },
  //下面是小仙女的代码，实现不同身份的渲染，不要乱动喔！
  showlevel() {
    var data_storage = wx.getStorageSync('data');
    for (var i = 0; i < data_storage.length; i++) {
      switch (data_storage[i].staff_level) {
        case 0:
          this.setData({
            ptzg: '1'
          })
          break;
        case 1:
          this.setData({
            jyszr: '1'
          })
          break;
        case 2:
          this.setData({
            jxyz: '1'
          })
          break;
        case 3:
          this.setData({
            jwccz: '1'
          })
          break;
        case 4:
          this.setData({
            jwk: '1'
          })
          break;
        case 5:
          this.setData({
            pgzx: '1'
          })
          break;
        case 6:
          this.setData({
            dd: '1'
          })
          break;
      }
    }
    if (this.data.jyszr === '1' || this.data.jxyz === '1' || this.data.jwccz === '1' || this.data.jwk === '1' || this.data.pgzx === '1') {
      this.setData({
        just_teacher: 0
      })
    }
  },
  onLoad: function (options) {
    
  },
  onShow: function (options) {
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
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            })
          }
        }
      })
    }

    if (!wx.getStorageSync('user')) {
      wx.redirectTo({
        url: '../login/login'
      })
    }

    //如果用户登录了
    if (wx.getStorageSync('user')) {

      //获取屏幕高度
      wx.getSystemInfo({
        success: function (res) {
          _this.setData({
            windowHeight: res.windowHeight
          });
        }
      }),
        this.setData({
          first: 1,
          ptzg: '0',
          jyszr: '0',
          jxyz: '0',
          jwccz: '0',
          jwk: '0',
          pgzx: '0',
          dd: '0'
        })
      //小仙女写的判断身份函数
      this.showlevel();
      //==================
      var staff_id = wx.getStorageSync('user').staff_id;
      wx.showLoading({
        title: '正在加载',
      })
      if (_this.data.pgzx == '0') {
        wx.request({
          url: app.globalData.config + 'onload' + '?staff_id=' + staff_id,
          success(res) {
            if (res.data.status == 200) {
              wx.stopPullDownRefresh();
              _this.setData({
                items: res.data.data
              });
              var a = res.data.data.approve_forms_deal ? _this.data.items.approve_forms_deal : [];
              var s = res.data.data.sub_forms_deal ? _this.data.items.sub_forms_deal : [];
              _this.data.s = s;
              _this.data.a = a;
              // 对数据进行处理
              var arr = [];
              var num = 0;
              for (var d of _this.data.s) {
                var name = d.form_flow_name.split(',');
                s[num].name = name;
                s[num].name.push('无');
                num++;
              }
              _this.data.s = s;

              var data = _this.data.s;
              var len = data.length ? data.length : 0;
              for (var i = 0; i < len; i++) {
                if (data[i].form_status == 0) {
                  data[i].form_status = '待审批'
                } else if (data[i].form_status == 1) {
                  data[i].form_status = '已同意'
                } else {
                  data[i].form_status = '已拒绝'
                }
              }

              //处理未读消息状态小红点
              var unreadNum = _this.data.a.length ? _this.data.a.length : 0;
              _this.setData({
                unreadNum: unreadNum,
                a: a,
                s: data
              });

              wx.hideLoading();
            } else {
              wx.hideLoading();
              wx.showToast({
                title: res.data.message
              })
            }
          },
          fail() {
            wx.hideLoading();
            wx.showToast({
              title: '网络中断',
              mask: true,
              image: '/static/ico/fail.png'
            })
          }
        })
      } else {
        wx.request({
          url: app.globalData.config + 'edu_center_list?page=1',
          success(res) {
            var _send = res.data.data.already_send;
            
            _this.setData({ a: _send });
            wx.hideLoading();
          },
          fail() {
            wx.hideLoading();
            wx.showToast({
              title: '网络中断',
              mask: true,
              image: '/static/ico/fail.png'
            })
          }
        })
      }
      if (_this.data.dd == '1') {
        wx.request({
          url: app.globalData.config + 'edu_stu_list' + '?edu_id=' + staff_id + '&page=1',
          success(res) {
            _this.data.f = res.data.data.formdata ? res.data.data.formdata : [];

            //循环算出unreadForm值
            var unreadform = res.data.data.count;
            
            _this.setData({ unreadForm: unreadform })
          },
          fail() {
            wx.hideLoading();
            wx.showToast({
              title: '网络中断',
              mask: true,
              image: '/static/ico/fail.png'
            })
          }
        })
      }
    } else {
      this.setData({
        ptzg: '1',
        jyszr: '1',
        jxyz: '1',
        jwccz: '1',
        jwk: '1',
        pgzx: '1',
        dd: '1'
      })
    }
    
    //====================================================
    // var _this = this;
    // if (!wx.getStorageSync('user')) {
    //   wx.redirectTo({
    //     url: '../login/login'
    //   })
    // }
    // var a;
    // if(a=wx.getStorageSync('user')) {
    //   //强制注销
    //   wx.request({
    //     url: app.globalData.config + 'force_logout?staff_id=' + a.staff_id,1884648226
    //     success(res) {
    //       if (res.data.status == 400) {
    //         wx.showModal({
    //           content: res.data.message,
    //           mask: true,
    //           showCancel: false,
    //           success: function (res) {
    //             wx.clearStorageSync('user');
    //             wx.redirectTo({
    //               url: '../login/login',
    //             })
    //           }
    //         })
    //       }
    //     }
    //   })
    // if (this.data.first === 0) {
    //   this.setData({
    //     ptzg: '1',
    //     jyszr: '1',
    //     jxyz: '1',
    //     jwccz: '1',
    //     jwk: '1',
    //     pgzx: '1',
    //     dd: '1'
    //   })
    //   if (wx.getStorageSync('user')) {
    //     this.setData({
    //       first: 1,
    //       ptzg: '0',
    //       jyszr: '0',
    //       jxyz: '0',
    //       jwccz: '0',
    //       jwk: '0',
    //       pgzx: '0',
    //       dd: '0'
    //     })
    //     //小仙女写的判断身份函数
    //     this.showlevel();
    //   }
    // } else {
    //   this.showlevel();
    // }
    // //===================
    // var _this = this;
    // var staff_id = wx.getStorageSync('user').staff_id;


    // //判断用户是否是从提交表单页面跳转来的
    // if (wx.getStorageSync('lock')) {
    //   wx.showLoading({
    //     title: '正在更新页面',
    //   })
    //   wx.request({
    //     url: app.globalData.config + 'onload' + '?staff_id=' + staff_id,
    //     success(res) {
    //       if (res.data.status == 200) {
    //         wx.stopPullDownRefresh();
    //         _this.setData({
    //           items: res.data.data
    //         });
    //         var a = res.data.data.approve_forms_deal ? _this.data.items.approve_forms_deal : [];
    //         var s = res.data.data.sub_forms_deal ? _this.data.items.sub_forms_deal : [];
    //         _this.data.s = s;
    //         _this.data.a = a;
    //         // 对数据进行处理
    //         var arr = [];
    //         var num = 0;
    //         for (var d of _this.data.s) {
    //           var name = d.form_flow_name.split(',');
    //           s[num].name = name;
    //           s[num].name.push('无');
    //           num++;
    //         }
    //         _this.data.s = s;

    //         var data = _this.data.s
    //         var len = data.length ? data.length : 0;
    //         for (var i = 0; i < len; i++) {
    //           if (data[i].form_status == 0) {
    //             data[i].form_status = '待审批'
    //           } else if (data[i].form_status == 1) {
    //             data[i].form_status = '已同意'
    //           } else {
    //             data[i].form_status = '已拒绝'
    //           }
    //         }
    //         wx.removeStorage({
    //           key: 'lock',
    //           success: function (res) {
    //             console.log('home')
    //             //处理未读消息状态小红点
    //             var a = _this.data.a;
    //             var unreadNum = _this.data.a.length ? _this.data.a.length : 0;
    //             _this.setData({
    //               unreadNum: unreadNum,
    //               a: a,
    //               s: data
    //             });
    //             wx.hideLoading();
    //           },
    //         })
    //       }
    //     }
    //   })
    // }
    // //
    // if(wx.getStorageSync('lock_a')) {
    //   var staff_id = wx.getStorageSync('user').staff_id;
    //   wx.showLoading({
    //     title: '正在加载',
    //   })
    //     wx.request({
    //       url: app.globalData.config + 'onload' + '?staff_id=' + staff_id,
    //       success(res) {
    //         if (res.data.status == 200) {
    //           wx.stopPullDownRefresh();
    //           _this.setData({
    //             items: res.data.data
    //           });
    //           var a = res.data.data.approve_forms_deal ? _this.data.items.approve_forms_deal : [];
    //           var s = res.data.data.sub_forms_deal ? _this.data.items.sub_forms_deal : [];
    //           _this.data.s = s;
    //           _this.data.a = a;
    //           // 对数据进行处理
    //           var arr = [];
    //           var num = 0;
    //           for (var d of _this.data.s) {
    //             var name = d.form_flow_name.split(',');
    //             s[num].name = name;
    //             s[num].name.push('无');
    //             num++;
    //           }
    //           _this.data.s = s;

    //           var data = _this.data.s
    //           var len = data.length ? data.length : 0;
    //           for (var i = 0; i < len; i++) {
    //             if (data[i].form_status == 0) {
    //               data[i].form_status = '待审批'
    //             } else if (data[i].form_status == 1) {
    //               data[i].form_status = '已同意'
    //             } else {
    //               data[i].form_status = '已拒绝'
    //             }
    //           }
    //           wx.removeStorage({
    //             key: 'lock_a',
    //             success: function (res) {
    //               console.log('home')
    //               //处理未读消息状态小红点
    //               var a = _this.data.a;
    //               var unreadNum = _this.data.a.length ? _this.data.a.length : 0;
    //               _this.setData({
    //                 unreadNum: unreadNum,
    //                 a: a,
    //                 s: data
    //               });
    //               wx.hideLoading();
    //             },
    //           })
    //         }
    //       }
    //     })
    // }

    // var a = _this.data.a ? _this.data.a : [];
    // var s = _this.data.s ? _this.data.s : [];
    // var unreadNum = a.length;
    // }
  },
  onPullDownRefresh: function() {
    this.onShow();
  }
})