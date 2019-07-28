// pages/merber/merber.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:{},
    goodList:''
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
  handleGoProductDetails(e){
    console.log(e)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../productDetails/productDetails?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const objData = wx.getStorageSync('userDetails')
    const storeId = wx.getStorageSync('storeId')
    const query = {
      'uid':objData.uid,
      'store_id': storeId
    }
    console.log(app.globalData.config.memberIndex)
    // 获取list列表数据
    app.ajax(app.globalData.config.memberIndex,query,'POST','数据加载中...')
    .then((res)=>{
      console.log('会员主页res',res)
      this.setData({
       userData: res.Data.user_info,
       goodList:res.Data.goods
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