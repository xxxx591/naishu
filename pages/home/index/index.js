// pages/home/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accShow: true,
    photoList: [],
    isXianhua: false,
    isMeishi: false,
    storeName: '',
    storeId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.removeStorageSync('youhuiquan')
    this.init()
  },
  // 跳转详情
  init() {
    let result = wx.getStorageInfoSync()
    let arr = result.keys
    console.log(result.keys)
    let id = '';
    let index = 0;
    if (arr.indexOf("storeId") == -1) {
      index = arr.indexOf("storeId")
    } else {
      id = wx.getStorageSync('storeId')
    }
    let params = {
      lng: wx.getStorageSync('lng'),
      lat: wx.getStorageSync('lat'),
      store_id: id
    }
    app.ajax(app.globalData.config.getShopAddress, params).then(res => {
      console.log(res)
      let data = res.Data;
      if (arr.indexOf('storeId') == -1) {
        wx.setStorageSync('storeId', data.store_id)
        wx.setStorageSync('storeName', data.store_name)
      } else {
        if (data.store_id == wx.getStorageSync('storeId')) {
          console.log('不用清空购物车')
        } else {
          console.log('清空购物车')
          wx.removeStorageSync('shopList2')
          wx.removeStorageSync('shopList')
        }
      }
      this.setData({
        photoList: data.banner,
        isXianhua: data.in_xianhua == 1 ? true : false,
        isMeishi: data.in_meishi == 1 ? true : false,
        storeId: data.store_id,
        storeName: data.store_name
      })
    })
  },
  // 选择店铺
  selectShop() {
    wx.navigateTo({
      url: '/pages/home/shopList/shopList',
    })
  },
  goDetails(e) {
    console.log(e)
    let goodsType = e.currentTarget.dataset.item.goods_type
    wx.setStorageSync('type', goodsType)
    if (goodsType == 1) {
      wx.setStorageSync('shopList', [])
    } else {
      wx.setStorageSync('shopList2', [])
    }
    if (e.currentTarget.dataset.item.type == 2) {
      wx.navigateTo({
        url: '/pages/home/details/details?gid=' + e.currentTarget.dataset.item.goods_id,
      })
    }
  },
  // 跳转列表
  goodsList(e) {
    let type = e.currentTarget.id
    switch (type) {
      case "1":
        if (this.data.isXianhua) {
          wx.navigateTo({
            url: '/pages/home/list/list?type=1',
          })
        } else {
          wx.showToast({
            title: '该店铺无此类商品',
            icon: 'none',
            duration: 2000
          })
        }
        break;
      case "2":
        if (this.data.isMeishi) {
          wx.navigateTo({
            url: '/pages/home/list/list?type=2',
          })
        } else {
          wx.showToast({
            title: '该店铺无此类商品',
            icon: 'none',
            duration: 2000
          })
        }
        break;
    }
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
    wx.removeStorageSync('youhuiquan')
    wx.removeStorageSync('selectTime')

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