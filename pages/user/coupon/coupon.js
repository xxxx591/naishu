// pages/home/coupon/coupon.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [

    ],
    userObjs: {},
    type: 0,
    quanList: [],
    selectFlag: false,
    meishiArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.type)
   
  },
  // 获取券
  init() {
    let params = {
      uid: this.data.userObjs.uid,
    };

    app.ajax(app.globalData.config.getUserCoupon, params).then(res => {
      let arr = []
      let arrList = res.Data;
      arrList.map(item => {
        let obj = {};
        obj.title = item.coupon_name;
        obj.id = item.id;
        obj.type = item.coupon_type;
        obj.endTime = item.expire_time;
        obj.falg = false;
        arr.push(obj)
      })
      this.setData({
        couponList: arr
      })
    })
  },
  // 选择优惠券
  selectQuan(e) {
    let meishiArr = this.data.quanList
    let couponList = this.data.couponList
    let obj = e.currentTarget.dataset.objs;
    let num = '有了'
    if (this.data.type == 1) {
      let arr = []
      arr.push(obj)
      wx.setStorageSync('youhuiquan', arr)
      wx.navigateBack({
        delta: 1
      })
    } else {
      if (this.data.selectFlag) {
        if (meishiArr.length == 0) {
          obj.falg = true;
          meishiArr.push(obj)
        } else {
          meishiArr.map(item => {
            if (item.id == obj.id) {
              item.falg = !item.falg
            } else {
              num = '没有'
            }
          })
          if (num == '没有') {
            obj.falg = true
            meishiArr.push(obj)
          }
        }
        couponList.map(item => {
          if (item.id == obj.id) {
            item.falg = !item.falg
          }
        })
      }
      this.setData({
        quanList: meishiArr,
        couponList: couponList
      })
      wx.setStorageSync('youhuiquan', meishiArr)
    }
  },
  // 删除优惠券
  removequan() {
    wx.removeStorageSync('youhuiquan')
    wx.navigateBack({
      delta: 1
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
    this.setData({
      userObjs: wx.getStorageSync('userDetails')
    })
    this.init()
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