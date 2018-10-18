Page({
    /** 
     * 页面的初始数据
     */
    data: {
        length: 0,
        nums: [],
        array: ['变更', '调串'],
    },
    bindPickerChange: function(event) {
        console.log('picker发送选择改变，携带值为', event.detail.value)
        this.setData({
            index: event.detail.value
        })
    },
    bindMultiPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var tmpnums = this.data.nums;
        tmpnums[e.currentTarget.dataset.key].multiIndex = e.detail.value;
        this.setData({
            nums: tmpnums
        })
    },
    bindMultiPickerChange2: function(e) {
        var tmpnums = this.data.nums;
        tmpnums[e.currentTarget.dataset.key].multiIndex2 = e.detail.value;
        this.setData({
            nums: tmpnums
        })
    },
    addchange(e) {
        var a = this.data.length;
        a = a + 1;
        var nums = this.data.nums;
        nums[a - 1] = {
            'key': a - 1,
            'multiArray': [
                ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周'],
                ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                ['第1-2节', '第3-4节', '第5-6节', '第7-8节', '第9-10节']
            ],
            'multiIndex': ['', '', ''],
            'multiIndex2': ['', '', ''],
        };
        this.setData({
            nums: nums,
            length: a
        });
    },
    deletechange(e) {
        var nums = this.data.nums;
        nums.pop();
        var a = this.data.length - 1
        this.setData({
            nums: nums,
            length: a
        })
    },
    nodelete(e) {
        wx.showToast({
            title: '至少一条',
            image: '/static/ico/zhuyi.png'
        })
    },
    noadd(e) {
        wx.showToast({
            title: '已到上限',
            image: '/static/ico/zhuyi.png'
        })
    },
    formSubmit(e) {
        console.log(e);
        var data = e.detail.value;


        if (!data.type) {
            this.submitFail(e);
        } else {
            if (data.type === "变更") {
                if (data.classname == '' || data.reason_input == '') {
                    this.submitFail(e);
                } else {
                    this.submitSuccess(e);
                }
            } else {
                var str = data.after_date;
                var str1 = data.before_date;
                var patt1 = /undefined/;
                var date1 = str.match(patt1);
                var date2 = str1.match(patt1);
                if (data.classname =='' || data.reason_input =='' || date2 !== null || date1 !== null) {
                    this.submitFail(e);
                }else{
                    this.submitSuccess(e);
                }
            }
        }

    },
    submitFail(e) {
        wx.showToast({
            title: '请填写完整信息',
            image: '/static/ico/zhuyi.png'
        })
    },
    submitSuccess(e) {
        wx.showToast({
            title: '提交成功',
            duration: 1000
        })
        setTimeout(function() {
            wx.switchTab({
                url: '../../index/index',
            })
        }, 1000);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.addchange();
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