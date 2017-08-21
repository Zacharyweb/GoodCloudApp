<template>
  <div id="invitation">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="manage-container container-gray">
      <div class="already">
        <div class="invitblock active" v-if="alreadyInvitation.length">
          <div class="btn btn-red-o">您当前加入的建材城</div>
          <div class="content">
            <h4 class="title">{{alreadyInvitation[0].Name}}</h4>
            <div class="text">
              <p><i class="icon iconfont icon-dingwei"></i>{{alreadyInvitation[0].Addrees||'暂时没有地址'}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="invitation"v-if="!alreadyInvitation.length">
        <div class="invitblock" v-for="invit in Invitation">
          <div class="invittitle"><span>{{invit.Name}}</span>建材城邀请您参加</div>
          <div class="content">
            <h4 class="title">{{invit.Name}}</h4>
            <div class="text">
              <p><i class="icon iconfont icon-dingwei"></i>{{invit.Addrees}}</p>
            </div>
          </div>
          <button class="btn btn-green btn-small pull-right" @click="acceptOrganizeShop(invit.OrganizeShopId)">确认加入</button>
          <div class="clearfix"></div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  var obj;
  export default {
    name: 'activity',
    components:{
      Topheader
    },
    data() {
      return {
        Hdata:{
          title:'建材城',
        },
        alreadyInvitation:[],
        Invitation:[]
      }
    },
    methods: {
      alreadyInvitation:function (_this) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/organize/getOrganizeInvitation'),
          data:{type:1,status:1},
          success: function (result) {
            if(result.statusCode == 0){
              _this.alreadyInvitation = result.data;
            }else{
                alert(result.errorMsg);
            }
          }
        });
      },
      Invitation:function (_this) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/organize/getOrganizeInvitation'),
          data:{type:1,status:0},
          success: function (result) {
            if(result.statusCode == 0){
              _this.Invitation = result.data;
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      acceptOrganizeShop:function (id) {
        g.ajax({
          type: 'POST',
          url: g.url.format('/organize/acceptOrganizeShop'),
          data:{id:id},
          success: function (result) {
            if(result.statusCode == 0){
              g.box.waiting({
                title:'确认成功！',
                closeDiv:function () {
                  g.window.close();
                }
              })
            }else if(result.statusCode == -6003){
              g.box.alert({
                title:'说明',
                errorMess:' <div>&nbsp; &nbsp; &nbsp; &nbsp;为了保证公平公正，促进平台的健康发展，维护门店及广大客户的利益，加入建材城的门店需要缴纳保证金。</div>'+
                '<br/>'+
                '<div>&nbsp; &nbsp; &nbsp; &nbsp;缴纳保证金后，门店的全部短视频、全景展厅、活动信息，均会显示到建材城APP上，并开通分享、流量PK等功能，支持门店间相互引流。</div>'+
                '<br/>'+
                '<div>&nbsp; &nbsp; &nbsp; &nbsp;关店时，保证金可全额返还。<br/></div>',
                submitName:'去支付保证金',
                submitCallBack:function () {
                  alert("去支付");
                }
              })
            }else{
              alert(result.errorMsg);
            }
          }
        });
      }
    },
    mounted: function () {
      var _this = this;
      obj = JSON.parse(g.storage.get('token'));
      _this.$options.methods.alreadyInvitation(_this);
      _this.$options.methods.Invitation(_this);
    }
  }
</script>
<style scoped>
  .invitblock{ background: #fff; margin-top: 10px; padding: 10px 8px;}
  .invitblock.active .content{ padding: 15px 23px 0px;}
  .invitblock.active .content .title{ font-size: 24px;}
  .invitblock .content .title{ font-size: 18px;}
  .invitblock .content{ padding: 26px 30px 0px;}
  .invitblock .content .text{ margin-top: 20px;}
  .invitblock .content .text p .icon{ color: #37bc9b}
  .invitblock .invittitle{ height: 34px; line-height: 34px; margin: 0px 17px; border-bottom:1px #EBEBEB solid; text-align: center; font-size: 15px; color: #999;}
  .invitblock .invittitle span{ color: #333; margin-right: 5px;}
  .invitation .btn-small{ padding: 6px 0px; min-width: 71px;}
</style>
