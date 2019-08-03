// pages/user/consumptionHistory/consumptionHistory.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    show: false,
    date: new Date().getTime(),
    page:1
  },
  selectTime() {
    this.setData({
      show: true
    })
  },
  lower(){
    console.log('asdasdasd')
    let page = this.data.page
    page++
    this.setData({
      page: page
    })
    this.init()
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onInput(event) {
    console.log(event)
  },
  confirm(e) {
    console.log(e)
    let date = this.timestampToTime(e.detail)
    this.setData({
      date: e.detail,
      show: false,
      page:1,
      list:[]
    });
    this.init()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
  },
  onShareAppMessage: function (res) {
     console.log('shuaxin')
     
  },
  timestampToTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    return Y + M
  },


  init() {
    let date = this.timestampToTime(this.data.date)
    let params = {
      uid: wx.getStorageSync('userDetails').uid,
      date: date,
      page:this.data.page
    }
    app.ajax(app.globalData.config.consumptionLog, params).then(res => {
      console.log(res.Data)
      let arr = []
      res.Data.map(item => {
        let obj = {}
        obj.money = item.price
        obj.orderId = item.order_sn
        obj.time = item.create_time
        obj.id = item.id
        arr.push(obj)
      })
      this.setData({
        list: [...this.data.list,...arr]
      })
    })
  },
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month;
    return currentdate;
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