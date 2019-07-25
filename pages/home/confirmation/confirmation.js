// pages/home/confirmation/confirmation.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    shopcountPrice: 0,
    show: false,
    showOther: false,
    payType: 1,
    radio: '1',
    userPhone: '',
    password: '',
    type: '',
    otherDetails: '',
    storeName: '',
    leftIndex: 1,
    clickFlag: true,
    tipFlag: true,
    userObj: {},
    shopPhone: '15575182556',
    shopAddress: '北京市丰台区宋家庄苇子坑149号庄子工厂店北楼',
    userPhone: '请添加...',
    userAddress: '  ',
    // 优惠券内容
    daijinquan:'请选择',
    quanobj:{}
  },
  // 跳优惠券
  goYouhuiquan(){
    wx.navigateTo({
      url: '/pages/home/coupon/coupon',
    })
  },
  // 跳转至收货地址管理
  selectAddress() {
    wx.navigateTo({
      url: '/pages/home/userAddressList/userAddressList',
    })
  },
  // 切换配送模式
  checkPayType(e) {
    if (this.data.clickFlag) {
      this.setData({
        leftIndex: e.currentTarget.id,
      })
    } else {
      return
    }
  },
  // 自己支付
  paySelf() {
    this.setData({
      show: true
    })
  },
  payOther() {
    this.setData({
      showOther: true
    })
  },
  changeUserPhone(value) {
    console.log(value)
    this.setData({
      userPhone: value.detail
    })
  },
  changeUserPSW(value) {
    console.log(value)
    this.setData({
      password: value.detail
    })
  },

  cancelPayOther() {
    this.setData({
      showOther: false
    })
  },
  onCloseOther() {
    this.setData({
      showOther: false
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  cancelPaySelf() {
    this.setData({
      show: false
    })
  },
  onChange(event) {
    console.log(event)
    this.setData({
      radio: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  getPrice(){
    let arr = [];
    this.data.shopList.map(item=>{
      let obj = {};
      obj.id = item.id;
      obj.num = item.count;
      arr.push(obj)
    })
    let params={
      uid:this.data.userObj.uid,
      goods_json:arr,
      goods_type:this.data.type,
      user_coupon_ids:this.data.quanobj.id
    };
    app.ajax(app.globalData.config.getDiscountPrice,params).then(res=>{
      console.log(res)
    })
  },
  // 获取默认地址
  getAddressDefault() {
    let params = {
      uid: this.data.userObj.uid
    };
    app.ajax(app.globalData.config.getAddressDefault, params).then(res => {
      console.log(res)
      if (res.Data == '') {

      } else {
        this.setData({
          userPhone: res.Data.consignee + ' ' + res.Data.mobile,
          userAddress: res.Data.detail + ' ' + res.Data.address
        })
      }
    })
  },
  confimOrder() {
    let params = {
      uid: this.data.userObj.uid,
      store_id: wx.getStorageSync('storeId'),
      goods_json: [],
      goods_type: this.data.type,
      lng: app.globalData.lng,
      lat: app.globalData.lat
    };
    let shoplistArr = this.data.shopList
    shoplistArr.map((i, o) => {
      let obj = {}
      obj.id = i.id
      obj.num = i.count
      params.goods_json.push(obj)
    })
    params = JSON.stringify(params)
    console.log(params)

    app.ajax(app.globalData.config.getConfimOrder, params).then(res => {
      console.log('确认订单详情', res.Data)
      // leftIndex: 1,
      //   clickFlag: true,
      if (res.Data.is_waimai == 1) {
        this.setData({
          shopPhone: res.Data.store_mobile,
          shopAddress: res.Data.store_address,
          clickFlag: true,
          leftIndex: res.Data.mo_select

        })
      }
    })
  },
  init() {
    let params = {
      id: this.data.type
    }
    app.ajax(app.globalData.config.getOther, params).then(res => {
      console.log(res)
      let article = res.Data
      WxParse.wxParse('article', 'html', article, this, 5);
      this.setData({
        otherDetails: res.Data
      })
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

    let arr = wx.getStorageSync('shopList')
    let userObj = wx.getStorageSync('userDetails')
    let type = wx.getStorageSync('type')
    let quanobj = wx.getStorageSync('youhuiquan')
    let shopcountPrice = 0;
    arr.map(item => {
      shopcountPrice += parseFloat(parseFloat(item.count * item.price).toFixed(2))
    })

    if (type == 1) {
      arr = wx.getStorageSync('shopList')
      // 鲜花模式

    } else {
      arr = wx.getStorageSync('shopList2')

    }
    this.setData({
      shopList: arr,
      shopcountPrice: shopcountPrice,
      type: wx.getStorageSync('type'),
      storeName: wx.getStorageSync('storeName'),
      userObj: userObj,
      quanobj: quanobj
    })
    this.init();
    this.confimOrder();
    this.getAddressDefault()
    if (typeof (this.data.quanobj) == 'object') {
      this.getPrice()
    }
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