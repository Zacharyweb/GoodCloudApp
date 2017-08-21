<template>
  <div id="shareReg">
    <div class="login container">
      <div class="share-container">
        <div class="share-container-title">维他建材城注册</div>
        <div class="share-container-text">感谢您使用本系统，在使用本系统的所有功能之前，请您 仔细阅读并理解本说明。您的使用行为将被视为对本说明 全部内容的认可。</div>
      </div>
      <div class="button-content">
        <button type="button" class="btn btn-green-o btn-lg btn-block" v-on:click="guide">注册(非店长点此注册)</button>
        <button type="button" class="btn btn-green btn-normal btn-lg btn-block" v-on:click="shop">注册新门店</button>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '../../assets/js/common'
  let obj={};
  export default {
    name: 'shareReg',
    methods: {
      guide:function () {
        obj.registType =0;// 导购
        localStorage.setItem("weixinuser",JSON.stringify(obj));
        window.location.hash = '/shareGuide';
      },
      shop:function () {
        obj.registType =1;//店长
        localStorage.setItem("weixinuser",JSON.stringify(obj));
        window.location.hash = '/shareGuide';
      }
    },
    data() {
      return {
      }
    },
    mounted:function () {
      obj = JSON.parse(localStorage.getItem('weixinuser'));
    }
  }
</script>
<style scoped>
  @import '../../assets/css/share/reg.css';
</style>
