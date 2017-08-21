<template>
  <div>
    <button class="btn btn-block btn-red" style="position: absolute;bottom: 20px; left: 15px;right: 15px;" @click="login">登录</button>
  </div>
</template>
<script>
  import common from '../../assets/js/common'
  export default {
    name: 'login',
    data() {
      return {
        obj:[],
      }
    },
    methods: {
      login:function () {//拉授权
        location.href = "http://app.guangkee.com/showtime/wechat/first?appId=wx75d264c0d5ba7218&returnUrl="+encodeURIComponent(window.location.href);
      },
    },
    mounted: function () {
      var _this = this;
      var params = common.getUrlParams();
      if(!params ){
        return false;
      }
      if(params.mainunionid){
        $.post(g.url.format("/login/isRegister"),{appId:params.mainAppId,unionId:params.mainunionid},function(data){
          if(data.data ==true){//直接下载页
            window.location.hash ='/shareSuccess';
          }else{
            localStorage.setItem('weixinuser',JSON.stringify({unionId:params.mainunionid,appId:params.mainAppId}));
            window.location.hash ='/shareReg';
          }
        });
      }else {
        window.location.hash ='/shareSuccess';
      }
    }
  }
</script>
