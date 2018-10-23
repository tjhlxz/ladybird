var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form: {},
        date: [],
        user:{}
    },
    agree(e){
      var _this = this;
        var form=_this.data.form;
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

                  var last_page_data = [];
                  var first_page_data = [];

                  //上一个页面的数据
                  last_page_data = getCurrentPages()[1].data.items;
                  //首页数据
                  first_page_data = getCurrentPages()[0].data.a;

                  //当前审批的form id
                  var this_page_id = _this.data.form.form_id;
                  //或取历史页面的长度，没有则为0
                  var last_length = last_page_data.length ? last_page_data.length:0;
                  var first_length = first_page_data.length ? first_page_data.length:0;

                  //把和当前审批表id相同的表给干掉
                  for (var del = 0; del < last_length; del++) {
                    if (last_page_data[del].form_id == this_page_id) {
                      last_page_data.splice(del, 1);
                    }
                  }
                  for (var home_del = 0; home_del < first_length; home_del++) {
                    if (first_page_data[home_del].form_id == this_page_id) {
                      first_page_data.splice(home_del, 1);
                    }
                  }
            //======================================
                    setTimeout(function () {
                        wx.hideLoading();
                        wx.showToast({
                            title: res.data.message,
                        })
                        setTimeout(function () {
                            wx.navigateBack({
                              
                            })
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
    },
    refuse(e){

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

      var user = wx.getStorageSync("user");
      var form = JSON.parse(options.form)
      this.setData({
        form: form,
        user: user
      })

      
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
            date:date,
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