var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        items: [],
        show: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        var _form = JSON.parse(options.form);
        _this.setData({
            items: _form
        })
        var data = _this.data.items

        var len = data.length;
        for (var i = 0; i < len; i++) {
            if (data[i].form_status == 0) {
                data[i].form_status = '待审批'
            } else if (data[i].form_status == 1) {
                data[i].form_status = '已同意'
            } else if (data[i].form_status == -1) {
                data[i].form_status = '已拒绝'
            }
        }
        _this.setData({
            items: _this.data.items
        })

    },
    detail: function(e) {
        var index = e.currentTarget.dataset.index;
        var form = JSON.stringify(e.currentTarget.dataset.form[index]);
        console.log(form);
        wx.navigateTo({
            url: './approve_detail/approve_detail?form=' + form,
        })
    },

    showMore: function() {
        var _this = this;
        _this.setData({
            show: false
        })
        var staff_id = wx.getStorageSync('user').staff_id;
        wx.showLoading({
            title: '正在加载',
        })
        wx.request({
            url: app.globalData.config + 'history' + '?staff_id=' + staff_id,
            success(res) {
                console.log(res);
                if (res.data.status == 200) {
                    var items = res.data.data.history_form;
                    console.log(items);
                    var len = items.length ? items.length : 0;
                    //   for(var i=0;i<len;i++){
                    //       if(items[i].status===0){
                    //           items[i].form_status = '待审批';
                    //       }
                    //       else if (items[i].status === 1) {
                    //           items[i].form_status = '已同意';
                    //       }
                    //       else if(items[i].status === -1) {
                    //           items[i].form_status = '已拒绝';
                    //       }
                    //       _this.data.items.push(items[i]);
                    //   }
                    for (var i = 0; i < len; i++) {
                        //处理数据中的from_status
                        if (items[i].form_status == -1) {
                            items[i].form_status = '已拒绝';
                        } else {
                            items[i].form_status = '已同意';
                        }
                        _this.data.items.push(items[i]);
                    }
                    var data = _this.data.items;
                    _this.setData({
                        items: data
                    })
                    wx.hideLoading();
                    wx.showToast({
                        title: res.data.message,
                        duration: 1000
                    })
                } else if (res.data.status == 400) {
                    wx.hideLoading();
                    wx.showToast({
                        title: res.data.message,
                        duration: 1000
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var _this = this;
        var item = _this.data.items;
        _this.setData({
            items: item
        })
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