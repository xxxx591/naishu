// pages/home/list/list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList: [],
    leftIndex: 0,
    shopList: [],
    buyCarList:[],
    showShopBox: false,
    shopcountIndex: 0,
    shopcountPrice: 0,
    page: 1,
    pageSize: 8,
    isShow:true
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
    let count = item.currentTarget.dataset.count;
    count == 0 ? 0 : count--;
    let deletedtodo = `shopList[${index}].count`;
    let allCount = this.data.shopcountIndex;
    allCount == 0 ? 0 : allCount--;
    let allPrice = parseFloat(this.data.shopcountPrice);
    let price = parseFloat(item.currentTarget.dataset.objs.price);
    allPrice = allPrice - price;
    this.setData({
      [deletedtodo]: count,
      shopcountIndex: allCount,
      shopcountPrice: parseFloat(allPrice).toFixed(2)
    })
    wx.setStorageSync('shopList', this.data.shopList)
  },
  // 物品增加
  addtap(item) {
    // console.log(item.currentTarget.dataset.objs)
    debugger
    let count = item.currentTarget.dataset.count
    let index = item.currentTarget.id
    count++;
    let deletedtodo = `shopList[${index}].count`;
    let allCount = 1;
    let allPrice = parseFloat(this.data.shopcountPrice);
    let price = parseFloat(item.currentTarget.dataset.objs.price);
    allPrice = allPrice + price;
    (this.data.shopList).map(item => {
      allCount += parseFloat(item.count)
    })
    this.setData({
      [deletedtodo]: count,
      shopcountIndex: allCount,
      shopcountPrice: parseFloat(allPrice).toFixed(2)
    })
    wx.setStorageSync('shopList', this.data.shopList)
  },
  // 清空购物车
  clearShopList() {
    let arr = this.data.shopList
    arr.map(item => {
      item.count = 0
    })
    this.setData({
      shopList: arr,
      showShopBox: false,
      shopcountIndex: 0,
      shopcountPrice: 0
    })
    wx.removeStorage('shopList')
  },
  changeIndex(e) {
    // console.log(e.currentTarget.id)
    this.getList(this.data.type, e.currentTarget.id)
    this.setData({
      leftIndex: e.currentTarget.id
    })
  },
  goDetails(e) {
    console.log(e.currentTarget.dataset.objs)
    wx.setStorageSync('shopDetails', e.currentTarget.dataset.objs)
    wx.setStorageSync('shopList', this.data.shopList)
    wx.navigateTo({
      url: '/pages/home/details/details?gid=' + e.currentTarget.dataset.objs.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setStorageSync('type', options.type)
    this.setData({
      type: options.type
    })
    console.log(options.type)
    if (options.type == 1) {
      this.getList(1); 
    } else {
      this.getList(2)
      this.setData({
        isShow: false
      })
    }
  },
  //  商品列表
  getList(type, leftType = '') {
    let id = type == 1 ? '1' : '2'
    let params = {
      store_id: wx.getStorageSync('storeId'),
      goods_type: id,
      goods_type_id: leftType,
      page: this.data.page
    }
    app.ajax(app.globalData.config.getShopList, params).then(res => {
      console.log('商品列表', res.Data)
      if (res.Code == "000000") {
        let data = res.Data;
        let leftList = []
        let shopList = []
        data.goods.map(item => {
          let obj = {}
          obj.imgUrl = item.picture_path;
          obj.title = item.goods_name;
          obj.id = item.id;
          obj.count = 0;
          obj.price = item.price;
          shopList.push(obj)
        })
        data.type.map(item => {
          let obj = {};
          obj.name = item.type_name;
          obj.id = item.id
          leftList.push(obj)
        })
        this.setData({
          leftList: leftList,
          shopList: shopList
        })
      } else {
        wx.showToast({
          title: res.Msg,
          icon: 'none',
          duration: 2000
        })
      }
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