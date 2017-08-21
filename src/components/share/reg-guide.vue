<template>
  <div id="shareguide">
    <div class="reg-container container-gray" style="top: 0;">
      <div class="reg-content">
        <ul class="list-group">
          <li class="list-group-item reg-list">
            <div class="input-group pull-left">
              <div class="input-group-btn reg-list-text">
                手机号
              </div>
              <input type="text" id="tel" class="form-control mobile no-border" placeholder="请填写您的手机号" v-model="tel">
            </div>
            <div class="pull-right">
              <button type="button" id="getcode" v-on:click="getcode" class="btn btn-green-o btn-radius" :class="{disabled:!tel||getcodeing}" :disabled="!tel||getcodeing">{{getcodeing?getcodeingtime:'获取验证码'}}</button>
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
          <button type="button" id="next" v-on:click="next" class="btn btn-block btn-hei46 btn-green" :class="{disabled:!(tel&&code)}" :disabled="!(tel&&code)">{{registType==0?'完成注册':'下一步'}}</button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import common from '../../assets/js/common'
  let obj;
  export default {
    name: 'shareguide',
    data() {
      return {
        code:'',
        tel:'',
        registType:'',
        getcodeing:false,
        getcodeingtime:60
      }
    },
    methods: {
      time:function () {
        var _this = this;
        _this.getcodeing = true;
        var timer = setInterval(function () {
          _this.getcodeingtime -= 1;
          if(_this.getcodeingtime==0){
            _this.getcodeing = false;
            _this.getcodeingtime = 60;
            clearInterval(timer);
          }
        },1000)
      },
      getcode:function () {
        var _this = this;
        if(!_this.tel){
          g.box.waiting({
            title:'请输入手机号',
          })
          return;
        }
        $.post(g.url.format('/account/getTelCode'),{tel:_this.tel,appId:obj.appId},function(data){
          //验证手机号是否存在
          if(data.statusCode!=0){//存在
            g.box.alert({
              title:'错误提示',
              errorMess:data.errorMsg,
              submitCallBack:function () {
                window.location.hash ='/shareSuccess';
              }
            })
          };
          _this.time();
        });
      },
      next:function () {
          var _this = this;
          if(!(_this.code && _this.tel)){
            g.box.waiting({
              title:'请填写完整的数据',
            })
            return;
          }
        $.post(g.url.format("/login/checkCode"),{tel:_this.tel,code:_this.code},function(data){
          if(data.data == 0){
            g.box.alert({
              title:'错误提示',
              errorMess:'验证码错误',
            })
            return;
          }
          obj.code = _this.code;
          obj.tel = _this.tel;
          _this.regist();
        });
      },
      regist:function () {
        var _this = this;
        if(_this.registType==0){
          //请求到后台生成数据
          $.post(g.url.format("/login/registerGuide"),obj,function(data){
            if(data.statusCode==0){
              window.location.hash ='/shareSuccess';
            }else{
              alert(data.errorMsg);
            }
          });
        }
        else{
          localStorage.setItem("weixinuser",JSON.stringify(obj));
          window.location.hash ='/shareGuide2';
        }
      }
    },
    mounted:function () {
      var _this = this;
      obj = JSON.parse(localStorage.getItem('weixinuser'));
      _this.registType= obj.registType;
    }
  }


</script>
<style scoped>
  @import '../../assets/css/login.css';
</style>
