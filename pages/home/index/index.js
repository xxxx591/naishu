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
    let params = {
      lng: app.globalData.lng,
      lat: app.globalData.lat
    }
    app.ajax(app.globalData.config.getShopAddress, params).then(res => {
      console.log(res)
      let data = res.Data;
      wx.setStorageSync('storeId', data.store_id)
      wx.setStorageSync('storeName', data.store_name)
      this.setData({
        photoList: data.banner,
        isXianhua: data.in_xianhua == 1 ? true : false,
        isMeishi: data.in_meishi == 1 ? true : false,
        storeId:data.store_id,
        storeName:data.store_name
      })
    })
  },
  // 跳转详情
  goDetails(e){
    console.log(e)
    if (e.currentTarget.dataset.item.type==2){
      wx.navigateTo({
        url: '/pages/home/details/details?gid=' + e.currentTarget.dataset.item.goods_id,
      })
    }
  },
  // 跳转列表
  goodsList(e){
    let type = e.currentTarget.id
    switch(type){
      case "1":
        if(this.data.isXianhua){
          wx.navigateTo({
            url: '/pages/home/list/list?type=1',
          })
        }else{
          wx.showToast({
            title: '该店铺无此类商品',
            icon:'none',
            duration:2000
          })
        }
      break;
      case "2":
        if(this.data.isMeishi){
          wx.navigateTo({
            url: '/pages/home/list/list?type=2',
          })
        }else{
          wx.showToast({
            title: '该店铺无此类商品',
            icon:'none',
            duration:2000
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