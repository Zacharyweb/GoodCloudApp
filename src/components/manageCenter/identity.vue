<template>
  <div id="identity">
    <Topheader :Hdata="Hdata"></Topheader>

    <div class="identity-container container-gray">
      <ul class="nav nav-tabs nav-tabs-new">
        <li class="active"><a href="#identity-container" data-toggle="tab">已有身份</a></li>
        <li><a href="#invite" data-toggle="tab">来自Ta的邀请</a></li>
      </ul>
      <div id="myTabContent" class="tab-content">
        <div class="tab-pane fade in active" id="identity-container">
          <div class="identity-content-top">
            <div class="identity-active btn-red-o">当前身份</div>
            <div class="content-top">
              <div class="content-top-title">{{toplist.shopName}}</div>
              <div class="content-top-content">
                <div class="content-top-logo"><img :src="toplist.logo"></div>
                <div>{{toplist.utype}}</div>
              </div>
            </div>
          </div>
          <ul class="identity-list">
            <li v-for="listdata in ullist" :id="listdata.id">
              <div class="identity-list-title">{{listdata.shopName}}</div>
              <div class="identity-list-logo"><img :src="listdata.logo"></div>
              <div class="identity-list-identity">{{listdata.utype}}</div>
              <button class="btn btn-small btn-green" v-if="listdata.show" @click="changeIdentity(listdata.id)">切换身份</button>
            </li>
            <div class="clearfix"></div>
          </ul>

        </div>
        <div class="tab-pane fade" id="invite">
          <ul class="identity-list">
            <li v-for="invite in invitelist" :id="invite.Id">
              <div class="identity-list-title">{{invite.ShopName}}</div>
              <div class="identity-list-logo"><img :src="invite.logo"></div>
              <div class="identity-list-identity">成为导购</div>
              <button class="btn btn-small btn-green" @click="invitebtn(invite.Id)">同意</button>
            </li>
            <div class="clearfix"></div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  export default {
    name: 'identity',
    components:{
      Topheader
    },
    data() {
      return {
        Hdata:{
          title:'身份切换',
          back:function () {
            g.window.closeWithData();
          }
        },
        toplist:{},
        ullist:[],
        invitelist:[]
      }
    },
    methods: {
        getIdentity:function () {
          var self = this;
          g.ajax({
            type: 'GET',
            url: g.url.format('/account/getUserIdentity'),
            success: function (result) {
              if(result.statusCode==0){
                var arry =[];
                var data = result.data;
                for(let i=0 ;i<data.length;i++){
                  if(data[i].utype==3||data[i].utype==5||data[i].utype==6){
                    data[i].show = true;
                  }else{
                    data[i].show = false;
                  }
                  switch (data[i].utype){
                    case 1:
                      data[i].utype = "本尊"
                      break;
                    case 2:
                      data[i].utype = "普通消费者"
                      break;
                    case 3:
                      data[i].utype = "店长"
                      break;
                    case 4:
                      data[i].utype = "第三方公司管理员"
                      break;
                    case 5:
                      data[i].utype = "第三方公司普通员工"
                      break;
                    case 6:
                      data[i].utype = "门店导购"
                      break;
                    default:
                      data[i].utype = "什么都不是"
                      break;
                  }
                  data[i].logo = g.url.imgFormat(data[i].logo,150,150,0);
                  if(data[i].isCurrent===1){
                    self.toplist = data[i];
                  }else {
                    arry.push(data[i]);
                  }
                }

                self.ullist = arry;

              }else{
                alert(result.errorMsg);
              }

            }
          });
        },
        getInvite:function () {
          var self = this;
          g.ajax({
            type: 'GET',
            url: g.url.format('/account/getInvitationGuide'),
            success: function (result) {
              if(result.statusCode==0){
                var data = result.data;
                for(let i=0;i<data.length;i++){
                  data[i].logo = g.url.imgFormat(data[i].logo,150,150,1);
                }
                self.invitelist = data;
              }else{
                alert(result.errorMsg);
              }
            }
          });
        },
        changeIdentity:function (id) {
          var that = this;
          g.ajax({
            type: 'GET',
            url: g.url.format('/account/changeUserIdentity'),
            data:{id:id},
            success: function (result) {
              if(result.statusCode==0){
                  that.gettoken(that);
                /*gkee.MsgBox.Toast({
                  type:"Toast",
                  title:"切换成功，稍后自动退出",
                  closeDiv:function () {
                    that.loginout(gkee.locallurl);
                  }
                })*/
              }else{
                alert(result.errorMsg);
              }
            }
          });
      },
        invitebtn:function (id) {
            var that = this;
          g.ajax({
            type: 'POST',
            url: g.url.format('/account/acceptGuide'),
            data:{id:id},
            success: function (result) {
              if(result.statusCode==0){
                that.gettoken(that);
                /*that.getInvite();
                that.getIdentity();*/
              }else{
                alert(result.errorMsg);
              }
            }
          });
        },
        gettoken:function (_this) {
          var unionId = JSON.parse(g.storage.get('token')).data.unionId;
          g.ajax({
            type: 'POST',
            url: g.url.format('/login/getTokenByUnionId'),
            data: {unionId:unionId,appId:gkee.getAappId()},
            success: function (data) {
              if(data.statusCode==0){
                var _data = data.data;
                g.storage.set("token",JSON.stringify(_data));
                gkee.updateLogin(JSON.stringify(_data),"");
                g.window.closeWithData();
              }else{
                alert(data.errorMsg);
              }
            }
          });
        }
    },
    mounted: function () {
      this.getIdentity();
      this.getInvite();
    }
  }
</script>
<style scoped>
  @import '../../assets/css/identity.css';
</style>
