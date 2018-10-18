// pages/user/updatepwd/updatepwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
    formSubmit(event){
        var detail=event.detail.value;
        var oldpwd=detail.oldpwd;
        var newpwd=detail.newpwd;
        var newpwdagin=detail.newpwdagin;
        var re_n = /[^\d]/g;
        var re_t = /[^a-zA-z]/g;
        var n_result=re_n.test(newpwd);
        var t_result = re_t.test(newpwd);
        if(oldpwd===""){
            wx.showModal({
                title: '密码无效',
                content: '您输入的原密码不正确',
                showCancel: false
            })
        }
        else if(newpwd.length < 6||newpwd.length>16){
            wx.showModal({
                title: '密码无效',
                content: '密码由6-16个字符组成',
                showCancel:false
            })
        }else{
            if (!n_result){
                wx.showModal({
                    title: '密码无效',
                    content: '密码不能全为数字',
                    showCancel: false
                })
            }
            else if(!t_result){
                wx.showModal({
                    title: '密码无效',
                    content: '密码不能全为字母',
                    showCancel: false
                })
            }
            else{
                if (newpwd === newpwdagin){
                    wx.showToast({
                        title: '密码修改成功',
                        duration: 1000
                    })
                    setTimeout(function () {
                        wx.redirectTo({
                            url: '../../login/login',
                        })
                    }, 1000);
                }
                else{
                    wx.showModal({
                        title: '密码无效',
                        content: '两次输入密码不一样',
                        showCancel: false
                    })
                }
            }
        }
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