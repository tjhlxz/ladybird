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
        staff_info: [],
        date_before: "",
        date_after: "",
        identity_index: '',
        multiArray: [
            ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周'],
            ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            ['第1-2节', '第3-4节', '第5-6节', '第7-8节', '第9-10节']
        ]
    },
    bindPickerChange: function(event) {
        this.setData({
            index: event.detail.value
        })
    },
    bindIdentityPickerChange(event) {
        this.setData({
            identity_index: event.detail.value
        })
    },
    bindMultiPickerChange: function(e) {
        var tmpnums = this.data.nums
        tmpnums[e.currentTarget.dataset.key].multiIndex = e.detail.value;
        var multi = tmpnums[e.currentTarget.dataset.key].multiIndex;
        this.setData({
            nums: tmpnums
        })
    },
    bindMultiPickerChange2: function(e) {
        var tmpnums = this.data.nums
        tmpnums[e.currentTarget.dataset.key].multiIndex2 = e.detail.value;
        var multi2 = tmpnums[e.currentTarget.dataset.key].multiIndex2;
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
            'multiArray': this.data.multiArray,
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
            image: '/static/ico/zhuyi.png',
            mask: true
        })
    },
    noadd(e) {
        wx.showToast({
            title: '已到上限',
            image: '/static/ico/zhuyi.png',
            mask: true
        })
    },
    //表单提交
    formSubmit(e) {
        var nums = this.data.nums;
        var multiArray = this.data.multiArray;
        this.setData({
            date_before: '',
            date_after: ''
        });
        for (var i = 0; i < nums.length; i++) {
            var date_before;
            var multiIndex = nums[i].multiIndex;
            if (this.data.date_before === '') {
                date_before = nums[i].multiArray[0][multiIndex[0]] + ' ' + nums[i].multiArray[1][multiIndex[1]] + ' ' + nums[i].multiArray[2][multiIndex[2]];
            } else {
                date_before = this.data.date_before + ',' + nums[i].multiArray[0][multiIndex[0]] + ' ' + nums[i].multiArray[1][multiIndex[1]] + ' ' + nums[i].multiArray[2][multiIndex[2]];
            }
            this.setData({
                date_before: date_before
            })
        }
        for (var i = 0; i < nums.length; i++) {
            var date_after;
            var multiIndex2 = nums[i].multiIndex2;
            if (this.data.date_after === '') {
                date_after = nums[i].multiArray[0][multiIndex2[0]] + ' ' + nums[i].multiArray[1][multiIndex2[1]] + ' ' + nums[i].multiArray[2][multiIndex2[2]];
            } else {
                date_after = this.data.date_after + ',' + nums[i].multiArray[0][multiIndex2[0]] + ' ' + nums[i].multiArray[1][multiIndex2[1]] + ' ' + nums[i].multiArray[2][multiIndex2[2]];
            }
            this.setData({
                date_after: date_after
            })
        }
        var data = e.detail.value;
        //只有一种身份的情况下
        if (this.data.storage_data.length === 1) {
            this.confirm(e);
        }
        //有多种身份的时候
        else {
            //如果未选择身份
            if (data.staff_level === '') {
                this.submitFail(e);
            }
            //如果选择了身份
            else {
                this.confirm(e);
            }
        }
    },
    add_form_base(e) {
        var data = e.detail.value;
        var identity_index = this.data.identity_index;
        var that=this;
        if (this.data.storage_data[identity_index].staff_room === null) {
            wx.showToast({
                title: '此身份不可提交',
                image: '/static/ico/fail.png',
                mask: true
            })
        } else {
            wx.showModal({
                title: '提交确认',
                content: '提交后不可修改，确定要提交吗？',
                mask: true,
                confirmColor: '#0ab179',
                success:function(res){
                    if(res.confirm){
                    wx.showLoading({
                        title: '正在提交',
                        mask: true,
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                    })
                    console.log(data);
                    wx.request({
                        url: app.globalData.config + "add_form_base",
                        method: "POST",
                        data: {
                            form_proposer_id: that.data.storage_data[identity_index].staff_id,
                            form_proposer_name: that.data.storage_data[identity_index].staff_name,
                            form_college: that.data.storage_data[identity_index].college,
                            form_staff_room: that.data.storage_data[identity_index].staff_room,
                            form_type: +data.type + 1,
                            form_course: data.classname,
                            form_before_adjust: that.data.date_before,
                            form_later_adjust: that.data.date_after,
                            form_reason: data.reason_input
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: (res) => {
                            var form_id = res.data.data.form_id;
                            if (res.data.status === 200) {
                                wx.showLoading({
                                    title: res.data.message,
                                    mask: true
                                })
                                wx.request({
                                    url: app.globalData.config + "build?staff_id=" + that.data.storage_data[identity_index].staff_id + "&form_id=" + form_id + "&staff_level=" + that.data.storage_data[identity_index].staff_level + "&staff_room=" + that.data.storage_data[identity_index].staff_room + "&college=" + that.data.storage_data[identity_index].college,
                                    success(res) {
                                        if (res.data.status === 200) {
                                            setTimeout(function () {
                                                wx.hideLoading();
                                                wx.showLoading({
                                                    title: res.data.message,
                                                    mask: true
                                                })
                                                wx.request({
                                                    url: app.globalData.config + "relay",
                                                    method: "POST",
                                                    data: {
                                                        form_flow: res.data.data.form_flow,
                                                        form_flow_sign: res.data.data.form_flow_sign,
                                                        form_id: res.data.data.form_id,
                                                        from_userid: res.data.data.from_userid,
                                                        update_time: ''
                                                    },
                                                    success(res) {
                                                        if (res.data.status === 200) {
                                                            setTimeout(function () {
                                                                wx.hideLoading();
                                                                wx.showToast({
                                                                    title: res.data.message,
                                                                    mask: true
                                                                })
                                                                setTimeout(function () {
                                                                    wx.switchTab({
                                                                        url: '../../index/index',
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
                                            }, 1000)
                                        } else {
                                            wx.showToast({
                                                title: '提交失败',
                                                image: '/static/ico/fail.png',
                                                mask: true
                                            })
                                        }
                                    }
                                })
                            } else {
                                wx.showToast({
                                    title: '提交失败',
                                    image: '/static/ico/fail.png',
                                    mask: true
                                })
                            }
                        }
                    })
                    }
                }
            })
            
                
            
        }
    },
    confirm(e) {
        var data = e.detail.value;
        //申请类型为空
        if (!data.type) {
            this.submitFail(e);
        }
        //申请类型不为空
        else {
            //申请类型是变更
            if (data.type === "0") {
                this.setData({
                    date_before: '',
                    date_after: ''
                })
                //课程名和申请原因有空
                if (data.classname == '' || data.reason_input == '') {
                    this.submitFail(e);
                }
                //信息填写完整发起请求
                else {
                    this.add_form_base(e)
                }
            }
            //申请类型是调串
            else {
                var str = this.data.date_before;
                var str1 = this.data.date_after;
                var patt1 = /undefined/;
                var date1 = str.match(patt1);
                var date2 = str1.match(patt1);
                //填写信息不完整
                if (data.classname == '' || data.reason_input == '' || date2 !== null || date1 !== null) {
                    this.submitFail(e)
                }
                //填写信息完整
                else {
                    this.add_form_base(e)
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
        var staff_info = [];
        var staff_level = [];
        var storage_data = wx.getStorageSync("data");
        for (var j = 0; j < storage_data.length; j++) {
            switch (storage_data[j].staff_level) {
                case 0:
                    staff_level[j] = "普通职工";
                    break;
                case 1:
                    staff_level[j] = "教研室主任";
                    break;
                case 2:
                    staff_level[j] = "教学院长";
                    break;
                case 3:
                    staff_level[j] = "教务处处长";
                    break;
                case 4:
                    staff_level[j] = "教务科";
                    break;
                case 5:
                    staff_level[j] = "评估中心";
                    break;
                case 6:
                    staff_level[j] = "督导";
                    break;
            }
        }
        for (var i = 0; i < storage_data.length; i++) {
            if (storage_data[i].staff_level === 0 || storage_data[i].staff_level === 1) {
                staff_info[i] = storage_data[i].college + '-' + storage_data[i].staff_room + '-' + staff_level[i];
            } else if (storage_data[i].staff_level === 2) {
                staff_info[i] = storage_data[i].college + '-' + staff_level[i]
            } else
                staff_info[i] = staff_level[i];
        }
        this.setData({
            storage_data: storage_data,
            staff_info: staff_info,
            staff_level: staff_level
        })
        if (storage_data.length === 1) {
            this.setData({
                identity_index: 0
            })
        }
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