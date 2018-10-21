// pages/index/require/require_detail/require_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      form: {},
      staff: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      var _form = JSON.parse(options.form)
      // console.log(options)
      var _this = this;
      _this.setData({ form: _form});
      var data = _this.data.form;

      //审批状态做文字处理(0,1) => '审批完成'
      if(options.id == '1') {
        if (data.form_status == 0) {
          data.form_status = '审批完成'
        } else if (data.form_status == 1) {
          data.form_status = '审批中'
        } else {
          data.form_status = '审批失败'
        }
      }

      //处理数据库数据
      var form_flow_num = data.form_flow.split(',');
      var form_flow_name = data.form_flow_name.split(',');
      var form_flow_update = data.update_time.split(',');

      //找出所有审批成功的表单
      for(var i=1; i<data.form_flow_sign; i++) {
        _this.data.staff.push({ staff_name: form_flow_name[i - 1], staff_state: '审批成功',staff_update:form_flow_update[i - 1]});
      };

      //找出正在审批中的表单
      if (i <= form_flow_name.length) { _this.data.staff.push({ staff_name: form_flow_name[i - 1], staff_state: '审批中', staff_update: form_flow_update[i - 1] });i++ };

      //剩下的只需要静态资源
      for(;i<=form_flow_name.length;i++) {
        _this.data.staff.push({ staff_name: form_flow_name[i - 1], staff_state: '待审批', staff_update: form_flow_update[i - 1]});
      }

      //更新页面
      _this.setData({ 
        form: _this.data.form,
        staff: _this.data.staff
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