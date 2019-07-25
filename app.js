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
        // console.log('初始化获取用户信息',res)
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
      data,
      header: _this.globalData.header, // 设置请求的 header
      success(e) {
        wx.hideLoading();
        resolve(e.data)
      },
      fail(e) {
        wx.showLoading({
          title: '网络错误'
        })
      }
    }))
  },
  setWatcher(data, watch) { // 接收index.js传过来的data对象和watch对象
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
      this.observe(data, v, watch[v]); // 监听data内的v属性，传入watch内对应函数以调用
    })
  },

  /**
   * 监听属性 并执行监听函数
   */
  observe(obj, key, watchFun) {
    var val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function(value) {
        val = value;
        watchFun(value, val); // 赋值(set)时，调用对应函数
      },
      get: function() {
        return val;
      }
    })
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
    serveUrl: "http://nsgf.yanyongwang.cn",
    lat:'',
    lng:''
  }
})