// pages/home/receiptAddress/receiptAddress.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    customItem: '全部',
    addressList: '请输入',
    userName: '',
    userPhone: '',
    userAddress: '',
    userObj: {},
    id: '',
    addressObj: {}
  },
  getUser(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  getPhone(e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  getAddress(e) {
    this.setData({
      userAddress: e.detail.value
    })
  },
  addAddress() {
    let params = {
      uid: this.data.userObj.uid,
      id: this.data.id,
      consignee: this.data.userName,
      mobile: this.data.userPhone,
      address: this.data.userAddress,
      detail: this.data.addressList
    };
    if (this.data.userName == '' || this.data.userPhone == '' || this.data.userAddress == '' || this.data.addressList == '') {
      wx.showToast({
        title: '请填写信息',
        duration: 2000
      })
      return
    } else {
      app.ajax(app.globalData.config.addAddress, params).then(res => {
        console.log(res.Data)
        let code = res.Code
        if (code == '000000') {
          wx.showToast({
            title: '保存成功',
            duration: 2000,
            success: res => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    }
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let str = ''
    e.detail.value.map(item => {
      str = str + item + ' '
    })
    this.setData({
      addressList: str
    })
  },
  // 删除地址
  delAddress(){
    let params ={
      uid:this.data.userObj.uid,
      id:this.data.id
    };
    app.ajax(app.globalData.config.delAddress, params).then(res => {
      console.log(res.Data)
      let code = res.Code
      if (code == '000000') {
        wx.showToast({
          title: '删除成功',
          duration: 2000,
          success: res => {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id > 0) {
      this.setData({
        userObj: wx.getStorageSync('userDetails'),
        id: options.id
      })
      this.init()

    } else {
      this.setData({
        userObj: wx.getStorageSync('userDetails')
      })

    }
  },
  // 初始化
  init() {
    let params = {
      uid: this.data.userObj.uid,
      id: this.data.id
    };
    app.ajax(app.globalData.config.getAddressDteails, params).then(res => {
      console.log(res)
      let data = res.Data;
      this.setData({
        addressObj: data,
        addressList: data.detail,
        userName: data.consignee,
        userPhone: data.mobile,
        userAddress: data.address
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