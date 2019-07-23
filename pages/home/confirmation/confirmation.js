// pages/home/confirmation/confirmation.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    shopcountPrice: 0,
    show: false,
    showOther: false,
    payType: 1,
    radio: '1',
    userPhone: '',
    password: '',
    type: '',
    otherDetails: '',
    storeName: '',
    leftIndex: 0,
    clickFlag: true,
    tipFlag: true
  },
  // 自己支付
  paySelf() {
    this.setData({
      show: true
    })
  },
  payOther() {
    this.setData({
      showOther: true
    })
  },
  changeUserPhone(value) {
    console.log(value)
    this.setData({
      userPhone: value.detail
    })
  },
  changeUserPSW(value) {
    console.log(value)
    this.setData({
      password: value.detail
    })
  },

  cancelPayOther() {
    this.setData({
      showOther: false
    })
  },
  onCloseOther() {
    this.setData({
      showOther: false
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  cancelPaySelf() {
    this.setData({
      show: false
    })
  },
  onChange(event) {
    console.log(event)
    this.setData({
      radio: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let arr = wx.getStorageSync('shopList')
    let userObj = wx.getStorageSync('userDetails')
    let type = wx.getStorageSync('type')
    let shopcountPrice = 0;
    arr.map(item => {
      shopcountPrice += parseFloat(parseFloat(item.count * item.price).toFixed(2))
    })
    this.setData({
      shopList: arr,
      shopcountPrice: shopcountPrice,
      type: wx.getStorageSync('type'),
      storeName: wx.getStorageSync('storeName')
    })
    // { "uid": 5, "head_img_url": "http://nsgf.yanyongwang.cn/uploads/admin/app_thumb/c19343a5d41a972ba9c0a0d4158234d3.jpg", "nickname": "明天", "mobile": "15575182556", "member_type": 0, "money": "0.00", "points": 0 }
    if (type == 1) {
      // 鲜花模式
      if (userObj.member_type === 0 && shopcountPrice < 50) {
        this.setData({
          clickFlag: false,
          leftIndex: 2
        })
      }
    } else {
      if (userObj.member_type != 0 && juli <= 3) {
        this.setData({
          leftIndex: 1,
          tipFlag: false
        })
      } else {
        this.setData({
          clickFlag: false,
          leftIndex: 2
        })
      }
    }
    this.init()
  },
  init() {
    let params = {
      id: this.data.type
    }
    app.ajax(app.globalData.config.getOther, params).then(res => {
      console.log(res)
      let article = res.Data
      WxParse.wxParse('article', 'html', article, this, 5);
      this.setData({
        otherDetails: res.Data
      })
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