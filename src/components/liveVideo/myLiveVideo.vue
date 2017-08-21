<template>
  <div id="myLiveVideo">
    <div class="user-should-know">
        <h4 v-show="currentStatus != 0">用户须知</h4>
        <div class="user-text" v-if="currentStatus == 1">
          <div>亲爱的导购/店长，这里是好运商的直播服务平台。直播服务，可以很好的帮我们解决邀约客户到店难的问题。</div>
          <div>开启直播服务后</div>
          <div>1、客户在看到您分享的产品短视频、全景展厅等内容，有购买意愿时，能第一时间联系到您。</div>
          <div>2、通过直播，您可以为客户更好的展示产品，让客户感受到亲临门店般的体验，再约客户到店，更有利于成交。</div>
        </div>

        <div class="user-text" v-if="currentStatus != 1">
          <div>亲爱的导购/店长，直播服务需要启用在线状态。下面为您讲解关于在线状态的一些注意事项。</div>
          <div>1、启用在线状态后，客户看了您分享的内容产生购买意愿时，就能第一时间向您发起视频通话。</div>
          <div>2、为了对客户负责，拒接直播请求，或一分钟内没有接听，会被强制下线并处以一定罚金，罚金会以红包的形式补偿给客户。</div>
          <div>3、对于特殊状况而错过接听的客户，您可以在管理中心-直播服务过的客户里找到并重新联系他。</div>
          <div>4、如果不能保证及时接通客户的直播请求，请停用在线状态，以免客户对您和本店产生不好的印象。</div>
        </div>

    </div>
    <div class="my-action-box">
     <!--  <Loadingicon v-if="isLoading">状态读取中</Loadingicon> -->
      <div class="pay-bond-tips" v-if="currentStatus == 1 ">
        <h5><span>提示</span></h5>
        <p class="pay-bond-tips-text">如果您要使用在线直播的功能，必须要缴纳50元保证金，保证金随时可退。</p>
        <p class="btn-wrapper" @click="toPayBond"><span class="btn-green btn-normal">缴纳保证金</span></p>
        <p class="why-pay-bond">为什么需要缴纳保证金<span class="iconfont icon-tishi"></span></p>
      </div>
      <div class="open-online-status" v-if="currentStatus != 1 && currentStatus != -1">
        <p class="need-pay-fine-tips" v-if="currentStatus == 4">处理完罚金后，才能启用在线状态</p>
        <transition name="status-btn-toggle">
          <p class="btn-wrapper" v-if="currentStatus == 2 || currentStatus == 4" @click="openOnline"><span class="btn-white-light btn-normal" :class="{'disabled':currentStatus == 4}">启用在线状态</span></p>
          <p class="btn-wrapper" v-if="currentStatus == 3" @click="closeOnline"><span class="btn-red btn-normal">已在线，停用在线状态</span></p>
        </transition>
        <p class="extra-tab">
          <span class="history-live-record">历史直播记录</span>
          <span class="about-bond" @click="toBondPage">保证金相关</span>
        </p>
      </div>
    </div>

  </div>
</template>
<script>
  import Loadingicon from '../common/loadingIcon.vue'
  export default {
    name: 'myLiveVideo',
    components:{
      Loadingicon
    },
    data() {
      return {
        currentStatus:0,
        isLoading:false
      }
    },
    methods: {
        getInitData:function(){
          var vm = this;
          this.getGuideBandCashStatus();
        },
        getGuideBandCashStatus:function(){
            var _this = this;
            _this.isLoading = true;
            g.ajax({
              type: 'POST',
              url: g.url.format('/guide/getGuideBandCashStatus'),
              data:{},
              success: function (result) {
                  _this.currentStatus = result.data;
                  // _this.currentStatus = 2;
                  _this.isLoading = false;
              }
            });
        },
        updateGuideUpStatus:function(type){
          var _this = this;
          _this.isLoading = true;
          g.ajax({
            type: 'POST',
            url: g.url.format('/guide/updateGuideUpStatus'),
            data:{type:type},
            success: function (result) {
                if(result.data == 1){
                  _this.currentStatus = _this.currentStatus == 2 ? 3 : 2 ;
                  _this.isLoading = false;
                }else{
                  g.box.waiting({'title':'返回错误码 '+ result.data});
                }
            }
          });
        },
        toPayBond:function(){
          var _this = this;
          $.ajax({
             type:'POST',
             headers: {
              Accept: "application/json;charset=utf-8",
              "Content-Type": "application/json",
              token:g.storage.getToken()
            },
            url:g.url.format('/prepay'),
            data:JSON.stringify({btype:4}),
            success:function(data){
              var _data= JSON.stringify(data)
              gkee.weixinpay(_data,function(result){
                alert(result);
                if(result == 1){
                   _this.currentStatus = 2;
                }else{
                  g.box.waiting({'title':'支付失败'})
                }
              });
            },
            async:true
          });
        },
        openOnline:function(){
          if(this.currentStatus == 4){
              alert('请先缴纳罚金');
              return;
          }
          this.updateGuideUpStatus(1);
        },
        closeOnline:function(){
          this.updateGuideUpStatus(0);
        },
        toBondPage:function(){
          g.window.openNew(g.url.urlHref("/aboutBond"),"aboutBond");
        }
    },
    // watch:{
    //   currentStatus:function(newStatus){
    //        console.log(newStatus);
    //   }
    // },
    mounted:function (){
       this.getInitData();
        var obj = g.storage.getUserInfo();
       // var information = obj.data;
       // this.myBaseMsg = information;
    }
  }
</script>
<style>
  #myLiveVideo .user-should-know{ padding-top: 75px; padding-bottom: 20px!important;}
  .user-text{ padding: 4px 6.67% 0 6.67%;}
  .user-text > div{ line-height: 20px; margin-bottom: 8px;}
</style>
