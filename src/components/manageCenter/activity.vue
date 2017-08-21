<template>
  <div id="activity">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="manage-container container-gray">
      <ul class="nav nav-tabs nav-tabs-new">
        <li class="active"><a href="#join" data-toggle="tab">已参加活动</a></li>
        <li><a href="#invite" data-toggle="tab">活动邀请</a></li>
      </ul>
      <div id="myTabContent" class="tab-content">
        <div class="tab-pane fade" id="invite">
          <ul class="myTab-list">
            <li v-for="invite in invitelist">
              <div class="title">{{invite.OrganizeName}}<span>邀请您参加</span></div>
              <div class="myTab-list-content">
                <div class="myTab-list-content-title">{{invite.ActiveName}}</div>
                <p><span class="icon icon-clock"></span>{{invite.RelBeginTime}} 至 {{invite.RelEndTime}}</p>
                <p><span class="icon icon-mark"></span>{{invite.Address}}</p>
              </div>
              <button class="btn btn-green btn-small pull-right" @click="attend(invite.Id)">确认参与</button>
              <div class="clearfix"></div>
            </li>
          </ul>

        </div>
        <div class="tab-pane fade in active" id="join">
          <ul class="myTab-list">
            <li class="list-active" v-if="activeshow">
              <div class="title">
                <div class="list-active-show btn-red-o">当前活动</div>
                {{activeinvite.OrganizeName}}
              </div>
              <div class="myTab-list-content">
                <div class="myTab-list-content-title">{{activeinvite.ActiveName}}</div>
                <p><span class="icon"></span>{{activeinvite.RelBeginTime}} 至 {{activeinvite.RelBeginTime}}</p>
                <p><span class="icon"></span>{{activeinvite.Addrees}}</p>
              </div>
              <div class="clearfix"></div>
            </li>
            <li v-for="join in joinlist">
              <div class="title">{{join.OrganizeName}}</div>
              <div class="myTab-list-content">
                <div class="myTab-list-content-title">{{join.ActiveName}}</div>
                <p><span class="icon"></span>{{join.RelBeginTime}} 至 {{join.RelBeginTime}}</p>
                <p><span class="icon"></span>{{join.Addrees}}</p>
              </div>
              <button class="btn btn-green btn-small pull-right" @click="changeActive(join.Id)">切换活动</button>
              <div class="clearfix"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  export default {
    name: 'activity',
    components:{
      Topheader
    },
    data() {
      return {
        Hdata:{
          title:'参加活动',
        },
        joinlist:[{}],
        invitelist:[{}],
        activeinvite:{},
        activeshow:false
      }
    },
    methods: {
      getJoinList:function (self) {
          var that = this;
        if(!self){
          self = this;
        }
        g.ajax({
          type: 'GET',
          url: g.url.format('/account/getCjAcitveShop'),
          success: function (result) {
              let list = result.data,array =[];
              for(let i = 0;i<list.length;i++){
                list[i].RelBeginTime = list[i].RelBeginTime.dateFormat('yyyy-MM-dd h:m');
                list[i].RelEndTime = list[i].RelEndTime.dateFormat('yyyy-MM-dd h:m');
                if(list[i].IsCurrent==0){
                  array.push(list[i])
                }else{
                  self.activeinvite = list[i];
                  self.activeshow = true;
                }
              }
            self.joinlist = array;
            console.log("self.joinlist:信息是"+JSON.stringify(self.joinlist));
            console.log("self.activeinvite:信息是"+JSON.stringify(self.activeinvite));
          }
        });
      },
      changeActive:function (id) {
          var self = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/account/changeActiveShop'),

          data:{id:id},
          success: function (result) {
            self.getJoinList();
          }
        });
      },
      getInviteList:function (self) {
          let that = this;
          if(!self){
              self = this;
          }
        g.ajax({
          type: 'GET',
          url: g.url.format('/account/getInvitationAcitveShop'),
          success: function (result) {
            let list = result.data;
            for(let i = 0;i<list.length;i++){
              list[i].RelBeginTime = list[i].RelBeginTime.dateFormat('yyyy-MM-dd h:m');
              list[i].RelEndTime = list[i].RelEndTime.dateFormat('yyyy-MM-dd h:m');
            }
            self.invitelist = list;
          }
        });
      },
      attend:function (id) {
          var self = this;
        g.ajax({
          type: 'POST',
          url: g.url.format('/account/acceptActiveShop'),

          data:{id:id},
          success: function (result) {
            if(result.statusCode==0) {
              self.getInviteList();
              self.getJoinList();
            }
          }
        });
      }
    },
    mounted: function () {
      this.$options.methods.getJoinList(this);
      this.$options.methods.getInviteList(this);
    }
  }
</script>
<style scoped>
  @import '../../assets/css/activity.css';
</style>
