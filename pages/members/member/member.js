// pages/merber/merber.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: {},
    goodList: ''
  },
  handleGoPay() {
    wx.navigateTo({
      url: '../consumptionHistory/consumptionHistory'
    })
  },
  handleGoPrivilege() {
    wx.navigateTo({
      url: '../privilege/privilege'
    })
  },
  handleGoLeaderBoard() {
    wx.navigateTo({
      url: '../leaderBoard/leaderBoard'
    })
  },
  handleGoInvite() {
    wx.navigateTo({
      url: '../invite/invite'
    })
  },
  handleGoFans() {
    wx.navigateTo({
      url: '../myFans/myFans'
    })
  },
  handleGoProductDetails(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../productDetails/productDetails?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
                  } else {
                    if (userInfo['scope.userLocation']) {
                      wx.getLocation({
                        type: 'wgs84',
                        success(data) {
                          console.log('地理位置', data)
                          wx.setStorageSync('lat', data.latitude)
                          wx.setStorageSync('lng', data.longitude)
                          wx.setStorageSync('userDetails', userInfores.Data.user)
                          wx.removeStorageSync('storeName')
                          wx.removeStorageSync('storeId')

                        }
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
          this.init()
        } else {
          wx.navigateTo({
            url: '/pages/init/init',
          })
        }
      }
    })
  },
  init() {
    const objData = wx.getStorageSync('userDetails')
    const storeId = wx.getStorageSync('storeId')
    const query = {
      'uid': objData.uid,
      'store_id': storeId
    }
    console.log(app.globalData.config.memberIndex)
    // 获取list列表数据
    app.ajax(app.globalData.config.memberIndex, query, 'POST', '数据加载中...')
      .then((res) => {
        console.log('会员主页res', res)
        this.setData({
          userData: res.Data.user_info,
          goodList: res.Data.goods
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