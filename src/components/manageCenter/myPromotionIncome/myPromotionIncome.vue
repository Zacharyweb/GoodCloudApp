<template>
  <div class="temp-wrapper">
    <Topheader :Hdata="Hdata"></Topheader>
    <TopTab :tab-data="tabData" @tabclick="topTabchanged"></TopTab>
    <Todaypromotion v-if="todayPromotionShow" ></Todaypromotion>
    <Totalpromotion v-if="totalPromotionShow"></Totalpromotion>  
    <Incomedetails v-if="incomeDetails"></Incomedetails> 
  </div>  
</template>
<script>
  import Todaypromotion from './todayPromotion'
  import Totalpromotion from './totalPromotion'
  import Incomedetails from './incomeDetails'
  import Topheader from '../../common/header.vue'
  import TopTab from '../../common/topTab'

  export default {
    name: 'myPromotionIncome',
    components:{
      Topheader,TopTab,Todaypromotion,Totalpromotion,Incomedetails
    },
    data() {
      return {
        Hdata:{
          title:'今日推广',
          back:function () {
            gkAndroid.closeWebView();
          },
          right:true,
          rigclick:function () {
            alert("右边按钮的点击事件")
          },
          chagetitle:function(text){
           this.title = text
          }
        },
        tabData:{
          tabList:[
            {text:'今日推广'},
            {text:'累计推广'},
            {text:'收益详情'}
          ],
          nowTab:0
        },
        todayPromotionShow:true,
        totalPromotionShow:false,
        incomeDetails:false
      }
    },
    methods: {
         topTabchanged:function(text,currentTabIndex){
            this.Hdata.title = text;
            this.hideAllContent();
            switch(currentTabIndex) {
              case 0:
                this.todayPromotionShow = true;
                break;
              case 1:
                this.totalPromotionShow = true;
                break;
              case 2:
                this.incomeDetails = true;
                this.Hdata.right = false;
                break;
            }
            console.log(currentTabIndex);
         },
         hideAllContent:function(){
            this.todayPromotionShow = false;
            this.totalPromotionShow = false;
            this.incomeDetails = false;
            this.Hdata.right = true;
         }
    },
    mounted:function () {
    } 
  }
</script>
<style scoped>
  @import '../../../assets/css/myPromotionIncome.css';
</style>
