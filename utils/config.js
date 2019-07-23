module.exports = {
  getOpenid: '/api/user/getOpenId', // 获取openid
  getUserInfo: '/api/user/login', // openid 获取用户信息(登录)
  bindPhone: '/api/user/register', // 用户注册接口
  getShopAddress: '/api/store/index', // 用户注册接口
  getShopList: '/api/store/goodsList', // 商品列表
  getShopDetails: '/api/store/goodsDetail', // 商品详情
  getOther: '/api/config/editor', // 富文本杂项
  wxLogin: '/user/wxLogin', //微信登录
  memberIndex: '/api/member/index', // 会员主页
}