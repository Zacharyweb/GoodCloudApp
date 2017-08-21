<template>
  <div id="promoVideo">
     <Headertab :Htabdata="Htabdata" @tabclick="headerTabChange" @uploadvideo="uploadVideo"></Headertab>
     
     <Mypromovideo ref="myPromoVideo" v-if="MypromovideoShow" @todemovideo="toDemoVideo"></Mypromovideo>
     <Otherspromovideo v-if="OtherspromovideoShow"></Otherspromovideo>
     <Falsepage v-if="notJoinShop">产品视频</Falsepage>
  </div>
</template>
<script>
  import Headertab from '../common/headerTab'
  import Mypromovideo from './myPromoVideo.vue'
  import Otherspromovideo from './othersPromoVideo.vue'
  import Falsepage from '../common/falsePage.vue'
  export default {
    name: 'promoVideo',
    components:{
      Headertab,Mypromovideo,Otherspromovideo,Falsepage
    },
    data() {
      return {
        Htabdata:{tabList:[{text:'我的短视频'},{text:'短视频赏析'}], nowTab:0,showVideoIcon:true},
        MypromovideoShow:false,
        OtherspromovideoShow:false,
        CircleProgressData:{show:false,percent:0},
        notJoinShop:false
      }
    },
    methods: {
       headerTabChange:function(currentTabIndex){
          $('body').scrollTop(0);
          this.hideAllContent();
          if(currentTabIndex == 0){
            this.MypromovideoShow = true;
          }else{
            this.OtherspromovideoShow = true;
          }
       },
       hideAllContent:function(){
          this.MypromovideoShow = false;
          this.OtherspromovideoShow = false;
       },
       toDemoVideo:function(){
         this.headerTabChange(1);
         this.Htabdata.nowTab = 1;
       },
       showVideoIcon:function(){
        this.Htabdata.showVideoIcon = true;
       },
       hideVideoIcon:function(){
        this.Htabdata.showVideoIcon = false;
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
              // g.window.openNew(g.url.urlHref('/promoVideo'),"promoVideo");
              location.reload();
              // this.$refs.myPromoVideo.getInitData();
            },
            complete: function(XMLHttpRequest, textStatus) {
              g.box.closeDiv();
            },
          });
       },
       closeUpload:function(){
        var _this =this;
        this.CircleProgressData.percent = 0;
        setTimeout(function(){
          this.CircleProgressData.show = false;
          g.box.waiting({'title':'上传完成,重新载入'});
        }.bind(this), 100);

       }
    },
    mounted:function (){
      this.MypromovideoShow = true;
        // var sourceId = g.storage.getCurrentSourceId();
        // if(sourceId == 3 || sourceId == 6){
        //   this.MypromovideoShow = true;
        // }else{
        //   this.notJoinShop = true;
        // }
    }
  }
</script>
<style scoped>
  @import '../../assets/css/promoVideo.css';
</style>
