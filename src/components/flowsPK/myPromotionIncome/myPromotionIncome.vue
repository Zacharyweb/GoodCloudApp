<template>
  <div class="temp-wrapper">
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
  import TopTab from '../../common/topTab.vue'
  export default {
    name: 'myPromotionIncome',
    components:{
      TopTab,Todaypromotion,Totalpromotion,Incomedetails
    },
    data() {
      return {
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
                break;
            }
            console.log(currentTabIndex);
         },
         hideAllContent:function(){
            this.todayPromotionShow = false;
            this.totalPromotionShow = false;
            this.incomeDetails = false;
         }
    },
    mounted:function () {
    } 
  }
</script>
<style scoped>
  @import '../../../assets/css/myPromotionIncome.css';
</style>
