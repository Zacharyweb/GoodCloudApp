<template>
  <div id="cost">
    <Topheader  :Hdata="Hdata"></Topheader>
    <div class="cost-container container-gray">
      <div class="cost-top">
        <div style="width: 100%; height: 110px;">
          <img src="../../../assets/img/cost.png" class="cost-top-img">
        </div>
        <div class="cost-top-text">
          “{{cost.Name}}”推荐用户于{{cost.CreateTime}}浏览本门店，现在用户已成交，需要支付给“{{cost.Name}}”佣金{{cost.Money}}元人民币。
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
            <li v-for="(Source,index) in queryBuffSource" :class="{active:index==0?true:false}">
              <span class="text-left">{{ Source.CreateTime }}</span>
              <span class="text-right">{{Source.NickName}}</span>
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
    name: 'cost',
    components:{
      Topheader
    },
    data() {
      return {
        Hdata:{
          title:'佣金',
          backhtml:'<i class="icon iconfont icon-wrong"></i>'
        },
        queryBuffSource:[],
        cost:{}
      }
    },
    methods: {
      queryBuffSource:function (_this) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/api/shared/queryBuffSource'),
          data:{accountId:_this.cost.AccountId,shopId:_this.cost.ShopId},
          success: function (result) {
            if(result.statusCode==0){
              _this.queryBuffSource = result.data;
              for(let i=0;i<_this.queryBuffSource.length;i++){
                _this.queryBuffSource[i].CreateTime = _this.queryBuffSource[i].CreateTime.dateFormat('yyyy-MM-dd h:m:s');
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
      _this.cost = JSON.parse(g.storage.get('information'));
      g.storage.del('information');
      _this.cost.CreateTime =new Date(_this.cost.CreateTime).dateFormat('yyyy年MM月dd');
      _this.$options.methods.queryBuffSource(_this);
    }
  }
</script>
<style scoped>
  @import '../../../assets/css/order/detail.css';
  @import '../../../assets/css/order/cost.css';
  .tab-content ul li.active{
    background-image:url("../../../assets/img/win.png");
  }
</style>
