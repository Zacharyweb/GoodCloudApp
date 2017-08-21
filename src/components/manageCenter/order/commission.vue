<template>
  <div id="commission">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="cost-container container-gray">
      <div class="cost-top">
        <div style="width: 100%; height: 110px;">
          <img src="../../../assets/img/commission.png" class="cost-top-img">
        </div>
        <div class="cost-top-text">
          消费者{{commission.Name}}，手机号{{commission.Tel}}，于{{commission.CreateTime}}到商城兑奖联单奖励，总共符合标准的订单是{{JoinList.length}}个。
          <i class="icon iconfont icon-tishi"></i>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <ul>
            <li class="title">
              <span class="text-left">进店时间</span>
              <span class="text-right">推荐人</span>
            </li>
            <li v-for="(Join,index) in JoinList" :class="{active:index==0?true:false}">
              <span class="text-left">{{ Join.CreateTime }}</span>
              <span class="text-right">{{Join.ShopName}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="cost-buts">
        <button class="cost-btn btn btn-white btn-normal noradius">暂缓</button>
        <button class="cost-btn btn btn-green btn-normal noradius">立即支付</button>
      </div>
    </div>
  </div>
</template>
<script>
  import Topheader from '../../common/headerNew'
  export default {
    name: 'commission',
    components:{
      Topheader
    },
    data() {
      return {
        Hdata:{
          title:'活动费用',
          backhtml:'<i class="icon iconfont icon-wrong"></i>',
        },
        commission:{},
        JoinList:[]
      }
    },
    methods: {
      getJoinList:function (_this,orderId) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/order/getJoinList'),
          data:{orderId:orderId},
          success: function (result) {
            if(result.statusCode==0){
              _this.JoinList = result.data;
              for(let i=0;i<_this.JoinList.length;i++){
                _this.JoinList[i].CreateTime = _this.JoinList[i].CreateTime.dateFormat('yyyy-MM-dd h:m:s');
              }
            }else{
              alert(result.errorMsg);
            }
          }
        });
      }
    },
    mounted: function () {
      var _this = this;
      _this.commission = JSON.parse(g.storage.get('information'));
      g.storage.del('information');
      _this.commission.CreateTime = _this.commission.CreateTime.dateFormat('yyyy年MM月dd');
      _this.$options.methods.getJoinList(_this,_this.commission.Id);
    }
  }
</script>
<style scoped>
  @import '../../../assets/css/order/detail.css';
  @import '../../../assets/css/order/cost.css';
  .tab-content ul li.active{
    background-image:url("../../../assets/img/free.png");
  }
</style>
