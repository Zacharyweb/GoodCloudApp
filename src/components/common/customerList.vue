<template>
  <div class="customerList">
    <ul>    
      <li v-for="item in customerListData.list">
        <div class="customer-item-left">
          <div class="customer-msg-wrapper">
            <img :src="item.Img">
            <div class="customer-msg">
              <p class="customer-name">{{item.NickName}}</p>
              <p class="customer-tel">{{item.Phone}}</p>
            </div>
          </div>
          <div class="relation-time" :class="{'text-center':customerListData.type == 2}">
            <p v-if="customerListData.type == 1">最后直播服务时间<span>{{item.Ctime}}</span><b v-if="item.Status != 2">未接通</b></p>
            <p v-if="customerListData.type == 2">留电话时间<span>{{item.Ctime}}</span></p>
          </div>
        </div>
        <div class="customer-item-right">
          <p class="zuji-wrapper" @click="toFootPrint(item.Id)">
            <span class="iconfont icon-lishi"></span>
            <span class="iconfont-text">足迹</span>
          </p>
          <p class="tolive-wrapper">
            <span class="iconfont icon-iconfontshipin"></span>
            <span class="iconfont-text" @click="toLiveChat(item.Id)">发起直播服务</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'customerList',
    props: ['customerListData'],
    data() {
      return {
      }
    },
    methods:{
      toFootPrint:function(id){
        var type;
        if(this.customerListData.type == 1){
          type = 1;
        }
        if(this.customerListData.type == 2){
          type = 2;
        }
        var url = '/customerFootPrint?id=' + id +'&type=' + type;
        g.window.openNew(g.url.urlHref(url),"customerFootPrint");
      },
      toLiveChat:function(id){
        alert('对客户'+id+'发起视频对话');
      }
    },
    mounted:function () {
    },

  }
</script>
<style>
 .customerList ul {
  padding-left: 0;
  background-color: #f5f5f5;
 }
 .customerList p{
  margin-bottom: 0;
 }
 .customerList ul li{
   margin:0 2.67% 10px 2.67%;
   border-radius: 5px;
   background-color: #fff;
   display: flex;
   justify-content: space-between;
   overflow: hidden;
   height: 150px;
   box-shadow: 0px 1px 1px 0px #e3e3e3;

 }
 .customerList ul li .customer-item-left{
    flex:1;
 }
 .customerList ul li .customer-msg-wrapper{
  padding-top:15px;
  padding-left: 18px;
  display: flex;
  margin-bottom: 12px;
 }
 .customerList ul li .customer-msg-wrapper .customer-msg{
   display:flex;
   flex-direction: column;
   justify-content: center;
   margin-left: 12px;
 }
 .customerList ul li  .customer-msg p{
   line-height: 1;
 }
 .customerList ul li .customer-msg-wrapper .customer-name{
  margin-bottom: 10px;
  font-size: 15px;
  color: #383838;
  font-weight: bold;

 } 
 .customerList ul li .customer-msg-wrapper .customer-tel{
  font-size: 14px;
  color: #999;
  font-weight: bold;
 } 
 .customerList ul li .customer-item-left img{
  width: 59px;
  height: 59px;
  border-radius: 50%;
 }
 .customerList ul li .customer-item-left .relation-time{
  margin-left: 38px;
  margin-right: 25px;
  border-top: 1px dotted #e6e6e6;
  height: 62px;
  display: flex;
  align-items: center;
 }
 .customerList ul li .customer-item-left .relation-time p{
  font-size: 12px;
  color: #383838;
  padding-left: 2px;
  position: relative;
 }
 .customerList ul li .customer-item-left .relation-time.text-center p{
  padding-left: 24px;
 }
 .customerList ul li .customer-item-left .relation-time p span{
  color: #999;
  margin-left: 9px;
 }
 .customerList ul li .customer-item-left .relation-time p b{
  position: absolute;
  top:0;
  right: -44px;
  font-weight: bold;
  font-size: 12px;
  color: #e94f4f;
 }
 .customerList ul li .customer-item-left .relation-time.text-center p span{
  color: #999;
  margin-left: 24px;
 }
.customerList ul li .customer-item-right{
  width: 90px;
  display: flex;
  flex-direction: column;

}
.customerList ul li .customer-item-right p{
  width: 100%;
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: #fff;
}
.customerList ul li .customer-item-right p .iconfont{
  font-size: 18px;
}
.customerList ul li .customer-item-right p .iconfont-text{
  margin-top: 8px;
  font-size: 12px;
}
.customerList ul li .customer-item-right .zuji-wrapper{
 background-color: #e6e6e6;
}
.customerList ul li .customer-item-right .tolive-wrapper{
background-color: #37bc9b;
}
</style>
