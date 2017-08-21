<template>
  <div id="phoneLogin">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="reg-container container-gray">
      <div class="reg-content">
        <ul class="list-group">
          <li class="list-group-item reg-list">
            <div class="input-group pull-left">
              <div class="input-group-btn reg-list-text">
                手机号
              </div>
              <input type="tel" id="tel" class="form-control mobile no-border" placeholder="请填写您的手机号" v-model="tel">
            </div>
            <div class="pull-right">
              <Getcode :Codedata="{tel:tel,code:code}"></Getcode>
            </div>
            <div class="clearfix"></div>
          </li>
          <li class="list-group-item reg-list">
            <div class="input-group pull-left">
              <div class="input-group-btn reg-list-text">
                验证码
              </div>
              <input type="text" id="code" class="form-control no-border" placeholder="请填写您的验证码" v-model="code">
            </div>
            <div class="clearfix"></div>
          </li>
        </ul>
      </div>
      <div class="container" >
        <div class="button-content">
          <button type="button" id="next" @click="next" class="btn btn-block btn-hei46 btn-green btn-normal" :class="{disabled:!(tel&&code)}" :disabled="!(tel&&code)">登录</button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  import Getcode from '../common/getcode'
  var obj={};
  export default {
    name: 'phoneLogin',
    data() {
      return {
        Hdata:{
          title: '手机号登录'
        },
        getcodeurl:g.url.format('/login/getTelCode'),//不需要验证手机号是否存在
        code:'',
        tel:'',
      }
    },
    components:{
      Topheader,
      Getcode
    },
    methods: {
      getcode:function (component,callback) {
        if(component){
          var _this = component;
        }else{
          var _this = this;
        }
        if(!_this.tel){
          g.box.waiting({
            title:'请输入手机号',
          })
          return;
        }
        if(!g.validate.isPhone(_this.tel)){
          return;
        }
        g.ajax({
          type: 'POST',
          url:g.url.format('/login/getTelCode') ,
          data:{tel:_this.tel,appId:gkee.getAappId()},
          success: function (result) {
            if(result.statusCode==0){
              callback();
              obj.tel =_this.tel;
            }else{
              g.box.alert({
                errorMess:result.errorMsg
              });
            }
          }
        });
      },
      getwechatInfor:function (callback) {
        gkee.weixinLogin(function (type,wx) {
          if(type==0){
            wx = JSON.parse(wx);
            var login = wx.login;
            var user = wx.user;
            var data ={};
            data.unionId =login.unionid;
            data.nickName =user.nickname;
            data.headimgurl = user.headimgurl;
            data.appId =gkee.getAappId();
            data.miei =gkee.getAndroIdIMEI();
            callback(data);
          }
        });
      },
      getTokenByTel:function (param,successback,erroback) {//读取所有参数
        g.ajax({
          type: 'POST',
          url: g.url.format("/login/getTokenByTel"),
          data:param,
          success: function (data) {
            if(data.statusCode==0){
              successback(data.data);
            }else{
              if(erroback){
                erroback(data.data);
              }else{
                alert(data.errorMsg);
              }
            }
          }
        });
      },
      getTokenByTelSuccess:function (data) {
        var _this = this;
        _this.gotomanageCenter(data);
      },
      registerGuide:function (param,successback,erroback) {//注册导购
        g.ajax({
          type: 'POST',
          url:g.url.format("/login/registerGuide") ,
          data:param,
          success: function (data) {
            if(data.statusCode==0){
              successback(data);
            }else{
              erroback(data);
            }
          }
        });
      },
      isRegister:function (param,successback,erroback) {//判断是否注册
        g.ajax({
          type: 'POST',
          url: g.url.format("/login/isRegister"),
          data:param,
          success: function (data) {
            if(data.statusCode==0){
              if(data.data ==true){
                successback(data);
              }else{
                erroback(data);
              }
            }else{
              alert(data.errorMsg);
            }
          }
        });
      },
      gotomanageCenter:function (tokenData,closeView) {
        g.storage.set("token",JSON.stringify(tokenData));
        gkee.login(JSON.stringify(tokenData),"");
      },
      binWebChat:function (data) {
        var _this = this;
        g.ajax({
          type: 'POST',
          url: g.url.format('/account/binWebChat'),
          headers: {'token':data.token},/*token在数据里*/
          data:{unionId:data.data.unionId},
          success: function (result) {
            if(result.statusCode==0){
              _this.gotomanageCenter(data);
            }else{
              alert(result.errorMsg);
            }
          }
        })
      },
      notPhone:function (data) {
        var _this = this;
        console.log("没有手机")
        /*obj = _this.getwechatInfor();*/
        _this.getwechatInfor(function (obj) {
          _this.isRegister(obj,
            function () {
              g.box.alert({
                title:'错误提示',
                errorMess:'您授权的微信号已绑定其他账号，请先解绑',
                submitCallBack:function () {
                  g.window.close();
                }
              })
            },
            function () {
              obj.registType =0;
              obj.code=_this.code;
              obj.tel=_this.tel;
              _this.registerGuide(obj,
                function () {
                  _this.getTokenByTel(
                    {tel:obj.tel,code:obj.code,appId:gkee.getAappId()},
                    _this.getTokenByTelSuccess
                  )

                },
                function (data) {
                  alert(data.errorMsg);
                }
              );
            }
          )
        });

      },
      havePhone:function (data) {
        console.log("有手机")
        var _this = this,_data = data;
        if(_data.data.unionId==''||_data.data.unionId.indexOf("unionId")!=-1){
          g.box.alert({
            title:'请绑定微信',
            errorMess:'1.必要要同时绑定微信和手机号，才能正常使用。'
            +'<br/>'
            +'2.您现在的账号没有微信',
            submitCallBack:function () {
              _this.PnoWheat(_data);
            }
          });
        }else{
          _this.gotomanageCenter(_data);
        }
      },
      PnoWheat:function (data) {
        var _this = this,_data = data;
        _this.getwechatInfor(function (wechatdata) {
          _data.data.unionId = wechatdata.unionId;
          _this.isRegister(
            {unionId:wechatdata.unionId,appId:gkee.getAappId()},
            function () {
              g.box.alert({
                title:'提示',
                errorMess:'您授权的微信号已绑定其他账号，请先解绑。',
                submitCallBack:function () {
                  g.window.close();
                }
              })
            },
            function () {
              _this.binWebChat(_data);
            }
          );
        });


      },
      next:function () {
        var _this = this;
        if(!_this.code && _this.tel){
          g.box.waiting({
            title:'请填写完整的数据',
          })
          return;
        }
        if(!g.validate.isPhone(_this.tel)){
          return;
        }
        g.ajax({
          type: 'POST',
          url: g.url.format("/login/checkCode"),
          data:{tel:obj.tel,code:_this.code},
          success: function (checkCodedata) {
            if (checkCodedata.data == 0) {
              g.box.alert({
                title: '错误提示',
                errorMess: '验证码错误',
              })
              return;
            }

            _this.getTokenByTel({tel:obj.tel,code:_this.code,appId:gkee.getAappId()},
              _this.havePhone,
              _this.notPhone
            );
          }
        });


      }
    },
    mounted:function () {

    }
  }


</script>
<style scoped>
  @import '../../assets/css/login.css';
</style>
