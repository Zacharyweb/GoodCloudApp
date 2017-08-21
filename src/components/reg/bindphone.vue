<template>
  <div id="bindphone">
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
          <button type="button" id="next" v-on:click="next" class="btn btn-block btn-hei46 btn-green btn-normal" :class="{disabled:!(tel&&code)}" :disabled="!(tel&&code)">绑定手机号</button>
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
    name: 'bindphone',
    data() {
      return {
        Hdata:{
          title: '绑定手机号'
        },
        getcodeurl:g.url.format('/account/getTelCode'),//需要验证手机号是否存在
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
          url: _this.getcodeurl,
          headers:{'token':obj.token},
          data: {tel:_this.tel,appId:gkee.getAappId()},
          success: function (data) {
            if(data.statusCode==0){
              callback();
              obj.tel =_this.tel;
            }else{
              g.box.alert({
                errorMess:data.errorMsg
              });
            }
          }
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
          url:g.url.format("/login/checkCode"),
          headers:{'token':obj.token},
          data:{tel:_this.tel,code:_this.code},
          success: function (data) {
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
          }
        });
      },
      regist:function () {
        var _this = this;
        g.ajax({
          type: 'POST',
          url: g.url.format('/account/binTel'),
          headers:{'token':obj.token},
          data:obj,
          success: function (result) {
            if(result.statusCode==0){
              var _data = JSON.parse(g.storage.get("alldata"));
              _data.data.phone = _this.tel;
              g.storage.set("token",JSON.stringify(_data));
              gkee.login(JSON.stringify(_data),"")
            }else{
              alert(result.errorMsg);
            }
          }
        });
      }
    },
    mounted:function () {
      obj = JSON.parse(g.storage.get("alldata"));
    }
  }


</script>
<style scoped>
  @import '../../assets/css/login.css';
</style>
