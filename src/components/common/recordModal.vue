<template>
  <div class="recode-modal-wrapper ">
       <div class="recode-modal-mask" @click="close"></div>
         <div class="recode-modal" >
            <div class="recode-modal-header">
               <h4>消费者{{Rmdata.Phone}}登录成交详情&nbsp;<span class="iconfont icon-tishi"></span></h4>
               <p>{{Rmdata.createTime}}在顺辉下沙店成交</p>
             <!--   <p>{{Rmdata.acceptTime}}兑奖</p> -->
            </div>
            <div class="recode-modal-body">
                 <div class='thead'>
                   <span>进店时间</span>
                   <span>推荐人</span>
                 </div>
                 <ul class="tbody">
                   <li v-for="(item,index) in Rmdata.list" :class="{'winner-guider':index == 0}">
                     <span>{{item.createTime}}</span>
                     <span>{{item.NickName}}</span>
                     <span v-if="index == 0" class="victory-icon">
                       <i>胜出</i>
                     </span>
                   </li>
                 </ul>
            </div>
            <div class="recode-modal-footer" @click="confirm">好</div>
         </div>
  </div>
</template>
<script>
  export default {
    data:function(){
        return {
        }
    },
    props: ['Rmdata'],

    methods:{
        confirm:function(){
          this.$emit('confirm');
        },
        close:function(){
          this.$emit('close');
        }
    }
  }
</script>
<style scoped>
  .recode-modal-wrapper .recode-modal-mask{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    top:97px;
    left:0;
    z-index: 1000;
  }
  .recode-modal-wrapper .recode-modal{
    width: 284px;
    border-radius: 2px;
    background-color: #fff;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding-top: 18px;
    z-index: 1001;
  }
  .recode-modal-wrapper .recode-modal .recode-modal-header h4{
    font-size: 14px;
    font-weight: bold;
    color: #37bc9b;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .recode-modal-wrapper .icon-tishi{
    color:#ccc;
    font-size: 14px;
  }
  .recode-modal-wrapper .recode-modal .recode-modal-header p{
    padding-left: 9px;
    font-size: 13px;
    color: #999999;
    line-height: 1;
  }
  .recode-modal-wrapper .recode-modal .recode-modal-body .thead{
    height: 30px;
    background-color: #eeeeee;
    display: flex;
    align-items: center;
    padding:0 10px;
  }
  .recode-modal-wrapper .recode-modal .recode-modal-body .thead span{
    flex: 1;
    color:#999999;
    font-size: 13px;
    text-align: center;
  }
  .recode-modal-wrapper .recode-modal .recode-modal-body .tbody{
    background-color: #fff;
    padding:0 9px;
    height: 140px;
    overflow: scroll;
  }
  .recode-modal-wrapper .recode-modal .recode-modal-body .tbody li{
    padding: 0 3px;
    height: 35px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .recode-modal-wrapper .recode-modal .recode-modal-body .tbody li span{
    flex: 1;
    text-align: center;
    font-size: 13px;
    color:#333333;
  }
  .recode-modal-wrapper .recode-modal .recode-modal-body .tbody li+li{
    border-top:1px solid #e6e6e6;
  }
  .recode-modal-wrapper .recode-modal .recode-modal-footer{
    border-top: 1px solid #37bc9b;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 18px;
    color:#37bc9b;
  }
  .recode-modal-wrapper .recode-modal .victory-icon{
    position: absolute;
    top:5px;
    right: 8px;
    width: 32px;
    height: 22px;
    border:1px solid #e94f4f;
    padding-left: 1px;
    padding-top: 1px;
    transform: rotate(-8deg);
  }
  .recode-modal-wrapper .recode-modal .victory-icon i{
    font-style:normal;
    color:#e94f4f;
    font-size: 12px;
    display: block;
    width: 28px;
    height: 18px;
    border:1px solid #e94f4f;
  }
</style>
