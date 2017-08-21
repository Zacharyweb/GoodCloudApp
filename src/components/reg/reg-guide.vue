<template>
  <div id="guide">
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
          <button type="button" id="next" v-on:click="next" class="btn btn-block btn-green btn-normal" :class="{disabled:!(tel&&code)}" :disabled="!(tel&&code)">{{butname}}</button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  import Getcode from '../common/getcode'
  var obj;
  export default {
    name: 'guide',
    data() {
      return {
        Hdata:{
          title: ''
        },
        butname:'',
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
          data:{tel:_this.tel,appId:gkee.getAappId()},
          success: function (data) {
            if(data.statusCode==0){
              obj.tel =_this.tel;
              callback();
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
          url: g.url.format("/login/checkCode"),
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
        g.storage.set("weixinuser",JSON.stringify(obj));
        if(obj.registType==0){
          //请求到后台生成数据
          g.ajax({
            type: 'POST',
            url: g.url.format("/login/registerGuide"),
            data:obj,
            success: function (data) {
              if(data.statusCode==0){
                //缓存token
                var _data = data.data;
                g.storage.set("token",JSON.stringify(_data));
                gkee.login(JSON.stringify(_data),"");
                g.storage.del("weixinuser");//删除缓存
              }else{
                alert(data.errorMsg);
              }
            }
          });
        }
        else{
          g.window.openNew(g.url.urlHref("/guide2"),"guide2");
        }
      }
    },
    mounted:function () {
      var _this = this;
      obj = JSON.parse(g.storage.get("weixinuser"));
      if(obj.registType ==0){
        _this.Hdata.title = "注册新导购";
        _this.butname="完成注册";
      }else{
        _this.Hdata.title="注册新门店";
        _this.butname="下一步";
      }
    }
  }


</script>
<style scoped>
  @import '../../assets/css/login.css';
</style>
