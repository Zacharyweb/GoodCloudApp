<template>
  <div class="container-fluid login-content">
    <!--<div class="logo-content"></div>
    <div class="two-login" :class="{amPhone:isphone,amWechate:!isphone}">&lt;!&ndash;:class="{amPhone:isphone,amWechate:!isphone}"&ndash;&gt;
      <div class="login-container">
        <div class="login-img">
          <div class="phonetype" @click="loginByphone"></div>
        </div>
      </div>
      <div class="login-container">
        <div class="login-img">
          <div class="wechatetype" @click="loginBywechate"></div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="footer">
      <div class="change">
        <div class="change-img" :class="{active:ischanging}" @click="change"></div>
        <div class="change-text">
          {{ isphone==true? "点击选择手机登录注册":"点击选择微信登录注册"}}
        </div>
      </div>
      <div class="footer-text">·打开新世界的大门·</div>
    </div>-->
    <LogoView></LogoView>
    <div class="lg-btns">
      <button class="btn btn-block btn-hei46 btn-green btn-normal" @click="loginBywechate">
        <i class="icon iconfont icon-iconfontmoban"></i>
        微信号登录注册
      </button>
      <p class="lg-text" @click="loginByphone">手机号登录<i class="icon iconfont icon-xiayiye"></i></p>
    </div>

  </div>
</template>
<script>
  import LogoView from '../common/Logo'
  export default {
    name: 'login',
    components:{
      LogoView
    },
    data() {
      return {
        isphone:true,
        ischanging:false,
      }
    },
    methods: {
      loginfunc:function (unionId) {
        g.ajax({
          type: 'POST',
          url: g.url.format('/login/getTokenByUnionId'),
          data: {unionId:unionId,appId:gkee.getAappId()},
          success: function (data) {
            if(data.statusCode == 0){
              var _data = data.data;
              g.storage.set('alldata',JSON.stringify(_data));
              //判断手机号是否为空
              if(_data.data.phone==''|| _data.data.phone.indexOf('tel')!=-1){//为空
                g.box.alert({
                  text:'请绑定手机',
                  errorMess:'1.必要要同时绑定微信和手机号，才能正常使用。'
                            +'<br/>'
                            +'2.您现在的账号没有手机',
                  submitCallBack:function () {
                    g.window.openNew(g.url.urlHref("/bindphone"),"bindphone");		//页面跳转
                    g.window.close();
                  }
                })
              }else{//不为空
                g.storage.set("token",JSON.stringify(_data));
                gkee.login(JSON.stringify(_data),"");
              }
              //缓存token
            }else{
              alert(data.errorMsg);
            }
          }
        });
      },
      change:function () {
        var _this = this;
        _this.isphone = !_this.isphone;
        _this.ischanging =true;
        setTimeout(function () {
          _this.ischanging =false;
        },1000);
      },
      loginByphone:function () {
        g.window.openNew(g.url.urlHref("/phoneLogin"),"phoneLogin");		//页面跳转
      },
      getwechatInfor:function (callback) {
        gkee.weixinLogin(function (type,wx) {
          if (type == 0) {
            wx = JSON.parse(wx);
            var login = wx.login;
            var user = wx.user;
            var data = {};
            data.unionId = login.unionid;
            data.nickName = user.nickname;
            data.headimgurl = user.headimgurl;
            data.appId = gkee.getAappId();
            data.miei = gkee.getAndroIdIMEI();
            callback(data);
          }
        });
      },
      loginBywechate:function () {
        var _this = this;
        _this.getwechatInfor(function (obj) {
          //判断帐号是否己经存在
          g.ajax({
            type: 'POST',
            url: g.url.format('/login/isRegister'),
            data: obj,
            success: function (data) {
              if(data.data ==true){
                _this.loginfunc(obj.unionId);
              }else{
                g.storage.set("weixinuser",JSON.stringify(obj));
                g.window.openNew(g.url.urlHref("/reg"),"reg");
                g.window.close();
              }
            }
          });
        })
        /*var wx= JSON.parse(gkee.weixinLogin());
        var login =JSON.parse(wx.login);
        var user =JSON.parse(wx.user);
        var obj ={};
        obj.unionId =login.unionid;
        obj.nickName =user.nickname;
        obj.headimgurl = user.headimgurl;
        obj.appId =gkee.getAappId();
        obj.miei =gkee.getAndroIdIMEI();*/

      }
    },
    mounted: function () {
      //alert("页面加载完执行")
      console.log(1111);
      console.log({name});
    }
  }
</script>
<style scoped>
  .lg-btns{ position: absolute; bottom: 0;left: 35px; right: 35px; height: 180px;}
  .lg-btns button{ border-radius: 25px; height: 50px; font-size: 18px; display: flex; align-items: center; justify-content: center;
    box-shadow: 0px 5px 20px #77e2c8;    -webkit-box-shadow: 0px 5px 20px #77e2c8;    -moz-box-shadow: 0px 5px 20px #77e2c8;}
  .lg-btns button .icon{ font-size: 20px; margin-right: 8px;}
  .lg-text{ color: #B3B3B3;  text-align: center; margin-top: 30px;letter-spacing: 2px;}
  .lg-text .icon{ font-size: 12px; margin-left:5px; }
</style>
