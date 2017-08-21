<template>
  <div id="liveVideo" :class="{'height-auto':LivevideolistShow}">
    <Headertab :Htabdata="Htabdata" @tabclick="headerTabChange"></Headertab>
    <Mylivevideo v-if="MylivevideoShow"></Mylivevideo>
    <Livevideolist v-if="LivevideolistShow"></Livevideolist>
  </div>
</template>
<script>
  import Headertab from '../common/headerTab'
  import Mylivevideo from './myLiveVideo'
  import Livevideolist from './liveVideoList'
  export default {
    name: 'liveVideo',
    components:{
      Headertab,Mylivevideo,Livevideolist
    },
    data() {
      return {
        Htabdata:{tabList:[{text:'我的直播'},{text:'直播列表'}], nowTab:0},
        MylivevideoShow:true,
        LivevideolistShow:false
      }
    },
    methods: {
       headerTabChange:function(currentTabIndex){
          this.hideAllContent();
          if(currentTabIndex == 0){
            this.MylivevideoShow = true;
          }else{
            this.LivevideolistShow = true;
          }
       },
       hideAllContent:function(){
          this.MylivevideoShow = false;
          this.LivevideolistShow = false;
       }
    },
    mounted:function (){
    }
  }
</script>
<style scoped>
  @import '../../assets/css/liveVideo.css';
</style>
