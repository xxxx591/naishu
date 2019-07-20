// pages/home/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    showShopBox: false,
    shopcountIndex: 0,
    shopcountPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let arr = wx.getStorageSync('shopList')
    let obj = wx.getStorageSync('shopDetails')
    let shopcountIndex = 0;
    let shopcountPrice = 0;
    arr.map(item => {
      shopcountIndex += parseInt(item.count);
      shopcountPrice += parseInt(item.count * item.price)
    })

    this.setData({
      shopList: arr,
      shopcountIndex: shopcountIndex,
      shopcountPrice: shopcountPrice
    })
  },
  // 打开购物车
  showBox() {
    this.setData({
      showShopBox: true
    })
  },
  // 点击空白关闭购物车
  onClose() {
    this.setData({
      showShopBox: false
    })
  },
  // 物品减少
  subtracttap(item) {
    // console.log(item.currentTarget.dataset.count)
    let index = item.currentTarget.id
    let count = item.currentTarget.dataset.count
    count == 0 ? 0 : count--;
    let deletedtodo = `shopList[${index}].count`;
    let allCount = this.data.shopcountIndex;
    allCount == 0 ? 0 : allCount--;
    let allPrice = this.data.shopcountPrice;
    let price = parseInt(item.currentTarget.dataset.objs.price);
    allPrice = allPrice - price;
    this.setData({
      [deletedtodo]: count,
      shopcountIndex: allCount,
      shopcountPrice: allPrice
    })
    wx.setStorageSync('shopList', this.data.shopList)
  },
  // 物品增加
  addtap(item) {
    // console.log(item.currentTarget.dataset.objs)
    let count = item.currentTarget.dataset.count
    let index = item.currentTarget.id
    count++;
    let deletedtodo = `shopList[${index}].count`;
    let allCount = 1;
    let allPrice = this.data.shopcountPrice;
    let price = parseInt(item.currentTarget.dataset.objs.price);
    allPrice = allPrice + price;
    (this.data.shopList).map(item => {
      allCount += parseInt(item.count)
    })
    this.setData({
      [deletedtodo]: count,
      shopcountIndex: allCount,
      shopcountPrice: allPrice
    })
    wx.setStorageSync('shopList', this.data.shopList)
  },
  addDetails() {
    let arr = wx.getStorageSync('shopList')
    let obj = wx.getStorageSync('shopDetails')
    let allCount = this.data.shopcountIndex;
    let allPrice = this.data.shopcountPrice;
    arr.map(item => {
      if (item.id == obj.id) {
        allCount++;
        allPrice += parseInt(item.price);
        item.count++;
      }
    })
    wx.setStorageSync('shopList', arr)
    this.setData({
      shopList: arr,
      shopcountIndex: allCount,
      shopcountPrice: allPrice
    })

  },
  // 清空购物车
  clearShopList() {
    let arr = this.data.shopList
    arr.map(item => {
      item.count = 0
    })
    this.setData({
      shopList: arr,
      showShopBox: false
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