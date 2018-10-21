// pages/index/require/require_detail/require_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        staff_name: '刘兴丽',
        staff_state: '1',
        items: [{
            xueyuan: '计算机学院',
            staff_name: '刘兴丽',
            date: 'XX-XX XX:XX',
            collage: '软件工程',
            before: '第一周 星期一 第一节',
            after: '第二周 星期一 第一节'
        }],
        forms: [{
            formname: '安安安',
            formstate: '0',
            formdate: 'XX-XX XX:XX'
        },
        {
            formname: '车向前',
            formstate: '0',
            formdate: 'XX-XX XX:XX'
        }, {
            formname: '张丽媛',
            formstate: '1',
            formdate: 'XX-XX XX:XX'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        //判断审批状态
        var data = _this.data.forms;
        for (var item in data) {
            if (data[item].formstate == 0) {
                data[item].formstate = '审批完成'
            } else if (data[item].formstate == 1) {
                data[item].formstate = '审批中'
            } else {
                data[item].formstate = '审批失败'
            }
        }
        //判断这张表单的审批状态
        var state = _this.data.staff_state;
        (state == 0) ? _this.setData({ staff_state: '审批完成' }) : _this.setData({ staff_state: '审批中' });
        _this.setData({ forms: data })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})