<template>
  <div id="shopManager">
    <div class="mc-top">
      <div class="mc-top-lf">
        <div class="mc-top-lf-img">
          <img :src="shopData.img" >
          <div class="name" v-if="shopData.utype==3">店长</div>
        </div>
        <p class="mc-top-lf-name">{{shopData.nickName}}</p>
      </div>
      <div class="mc-top-ri">
        <div class="mc-top-ri-content"><span class="icon iconfont icon-dianhua"></span><span class="text">{{shopData.tel}}</span> </div>
        <div class="mc-top-ri-content"><span class="icon iconfont icon-shangdian-copy"></span><span class="text">{{ shopData.shopInfo ? shopData.shopInfo.shopName  :''}}</span> </div>
        <div class="mc-top-ri-content"><span class="icon iconfont icon-dingwei1"></span><span class="text">{{ shopData.organize ? shopData.organize.addrees : (shopData.shopInfo?shopData.shopInfo.addrees:'')}}</span> </div>
      </div>
    </div>
    <div class="mc-notice" v-if="!shopData.organize">
      <div class="mc-notice-icon"><i class="icon iconfont icon-laba"></i></div>
      <div class="notice">请先“加入建材城”，您的店铺才会被客户看见！</div>
    </div>
    <div class="mc-notice hasOrganize" v-if="shopData.organize">
      <div>新手必读，让业绩迅速翻倍！<i class="icon iconfont icon-dianji"></i></div>
    </div>
    <div class="mc-order">
      <div class="title">订单、客户管理</div>
      <div class="box">
        <div class="box-column3">
          <p class="icon iconfont icon-tongxunlu" @click="leaveTel"></p>
          <p class="text">客户</p>
          <p class="descrip">主动留电话</p>
        </div>
        <div class="box-column3" @click="liveService">
          <p class="icon iconfont icon-02"></p>
          <p class="text">客户</p>
          <p class="descrip">直播服务过</p>
        </div>
        <div class="box-column3" @click="order">
          <p class="icon iconfont icon-275iconfontshouyimingxi"></p>
          <p class="text">门店订单</p>
        </div>
      </div>
    </div>
    <div class="mc-shop">
      <div class="title">门店基础设置</div>
      <div class="box">
        <div class="box-column2" @click="modifyShop"><i class="icon iconfont icon-mendian"></i> 查看门店</div>
        <div class="box-column2" @click="Invitation" v-if="shopData.utype==3"><i class="icon iconfont icon-woshou"></i> 加入建材城</div>
        <div class="box-column2" @click="guide"><i class="icon iconfont icon-kefu"></i> 导购管理</div>
        <div class="box-column2" @click="transfer" v-if="shopData.utype==3"><i class="icon iconfont icon-guanli"></i> 转让店长</div>
      </div>
    </div>
    <div class="mc-infor">
      <div class="title">个人信息管理</div>
      <div class="box">
        <div class="box-column3" @click="editor">
          <p class="icon iconfont icon-weimingpian"></p>
          <p class="text">编辑个人名片</p>
        </div>
        <div class="box-column3" @click="unbundle()">
          <p class="icon iconfont icon-jiebang"></p>
          <p class="text">解绑微信和手机</p>
        </div>
        <div class="box-column3" @click="identity">
          <p class="icon iconfont icon-qiehuanyonghu"></p>
          <p class="text">身份变更</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'shopManager',
    props: ['shopData'],
    data() {
      return {

      }
    },
    methods:{
      order:function () {
        g.window.openNew(g.url.urlHref("/orderlist"),"orderlist");
      },
      modifyShop:function () {
        g.window.openNew(g.url.urlHref("/editShop"),"editShop");
      },
      Invitation:function () {
        g.window.openNew(g.url.urlHref("/invitation"),"invitation");
      },
      guide:function () {
        g.window.openNew(g.url.urlHref("/shoppingGuide"),"shoppingGuide");
      },
      transfer:function () {
        g.window.openNew(g.url.urlHref("/transferManager"),"transferManager");
      },
      editor:function () {
        g.window.openNew(g.url.urlHref("/businessCard"),"businessCard");
      },
      unbundle:function (name) {
        if(!name) name = 'phone';
        g.window.openNew(g.url.urlHref("/unbundle?name="+name),"unbundle");
      },
      identity:function () {
        g.window.openNew(g.url.urlHref("/identity"),"identity");
      },
      leaveTel:function () {
        g.window.openNew(g.url.urlHref("/leaveTelCustomer"),"leaveTelCustomer");
      },
      liveService:function () {
        g.window.openNew(g.url.urlHref("/liveServiceCustomer"),"liveServiceCustomer");
      }
    },
    mounted:function () {
    }
  }
</script>
