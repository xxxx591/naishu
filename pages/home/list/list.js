// pages/home/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList:[
      { name:'本周特价',id:0},
      { name:'精品花束',id:1},
      { name:'单头玫瑰',id:2},
      { name:'多头玫瑰',id:3},
      { name:'百合',id:4},
      { name:'所有商品',id:5},
    ],
    leftIndex:0,
    shopList:[
      {
        imgUrl:'/assets/image/test02.png',
        title:'送长辈·真的爱你',
        price:'234',
        count:0
      },
      {
        imgUrl:'/assets/image/test02.png',
        title:'送长辈·真的爱你233',
        price:'123',
        count:0
      },
      {
        imgUrl:'/assets/image/test02.png',
        title:'送长辈·真的爱你2123',
        price:'112',
        count:0
      },
      {
        imgUrl:'/assets/image/test02.png',
        title:'送长辈·真的爱你112',
        price:'332',
        count:0
      },
    ]
  },
  subtracttap(item){
    // console.log(item.currentTarget.dataset.count)
    let index = item.currentTarget.id
    let count = item.currentTarget.dataset.count
    count ==0? 0:count--;
    let deletedtodo = `shopList[${index}].count`;
    this.setData({
      [deletedtodo]:count
    })
  },
  addtap(item){
    let count = item.currentTarget.dataset.count
    let index = item.currentTarget.id
    count ++;
    let deletedtodo = `shopList[${index}].count`;
    this.setData({
      [deletedtodo]: count
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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