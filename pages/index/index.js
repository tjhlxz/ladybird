const app = getApp()

Page({
    data: {
        unreadNum: 0,
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
    myRequest: function(e) {
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
    myApproval: function(e) {
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
                url: './approve/approve?form=' + form,
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
    demo: function(e) {
        if (!wx.getStorageSync('user')) {
            wx.navigateTo({
                url: '../login/login',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
            })
        } else {
            var form = JSON.stringify(e.currentTarget.dataset.form);
            wx.navigateTo({
                url: './supervisor/supervisor?form=' + form,
            })
        }
    },
    onLoad: function() {
        var _this = this;
        if (!wx.getStorageSync('userInfo')) {
            wx.redirectTo({
                url: '../test/test',
            })
        }
        
        //如果用户登录了
        if (wx.getStorageSync('user')) {
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
            //===================
            var staff_id = wx.getStorageSync('user').staff_id;
            wx.showLoading({
                title: '正在加载',
            })
            wx.request({
                url: app.globalData.config + 'onload' + '?staff_id=' + staff_id,
                success(res) {
                    if (res.data.status == 200) {
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
                            _this.data.s = s;
                            num++;
                        }

                        var data = _this.data.s
                        var len = data.length ? data.length : 0;
                        for (var i = 0; i < len; i++) {
                            if (data[i].form_status == 0) {
                                data[i].form_status = '审批中'
                            } else if (data[i].form_status == 1) {
                                data[i].form_status = '审批完成'
                            } else {
                                data[i].form_status = '审批失败'
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
                    }
                }
            })
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
    },
    onShow: function() {
        if (this.data.first === 0) {
            this.setData({
                ptzg: '0',
                jyszr: '0',
                jxyz: '0',
                jwccz: '0',
                jwk: '0',
                pgzx: '0',
                dd: '0'
            })
            if (wx.getStorageSync('user'))
                //小仙女写的判断身份函数
                this.showlevel();
        } else {
            this.showlevel();
        }
        //===================
        var _this = this;
        var staff_id = wx.getStorageSync('user').staff_id;

        //判断用户是否是从登录表单页面跳转来的
        if (wx.getStorageSync('homeShow')) {
            var staff_id = wx.getStorageSync('user').staff_id;
            wx.showLoading({
                title: '正在加载',
            })
            wx.request({
                url: app.globalData.config + 'onload' + '?staff_id=' + staff_id,
                success(res) {
                    if (res.data.status == 200) {
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
                            _this.data.s = s;
                            num++;
                        }

                        var data = _this.data.s
                        var len = data.length ? data.length : 0;
                        for (var i = 0; i < len; i++) {
                            if (data[i].form_status == 0) {
                                data[i].form_status = '审批中'
                            } else if (data[i].form_status == 1) {
                                data[i].form_status = '审批完成'
                            } else {
                                data[i].form_status = '审批失败'
                            }
                        }

                        //处理未读消息状态小红点
                        var unreadNum = _this.data.a.length ? _this.data.a.length : 0;
                        _this.setData({
                            unreadNum: unreadNum,
                            a: a,
                            s: data
                        });
                        wx.removeStorageSync('homeShow');
                        wx.hideLoading();
                    }
                }
            })
        }

        //判断用户是否是从提交表单页面跳转来的
        if (wx.getStorageSync('lock')) {
            wx.showLoading({
                title: '正在更新页面',
            })
            wx.request({
                url: app.globalData.config + 'sub_forms' + '?staff_id=' + staff_id,
                success(res) {
                    if (res.data.status == 200) {

                        var s = res.data.data ? res.data.data : [];

                        _this.data.s = s;

                        // 对数据进行处理
                        var arr = [];
                        var num = 0;
                        for (var d of _this.data.s) {
                            var name = d.form_flow_name.split(',');
                            s[num].name = name;
                            _this.data.s = s;
                            num++;
                        }

                        var data = _this.data.s
                        var len = data.length ? data.length : 0;
                        for (var i = 0; i < len; i++) {
                            if (data[i].form_status == 0) {
                                data[i].form_status = '审批中'
                            } else if (data[i].form_status == 1) {
                                data[i].form_status = '审批完成'
                            } else {
                                data[i].form_status = '审批失败'
                            }
                        }

                        wx.removeStorage({
                            key: 'lock',
                            success: function(res) {
                                var unreadNum = _this.data.a.length ? _this.data.a.length : 0;

                                _this.setData({
                                    s: s,
                                    unreadNum: unreadNum
                                });
                                wx.hideLoading();
                            },
                        })
                    }
                }
            })
        }

        var a = _this.data.a ? _this.data.a : [];
        var s = _this.data.s ? _this.data.s : [];
        var unreadNum = a.length;

    _this.setData({
      a: a,
      s: s,
      unreadNum: unreadNum
    });
  }
})