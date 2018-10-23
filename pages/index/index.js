//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        unreadNum: 0,
        items: {
            approve_forms_deal: [],
            sub_forms_deal: [],
        },
        form_data: {},
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
                url: '../login/login',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
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
                url: '../login/login',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
            })
        } else {
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
    detail: function(e) {

        var index = e.currentTarget.dataset.index;
        var form = JSON.stringify(e.currentTarget.dataset.form[index]);

        wx.navigateTo({
            url: './require/require_detail/require_detail?form=' + form + '&id=1',
        })
    },
    bindViewTap: function() {},
    onLoad: function() {
        var _this = this;
        if (!wx.getStorageSync('userInfo')) {
            wx.redirectTo({
                url: '../test/test',
            })
        }
        //如果用户登录了
        if (wx.getStorageSync('user')) {
            //小仙女写的判断身份函数
            this.showlevel();
            //===================
            var staff_id = wx.getStorageSync('user').staff_id;
            wx.request({
                url: app.globalData.config + 'onload' + '?staff_id=' + staff_id,
                success(res) {
                    if (res.data.status == 200) {
                        _this.setData({
                            items: res.data.data
                        });

                        var a = _this.data.items.approve_forms_deal ? _this.data.items.approve_forms_deal : [];
                        var s = _this.data.items.sub_forms_deal ? _this.data.items.sub_forms_deal : [];
                        // _this.setData({ a: a, s: s });

                        //处理未读消息状态小红点
                        var unreadNum = a.length;
                        _this.setData({
                            unreadNum: unreadNum,
                            a: a,
                            s: s
                        });

                        var arr = [];
                        var num = 0;
                        for (var d of _this.data.s) {
                            var name = d.form_flow_name.split(',');
                            s[num].name = name;
                            _this.setData({
                                s: s
                            });
                            num++;
                        }
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
        this.setData({
            ptzg: '0',
            jyszr: '0',
            jxyz: '0',
            jwccz: '0',
            jwk: '0',
            pgzx: '0',
            dd: '0'
        })

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
    //===============上面是小仙女的代码，不要乱动喔===================
    onShow: function(options) {
        if (wx.getStorageSync('user')) {
            //小仙女写的判断身份函数
            this.showlevel();
            //===================
        }

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