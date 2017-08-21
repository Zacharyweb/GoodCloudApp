<template>
  <div id="shopFlows">
<!-- <Headertab :Htabdata="Htabdata"></Headertab> -->
    <Datepicker :Dpdata="Dpdata" @initfinish="dateChange" @datechange="dateChange" @toprevdate="dateChange" @tonextdate="dateChange"></Datepicker>
    <div class="page-content">
      <h3>当日有<span class="font-red">{{shopTotalView}}</span>人次逛了您的门店
          <i class="iconfont icon-tishi"></i>
      </h3>
      <div class="guider-flows-list-wrapper">
        <ul class="guider-flows-list">
          <li class="guider-flows-list-item" v-for="item in resultList">
            <span class="nick-name">{{item.NickName}}</span>
            <p>让<span class="font-red">{{item.totalUser}}</span>个消费者<span class="font-red">{{item.totalView}}</span>次浏览门店</p>
          </li>
        </ul>
         <div class="other-guider-achievement">
            <span class="nick-name">其他推广员</span>
            <p>让<span class="font-red">{{othersGuide.totalUser}}</span>个消费者<span class="font-red">{{othersGuide.totalView}}</span>次浏览门店</p>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Headertab from '../common/headerTab'
  import Datepicker from '../common/datePicker'
  export default {
    name: 'shopFlows',
    components:{
      // Headertab,Datepicker
      Datepicker
    },
    data() {
      return {
        // Htabdata:{tabList:[{text:'建材城流量',tabhash:'/buildCityFlows'},{text:'门店流量',tabhash:'/shopFlows'}], nowTab:1 },
        Dpdata:{
          isTop:true
        },
        resultList:[],
        shopId:0,
        shopTotalView:0,
        othersGuide:{},
      }
    },
    methods: {
      getInitData:function(timeStamp){
          var vm = this;
        g.ajax({
              type: "get",
              url: g.url.format('/api/shared/getShopTotal'),
              data: {shopId:vm.shopId,current:timeStamp},
              dataType: "json",
              success: function(result) {
                vm.shopTotalView = result.data || 0;
              }
          });
        g.ajax({
              type: "get",
              url: g.url.format('/api/shared/summaryGuideShared'),
              data: {shopId:vm.shopId,current:timeStamp},
              dataType: "json",
              success: function(result) {
                 vm.resultList = result.data.guide;
                 vm.othersGuide = result.data.other[0];
              }
          });
      },
      dateChange:function(timeStamp){
        this.getInitData(timeStamp);
      }
    },
    mounted:function () {
      var obj = g.storage.getUserInfo();
      var information = obj.data;
    }
  }
</script>
