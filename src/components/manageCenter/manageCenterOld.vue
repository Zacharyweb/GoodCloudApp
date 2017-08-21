<template>
  <div id="manageCenter">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="manageCenter-container container-gray">
      <div class="people">
        <div class="people-img"><img :src="information.img?information.img:'people.png'"></div>
        <div class="people-information">
          <div class="name">{{information.nickName}}</div>
          <div class="phone"><div class="icon-phone"></div>{{information.phone}}</div>
        </div>
        <div class="people-editor" @click="editor">
          编辑名片<span class="icon-right"></span>
        </div>
      </div>
      <div class="current">
        <ul>
          <li>
            <span class="current-lable">当前身份</span>
            <span class="current-text">{{information.utype||'您暂时还没有身份'}}</span>
          </li>
          <li>
            <span class="current-lable">参加的活动</span>
            <!--<span class="current-text" @click="activity">{{attendactivity||'您暂时还没有参加活动'}}</span>-->
            <span class="current-text">新版本去除了该功能</span>
          </li>
        </ul>
      </div>
      <div class="permissions">
        <ul class="list-group new-list-group">
          <li class="list-group-item" v-if="showpart.a" @click="transfer">
            <i class="icon icon-1"></i>转让店长
          </li>
          <li class="list-group-item" v-if="showpart.b" @click="guide">
            <i class="icon icon-2"></i>导购管理
          </li>
          <li class="list-group-item" v-if="showpart.c" @click="openShop">
            <i class="icon icon-3"></i>申请开店
          </li>
          <li class="list-group-item" v-if="showpart.j" @click="modifyShop">
            <i class="icon icon-3"></i>查看编辑门店
          </li>
          <li class="list-group-item" v-if="showpart.d"  @click="identity">
            <i class="icon icon-4"></i>身份变更
          </li>
          <li class="list-group-item" v-if="showpart.k"  @click="Invitation">
            <i class="icon icon-4"></i>建材城的邀请
          </li>
        </ul>
        <ul class="list-group new-list-group">
          <li class="list-group-item" v-if="showpart.e" @click="not">
            <i class="icon icon-5"></i>参加的活动
          </li>
          <li class="list-group-item" v-if="showpart.f" @click="not">
            <i class="icon icon-6"></i>用户签到
          </li>
          <li class="list-group-item" v-if="showpart.g" @click="not">
            <i class="icon icon-7"></i>团购兑奖
          </li>
          <li class="list-group-item"  @click="order"><!--v-if="showpart.h"-->
            <i class="icon icon-8"></i>订单/全额抵用券
          </li>
        </ul>
        <ul class="list-group new-list-group">
          <li class="list-group-item" v-if="showpart.i" @click="not">
            <i class="icon icon-9"></i>直播间
          </li>
        </ul>
        <ul class="list-group new-list-group">
          <li class="list-group-item" @click="unbundle()">
            <i class="icon icon-9"></i>解绑微信和手机
          </li>
          <li><button class="btn btn-block btn-green text-center" @click="sys">扫一扫</button></li>
        </ul>

         <ul class="list-group new-list-group">
          <li class="list-group-item" @click="flowsPK()">
            <i class="icon icon-9"></i>流量PK
          </li>
           <li class="list-group-item" @click="myIncome()">
              <i class="icon icon-9"></i>我的推广收益
            </li>
               <li class="list-group-item" @click="liveVideo()">
              <i class="icon icon-9"></i>直播视频
            </li>
           </li>
           <li class="list-group-item" @click="hallList">
             <i class="icon icon-9"></i>全景展厅列表
           </li>
           <li class="list-group-item" @click="ceshi">
             <i class="icon icon-9"></i>测试
           </li>
        </ul>
      </div>
    </div>

    <!--<button @click="loginout" style="height: 50px; width:100px;     position: absolute; bottom: 10px;">退出登录</button>-->

  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  let obj;
  export default {
    name: 'manageCenter',
    components: {
      Topheader
    },
    data() {
      return {
        Hdata:{
          title:'管理中心',
          theme:'green',
          lefthide:true,
        },
        information:{},
        attendactivity:'',
        showpart:{
            a:true,b:true,c:true,d:true,e:true,f:true,g:true,h:true,i:true,j:true,k:true
        }
      }
    },
    methods:{
      editor:function () {
        g.window.openNew(g.url.urlHref("/businessCard"),"businessCard");
      },
      identity:function () {
        g.window.openNew(g.url.urlHref("/identity"),"identity");
      },
      activity:function () {
        g.window.openNew(g.url.urlHref("/activity"),"activity");
      },
      loginout:function () {
        g.window.loginOut(g.url.urlHref('/'));
      },
      getActity:function (self) {
        $.ajax({
          type: 'GET',
          url: g.url.format('/account/getCjAcitveShop'),
          success: function (result) {
            if(result.statusCode==0){
              let list = result.data;
              for(let i = 0;i<list.length;i++){
                if(list[i].IsCurrent==1){
                  self.attendactivity = list[i].ActiveName;
                }
              }
            }else{
              alert(result.errorMsg);
            }

          }
        });
      },
      guide:function () {
        g.window.openNew(g.url.urlHref("/shoppingGuide"),"shoppingGuide");
      },
      openShop:function () {
        g.window.openNew(g.url.urlHref("/openShop"),"openShop");
      },
      transfer:function () {
        g.window.openNew(g.url.urlHref("/transferManager"),"transferManager");
      },
      modifyShop:function () {
        g.window.openNew(g.url.urlHref("/modifyShop"),"modifyShop");
      },
      not:function () {
        alert("该功能待完善")
      },
      unbundle:function (name) {
        if(!name) name = 'phone';
        g.window.openNew(g.url.urlHref("/unbundle?name="+name),"unbundle");
      },
      order:function () {
        g.window.openNew(g.url.urlHref("/orderlist"),"orderlist");
      },
      sys:function () {
        gkee.sacnQr(function (data) {
          //采用统一的凡是
          g.storage.set('sysdata',data);
          g.window.openNew(g.url.urlHref("/orderadd"),"orderadd");
        });
      },
      Invitation:function () {
        g.window.openNew(g.url.urlHref("/invitation"),"invitation");
      },
      flowsPK:function(){
         g.window.openNew(g.url.urlHref("/flowsPK"),"flowsPK");
      },
      myIncome:function(){
        g.window.openNew(g.url.urlHref("/myPromotionIncome"),"myPromotionIncome");
      },
      liveVideo:function(){
        g.window.openNew(g.url.urlHref("/liveVideo"),"liveVideo");
      },
      hallList:function () {
        g.window.openNew(g.url.urlHref("/hallList"),"hallList");
      },
      ceshi:function () {
        g.window.openNew('http://1.1.1.86:8089/#/ceshi?v='+new Date().getTime(),"ceshi");
      }
    },
    mounted:function () {
      let _this = this;
      obj = g.storage.getUserInfo();
      var information =obj.data,arry={},utype='';
      for(let i =0; i< information.userIdentityList.length ;i++){
          let userIdentityList = information.userIdentityList[i];
          if(userIdentityList.isCurrent==1){
              arry=userIdentityList;
          }
      }
      switch(arry.utype){
        case 1:
          utype="本尊";
          break;
        case 2:
          utype="普通消費者";
          _this.showpart={
              c:true,
              d:true,
          }
          break;
        case 3:
          utype="店长";
          _this.showpart={
            a:true,
            b:true,
            j:true,
            d:true,
            e:true,
            k:true,
          }
          break;
        case 4:
          utype="第三方公司管理员";
          break;
        case 5:
          utype="第三方公司普通员工";
          _this.showpart={
            d:true,
            e:true,
            f:true,
            g:true,
            h:true,
            i:true,
          }
          break;
        case 6:
          utype="门店导购";
          _this.showpart={
            b:true,
            d:true,
          }
          break;
        default:
          utype="您暂时还没有身份";
          break;
      }
      information.utype = utype;
      _this.information = information;
//      _this.$options.methods.getactity(_this);
      window.frame_callback =function(){
        obj = g.storage.getUserInfo();
        var information =obj.data,arry={},utype='';
        for(let i =0; i< information.userIdentityList.length ;i++){
          let userIdentityList = information.userIdentityList[i];
          if(userIdentityList.isCurrent==1){
            arry=userIdentityList;
          }
        }
        switch(arry.utype){
          case 1:
            utype="本尊";
            break;
          case 2:
            utype="普通消費者";
            _this.showpart={
              c:true,
              d:true,
            }
            break;
          case 3:
            utype="店长";
            _this.showpart={
              a:true,
              b:true,
              j:true,
              d:true,
              e:true,
              k:true,
            }
            break;
          case 4:
            utype="第三方公司管理员";
            break;
          case 5:
            utype="第三方公司普通员工";
            _this.showpart={
              d:true,
              e:true,
              f:true,
              g:true,
              h:true,
              i:true,
            }
            break;
          case 6:
            utype="门店导购";
            _this.showpart={
              b:true,
              d:true,
            }
            break;
          default:
            utype="您暂时还没有身份";
            break;
        }
        information.utype = utype;
        _this.information = information;
//        _this.$options.methods.getactity(_this);
      }
    }
  }
</script>
<style scoped>
  body{
    background: #000;
  }
  @import '../../assets/css/manageCenter.css';
</style>
