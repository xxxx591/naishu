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
    buyCarList: [],
    showShopBox: false,
    shopcountIndex: 0,
    shopcountPrice: 0,
    page: 1,
    pageSize: 8,
    isShow: true
  },
  // 打开购物车
  showBox() {
    this.setData({
      showShopBox: true
    })
  },
  goBuy(){
    // 查看是否授权
    let _this = this
    wx.login({
      success: res => {
        console.log('到后台换取 openId, sessionKey, unionId', res)
        app.globalData.response = res
        app.globalData.code = res.code
        app.globalData.appId = 'wxfa6b0d6185e50d3d'
        app.globalData.key = '233bd186705072825dfd785e024e0a94'
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('获取用户授权信息', res)
        let userInfo = res.authSetting
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: data => {
              console.log(data)
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.encryptedData = data.encryptedData
              app.globalData.iv = data.iv
              let params = {
                'encryptedData': data.encryptedData,
                'iv': data.iv,
                'code': app.globalData.code
              };
              app.ajax(app.globalData.config.getOpenid, params).then(result => {
                console.log(result)
                let params = {
                  openid: result.Data.openid
                }
                app.globalData.openid = result.Data.openid
                app.ajax(app.globalData.config.getUserInfo, params).then(userInfores => {
                  console.log(userInfores)
                  if (userInfores.Data.user.mobile == '') {
                    wx.setStorageSync('userinfo', data.userInfo)
                    wx.navigateTo({
                      url: '/pages/login/login',
                    })
                  } else {
                    if (userInfo['scope.userLocation']) {
                      wx.getLocation({
                        type: 'wgs84',
                        success(data) {
                          console.log('地理位置', data)
                          app.globalData.lat = data.latitude;
                          app.globalData.lng = data.longitude;
                          wx.setStorageSync('userDetails', userInfores.Data.user)
                          wx.navigateTo({
                            url: '/pages/home/confirmation/confirmation',
                          })
                        }
                      })
                    } else {
                      this.setData({
                        accShow: true,
                        showFlag: true
                      })
                    }
                  }

                })
              })

              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/init/init',
          })
        }
      }
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
    console.log(buyCarList)
    // console.log(item.currentTarget.dataset.count)
    let index = item.currentTarget.id
    let count = item.currentTarget.dataset.count;
    // count == 0 ? 0 : count--;
    if (count == 0) {
      return
    } else {
      count--
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
      if (buyCarList.length == 0) {
        buyCarList.push(item)
      } else {
        buyCarList.forEach(list => {
          console.log(list)
        })
      }
    }
    // wx.setStorageSync('shopList', this.data.buyCarList)
  },
  // 物品增加
  addtap(item) {
    // console.log(item.currentTarget.dataset.objs) 
    let buyCarList = this.data.buyCarList;
    console.log(buyCarList)
    let count = item.currentTarget.dataset.count
    let index = item.currentTarget.id
    let goodsDetails = item.currentTarget.dataset.objs
    count++;
    let deletedtodo = `shopList[${index}].count`;
    let allCount = 1;
    let allPrice = parseFloat(this.data.shopcountPrice);
    let price = parseFloat(goodsDetails.price);
    allPrice = allPrice + price;
    (this.data.shopList).map(item => {
      allCount += parseFloat(item.count)
    })
    if (buyCarList.length == 0) {
      goodsDetails.count = count
      buyCarList.push(goodsDetails)

    } else {
      let flag = 0;
      let arr = []
      buyCarList.map((val, index) => {
        arr.push(val.id)
        if (goodsDetails.id == val.id) {
          val.count = count
        }
      })
      if (arr.indexOf(goodsDetails.id) == -1) {
        goodsDetails.count = count
        buyCarList.push(goodsDetails)
      } 
    }
    this.setData({
      [deletedtodo]: count,
      shopcountIndex: allCount,
      shopcountPrice: parseFloat(allPrice).toFixed(2),
      buyCarList: buyCarList
    })
    wx.setStorageSync('shopList', buyCarList)
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
    wx.removeStorageSync('shopList')
  },
  changeIndex(e) {
    // console.log(e.currentTarget.id)
    this.getList(this.data.type, e.currentTarget.id)
    this.setData({
      leftIndex: e.currentTarget.id,
      shopList: []
    })
  },
  goDetails(e) {
    console.log(e.currentTarget.dataset.objs)
    // wx.setStorageSync('shopDetails', e.currentTarget.dataset.objs)
    wx.setStorageSync('shopList', this.data.buyCarList)
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
      let result = wx.getStorageInfoSync()
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
        
        if (result.keys.indexOf('shopList') == -1) {
          wx.setStorageSync('shopList', this.data.buyCarList)
        } else {
          let arr = wx.getStorageSync('shopList')
          let allCount = 0;
          let allPrice = 0;
          arr.map(item => {
            allCount += parseFloat(item.count)
            allPrice = allPrice + parseFloat(parseFloat(item.price * item.count).toFixed(2))
            shopList.map(jtem=>{
              if(jtem.id == item.id){
                jtem.count = item.count
              }
            })
          })
          this.setData({
            buyCarList: arr,
            shopcountIndex: allCount,
            shopcountPrice: parseFloat(allPrice).toFixed(2),
          })
        }
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