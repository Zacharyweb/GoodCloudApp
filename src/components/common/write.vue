<template>
  <div id="write">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="write-container container-gray">
      <div class="content" v-if="input">
        <div class="inputmode-content">
          <!--<input-item :input-mode="message" ></input-item>-->
          <input-item  placeholder="请输入" classname="content-input" type="text" id="shopName" v-model="message" ></input-item>
        </div>
        <!--<input type="text" class="content-input" placeholder="请输入" v-model="message" :value="message">
        <div class="close" v-show="message" @click="cleartext">&times;</div>-->
      </div>
      <div class="content" v-if="textarea">
        <textarea class="textarea-input" v-model="message" maxlength="50">{{message.inputmodel}}</textarea>
        <!--<div class="close" v-show="message" @click="cleartext">&times;</div>-->
        <div class="text-length">{{50-message.length}}</div>
      </div>
      <div class="container">
        <button class="btn btn-green btn-normal btn-block" v-if="message" @click="save">保存</button>
        <button class="btn btn-green btn-normal btn-block" v-else disabled>保存</button>
      </div>

    </div>
  </div>
</template>
<script>
  import Topheader from './headerNew'
  let obj;
  export default {
    name: 'write',
    components: {
      Topheader,
    },
    data() {
      return {
        Hdata: {
          title: '',
          back:function () {
            g.window.closeWithData();
          },
        },
        input:true,
        textarea:false,
        /*message:{
          inputmodel: "",
          attribute:{
            type:"text",
            class:"content-input",
            placeholder:"请输入",
          }
        },*/
        message:'',
        ajaxurl:'',
        type:''
      }
    },
    methods: {
      GetQueryString:function (name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.hash.replace("#","").split("?")[1].match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      },
      save:function () {
        var self = this;
        if(self.ajaxurl){
            alert("修改手机号功能待定");
            return false;
        }
        g.ajax({
          type: 'POST',
          url: g.url.format('/account/updateUserOuthers'),
          data:{text:self.message,type:self.type},
          success: function (result) {
            if(result.statusCode==0){
              switch (self.type){
                case '0':
                  obj.data.nickName=self.message;
                  break;
                case '2':
                  obj.data.wechat=self.message;
                  break;
                case '3':
                  obj.data.remark=self.message;
                  break;
              }
              g.storage.set("token",JSON.stringify(obj));
              g.window.closeWithData();
            }else{
              g.box.alert({
                errorMess:result.errorMsg
              })
            }
          }
        });

      },
      inputclick:function (_this,) {

      }
    },
    mounted:function () {
        var _this = this;
      obj = g.storage.getUserInfo();
      var type =_this.$options.methods.GetQueryString("type");
      var name =_this.$options.methods.GetQueryString("name");
      _this.message = obj.data[name];
      switch (type){
        case 'input':
          _this.input=true;
          _this.textarea=false;
          break;
        case 'textarea':
          _this.textarea=true;
          _this.input=false;
          break;
        default:
          _this.input=true;
          _this.textarea=false;
          break
      }
      switch (name){
        case 'nickName':
          _this.Hdata.title = '姓名';
          _this.type ='0';
          break;
        case 'wechat':
          _this.Hdata.title = '微信号';
          _this.type ='2';
          break;
        case 'remark':
          _this.Hdata.title = '自我介绍';
          _this.type ='3';
          break;
        default:
          break
      }
    }
  }

</script>
<style>
  /*输入框*/
  .write-container .content{
    margin: 10px 0px;
    position: relative;
  }
  .write-container .content .inputmode-content{
    height: 45px;
    background: #fff;
    border:0;
    padding: 0px 15px;
  }
  .write-container .content .inputmode-content .content-input{
    padding: 0px;
    height: 45px;
    background: #fff;
    border:0;
  }
  .write-container .content input,.write-container .content textarea{
    width: 100%;
  }

  .write-container .content .textarea-input{
    height: 100px;
    background: #fff;
    border:0;
    padding: 10px 15px;
  }
  .write-container button{
    height: 45px;
  }
  .write-container .text-length{
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
</style>
