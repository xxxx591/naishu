// pages/appointment/appointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: '',
    courseId: '',
    codename: '获取验证码',
    mobile: '',
    code: '',
    flag: true,
    password: '',
    yaoqingma: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */

  formSubmit(e) {
    let mobile = e.detail.value.mobile
    let code = e.detail.value.code
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/; {
      if (_this.data.flag) {
        _this.setData({
          flag: false
        })
        let userInfo = wx.getStorageSync('userDetails')
        let params = {
          uid: userInfo.uid,
          code: this.data.code,
          password: this.data.password,
          repassword: this.data.yaoqingma,
        }
        app.ajax(app.globalData.config.payPassword, params).then(res => {
          console.log(res)
          if (res.Code == '000000') {
            wx.showToast({
              title: '密码修改成功',
              icon: 'success',
              duration: 1000,
              success: res => {
                setTimeout(_ => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              }
            })
          } else {
            wx.showToast({
              title: res.Msg,
              icon: 'none',
              duration: 2000,
              success: res => {

              }
            })
          }
        })
      } else {
        setTimeout(_ => {
          _this.setData({
            flag: true
          })
        }, 1000)
      }
    }
  },
  getMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getPayPsw(e) {
    this.setData({
      password: e.detail.value
    })
  },
  getYaoqing(e) {
    this.setData({
      yaoqingma: e.detail.value
    })
  },
  getCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getVerificationCode() {
    var num = 61;
    let _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      let params = {
        mobile: this.data.phone
      }
      app.ajax(app.globalData.config.getSendSms, params).then(res => {
        console.log(res)
      })
      var timer = setInterval(function() {
        num--;
        if (num <= 0) {
          clearInterval(timer);
          _this.setData({
            codename: '重新发送',
          })

        } else {
          _this.setData({
            codename: num + "s"
          })
        }
      }, 1000)

    }

  },
  onLoad: function(options) {
    let details = wx.getStorageSync('userDetails')
    this.setData({
      phone: details.mobile
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