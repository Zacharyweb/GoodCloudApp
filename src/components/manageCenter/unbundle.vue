<template>
  <div id="unbundle">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="unbundle-container container-gray">
      <ul class="nav nav-tabs nav-tabs-new">
        <li :class="{active:!isphone}"><a href="#WeChat" data-toggle="tab">解绑微信号</a></li>
        <li :class="{active:isphone}"><a href="#Phone" data-toggle="tab">解绑手机</a></li>
      </ul>
      <div id="myTabContent" class="tab-content">
        <div class="tab-pane fade"  :class="{active:!isphone,in:!isphone}" id="WeChat">
          <div class="unbundle-content">
            <p>您确定要解绑微信号吗？</p>
            <p>解除后，您不能使用这个微信登录此账号。</p>
          </div>
          <div class="buttons container">
            <div class="pull-left">
              <button class="btn btn-block btn-gray">取消</button>
            </div>
            <div class="pull-left">
              <button class="btn btn-block btn-green" @click="unwechat">确认</button>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" :class="{active:isphone,in:isphone}" id="Phone">
          <div class="unbundle-content">
            <p>您确定要解绑手机号吗？</p>
            <p>解除后，您不能使用这个手机号登录此账号。</p>
          </div>
          <div class="buttons container">
            <div class="pull-left">
              <button class="btn btn-block btn-gray">取消</button>
            </div>
            <div class="pull-left">
              <button class="btn btn-block btn-green" @click="unphone">确认</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  export default {
    name: 'unbundle',
    components:{
      Topheader
    },
    data() {
      return {
        Hdata:{
          title:'解绑',
        },
        isphone:false,
      }
    },
    methods: {
      GetQueryString:function (name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.hash.replace("#","").split("?")[1].match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      },
      unwechat:function () {
        g.ajax({
          type: 'POST',
          url: g.url.format('/account/unBindWebChat'),
          success: function (result) {
            if(result.statusCode==0){
              g.box.waiting({
                title:'解除绑定微信成功！',
                closeDiv:function () {
                  g.window.loginOut(g.url.urlHref('/'));
                }
              })
            }else{
              g.box.alert({
                errorMess:result.errorMsg
              });
            }
          }
        });
      },
      unphone:function () {
        g.ajax({
          type: 'POST',
          url: g.url.format('/account/unBindTel'),
          success: function (result) {
            if(result.statusCode==0){
              g.box.waiting({
                title:'解除绑定手机成功！',
                closeDiv:function () {
                    g.window.loginOut(g.url.urlHref('/'));
                }
              })
            }else{
              g.box.alert({
                errorMess:result.errorMsg
              });
            }
          }
        });
      }
    },
    mounted: function () {
//      alert(g.storage.get("token"));
      var _this = this;
      var name =_this.$options.methods.GetQueryString("name");
      if(name=='phone'){
        _this.isphone = true;
      }else{
        _this.isphone = false;
      }

    }
  }
</script>
<style scoped>
  @import '../../assets/css/unbundle.css';
</style>
