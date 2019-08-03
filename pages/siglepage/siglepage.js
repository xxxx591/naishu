// pages/siglepage/siglepage.js
var app = getApp();
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
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
    let id = parseInt(this.data.id)
    switch (id) {
      case 1:
        wx.setNavigationBarTitle({
          title: '鲜花商品提示',
        })
        break;
      case 2:
        wx.setNavigationBarTitle({
          title: '美食商品提示',
        })
        break;
      case 3:
        wx.setNavigationBarTitle({
          title: '鲜花注意事项',
        })
        break;
      case 4:
        wx.setNavigationBarTitle({
          title: '美食注意事项',
        })
        break;
      case 5:
        wx.setNavigationBarTitle({
          title: '会员权益',
        })
        break;
      case 6:
        wx.setNavigationBarTitle({
          title: '优惠说明',
        })
        break;
      case 7:
        wx.setNavigationBarTitle({
          title: '自提地址',
        })
        break;
      case 8:
        wx.setNavigationBarTitle({
          title: '订花必读',
        })
        break;
    }
    this.init(id)
  },
  init(id) {
    let params = {
      id:id
    }
    app.ajax(app.globalData.config.getOther, params).then(res => {
      console.log(res.Data)
      let article = res.Data
      WxParse.wxParse('article', 'html', article, this, 5);
    })
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