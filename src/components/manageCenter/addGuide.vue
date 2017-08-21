<template>
  <div id="addGuide">
    <Topheader :Hdata="Hdata"></Topheader>

    <div class="container-gray" v-if="!successShow">
      <!--添加导购-->
      <ul class="shoppingGuide-nameTel">
        <li class="name">
          <span>姓名</span>
          <input type="text" placeholder="导购姓名" v-model="uName" :value="uName">
          <!--<b>获取验证码</b>-->
        </li>
        <li class="Tel">
          <span>手机号</span>
          <input type="text" placeholder="请输入手机号" v-model="tel" :value="tel">
        </li>
      </ul>
      <div class="container">
        <button class="btn btn-normal btn-block btn-green" :class="{disabled:!(uName&&tel)}" :disabled="!(uName&&tel)" @click="addShopGuide">保存</button>
      </div>
    </div>

      <!--添加导购成功-->
    <div class="container-gray" v-if="successShow">
      <div class="Add-shoppingguide-succeed" >
        <span>恭喜添加导购成功</span>
        <p>
          请通知[导购名称]完成激活动作：<br/>
          1、让导购下载APP并注册成用户；<br/>
          2、进入管理中心-变更身份；<br/>
          3、确认身份并激活成功；
        </p>
      </div>
      <div class="container">
        <button class="btn btn-normal btn-block btn-green ContinueAdding" @click="continueAdd">继续添加</button>
        <button class="btn btn-normal btn-block btn-green-o ContinueAdding" @click="back">我知道了，返回导购管理</button>
      </div>

    </div>

    </div>


</template>
<script>
  import Topheader from '../common/headerNew'
  export default {
    name: 'addGuide',
    components:{
      Topheader,
    },
    data() {
      return {
        Hdata:{
          back:this.back,
          title:'添加导购'
        },
        uName:'',
        tel:'',
        successShow:false
      }
    },
    methods: {
      addShopGuide:function () {
        var that = this;
        if(!g.validate.isPhone(that.tel)){
            return ;
        }
        g.ajax({
          type: 'POST',
          url: g.url.format('/account/addShopGuide'),
          data:{uName:that.uName,tel:that.tel},
          success: function (result) {
            if(result.statusCode==0){
              g.box.waiting({
                title:'新增导购成功！',
                closeDiv:function () {
                  that.successShow=true;
                }
              })
            }else{
              g.box.waiting({
                title:result.errorMsg
              })
            }
          }
        });
      },
      continueAdd:function () {
        this.successShow=false;
        this.uName = '';
        this.tel = '';
      },
      back:function () {
        g.window.closeWithData();
      }
    },
    mounted:function () {
    }
  }
</script>
<style scoped>
  @import '../../assets/css/shoppingGuide.css';
</style>
