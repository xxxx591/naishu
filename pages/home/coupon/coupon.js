// pages/home/coupon/coupon.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList:[
       
    ],
    userObjs:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userObjs: wx.getStorageSync('userDetails')
    })
    this.init()
  },
  // 获取券
  init(){
    let params = {
      uid:this.data.userObjs.uid
    };
    app.ajax(app.globalData.config.getUserCoupon,params).then(res=>{
      let arr = []
      let arrList = res.Data;
      arrList.map(item=>{
        let obj = {};
        obj.title = item.coupon_name;
        obj.id = item.id;
        obj.type = item.coupon_type;
        obj.endTime = item.expire_time
        arr.push(obj)
      })
      this.setData({
        couponList:arr
      })
    })
  },
  // 选择优惠券
  selectQuan(e){
    wx.setStorageSync('youhuiquan', e.currentTarget.dataset.objs)
    wx.navigateBack({
      delta:1
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