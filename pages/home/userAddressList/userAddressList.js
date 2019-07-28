// pages/home/userAddressList/userAddressList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio:'2',
    userObj:{},
    addressList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userObj: wx.getStorageSync('userDetails')
    })
    this.init()
  },
  onChange(e){
    console.log(e)
    let params = {
      uid:this.data.userObj.uid,
      id: e.currentTarget.id
    };
    app.ajax(app.globalData.config.setUserAddressDefault, params).then(res=>{
      if (res.Code == '000000'){
        wx.navigateBack({
          delta:1
        })
      }
    })
  },
  updateAddress(e){
    wx.navigateTo({
      url: '/pages/home/receiptAddress/receiptAddress?id='+e.currentTarget.id,
    })
  },
  addAddress(){
    wx.navigateTo({
      url: '/pages/home/receiptAddress/receiptAddress',
    })
  },
  init(){
    let params = {
      uid:this.data.userObj.uid
    };
    app.ajax(app.globalData.config.getUserAddressList, params).then(res=>{
      let data = res.Data
      console.log(res)
      this.setData({
        addressList:data
      })
    })
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
    this.setData({
      userObj: wx.getStorageSync('userDetails')
    })
    this.init()
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