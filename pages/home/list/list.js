// pages/home/list/list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList:[
      { name:'本周特价',id:0},
      { name:'精品花束',id:1},
      { name:'单头玫瑰',id:2},
      { name:'多头玫瑰',id:3},
      { name:'百合',id:4},
      { name:'所有商品',id:5},
    ],
    leftIndex:0,
    shopList:[
      {
        imgUrl:'/assets/image/test02.png',
        title:'送长辈·真的爱你',
        price:'234',
        count:0
      },
      {
        imgUrl:'/assets/image/test02.png',
        title:'送长辈·真的爱你233',
        price:'123',
        count:0
      },
      {
        imgUrl:'/assets/image/test02.png',
        title:'送长辈·真的爱你2123',
        price:'112',
        count:0
      },
      {
        imgUrl:'/assets/image/test02.png',
        title:'送长辈·真的爱你112',
        price:'332',
        count:0
      },
    ],
    showShopBox:false,
    shopcountIndex:0,
    shopcountPrice:0
  },
  // 打开购物车
  showBox(){
    this.setData({
      showShopBox: true
    })
  },
  // 点击空白关闭购物车
  onClose(){
    this.setData({
      showShopBox: false
    })
  },
  // 物品减少
  subtracttap(item){
    // console.log(item.currentTarget.dataset.count)
    let index = item.currentTarget.id
    let count = item.currentTarget.dataset.count
    count ==0? 0:count--;
    let deletedtodo = `shopList[${index}].count`;
    let allCount = this.data.shopcountIndex;
    allCount==0?0:allCount--;
    let allPrice= this.data.shopcountPrice;
    let price = parseInt(item.currentTarget.dataset.objs.price);
    allPrice = allPrice - price;
    this.setData({
      [deletedtodo]:count,
      shopcountIndex: allCount,
      shopcountPrice: allPrice
    })
    wx.setStorageSync('shopDetails', this.data.shopList)
  },
  // 物品增加
  addtap(item){
    // console.log(item.currentTarget.dataset.objs)
    let count = item.currentTarget.dataset.count
    let index = item.currentTarget.id
    count ++;
    let deletedtodo = `shopList[${index}].count`;
    let allCount = 1;
    let allPrice = this.data.shopcountPrice;
    let price = parseInt(item.currentTarget.dataset.objs.price);
    allPrice = allPrice+price;
    (this.data.shopList).map(item=>{
      allCount += parseInt(item.count)
    })
    this.setData({
      [deletedtodo]: count,
      shopcountIndex: allCount,
      shopcountPrice: allPrice
    })
    wx.setStorageSync('shopDetails', this.data.shopList)
  },
  // 清空购物车
  clearShopList(){
    let arr = this.data.shopList
    arr.map(item=>{
      item.count = 0
    })
    this.setData({
      shopList:arr,
      showShopBox: false
    })
  },
  changeIndex(e){
    // console.log(e.currentTarget.id)
    this.setData({
      leftIndex: e.currentTarget.id
    })
  },
  goDetails(e){
    console.log(e.currentTarget.dataset.objs)
    wx.setStorageSync('shopDetails', e.currentTarget.dataset.objs)
    wx.setStorageSync('shopList', this.data.shopList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
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