// pages/init/init.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag: true,
    accShow: false,
    yaoqing: false,
    showFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
                          wx.switchTab({
                            url: '/pages/home/index/index',
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
          _this.setData({
            accShow: true
          })
        }
      }
    })
  },
  handler: function(e) {
    if (e.detail.authSetting["scope.userLocation"]) {
      this.setData({
        showFlag: false
      })
      //返回时重新刷新首页页面
      wx.reLaunch({
        url: '/pages/init/init'
      })
    }
  },
  bindGetUserInfo: function(e) {
    let that = this
    if (that.data.flag) {
      that.setData({
        flag: false
      })
      wx.login({
        success: res => {
          console.log(res.code);
          wx.getUserInfo({
            success: function(data) {
              let params = {
                'encryptedData': data.encryptedData,
                'iv': data.iv,
                'code': res.code
              };
              console.log('点击登陆获取的数据', res)
              app.ajax(app.globalData.config.getOpenid, params).then(result => {
                console.log(result)
                let params = {
                  openid: result.Data.openid
                }
                app.globalData.openid = result.Data.openid
                app.ajax(app.globalData.config.getUserInfo, params).then(userInfores => {
                  console.log(userInfores)
                  if (userInfores.Data.user.mobile == '') {
                    wx.getUserInfo({
                      success: res => {
                        console.log(res)
                        wx.setStorageSync('userinfo', res.userInfo)
                        wx.navigateTo({
                          url: '/pages/login/login',
                        })
                      }
                    })
                  } else {
                    wx.getLocation({
                      type: 'wgs84',
                      success(res) {
                        console.log('地理位置', res)
                        app.globalData.lat = res.latitude;
                        app.globalData.lng = res.longitude;
                        wx.setStorageSync('userDetails', userInfores.Data.user)
                        wx.switchTab({
                          url: '/pages/home/index/index',
                        })
                      },
                      fail(res) {
                        wx.reLaunch({
                          url: '/pages/init/init'
                        })
                      }
                    })

                  }

                })
              })
              // wx.request({
              //   url: app.globalData.url + 'api/wechat/miniLogin',
              //   header: {
              //     "content-type": "application/x-www-form-urlencoded"
              //   }, // 设置请求的 header

              //   method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              //   success: function(res) {
              //     console.log('登陆的res', res)
              //     app.globalData.token = res.data.data.token;
              //     wx.getLocation({
              //       type: 'wgs84',
              //       success(res) {
              //         console.log('地理位置', res)
              //         const latitude = res.latitude
              //         const longitude = res.longitude
              //         wx.request({
              //           url: app.globalData.url + 'api/user/upsite',
              //           method: 'POST',
              //           data: {
              //             token: app.globalData.token,
              //             lng: longitude + '',
              //             lat: latitude + ''
              //           },
              //           success: res => {
              //             console.log('地理位置返回信息', res)
              //             if (res.data.error_code == 0) {
              //               if (res.data.data.mobile == '') {
              //                 wx.navigateTo({
              //                   url: '/pages/login/login',
              //                 })

              //               } else {
              //                 // 转存token
              //                 // app.globalData.token = '111';
              //                 wx.switchTab({
              //                   url: '/pages/index/index',
              //                 })

              //               }
              //             }
              //           }
              //         })
              //       },
              //       fail(res) {
              //         wx.reLaunch({
              //           url: '/pages/init/init'
              //         })
              //       }
              //     })

              //   },
              //   fail: function(err) {
              //     console.log(err);
              //   }
              // })
            }
          })
        }
      })

    } else {
      setTimeout(_ => {
        that.setData({
          flag: true
        })
      }, 1000)
    }

  },

  getuser() {
    wx.getSetting({
      success(res) {
        let lat = '';
        let lgt = '';
        console.log(res)
        if (res.authSetting["scope.userLocation"]) {
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              console.log('地理位置', res)
              app.globalData.lat = res.latitude
              app.globalData.lnt = res.longitude
              lat = res.latitude
              lgt = res.longitude

            }
          })
        }
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success(res) {
              console.log('userinfo', res)
              // wx.request({
              //   url: app.globalData.url +'api/wechat/miniLogin',
              // })
            }
          })
        }
        if (res.authSetting["scope.userLocation"] && res.authSetting["scope.userInfo"]) {
          console.log('跳转！')
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
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
    let _this = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称

        } else {
          _this.setData({
            accShow: true
          })
        }
      }
    })
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