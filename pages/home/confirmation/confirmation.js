// pages/home/confirmation/confirmation.js
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
    password: ''
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
    let shopcountPrice = 0;
    arr.map(item => {
      shopcountPrice += parseInt(item.count * item.price)
    })
    this.setData({
      shopList: arr,
      shopcountPrice: shopcountPrice
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