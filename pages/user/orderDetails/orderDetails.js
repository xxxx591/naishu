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
    userPhone001: '',
    password001: '',
    type: '',
    otherDetails: '',
    storeName: '',
    leftIndex: 2,
    clickFlag: true,
    tipFlag: true,
    userObj: {},
    shopPhone: '15575182556',
    shopAddress: '北京市丰台区宋家庄苇子坑149号庄子工厂店北楼',
    userPhone: '请添加...',
    userAddress: '  ',
    // 优惠券内容
    daijinquan: '请选择',
    quanobj: {
      type: 0
    },
    // 会员抵扣
    vipContent: '无',
    // 余额
    balance: 0,
    yuEBalanceFlag: true,
    // 是否是会员
    notVIp: true
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
      userPhone001: value.detail
    })
  },
  changeUserPSW(value) {
    console.log(value)
    this.setData({
      password001: value.detail
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
    if (this.data.balance < this.data.shopcountPrice) {
      wx.showToast({
        title: '余额不足',
        icon: 'none',
        duration: 2000,
      })
      this.setData({
        yuEBalanceFlag: false
      })
    } else if (this.data.quanobj.type == 1) {
      wx.showToast({
        title: '使用折扣券无法使用余额',
        icon: 'none',
        duration: 2000,
      })
      this.setData({
        yuEBalanceFlag: false
      })
    } else {
      this.setData({
        radio: event.detail
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options) 
    let userObj = wx.getStorageSync('userDetails')
    let gid = options.gid
    this.setData({
      userObj:userObj,
      gid:gid
    })
    this.init()
  },
  // 立即支付
  payNow() {
    let flag = true;
    let params = {};  
    params.uid = this.data.userObj.uid; //用户ID
    params.id = this.data.gid //订单id 
    params.pay_type = this.data.radio //支付方式 
    params.replace_user_mobile = this.data.userPhone001 //代付人手机号码
    params.replace_pay_password = this.data.password001 //代付密码
    if (flag) {
      flag = false
      app.ajax(app.globalData.config.orderPay, params).then(res => {
        console.log(res)
        let data = res.Data
        if (this.data.radio == 2) {
          if (res.Code == '000000') {
            flag = false
            if (this.data.type == 1) {
              wx.removeStorageSync('shopList')
            } else {
              wx.removeStorageSync('shopList2')
            }
            wx.showToast({
              title: '支付成功',
              duration: 2000,
              success: res => {

                setTimeout(_ => {
                  wx.switchTab({
                    url: '/pages/home/index/index',
                  })

                }, 2000)
              }
            })
          } else {
            setTimeout(_ => {
              flag = true
            }, 500)
          }
        } else {
          if (res.Code == '000000') {
            flag = true
            wx.requestPayment({
              timeStamp: data.timeStamp + '',
              nonceStr: data.nonceStr,
              package: data.package,
              signType: 'MD5',
              paySign: data.paySign,
              success(res) {
                console.log('支付成功的回调', res)
                wx.removeStorageSync('shopList')
                wx.removeStorageSync('shopList2')
                wx.showToast({
                  title: '支付成功',
                  duration: 2000,
                  success: res => {
                    setTimeout(_ => {
                      wx.switchTab({
                        url: '/pages/home/index/index',
                      })
                    }, 2000)
                  }
                })
              },
              fail(res) { }
            })
          } else {
            setTimeout(_ => {
              flag = true
            }, 500)
          }
        }
      })
    }
  },
  payNowOther() {
    let flag = true;
    let params = {};
    let arr = [];
    let price = 0;
    let quanarr = [];
    const resule = wx.getStorageInfoSync()
    console.log(resule.youhuiquan)
    if (resule.youhuiquan == undefined) {

    } else {

      this.data.quanobj.map(item => {
        quanarr.push(item.id)
      })
    }
    this.data.shopList.map(item => {
      let obj = {};
      obj.id = item.id;
      obj.num = item.count;
      price += parseFloat(parseFloat(item.count * item.price).toFixed(2))
      arr.push(obj)
    })
    params.uid = this.data.userObj.uid; //用户ID
    params.store_id = wx.getStorageSync('storeId') //店铺id
    params.goods_json = arr //商品id和数量
    params.goods_type = this.data.type //商品类型
    params.delivery_type = this.data.leftIndex //配送方式
    params.pay_type = "3" //支付方式
    params.order_price = parseFloat(price).toFixed(2) //原始金额
    params.pay_price = this.data.shopcountPrice //支付金额
    params.coupon_price = parseFloat(price - this.data.shopcountPrice).toFixed(2) // 优惠金额
    params.user_coupon_ids = quanarr.join(',') //优惠券合集
    params.replace_user_mobile = this.data.userPhone001 //代付人手机号码
    params.replace_pay_password = this.data.password001 //代付密码
    if (flag) {
      flag = false
      app.ajax(app.globalData.config.createOrder, params).then(res => {
        console.log(res)
        if (res.Code != '000000') {
          wx.showToast({
            title: res.Msg,
            duration: 2000,
            icon: 'none'
          })
        }
      })
    }
  },
  getPrice() {
    let arr = [];
    let quanarr = [];
    this.data.shopList.map(item => {
      let obj = {};
      obj.id = item.id;
      obj.num = item.count;
      arr.push(obj)
    })
    let params = {
      uid: this.data.userObj.uid,
      goods_json: arr,
      goods_type: this.data.type,
      user_coupon_ids: []
    };
    this.data.quanobj.map(item => {
      quanarr.push(item.id)
    })
    params.user_coupon_ids = quanarr.join(',')
    app.ajax(app.globalData.config.getDiscountPrice, params).then(res => {
      console.log(res)
      let price = this.data.shopcountPrice - parseFloat(res.Data.discount_price)
      this.setData({
        shopcountPrice: parseFloat(price).toFixed(2),
        daijinquan: this.data.quanobj[0].title,
        vipContent: '无'
      })
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
      } else {
        this.setData({
          shopPhone: res.Data.store_mobile,
          shopAddress: res.Data.store_address,
          clickFlag: false,
          leftIndex: res.Data.mo_select
        })
      }
    })
  },
  init() {
    let params = {
      id: this.data.gid,
      uid:this.data.userObj.uid
    }
    app.ajax(app.globalData.config.goodsDetails, params).then(res => {
      console.log(res)
      this.setData({
        shopList:res.Data.goods,   //商品列表
        leftIndex: res.Data.delivery_type,  //支付状态
        storeName: res.Data.store_name, //店铺名称
        member_price: res.Data.member_price, //总金额
        coupon_price: res.Data.coupon_price, //优惠金额
        order_price: res.Data.order_price, //会员优惠金额
        sn: res.Data.order_sn,  //订单号
        create_time: res.Data.create_time,   //创建订单时间
        status: res.Data.status,  //订单状态
        shopPhone: res.Data.store_address.mobile,  // 
        shopAddress: res.Data.store_address.address,
        userName: res.Data.user_address.consignee,
        userPhone: res.Data.user_address.mobile,
        userAddress: res.Data.user_address.address,
        pay_time: res.Data.pay_time  //支付时间
      })
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