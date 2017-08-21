<template>
  <div id="user">
    <div class="mc-top">
      <div class="mc-top-lf-img">
        <img :src="shopData.img" class="">
      </div>
      <p class="mc-top-lf-name">{{shopData.nickName}}</p>
      <p class="mc-top-text"><span class="icon iconfont icon-dianhua"></span><span class="text">{{shopData.tel}}</span> </p>
    </div>
    <div class="mc-notice hasOrganize">
      <div>新手必读，让业绩迅速翻倍！<i class="icon iconfont icon-dianji"></i></div>
    </div>
    <div class="mc-box">
      <div class="box">
        <div class="box-column3" @click="editor">
          <p class="icon iconfont icon-weimingpian"></p>
          <p class="text">个人名片</p>
        </div>
        <div class="box-column3" @click="unbundle">
          <p class="icon iconfont icon-jiebang"></p>
          <p class="text">解绑</p>
          <p class="descrip">微信及电话</p>
        </div>
        <div class="box-column3" @click="identity">
          <p class="icon iconfont icon-qiehuanyonghu"></p>
          <p class="text">身份变更</p>
        </div>
        <div class="box-column3" @click="openShop">
          <p class="icon iconfont icon-kaidianchenggong-copy"></p>
          <p class="text">申请开店</p>
        </div>
      </div>
    </div>
    <div class="mc-prompt">
      <div class="title"><div>温馨提示</div></div>
      <div class="content">
        <div class="text">
          <h4>如果您是导购</h4>
          <p>请联系店长发邀请，然后点击“身份变更”切换身份。</p>
        </div>
        <div class="text">
          <h4>如果您是店长</h4>
          <p>请点击“申请开店”，并按提示操作。</p>
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
      openShop:function () {
        g.window.openNew(g.url.urlHref("/editShop?type=1"),"editShop");
      },
    },
    mounted:function () {
    }
  }
</script>
