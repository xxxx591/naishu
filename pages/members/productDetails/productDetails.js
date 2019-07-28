// pages/members/productDetails/productDetails.js
const app = getApp();
const uid = wx.getStorageSync('userDetails').uid
const store_id = wx.getStorageSync('storeId')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:1,
    dataList:'',
    id:'',
    userPrice:''
  },
  handleClickMinus(){
    if(this.data.number <= 0){
      this.setData({
        number:0
      })
    }else{
      this.setData({
        number: this.data.number - 1
      })
    }
  },
  handleClickAdd(){
    this.setData({
      number: this.data.number + 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('会员详情页options',options)
    this.setData({
      id:options.id
    })
    const query = {
      id: this.data.id
    }
    app.ajax(app.globalData.config.goodsDetail, query, 'POST', '数据加载中...')
    .then((res) => {
      console.log('会员商品详情', res.Data)
      
      let article = res.Data.detail
      WxParse.wxParse('article', 'html', article, this, 5);
      this.setData({
        dataList: res.Data
      })
    })
  },
  // 立即兑换
  handleSubmit(e){
    // const type = e.currentTarget.dataset.type
    const query = {
      uid: uid,
      id: this.data.id,
      pay_type: 4
    }
    app.ajax(app.globalData.config.orderPay, query, 'POST', '订单提交中...')
    .then((res) => {
      console.log('会员商品详情兑换', res)
      if (res.Code === '000000'){
        wx.navigateTo({
          url: '../consumptionHistory/consumptionHistory'
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.Msg,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '../member/member'
              })
            } else if (res.cancel) {
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