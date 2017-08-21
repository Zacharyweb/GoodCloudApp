<template>
  <div id="orderDetail">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="orderDetail-container container-gray">
      <div class="information">
        <ul>
          <li class="width100">
            <div class="information-title text-middle">微信昵称</div>
            <div class="information-content">
              <span>{{getOrderDetail.NickName}}</span>
              <img src="../../../assets/img/pic.png">
              <!--<img :src="getOrderDetail.Img">-->
            </div>
            <div class="clearfix"></div>
          </li>
          <li class="width50">
            <div class="information-title">姓名</div>
            <div class="information-content">{{getOrderDetail.Name}}</div>
            <div class="clearfix"></div>
          </li>
          <li class="width50">
            <div class="information-title">手机号</div>
            <div class="information-content">{{getOrderDetail.Tel}}</div>
            <div class="clearfix"></div>
          </li>
          <li class="width50">
            <div class="information-title">订单金额</div>
            <div class="information-content">{{getOrderDetail.Cash}}</div>
            <div class="clearfix"></div>
          </li>
          <li class="width50">
            <div class="information-title">{{getOrderDetail.IsJoin==1?'参加联单联购':'普通订单'}}</div>
            <div class="information-content"><i class="icon iconfont icon-tishi"></i></div>
            <div class="clearfix"></div>
          </li>
          <li class="width100" v-if="getOrderDetail.Remark==''?false:true">
            <div class="information-content" style="text-align: left">{{getOrderDetail.Remark}}</div>
          </li>
          <div class="clearfix"></div>
        </ul>
      </div>
      <div class="redbag-container">
        <ul class="nav nav-tabs switch-tab">
          <li class="active"><a href="#browse" data-toggle="tab">浏览记录</a></li>
          <li><a href="#duplicate" data-toggle="tab">联单记录</a></li>
        </ul>
        <div id="myTabContent" class="tab-content">
          <div class="tab-pane fade in active" id="browse">
            <ul style="margin-bottom: 60px;">
              <li class="title">
                <span class="text-left">进店时间</span>
                <span class="text-right">推荐人</span>
              </li>
              <li v-for="(Source,index) in queryBuffSource" :class="{active:index==0?true:false}">
                <span class="text-left">{{ Source.CreateTime }}</span>
                <span class="text-right">{{Source.NickName}}</span>
              </li>
            </ul>
            <button class="pay btn btn-big noradius"  @click="payDefeatMoney(getOrderDetail.odfId)" v-if="getOrderDetail.Money" :class="{btngreen:!getOrderDetail.TransferStatus,btnWhiteRed:getOrderDetail.TransferStatus}">{{getOrderDetail.TransferStatus?"已":""}}支付佣金{{getOrderDetail.Money}}元</button>
          </div>
          <div class="tab-pane fade" id="duplicate">
            <div v-if="getOrderDetail.Gift==1?true:false">
              <ul style="margin-bottom: 60px;">
                <li class="title">
                  <span class="text-left">成交时间</span>
                  <span class="text-right">成交门店</span>
                </li>
                <li v-for="(Join,index) in JoinList" :class="{active:index==0?true:false}">
                  <span class="text-left">{{ Join.CreateTime }}</span>
                  <span class="text-right">{{Join.ShopName}}</span>
                </li>
              </ul>
              <button class="pay btn btn-big btnWhiteRed" @click="payGiftMoney(getOrderDetail.giftId)" v-if ="getOrderDetail.GiftMoney" :class="{btngreen:!getOrderDetail.GiftTransferStatus,btnWhiteRed:getOrderDetail.GiftTransferStatus}">{{getOrderDetail.GiftTransferStatus?"已":""}}支付活动费用{{getOrderDetail.GiftMoney}}元</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Topheader from '../../common/headerNew'
  export default {
    name: 'orderDetail',
    components:{
      Topheader
    },
    data() {
      return {
        Hdata:{
          title:'订单详情',
          backhtml:'<i class="icon iconfont icon-wrong"></i>',
        },
        orderId:0,
        getOrderDetail:{},
        queryBuffSource:[],
        JoinList:[]
      }
    },
    methods: {
      getDetail:function (_this,orderId) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/order/getOrderDetail'),
          data:{orderId:orderId},
          success: function (result) {
            if(result.statusCode==0){
              _this.getOrderDetail = result.data;
              _this.$options.methods.queryBuffSource(_this);
              _this.$options.methods.getJoinList(_this,_this.orderId);
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      queryBuffSource:function (_this) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/api/shared/queryBuffSource'),
          data:{accountId:_this.getOrderDetail.AccountId,shopId:_this.getOrderDetail.ShopId},
          success: function (result) {
            if(result.statusCode==0){
                _this.queryBuffSource = result.data;
               for(let i=0;i<_this.queryBuffSource.length;i++){
               _this.queryBuffSource[i].CreateTime = _this.queryBuffSource[i].CreateTime.dateFormat('yyyy-MM');
               }
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      getJoinList:function (_this,orderId) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/order/getJoinList'),
          data:{orderId:orderId},
          success: function (result) {
            if(result.statusCode==0){
              _this.JoinList = result.data;
              for(let i=0;i<_this.JoinList.length;i++){
                _this.JoinList[i].CreateTime = _this.JoinList[i].CreateTime.dateFormat('yyyy-MM');
              }
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      payGiftMoney:function (id) {
        g.pay({bid:id, btype:2},function (paydata) {
          /*alert(paydata);*/
          g.box.waiting({
            title:'支付成功，稍后刷新',
            closeDiv:function () {
              window.location.reload();
            }
          });
        });
      },
      payDefeatMoney:function (id) {
        g.pay({bid:id, btype:1},function (paydata) {
          /*alert(paydata);*/
          g.box.waiting({
            title:'支付成功，稍后刷新',
            closeDiv:function () {
              window.location.reload();
            }
          });
        });
      }
    },
    mounted: function () {
      var _this = this;
      _this.orderId = g.storage.get("orderId");
//      g.storage.del("orderId");
      _this.$options.methods.getDetail(_this,_this.orderId);
    }
  }
</script>
<style scoped>
  @import '../../../assets/css/order/detail.css';
</style>
