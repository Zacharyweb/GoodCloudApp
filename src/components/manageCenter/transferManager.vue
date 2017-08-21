<template>
  <div id="transferManager">
    <Topheader :Hdata="Hdata"></Topheader>

    <div class="transferManager-container container-gray">
      <div class="chooseManage">选择成为店长的导购</div>
      <ul class="guideInfo">
        <li v-for="infor in information">
          <span class="number">{{infor.Tel}}</span>
          <span class="name">{{infor.NickName}}</span>
          <label class="radio"><input type="radio" name="inforId" :value="infor.Id" v-model="picked"><i></i></label>
          <p class="time">添加时间：2016-03-22</p>
        </li>
      </ul>
      <div class="reset" @click="transfer(picked)" >转让店长</div>
    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  import BCard from '../common/card'
  export default {
    name: 'transferManager',
    components:{
      Topheader,
    },
    data() {
      return {
        Hdata:{
          title:'转让店长',
        },
        information:[],
        picked:''
      }
    },
    methods: {
      loginout:function () {
        g.window.loginOut(g.url.urlHref('/'));
      },
      getguide:function (self) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/account/getShopUser'),

          success: function (result) {
            if(result.statusCode==0){
              self.information = result.data;
            }else{
              g.box.waiting({
                title:result.errorMsg
              })
            }
          }
        });
      },
      transfer:function (id) {
        let that = this;
        g.ajax({
          type: 'POST',
          url: g.url.format('/account/changeShopLeader'),
          data:{id:id},
          success: function (result) {
            if(result.statusCode==0){
              g.window.loginOut(g.url.urlHref('/'));
            }else{
              g.box.waiting({
                title:result.errorMsg
              })
            }
          }
        });
      }
    },
    mounted:function () {
      this.$options.methods.getguide(this);
    }
  }
</script>
<style scoped>
  @import '../../assets/css/transferMannager.css';
</style>
