//app.js
import config from './utils/config.js'
App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  ajax: function(api, data, method, title = "") {
    let _this = this
    wx.showLoading({
      title: title,
      mask: true
    });
    return new Promise((resolve, reject) => wx.request({
      url: _this.globalData.serveUrl + api,
      method: method || 'POST',
      data: data,
      header: _this.globalData.header, // 设置请求的 header
      success(e) {
        resolve(e);
        wx.hideLoading();
        try {
          if (res.data.code == 200) {

          } else {
            wx.showToast({
              title: e.data.msg,
              icon: 'none'
            })
          }
        } catch (e) {
          console.log(e)
        }
      },
      fail(e) {
        wx.showLoading({
          title: '网络错误'
        })
      }
    }))
  },
  globalData: {
    userInfo: null,
    header: {
      header: {
        'Cookie': '',
        "content-type": "application/json"
      }
    },
    config: config,
    token: '',
    serveUrl: "http://192.168.0.102:8099",
  }
})