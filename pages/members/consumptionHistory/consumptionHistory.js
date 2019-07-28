// pages/consumptionHistory/consumptionHistory.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const uid = wx.getStorageSync('userDetails').uid
    const query ={
      uid:uid
    }
    app.ajax(app.globalData.config.payDetails, query, 'POST', '数据加载中...')
      .then((res) => {
        console.log('res', res)
        this.setData({
          dataList:res.Data
        })
      })
  },
  // 跳转页面
  handleGoDetails(){
    wx.navigateTo({
      url: '../orderDetails/orderDetails'
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