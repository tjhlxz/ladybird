// pages/index/supervisor/supervisor_detail/supervisor_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {},
        date: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var detail = JSON.parse(options.detail);
        this.setData({
            detail: detail
        })
        var date_before = [];
        var date_after = [];
        var date_before = detail.form_before_adjust.split(',');
        var date_after = detail.form_later_adjust.split(',');
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