// pages/user/orderlist/orderlist.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    page:1,
    orderlist:[],
    scroll_height:'200'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight-44
    })
    this.init()
  },
  init(){
    let params = {
      uid: wx.getStorageSync('userDetails').uid,
      order_status:this.data.active,
      page:this.data.page
    }
    app.ajax(app.globalData.config.orderList, params).then(res=>{
      console.log(res)
      let orderlist = [...this.data.orderlist, ...res.Data.order]
      let nopaynum=0;
      let paynum=0;
      let payounum=0;
      orderlist.map(item=>{
        switch (item.order_status){
          case 1:
            nopaynum++
          break;
          case 2:
            paynum++
          break;
          case 3:
            payounum++
          break;
        }
      })
      this.setData({
        orderlist: orderlist,
        nopaynum:nopaynum,
        paynum:paynum,
        payounum:payounum
      })
    })
  },
  onChange(event) {
    this.setData({
      active:event.detail.index,
      page:0,
      orderlist:[]
    })
    this.init()
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });
  },
  orderDetails(e){
    console.log(e)
    let gid = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/user/orderDetails/orderDetails?gid='+gid,
    })
  },
  update(){
    let page  = this.data.page++
    this.setData({
      page:page 
    })
    this.init()
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