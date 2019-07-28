// pages/home/shopList/shopList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    shopList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init(1)
  },
  init(id) {
    let params = {
      store_type: id
    }
    app.ajax(app.globalData.config.getShopStoreList, params).then(res => {
      console.log(res)
      this.setData({
        shopList: res.Data
      })
    })
  },
  // 切换
  onChange(e) {
    console.log(e)
    let id = e.detail.index + 1
    this.init(id)
  },
  goIndex(e) {
    console.log(e)
    wx.setStorageSync('storeId', e.currentTarget.dataset.obj.id)
    wx.removeStorageSync('type')
    wx.removeStorageSync('shopList')
    wx.removeStorageSync('shopList2')
    wx.removeStorageSync('shopDetails')
    wx.navigateBack({
      delta:1
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