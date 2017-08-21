<template>
  <div id="buildCityFlows">
<!--     <Headertab :Htabdata="Htabdata"></Headertab> -->
    <Datepicker :Dpdata="Dpdata" @initfinish="dateChange" @datechange="dateChange" @toprevdate="dateChange" @tonextdate="dateChange"></Datepicker>
    <div class="page-content">
      <h4 class="my-rank">我的排名</h4>
      <div class="my-guider-card">
        <img class="my-avatar-img" :src="myBaseMsg.img || '../../../static/pic.png'">
        <div class="my-rank-msg">
         <p class="my-rank-result"><span>{{myMsg.UserCount || 0}}</span>人</p>
         <p class="rank-explain">当日为卖场带客人数</p>
        </div>
      </div>
      <h4 class="others-rank">其他人排名</h4>
      <div class="ranking-list-wrapper">
        <ul class="ranking-list">
          <li class="ranking-list-item" v-for="(guide,index) in rankList">
            <span class="rank-num font-black" :class="{'font-green':guide.Rank<=3}">{{guide.Rank}}</span>
            <span class="rank-bonus">{{guide.Money?guide.Money:''}} <i class="iconfont icon-qian" v-if="guide.Rank<=3"></i></span>
            <span class="nick-name">{{guide.GuideName}}</span>
            <span class="induced-flow">{{guide.UserCount}}人</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  // import Headertab from '../common/headerTab'
  import Datepicker from '../common/datePicker'
  export default {
    name: 'buildCityFlows',
    components:{
      // Headertab,Datepicker
      Datepicker
    },
    data() {
      return {
        // Htabdata:{tabList:[{text:'建材城流量',tabhash:'/buildCityFlows'},{text:'门店流量',tabhash:'/shopFlows'}], nowTab:0 },
        Dpdata:{
          isTop:true
        },
        myMsg:{},
        myBaseMsg:{},
        rankList:[]
      }
    },
    methods: {
        getInitData:function(timeStamp){
          var vm = this;
          g.ajax({
              type: "get",
              url: g.url.format('/api/shared/getOrgGuideShared'),
              data: {current:timeStamp},
              dataType: "json",
              success: function(result) {
                 console.log(result);
                 vm.myMsg = result.data || {};
              }
          });
          g.ajax({
              type: "get",
              url: g.url.format('/api/shared/summaryAppOrgGuideShared'),
              data: {current:timeStamp,top:30},
              dataType: "json",
              success: function(result) {
                 vm.rankList = result.data || [];
              }
          });
        },
        dateChange:function(timeStamp){
          this.getInitData(timeStamp);
        }
    },
    mounted:function (){
       var obj = g.storage.getUserInfo();
       var information = obj.data;
       this.myBaseMsg = information;
    }
  }
</script>
