<template>
    <div id="incomeDetails">
       <Recordmodal :Rmdata="Rmdata" v-if="recordModalShow" @confirm="HiderecordModal" @close="HiderecordModal"></Recordmodal>
       <div class="my-income-msg">
          <h4 class="my-achivement">我的分享带客{{myMsg.UserCount}}人，成交{{myMsg.OrderCount}}单<span class="iconfont icon-tishi"></span></h4>
          <p class="get-bonus-text">获得佣金</p>
          <p class="get-bonus-num">{{myMsg.Money}}</p>
       </div>
       <div class="transaction-record">
          <p class="transaction-record-title">交易记录</p>
          <ul class="transaction-record-list">
            <li @click="showRecordModal(index)" v-for="(item,index) in recordList">
              <p class="consumer-behavior">消费者 <span class="font-grey">{{item.Phone}}</span>于{{item.createTime}}在{{item.ShopName}}成交</p>
              <p class="my-score">
                  <span class="font-grey">打败了{{item.DefeatCount}}个竞争对手</span>
                  <span>佣金：{{item.Money}}</span>
              </p>
              <span class="wait-turn-text font-red" v-if="item.AcceptStatus == 0">●&nbsp;等待转入</span>
              <span class="success-turn-text" v-if="item.AcceptStatus == 1">成功</span>
              <span class="apply-turn-text font-green" v-if="item.AcceptStatus == 2" @click.stop="applyTurn">申请转入</span>
            </li>
          </ul>
       </div>
    </div>
</template>
<script>
  import Recordmodal from '../../common/recordModal'
  export default {
    name: 'incomeDetails',
    components:{
      Recordmodal
    },
    data() {
      return {
        Rmdata:{},
        recordModalShow:false,
        myMsg:{},
        recordList:[],
      }
    },
    methods: {
         showRecordModal:function(index){
            this.Rmdata = this.recordList[index];
            this.getDetailList(this.Rmdata.AccountId,this.Rmdata.ShopId);
         },
         HiderecordModal:function(){
            this.recordModalShow = false;
         },
         getInitData:function(){
            var vm = this;
           g.ajax({
                type: "get",
                url: g.url.format('/api/shared/summaryGuideBuff'),
                data: {},
                dataType: "json",
                success: function(result) {
                  vm.myMsg = result.data || {};
                }
            });
           g.ajax({
                type: "get",
                url:g.url.format('/api/shared/queryGuideBuff'),
                data: {},
                dataType: "json",
                success: function(result) {
                  $.each(result.data,function(i,obj){
                    obj.createTime = obj.createTime.dateFormat("yyyy年MM月dd日")
                    obj.acceptTime = obj.acceptTime.dateFormat("yyyy年MM月dd日")
                  });
                  vm.recordList = result.data;
                }
            });
         },
         getDetailList:function(id1,id2){
            var vm = this;
           g.ajax({
                type: "get",
                url: g.url.format('/api/shared/queryBuffSource'),
                data: {accountId:id1,shopId:id2},
                dataType: "json",
                success: function(result) {
                  $.each(result.data,function(i,obj){
                    obj.createTime = obj.createTime.dateFormat("yyyy.MM.dd h:m")
                  });
                  vm.Rmdata.list = result.data || [];
                  vm.recordModalShow = true;
                }
            });
         }
    },
    mounted:function () {
        this. getInitData();
    }
  }
</script>
