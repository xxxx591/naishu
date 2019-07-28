module.exports = {
  getOpenid: '/api/user/getOpenId', // 获取openid
  getUserInfo: '/api/user/login', // openid 获取用户信息(登录)
  bindPhone: '/api/user/register', // 用户注册接口
  getShopAddress: '/api/store/index', // 用户注册接口
  getShopList: '/api/store/goodsList', // 商品列表
  getShopDetails: '/api/store/goodsDetail', // 商品详情
  getConfimOrder: '/api/order/confirmOrder', // 确认订单接口(包括获取用户距离门店地址)
  getUserAddressList: '/api/user/userAddressList', // 确认用户地址列表
  addAddress: '/api/user/userAddressSave', // 增加用户地址
  delAddress: '/api/user/userAddressDelete', // 删除用户地址
  setUserAddressDefault: '/api/user/userAddressDefault', // 设置用户地址默认
  getAddressDteails: '/api/user/userAddressDetail', // 获取用户地址详情
  getAddressDefault: '/api/user/getAddressDefault', // 获取用户默认地址
  getUserCoupon: '/api/user/userCoupon', // 获取全部优惠券
  getOrderCoupon: '/api/order/userCoupon', // 获取对应优惠券
  getDiscountPrice: '/api/order/getDiscountPrice', // 获取优惠后价格
  createOrder: '/api/order/createOrder', // 确认订单支付
  getShopStoreList: '/api/store/storeList', // 获取店铺列表
  // getUserAddressList: '/api/user/userAddressList', // 确认用户地址列表
  getOther: '/api/config/editor', // 富文本杂项
  wxLogin: '/user/wxLogin', //微信登录
  memberIndex: '/api/member/index', // 会员主页
}