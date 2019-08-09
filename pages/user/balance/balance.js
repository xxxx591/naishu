// pages/user/balance/balance.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        money: 100,
        jifen: 0
      },
      {
        money: 500,
        jifen: 50
      },
      {
        money: 800,
        jifen: 50
      },
      {
        money: 1000,
        jifen: 50
      },
    ],
    selectIndex: 0,
    money: '',
    orderId: '',
    balance:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      balance: wx.getStorageSync('userDetails').money
    })
    this.init()
  },
  pay() {
    let params = {
      uid: wx.getStorageSync('userDetails').uid,
      recharge_id: this.data.orderId
    }
    app.ajax(app.globalData.config.payRecharge, params).then(res => {
      console.log(res)
      let data = res.Data
      wx.requestPayment({
        timeStamp: data.timeStamp + '',
        nonceStr: data.nonceStr,
        package: data.package,
        signType: 'MD5',
        paySign: data.paySign,
        success(res) {
          console.log('支付成功的回调', res)
        
          wx.showToast({
            title: '支付成功',
            duration: 2000,
            success: res => {
              setTimeout(_ => {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
          })
        },
        fail(res) {}
      })
    })
  },
  init() {
    let params = {};
    app.ajax(app.globalData.config.recharge, params).then(res => {
      let arr = res.Data;
      let i = []
      arr.map(item => {
        let obj = {}
        obj.money = item.price;
        obj.jifen = item.points;
        obj.id = item.id;
        i.push(obj)
      })
      this.setData({
        list: i,
        orderId: i[0].id
      })
    })
  },
  payList() {
    wx.navigateTo({
      url: '/pages/user/consumptionHistory/consumptionHistory',
    })
  },
  select(e) {
    console.log(e)
    this.setData({
      selectIndex: e.currentTarget.id,
      money: e.currentTarget.dataset.money,
      orderId: e.currentTarget.dataset.id
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