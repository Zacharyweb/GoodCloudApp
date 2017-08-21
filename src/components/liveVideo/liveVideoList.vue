<template>
  <div id="liveVideoList">
   <div class="live-video-skill">
     <h4>直播小技巧</h4>
     <p class="live-video-skill-text">越早开启直播在线状态，您的排名越靠前，越容易获得意向客户。</p>
     <p class="live-video-skill-tips">怎么样才能直播排名靠前<span class="iconfont icon-tishi"></span></p>
   </div>
   <div class="online-guiders-list-wrapper">
     <p><span class="iconfont icon-lishi"></span>当前[在等待中]的导购<span class="guider-num">&nbsp;{{guideOnlineCount}}&nbsp;</span>人</p>
     <ul class="online-guiders-list">
       <li class="online-guiders-item" v-for="item in liveVideoList">
         <img :src="item.Img" class="guider-avatar">
         <div class="guider-msg">
           <p class="guider-name-shop">{{item.NickName}}<span class="decorate-dot"></span>{{item.ShopName}}</p>
           <p class="guider-intro">{{item.Remark}}</p>
         </div>
         <span class="online-wait-tips">在线等待中</span>
        </li>
     </ul>
   </div>
  </div>
</template>
<script>

  export default {
    name: 'liveVideoList',
    components:{

    },
    data() {
      return {
        liveVideoList:[],
        guideOnlineCount:0,
        isBusy:false,
        isNoMore:false,
        pageIndex:1
      }
    },
    methods: {
      getInitData:function(){
        this.getGuideOnlineCount();
        // this.liveVideoList = liveVideoArr;
      },
      getGuideOnlineCount:function(){
          var _this = this;
          g.ajax({
            type: 'POST',
            url: g.url.format('/guide/getGuideOnlineCount'),
            data:{appId:gkee.getAappId()},
            success: function (result) {
              _this.guideOnlineCount = result.data;
              _this.getGuideOnlineList(_this.pageIndex);
            }
          });
      },
      getGuideOnlineList:function(pageIndex){
          this.isBusy = true;
          var _this = this;
          g.ajax({
            type: 'POST',
            url: g.url.format('/guide/getGuideOnlineList'),
            data:{appId:gkee.getAappId(),pageSize:10,pageIndex:pageIndex},
            success: function (result) {
               _this.liveVideoList = _this.liveVideoList.concat(result.data);
               _this.pageIndex++;
               _this.isBusy = false;
            }
          });
      },
      getNextData:function(){
        if (!this.isBusy && this.liveVideoList.length < this.guideOnlineCount) {
            this.getGuideOnlineList(this.pageIndex);
        }
      },
      observeScrollToBottom:function(){
        var _this = this;
        $('body').css({'height':'auto'});
        window.addEventListener('scroll', function () {
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          if (scrollTop + window.innerHeight >= $('#liveVideo').height() + 60) {
            _this.isBusy = false;
            _this.getNextData();
          }
        })
      }
    },
    watch:{
      liveVideoList:function(newList){
          if(newList.length >= this.guideOnlineCount){
            this.isNoMore = true;
          }
      }
    },
    mounted:function () {
      this.getInitData();
//      this.observeScrollToBottom();
    },

  }
</script>
<!--
<style scoped>
  .live-video-skill-text{ margin-top: 20px;}
</style>
-->
