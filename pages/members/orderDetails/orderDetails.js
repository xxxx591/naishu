// pages/members/orderDetails/orderDetails.js
const app = getApp()
const uid = wx.getStorageSync('userDetails').uid
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
    console.log('会员详情options',options)
    const query = {
      id:options.id,
      uid:uid
    }
    app.ajax(app.globalData.config.orderDetail, query, 'POST', '数据加载中...')
    .then((res) => {
      console.log('会员详情res', res)
      if (res.Code === '000000'){
        this.setData({
          dataList: res.Data
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.Msg,
          success(res) {
            if (res.confirm) {
              console.log('确定')
            } else if(res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
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