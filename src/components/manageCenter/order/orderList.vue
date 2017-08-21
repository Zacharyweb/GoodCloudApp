<template>
  <div id="orderList">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="orderList-container container-gray" style="bottom: 50px;">
      <div class="search-container">
        <div class="box">
          <input type="text" class="no-border" @focus="focusStatus" @blur="focusStatus" v-model="message" @keyup.enter="submit"/>
          <label><span v-show="(message?false:true)&&!searching"><i class="icon iconfont icon-sou"></i>搜索</span></label>
        </div>
      </div>
      <div class="text-center" v-if="orderLists.length==0">暂无数据</div>
      <ul>
        <li class="order-list" v-for="list in orderLists">
          <div class="content">
            <div class="content-top" @click="detail(list.Id)">
              <ul>
                <li><label>电话：</label>{{list.Tel}}</li>
                <li><label>姓名：</label>{{list.Name}}</li>
                <li><label>金额：</label>{{list.Cash}}</li>
              </ul>
              <div class="icon iconfont icon-xiayiye"></div>
            </div>
            <div class="content-bottom">
              <div class="pull-left content-text">{{ list.CreateTime }}</div>
              <div class="pull-right content-buts">
                <button class="btn btn-green-o btn-small" v-if="!list.TransferStatus==0 && list.Money>0" @click="cost(list)">佣金{{list.Money}}</button>
                <button class="btn btn-green btn-small" v-if="list.GiftTransferStatus==0 && list.GiftMoney>0"  @click="commission(list)">活动费用{{list.GiftMoney}}</button>
              </div>
              <div class="pull-right content-text"  v-if="list.TransferStatus==1">佣金{{list.Money}}已付</div>
              <div class="pull-right content-text"  v-if="list.GiftTransferStatus==1">活动费用{{list.GiftMoney}}已付</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="add-list">
      <button class="btn btn-green btn-big noradius" @click="sys">扫描二维码，新增订单</button>
    </div>
  </div>
</template>
<script>
  import Topheader from '../../common/headerNew'
  export default {
    name: 'orderList',
    components:{
      Topheader
    },
    data() {
      return {
        Hdata:{
          title:'订单管理',
        },
        searching:false,
        message:'',
        orderLists:[]
      }
    },
    methods: {
      focusStatus:function () {
        var _this = this;
        _this.searching = !this.searching;
      },
      submit:function () {
        var _this = this;
        _this.getOrganizeOrder(_this);
      },
      getOrganizeOrder:function (_this) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/order/getOrganizeOrder'),

          data:{text:_this.message},
          success: function (result) {
            if(result.statusCode==0){
                _this.orderLists = result.data;
              for(let i=0;i<_this.orderLists.length;i++){
                _this.orderLists[i].CreateTime = _this.orderLists[i].CreateTime.dateFormat('yyyy-MM-dd');
                _this.orderLists[i].Cash = g.standard.returnFloat(_this.orderLists[i].Cash);
                _this.orderLists[i].Tel = _this.orderLists[i].Tel.substr(0, 3)+"-"+ _this.orderLists[i].Tel.substr(3, 4)+"-"+_this.orderLists[i].Tel.substr(7, 4);
              }
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      sys:function () {
        gkee.sacnQr(function (data) {
          g.storage.set('sysdata',data);
          g.window.openNew(g.url.urlHref("/orderadd"),"orderadd");
        });
      },
      detail:function (id) {
        g.storage.set('orderId',id);
        g.window.openNew(g.url.urlHref("/orderdetail"),"orderdetail");
      },
      commission:function (list) {
        g.storage.set('information',JSON.stringify(list));
        g.window.openNew(g.url.urlHref("/commission"),"commission");
      },
      cost:function(list){
        g.storage.set('information',JSON.stringify(list));
        g.window.openNew(g.url.urlHref("/cost"),"cost");
      }
    },
    mounted: function () {
      var _this = this;
      _this.$options.methods.getOrganizeOrder(_this);
    }
  }
</script>
<style scoped>
  @import '../../../assets/css/order/order.css';
  /*button{ font-size: 14px;}*/
</style>
