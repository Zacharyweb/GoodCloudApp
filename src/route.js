const routes ={
  '':function (resolve) {//默认页
    require(['./components/login/Login.vue'], resolve);
  },
  '/':function (resolve) {//默认页
    require(['./components/login/Login.vue'], resolve);
  },
  '/login':function (resolve) {//登录
    require(['./components/login/Login.vue'], resolve);
  },
  '/reg':function (resolve) {//注册
    require(['./components/reg/reg.vue'], resolve);
  },
  '/guide':function(resolve){ //申请开店
    require(['./components/reg/reg-guide.vue'], resolve);
  },
  '/guide2':function(resolve){//申请开店2
    require(['./components/reg/reg-guide-2.vue'], resolve);
  },
  '/openShop':function(resolve){//申请开店2
    require(['./components/manageCenter/openShop.vue'], resolve);
  },
  '/bindphone':function (resolve) {
    require(['./components/reg/bindphone.vue'], resolve);
  },
  '/phoneLogin':function (resolve) {
    require(['./components/reg/phoneLogin.vue'], resolve);
  },
  '/success':function (resolve) {//成功
    require(['./components/success.vue'], resolve);
  },
  '/manageCenter':function(resolve){ //个人中心
    require(['./components/manageCenter/manageCenter.vue'], resolve);
  },
  /*'/manageCenterNew':function(resolve){ //个人中心
    require(['./components/manageCenter/manageCenterNew.vue'], resolve);
  },*/
  '/identity':function (resolve){ //身份
    require(['./components/manageCenter/identity.vue'], resolve);
  },
  '/activity':function (resolve){ //活动
    require(['./components/manageCenter/activity.vue'], resolve);
  },
  '/businessCard':function (resolve){ //编辑名片
    require(['./components/manageCenter/businessCard.vue'], resolve);
  },
  '/write':function (resolve) {//填写
    require(['./components/common/write.vue'], resolve);
  },
  '/invitation':function (resolve){ //建材城邀请
    require(['./components/manageCenter/invitation.vue'], resolve);
  },
  '/shoppingGuide':function (resolve){//导购管理
    require(['./components/manageCenter/shoppingGuide.vue'], resolve);
  },
  '/addGuide':function (resolve){ //添加导购
    require(['./components/manageCenter/addGuide.vue'], resolve);
  },
  '/transferManager':function (resolve){ //转让店长
    require(['./components/manageCenter/transferManager.vue'], resolve);
  },
  '/modifyShop':function (resolve){ //编辑门店
    require(['./components/manageCenter/modifyShop.vue'], resolve);
  },
  '/editShop':function (resolve){ //查看编辑门店
    require(['./components/manageCenter/editShop.vue'], resolve);
  },
  '/unbundle':function (resolve){ //微信、手机解绑
    require(['./components/manageCenter/unbundle.vue'], resolve);
  },
  '/orderlist':function (resolve){ //订单列表
    require(['./components/manageCenter/order/orderList.vue'], resolve);
  },
  '/orderdetail':function (resolve){ //订单详情;
    require(['./components/manageCenter/order/orderDetail.vue'], resolve);
  },
  '/orderadd':function (resolve){ //新增订单
    require(['./components/manageCenter/order/orderAdd.vue'], resolve);
  },
  '/cost':function (resolve){ //活动费用
    require(['./components/manageCenter/order/cost.vue'], resolve);
  },
  '/commission':function (resolve){ //佣金
    require(['./components/manageCenter/order/commission.vue'], resolve);
  },
   '/myPromotionIncome':function (resolve){ //我的推广收益
    require(['./components/manageCenter/myPromotionIncome/myPromotionIncome.vue'], resolve);
  },
  '/flowsPK':function (resolve){ //流量PK
    require(['./components/flowsPK/flowsPK.vue'], resolve);
  },
  '/hallList':function (resolve){ //全景展厅
    require(['./components/panoramaHall/hallList.vue'], resolve);
  },
  '/hallDetail':function (resolve){ //全景展厅详情
    require(['./components/panoramaHall/hallDetail.vue'], resolve);
  },
  '/voice':function (resolve){ //录音
    require(['./components/panoramaHall/voice.vue'], resolve);
  },
  '/video':function (resolve){ //短视频
    require(['./components/panoramaHall/video.vue'], resolve);
  },
  '/liveVideo':function (resolve){ //直播视频
    require(['./components/liveVideo/liveVideo.vue'], resolve);
  },
  '/aboutBond':function (resolve){ //保证金相关
    require(['./components/liveVideo/aboutBond.vue'], resolve);
  },
  '/promoVideo':function (resolve){ //推广视频
    require(['./components/promoVideo/promoVideo.vue'], resolve)
  },
  '/linkPhoto':function (resolve){ //关联实拍
    require(['./components/promoVideo/linkPhoto.vue'], resolve)
  },
  '/createVideo':function (resolve){ //关联实拍
    require(['./components/promoVideo/createVideo.vue'], resolve)
  },
  '/ceshi':function (resolve){ //测试页面
    require(['./components/ceshi.vue'], resolve);
  },
  '/liveServiceCustomer':function(resolve){ //直播服务过的客户
    require(['./components/manageCenter/customerPage/liveServiceCustomer.vue'], resolve);
  },
  '/leaveTelCustomer':function(resolve){ //留过电话的客户
    require(['./components/manageCenter/customerPage/leaveTelCustomer.vue'], resolve);
  },
  '/customerFootPrint':function(resolve){ //足迹
    require(['./components/manageCenter/customerPage/customerFootPrint.vue'], resolve);
  }

}
//todo 这样做的原因是什么呢？
window.onhashchange = function(){
  window.location.reload();
};
export default routes
