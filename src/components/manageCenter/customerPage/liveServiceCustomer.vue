<template>
  <div class="temp-wrapper">
    <Topheader :Hdata="Hdata"></Topheader>
    <p class="help-text">怎么联系这些客户效果最好<span class="iconfont icon-tishi"></span></p>
    <Customerlist :customer-list-data="customerListData" v-if="!noCustomer"></Customerlist>
    <div class="blank-page-block blank-page-block1" v-if="noCustomer">
     <p class="no-customer-text">暂时没有直播服务过的客户</p>
     <p>
       <img src="../../../../static/cry.png">
     </p>
   </div>
   <div class="blank-page-block blank-page-block2" v-if="noCustomer">
     <p>多年经验的金牌导购告诉我们，主动留电话的客户，都是最可能成交的；主动留电话的客户越多，我们成交的机会越大。</p>
     <p class="font-bold">如何利用“好云商”让更多客户主动留电话 ？</p>
     <p>1、您的头像和个人简介是门面，一定要完善<span class="font-green" @click="toFinishMsg"><i class="iconfont icon-lianjie"></i>去完善</span></p>
     <p>2、拍摄并上传更多客户感兴趣的优质视频<span class="font-green" @click="toFinishVideo"><i class="iconfont icon-lianjie"></i>去完善</span></p>
     <p>3、分享更多优质视频给客户<span class="font-green" @click="toShareVideo"><i class="iconfont icon-lianjie"></i>去完善</span></p>
   </div>
  </div>
</template>
<script>
  import Topheader from '../../common/headerNew.vue'
  import Customerlist from '../../common/customerList.vue'
  export default {
    name: 'liveServiceCustomer',
    components:{
      Topheader,Customerlist
    },
    data() {
      return {
        Hdata:{
          title:'直播服务过的客户',
          right:false,
        },
        customerListData:{
          type:1,
          list:[]
        },
        noCustomer:false
      }
    },
    methods: {
      toFinishMsg:function(){

      },
      toFinishVideo:function(){

      },
      toShareVideo:function(){

      },
      getMyServiceList:function(){
         // this.customerListData.list =[{NickName:'我的哈哈',Phone:'15757177498',Status:2,Img:'../../../static/pic.png',Id:'',Ctime:'04/05 07:18'},
         //                              {NickName:'你的哈哈',Phone:'15757177498',Status:1,Img:'../../../static/pic.png',Id:'',Ctime:'04/05 07:19'}];
         var _this = this;
         g.ajax({
           type: 'POST',
           url: g.url.format('/guide/getMyServiceList'),
           data:{pageIndex:1,pageSize:10},
           success: function (result) {
            if(_this.pageIndex == 1 && result.data.length == 0){
              _this.noCustomer = true;
              return;
            };
            result.data.forEach(function(item,i){
              item.Img = g.url.imgFormat(item.Img,null,null,0);
              item.Ctime = item.CreateTime.dateFormat('MM/dd hh:mm');
            })
             _this.customerListData.list = result.data;
           }
         });
      }
    },
    mounted:function () {
      this.getMyServiceList();
    }
  }
</script>
<style scoped>
  @import '../../../assets/css/customerPage/liveServiceCustomer.css';
</style>
