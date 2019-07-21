// pages/merber/merber.js
const app = getApp();
const api = app.globalData.config.memberIndex;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryData:{
      uid:'',
      store_id:''
    }
  },
  handleGoPay(){
    wx.navigateTo({
      url: '../consumptionHistory/consumptionHistory'
    })
  },
  handleGoPrivilege(){
    wx.navigateTo({
      url: '../privilege/privilege'
    })
  },
  handleGoLeaderBoard(){
    wx.navigateTo({
      url: '../leaderBoard/leaderBoard'
    })
  },
  handleGoInvite(){
    wx.navigateTo({
      url: '../invite/invite'
    })
  },
  handleGoFans(){
    wx.navigateTo({
      url: '../myFans/myFans'
    })
  },
  handleGoProductDetails(){
    wx.navigateTo({
      url: '../productDetails/productDetails'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取list列表数据
    // app.ajax(api,{},'POST','数据加载中...')
    // .then((res)=>{
    //   console.log(res)
    // })
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