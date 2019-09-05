// pages/home/details/details.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
import Dialog from '../../../components/dist/dialog/dialog.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    buyCarList: [],
    showShopBox: false,
    showWeixinBox:false,
    shopcountIndex: 0,
    shopcountPrice: 0,
    shopDetails: {},
    type: '',
    id:0,
    shopNum:0,
    shopNumFlag:true,
    fuwenben:''
  },
  showweixin(){
    Dialog.alert({
      title: '联系方式',
      message: `手机号码：18601123560\n微信账号：turbowu`,
      messageAlign:'left'
    }).then(() => {
      // on close
    }); 
  },
  goBuy() {
    if (this.data.shopcountIndex == 0) {
      return
    }
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
  /**
   * 生命周期函数--监听页面加载
   */
  init(){
    let id = '';
    if(wx.getStorageSync('type')==1){
      id=1
    }else{
      id=2
    }
    let params={
      id:id
    }
    app.ajax(app.globalData.config.getOther,params).then(res=>{
      console.log(res.Data)
      let article1 = res.Data
      WxParse.wxParse('article1', 'html', article1, this, 5);
       
    })
  },
  onLoad: function(options) {
    this.init()
    console.log(options)
    let type = wx.getStorageSync('type')
    let arr = []
    let shopDetail = wx.getStorageSync('shopDetails')
    if (type == 1) {
      arr = wx.getStorageSync('shopList')
    } else {
      arr = wx.getStorageSync('shopList2')
    }
    let shopcountIndex = 0;
    let shopcountPrice = 0;
    let shopNum = 0;
    let shopNumFlag = true;
    arr.map(item => {
      console.log(item)
      if (shopDetail.id == item.id){
        shopNum = item.count
        if(item.count != 0){
        shopNumFlag = false
        }
      }
      shopcountIndex += parseInt(item.count);
      shopcountPrice = parseFloat(shopcountPrice).toFixed(2) * 1 + parseFloat(item.count * item.price).toFixed(2) * 1
    })

    this.setData({
      shopList: arr,
      buyCarList: arr,
      shopcountIndex: shopcountIndex,
      shopcountPrice: parseFloat(shopcountPrice).toFixed(2),
      type: type,
      id: options.gid,
      shopNum:shopNum,
      shopNumFlag: shopNumFlag
    })
    console.log(options.gid)
    this.getDetails(options.gid)
  },
  // 商品详情
  getDetails(id) {
    let params = {
      id: id
    }
    app.ajax(app.globalData.config.getShopDetails, params).then(res => {
      console.log(res)
      let article = res.Data.detail
      WxParse.wxParse('article', 'html', article, this, 5);
      let shopDetails = {}
      shopDetails.title = res.Data.goods_name;
      shopDetails.id = this.data.id
      shopDetails.count = this.data.shopNum;
      shopDetails.price = res.Data.price;
      // shopDetails.imgUrl = 
      // wx.setStorageSync('shopDetails', shopDetails)
      this.setData({
        shopDetails: res.Data
      })
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
    let goodsDetails = item.currentTarget.dataset.objs
    let buyCarList = this.data.buyCarList;

    // 不同部位修改参数
    let shopList = this.data.shopList
    let index = '';
    // i为对象，o为下标
    shopList.map((i, o) => {
      if (i.id == goodsDetails.id) {
        index = o
      }
    })

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
      let price = parseFloat(parseFloat(item.currentTarget.dataset.objs.price).toFixed(2));
      allPrice = allPrice - price;


      buyCarList.map((val, index) => {
        if (goodsDetails.id == val.id) {
          val.count = count
        }
      })
      this.setData({
        buyCarList: buyCarList,
        [deletedtodo]: count,
        shopcountIndex: allCount,
        shopcountPrice: parseFloat(allPrice).toFixed(2)
      })
      if (this.data.type == 1) {
        wx.setStorageSync('shopList', this.data.buyCarList)
      } else {
        wx.setStorageSync('shopList2', this.data.buyCarList)
      }
    }
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
    if (this.data.type == 1) {
      wx.setStorageSync('shopList', this.data.buyCarList)
    } else {
      wx.setStorageSync('shopList2', this.data.buyCarList)
    }
  },
  addDetails() {
    let items = wx.getStorageSync('shopDetails')
    let buyCarList = this.data.buyCarList;
    console.log(buyCarList)
    let count = items.count
    if(count == 0){
      this.setData({
        shopNumFlag:false
      })
    }
    let index = ''
    if (buyCarList.length == 0) {
      index = 0
    } else {
      buyCarList.map((i, o) => {
        if (i.id == items.id) {
          index = o
        }
      })
    }
    let goodsDetails = items
    count++;
    items.count = count;
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
      buyCarList: buyCarList,
      shopNum: allCount
    })
    if (this.data.type == 1) {
      wx.setStorageSync('shopList', this.data.buyCarList)
      wx.setStorageSync('shopDetails', items)
    } else {
      wx.setStorageSync('shopList2', this.data.buyCarList)
      wx.setStorageSync('shopDetails', items)
    }
  },
  subtractDetails(){
    let items = wx.getStorageSync('shopDetails')
    let buyCarList = this.data.buyCarList;
    console.log(buyCarList)
    let count = items.count
    let index = ''
    if (buyCarList.length == 0) {
      index = 0
    } else {
      buyCarList.map((i, o) => {
        if (i.id == items.id) {
          index = o
        }
      })
    }
    let goodsDetails = items
    count==0?'':count--;
    items.count = count;
    if (count == 0) {
      this.setData({
        shopNumFlag: true
      })
    }
    let deletedtodo = `shopList[${index}].count`;
    let allCount = this.data.shopcountIndex;
    allCount--
    let allPrice = parseFloat(this.data.shopcountPrice);
    let price = parseFloat(goodsDetails.price);
    allPrice = allPrice - price;
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
      buyCarList: buyCarList,
      shopNum: count
    })
    if (this.data.type == 1) {
      wx.setStorageSync('shopList', this.data.buyCarList)
      wx.setStorageSync('shopDetails', items)
    } else {
      wx.setStorageSync('shopList2', this.data.buyCarList)
      wx.setStorageSync('shopDetails', items)
    }
  },
  // 清空购物车
  clearShopList() {
    let arr = this.data.shopList
    arr.map(item => {
      item.count = 0
    })
    this.setData({
      shopList: arr,
      buyCarList: [],
      showShopBox: false,
      shopcountIndex: 0,
      shopcountPrice: 0
    })
    if (this.data.type == 1) {
      wx.setStorageSync('shopList', [])
    } else {
      wx.setStorageSync('shopList2', [])
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