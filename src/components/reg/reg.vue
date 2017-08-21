<template>
  <div id="reg">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="login container">
      <LogoView></LogoView>
      <div class="button-content">
        <button type="button" class="btn btn-green btn-normal btn-block" v-on:click="shop">注册新门店</button>
        <button type="button" class="btn btn-green-o btn-normal btn-block" v-on:click="guide">注册导购</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Topheader from '../common/headerNew'
  import LogoView from '../common/Logo'
  var obj;
  export default {
    name: 'reg',
    methods: {
      guide:function () {
        obj.registType =0;// 导购
        g.storage.set("weixinuser",JSON.stringify(obj));
        g.window.openNew(g.url.urlHref("/guide"),"guide");
      },
      shop:function () {
        obj.registType =1;//店长
        g.storage.set("weixinuser",JSON.stringify(obj));
        g.window.openNew(g.url.urlHref("/guide"),"guide");
      }
    },
    data() {
      return {
          Hdata:{
            title:'',
            noBorder:true
          }
      }
    },
    components:{
      Topheader,
      LogoView
    },
    mounted:function () {
      obj = JSON.parse(g.storage.get("weixinuser"));
    }
  }
</script>
<style>
  .lg-logo{ margin: 60px auto 39px!important;}
  .container{ padding: 0px 37px;}
  .logo-content{ height: 290px;}
  .button-content{ position: absolute; bottom: 0; left: 37px; right: 37px; height: 230px;}
  .button-content .btn{  margin-bottom: 18px; border-radius: 25px; height: 50px; font-size: 17px; display: flex; align-items: center; justify-content: center;}
</style>
