<template>
  <div id="aboutBond">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="clause-desc">
        <div>未接通（拒接或一分钟内未接听）会被强制下线并处以罚金10元，罚金会以红包的形式补偿给客户。</div>
        <div>被强制下线后，新客户就没办法联系到您了，请及时缴纳罚金并开启在线状态。</div>
    </div>
    <div class="fine-record-wrapper">
      <ul class="fine-record-list">
        <li class="fine-record-item" v-for="item in recordList">
          <div class="fine-record-item-left">
            <img :src="item.imgSrc">
            <div class="fine-msg">
              <p class="guider-name">{{item.NickName}}</p>
              <p class="fine-reason">未接通</p>
            </div>
          </div>
          <div class="fine-record-item-right">
            <p class="fine-record-time">{{item.CTime}}</p>
            <p class="to-pay-fine"  v-if="item.Status == 0" @click="toPayFine"><span>付罚金¥{{item.Cash}}</span></p>
            <p class="has-pay-fine" v-if="item.Status == 1">罚金¥{{item.Cash}}&nbsp;已付</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="refund-bond">
      <p class="refund-bond-tips">罚金缴纳完毕，即可申请退还保证金</p>
      <p class="btn-wrapper"><span class="btn-gray btn-normal" :class="{'abled-btn':hasPayAllFine}" @click="backBandCash">退保证金¥50</span></p>
    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew.vue'
  export default {
    name: 'aboutBond',
    components:{
      Topheader
    },
    data() {
      return {
        Hdata:{
          title:'保证金相关',
          right:false,
          rigclick:function () {
            alert("右边按钮的点击事件")
          }
        },
        recordList:[],
        hasPayAllFine:false
      }
    },
    methods: {
      getInitData:function(){
        // this.recordList = recordArr;
        this.getDefineList();
      },
      getDefineList:function(){
        var _this = this;
        g.ajax({
          type: 'POST',
          url: g.url.format('/guide/getDefineList'),
          data:{},
          success: function (result) {
              result.data.forEach(function(item){
                 item.CTime = item.CreateTime.dateFormat('yyyy.MM.dd h:m');
                 item.imgSrc = g.url.imgFormat(item.Img);
              });
              _this.recordList = result.data;
          }
        });
      },
      toPayFine:function(){

      },
      backBandCash:function(){
        if(!this.hasPayAllFine){
          g.box.waiting({'title':'您还有罚金未缴纳'});
          return;
        };
        var _this = this;
        g.ajax({
          type: 'POST',
          url: g.url.format('/guide/backBandCash'),
          data:{},
          success: function (result) {
            console.log('退还保证金成功');
          }
        });
      }
    },
    mounted:function () {
      this.getInitData();
    }
  }
</script>
<style scoped>
  @import '../../assets/css/liveVideo.css';
  .clause-desc { padding: 20px 14px!important;}
  .clause-desc > div{ margin-bottom: 15px;}
  .clause-desc > div:last-child{ margin-bottom: 0;}
</style>
