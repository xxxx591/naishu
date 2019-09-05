// pages/home/confirmation_select/confirmation_select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainActiveIndex: 0,
    activeId: 0,
    items: [],
    typearr1: [{
        text: '上午 9:00',
        id: 1,
      },
      {
        text: '上午 10:00',
        id: 2,
      },
      {
        text: '上午 11:00',
        id: 3,
      },
      {
        text: '中午 12:00',
        id: 4,
      },
      {
        text: '中午 13:00',
        id: 5,
      },
      {
        text: '中午 14:00',
        id: 6,
      },
      {
        text: '下午 15:00',
        id: 7,
      },
      {
        text: '下午 16:00',
        id: 8,
      },
      {
        text: '下午 17:00',
        id: 9,
      },
      {
        text: '下午 18:00',
        id: 10,
      },
      {
        text: '下午 19:00',
        id: 11,
      },
      {
        text: '下午 20:00',
        id: 12,
      },
      {
        text: '下午 21:00',
        id: 13,
      },
      {
        text: '下午 21:30',
        id: 14,
      },
    ],
    typearr2: [{
        text: '下午 15:00',
        id: 1,
      },
      {
        text: '下午 16:00',
        id: 2,
      },
      {
        text: '下午 17:00',
        id: 3,
      },
      {
        text: '下午 18:00',
        id: 4,
      },
      {
        text: '下午 19:00',
        id: 5,
      },
      {
        text: '下午 20:00',
        id: 6,
      },
      {
        text: '下午 21:00',
        id: 7,
      },
      {
        text: '下午 21:30',
        id: 8,
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type
    })
    let nowDate = this.formatDate(new Date().getTime(), 'yyyy-MM-dd')
    let arr = []
    for (let i = 0; i < 8; i++) {
      let dayindex = new Date(this.fun_date(i)).getDay()
      let str = '星期一'
      switch (dayindex) {
        case 0:
          str = '星期日';
          break;
        case 1:
          str = '星期一';
          break;
        case 2:
          str = '星期二';
          break;
        case 3:
          str = '星期三';
          break;
        case 4:
          str = '星期四';
          break;
        case 5:
          str = '星期五';
          break;
        case 6:
          str = '星期六';
          break;
      }
      let obj = {
        text: `${(this.fun_date(i)).split('-')[1]}月${(this.fun_date(i)).split('-')[2]}日 (${str})`,
        children: []
      }
      // obj.children = this.data.typearr1
      if (options.type == 2) {
        obj.children = this.data.typearr1
      } else {
        obj.children = this.data.typearr2
      }
      arr.push(obj)
      // console.log(this.fun_date(i))
    }
    this.setData({
      items: arr
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onClickNav({
    detail = {}
  }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },

  onClickItem({
    detail = {}
  }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;
    let nowtime = this.formatDate(new Date()).split(' ')[1]
    nowtime = nowtime.replace(/[^0-9]/ig, "")
    let str = '';
    let time = '';
    if (this.data.type == 2) {
      str = `${this.data.items[this.data.mainActiveIndex].text} ${this.data.typearr1[activeId - 1].text}`
      time = this.data.typearr1[activeId - 1].text
    } else {
      str = `${this.data.items[this.data.mainActiveIndex].text} ${this.data.typearr2[activeId - 1].text}`
      time = this.data.typearr2[activeId - 1].text
    }
    if (nowtime > time.replace(/[^0-9]/ig, "") && this.data.mainActiveIndex == 0) {
      wx.showToast({
        title: '不能早于当前时间',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
        this.setData({
          activeId
        });
      
      wx.setStorageSync('selectTime', str)
      wx.navigateBack({
        delta: 1
      })
    }
  },
  formatDate(date, format) {
    if (!date) {
      return;
    }
    if (!format) {
      format = 'yyyy-MM-dd HH:mm';
    }
    switch (typeof date) {
      case 'string':
        date = new Date(date.replace(/-/g, '/'));
        break;
      case 'number': // 考虑了纯秒数传入情况
        date = new Date(date);
        break;
    }
    if (!(date instanceof Date)) {
      return;
    }
    let dict = {
      'yyyy': date.getFullYear(),
      'M': date.getMonth() + 1,
      'd': date.getDate(),
      'H': date.getHours(),
      'm': date.getMinutes(),
      's': date.getSeconds(),
      'MM': (String(date.getMonth() + 101)).substr(1),
      'dd': (String(date.getDate() + 100)).substr(1),
      'HH': (String(date.getHours() + 100)).substr(1),
      'mm': (String(date.getMinutes() + 100)).substr(1),
      'ss': (String(date.getSeconds() + 100)).substr(1)
    };

    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
      return dict[arguments[0]];
    });
  },
  fun_date(aa) {
    var date1 = new Date(),

      time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(); //time1表示当前时间

    var date2 = new Date(date1);

    date2.setDate(date1.getDate() + aa);
    var time2 = date2.getFullYear() + "-" +

      (date2.getMonth() + 1) + "-" + date2.getDate();
    return time2
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