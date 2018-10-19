var app = getApp();
Page({
    /** 
     * 页面的初始数据
     */
    data: {
        length: 0,
        nums: [],
        array: ['变更', '调串'],
        storage_data: {},
        date1_null: "",
        date2_null: ""
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
        var data = e.detail.value;
        if (!data.type) {
            this.submitFail(e);
        } else {
            if (data.type === "0") {
                if (data.classname == '' || data.reason_input == '') {
                    this.submitFail(e);
                } else {
                    wx.request({
                        url: app.globalData.config + "add_form_base",
                        method: "POST",
                        data: {
                            form_proposer_id: this.data.storage_data.staff_id,
                            form_proposer_name: this.data.storage_data.staff_name,
                            form_college: this.data.storage_data.college,
                            form_staff_room: this.data.storage_data.staff_room,
                            form_type: +data.type + 1,
                            form_course: data.classname,
                            form_before_adjust: '',
                            form_later_adjust: '',
                            form_reason: data.reason_input
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: (res) => {
                            console.log(res.data.data.form_id);
                            var form_id = res.data.data.form_id;
                            if (res.data.status === 200) {
                                wx.showLoading({
                                    title: res.data.message,
                                })
                                wx.request({
                                    url: app.globalData.config + "build?staff_id=" + this.data.storage_data.staff_id + "&form_id=" + form_id,
                                    success(res) {
                                        
                                        if (res.data.status === 200) {
                                            wx.hideLoading();
                                            wx.showToast({
                                                title: res.data.message,
                                                mask: true
                                            })
                                        }
                                        else{
                                            wx.showToast({
                                                title: '提交失败',
                                                image: '/static/ico/fail.png'
                                            })
                                        }
                                    }
                                })
                            } else {
                                wx.showToast({
                                    title: '提交失败',
                                    image: '/static/ico/fail.png'
                                })
                            }
                        }
                    })
                }
            } else {
                var str = data.after_date;
                var str1 = data.before_date;
                var patt1 = /undefined/;
                console.log(str);
                var date1 = str.match(patt1);
                var date2 = str1.match(patt1);
                if (data.classname == '' || data.reason_input == '' || date2 !== null || date1 !== null) {
                    this.submitFail(e)
                } else {
                    wx.request({
                        url: app.globalData.config + "add_form_base",
                        method: "POST",
                        data: {
                            form_proposer_id: this.data.storage_data.staff_id,
                            form_proposer_name: this.data.storage_data.staff_name,
                            form_college: this.data.storage_data.college,
                            form_staff_room: this.data.storage_data.staff_room,
                            form_type: +data.type + 1,
                            form_course: data.classname,
                            form_before_adjust: str1,
                            form_later_adjust: str,
                            form_reason: data.reason_input
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: (res) => {
                            console.log(res.data.data.form_id);
                            var form_id = res.data.data.form_id;
                            if (res.data.status === 200) {
                                wx.showLoading({
                                    title: res.data.message,
                                })
                                wx.request({
                                    url: app.globalData.config + "build?staff_id=" + this.data.storage_data.staff_id + "&form_id=" + form_id,
                                    success(res) {
                                        
                                        if (res.data.status === 200) {
                                            wx.hideLoading();
                                            wx.showToast({
                                                title: res.data.message,
                                                mask: true
                                            })
                                        }
                                        else{
                                            wx.showToast({
                                                title: '提交失败',
                                                image: '/static/ico/fail.png'
                                            })
                                        }
                                    }
                                })
                            } else {
                                wx.showToast({
                                    title: '提交失败',
                                    image: '/static/ico/fail.png'
                                })
                            }
                        }
                    })
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
        var data = e.detail.value;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var storage_data = wx.getStorageSync("data");
        this.setData({
            storage_data: storage_data
        })
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