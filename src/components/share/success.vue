<template>
  <div id="shareSuccess">
    <div class="login container">
      <div class="share-container">
        <div class="share-container-title">{{registType==0?'注册导购成功！':'注册门店成功！'}}</div>
        <div class="share-container-text">感谢您使用本系统，在使用本系统的所有功能之前，请您 仔细阅读并理解本说明。您的使用行为将被视为对本说明 全部内容的认可。</div>
      </div>
      <div class="download-container">
        <img src="../../assets/img/APPlogo.png" class="download-img">
        <p class="download-title">好云商</p>
        <button class="btn btn-block btn-green" v-if="isiOS"><i class="icon iconfont icon-pingguo btn-icon"></i>iPhone下载</button>
        <button class="btn btn-block btn-green" v-if="isAndroid"><i class="icon iconfont icon-anzhuo btn-icon"></i>Android下载</button>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '../../assets/js/common'
  let obj={};
  export default {
    name: 'shareSuccess',
    methods: {

    },
    data() {
      return {
        isAndroid:false,
        isiOS:false,
        registType:0,
      }
    },
    mounted:function () {
      var _this = this;
      var u = navigator.userAgent;
      _this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      _this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      obj = JSON.parse(localStorage.getItem("weixinuser"));
      _this.registType = obj.registType;
    }
  }
</script>
<style scoped>
  @import '../../assets/css/share/reg.css';
</style>
