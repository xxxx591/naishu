// pages/members/invite/invite.js
const app = getApp();
const uid = wx.getStorageSync('userDetails').uid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const query = {
      uid:uid
    }
    app.ajax(app.globalData.config.invite, query, 'POST', '数据加载中...')
    .then((res) => {
      console.log('res', res)
      this.setData({
        dataList: res.Data
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('fenxiang ')
    }
    return {
      title: "奶舒工坊",
      path: 'pages/home/home?uid=' + uid
    }
  }
})