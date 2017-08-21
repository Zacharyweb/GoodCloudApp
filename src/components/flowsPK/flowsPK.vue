<template>
  <div>
    <Headertab :Htabdata="Htabdata" @tabclick="headerTabChange" @uploadvideo="uploadVideo"></Headertab>
    <Buildcityflows v-if="BuildcityflowsShow"></Buildcityflows>
    <Shopflows v-if="ShopflowsShow"></Shopflows>
    <Mypromotionincome v-if="MypromotionincomeShow"></Mypromotionincome>
    <Falsepage v-if="notJoinShop">流量·收益</Falsepage>
  </div>
</template>
<script>
  import Headertab from '../common/headerTab'
  import Buildcityflows from './buildCityFlows'
  import Shopflows from './shopFlows'
  import Mypromotionincome from './myPromotionIncome/myPromotionIncome.vue'
  import Falsepage from '../common/falsePage.vue'
  export default {
    name: 'flowsPK',
    components:{
      Headertab,Buildcityflows,Shopflows,Mypromotionincome,Falsepage 
    },
    data() {
      return {
        Htabdata:{tabList:[{text:'建材城流量'},{text:'本店流量'},{text:'我的收益'}], nowTab:0,showVideoIcon:false},
        BuildcityflowsShow:false,
        ShopflowsShow:false,
        MypromotionincomeShow:false,
        notJoinShop:false
      }
    },
    methods: {
       headerTabChange:function(currentTabIndex){
          this.hideAllContent();
          if(currentTabIndex == 0){
            this.BuildcityflowsShow = true;
          }else if(currentTabIndex == 1){
            this.ShopflowsShow = true;
          }else{
            this.MypromotionincomeShow = true;
          }
       },
       hideAllContent:function(){
          this.BuildcityflowsShow = false;
          this.ShopflowsShow = false;
          this.MypromotionincomeShow = false;
       },
       uploadVideo:function(){
          var _this = this;
          g.box.waiting({'title':'准备上传中',wait:true});
          gkee.uploadFile(2,function(){
             g.box.closeDiv();
          },function(pcount,total,url){
             var p = parseInt(parseFloat(pcount)/parseFloat(total) *100);
          },function(url){
            // 上传成功
            g.box.waiting({'title':'上传成功，处理中',wait:true});
            var urlArr = url.split(',');
            var videoSrcStr = urlArr[0];
            var flag1 = videoSrcStr.indexOf('/video/');
            var videoSrc = videoSrcStr.substr(flag1);
            var coverSrcStr = urlArr[1];
            var flag2 = coverSrcStr.indexOf('/web/');
            var coverSrc = coverSrcStr.substr(flag2);
            _this.createVideo(videoSrc,coverSrc);
          },function(){
             // 取消
              g.box.closeDiv();
          },function(error){

          });
       },
       createVideo:function(videoSrc,coverSrc){
          var _this = this;
          g.ajax({
            type: 'GET',
            url: g.url.format('/video/create'),
            data:{
              coverImg:coverSrc,
              categoryId:'',
              tagIds:'',
              model:'',
              title:'',
              videoSrc:videoSrc
            },
            success: function (result) {
              g.window.close();
              g.window.openNew(g.url.urlHref('/promoVideo'),"promoVideo");
              // location.reload();
            },
            complete: function(XMLHttpRequest, textStatus) {
              g.box.closeDiv();
            },
          });
       }
    },
    mounted:function (){
        var sourceId = g.storage.getCurrentSourceId();
        if(sourceId == 3 || sourceId == 6){
          this.BuildcityflowsShow = true;
        }else{
          this.notJoinShop = true;
        }
    }
  }
</script>
<style scoped>
  @import '../../assets/css/flowsPK.css';
</style>
