<template>
  <div class="waterfall-wrapper">
    <waterfall :align="align" :line-gap="320" :min-line-gap="150" :max-line-gap="300" :single-max-width="300" :watch="items" @reflowed="reflowed" ref="waterfall">
      <waterfall-slot v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="item-move">
        <!-- 直播 -->
        <div class="wf-item wf-live" v-if="item.type == 0">
          <div class="live-img-wrapper">
            <img class="live-poster" :src="item.posterUrl">
            <span class="live-btn">直播<i class="iconfont icon-bofang1"></i></span>
            <p class="live-audience">
              <img v-for="imgSrc in item.viewsImgs" :src="imgSrc">
              <span>...</span>
            </p>
          </div>
          <p class="live-title"><span>{{item.titile}}</span></p>
        </div>
        <!-- 广告 -->
        <div class="wf-item wf-right-item wf-ad" v-if="item.type == 1">
            <div>
              <img :src="item.adImg">
            </div>
            <p class="all-activity-text">全部活动集锦</p>
            <div class="btn-wrapper"><p class="view-all-btn">查看全部</p></div>
        </div>
       <!-- 视频 -->
    <!--     <div class="wf-item wf-video" v-if="item.type == 2" :class="{'wf-right-item':(index%2 == 0 && videoWaterFallData.type == 0) || (index%2 != 0 && videoWaterFallData.type == 1)}"> -->
        <div class="wf-item wf-video" v-if="item.type == 2" :class="{'wf-right-item':item.isRight}">
           <div class="wf-demo-tips">
              <p class="tips-text" v-if="index == 0 && videoWaterFallData.type == 0">视频范例供大家参考</p>
           </div>
           <div class="video-img-box">
             <img class="video-poster" :src="item.imgSrc1" @click="tapvideo(item.id)">
             <img class="video-guider-avatar" :src="item.imgSrc2">
           </div>
           <p class="video-shop">
             <span class="shop-name">{{item.shopName}}</span>
             <span class="video-views"><i class="iconfont icon-guankan"></i>{{item.realViewCount || item.viewCount}}次</span>
           </p>
           <p class="tags-block"> 
            <span class="tag-item" v-for="(tag,index) in item.tags" @click="clicktag" :class="{'no-border': index == 2}">{{tag}}</span>
           </p>
        </div>
      </waterfall-slot>
    </waterfall>
 <!--    <p class="loading-tips" v-show="isBusy"><img src="../../assets/img/loading.png" height="18" width="19">加载中</p> -->
    <LoadingIcon v-show="isBusy"></LoadingIcon>
    <p class="no-more-tips" v-show="isNoMore && !isBusy">没有更多啦~</p>
  </div>
</template>
<script>
  import Waterfall from './waterfall'
  import WaterfallSlot from './waterfall-slot' 
  import LoadingIcon from './loadingIcon.vue' 
  export default {
    name: 'videoWaterFall',
    components:{
      Waterfall,WaterfallSlot,LoadingIcon
    },
    data:function(){
        return {
          align: 'left',
          items: [],
          isBusy: false,
          isNoMore:false,
          lastIndex:0,
          pageIndex:1,
        }
    },
    props: ['videoWaterFallData','queryData'],
    methods:{
      getInitData:function(){
        this.items.splice(0);
        this.isNoMore = false;
        this.pageIndex = 1;
        if(this.videoWaterFallData.type == 0){
           this.getAppDemoVideos();
        }else if(this.videoWaterFallData.type == 1){
           this.getAppOrgVideos();
        }
      },
      getAppDemoVideos:function(){
        var _this = this;
        $.extend(_this.queryData,{pageIndex:_this.pageIndex,pageSize:10});
        this.isBusy = true; 
        g.ajax({
          type: 'GET',
          url: g.url.format('/video/getAppDemoVideos'),
          data:_this.queryData,
          success: function (result) {
            _this.setVideoItemData(result.data);
          }
        });   
      },
      getAppOrgVideos:function(){
        var _this = this;
        $.extend(_this.queryData,{pageIndex:_this.pageIndex,pageSize:10});
        this.isBusy = true;
        g.ajax({
          type: 'GET',
          url: g.url.format('/video/getAppOrgVideos'),
          data:_this.queryData,
          success: function (result) {
            _this.setVideoItemData(result.data);
          }
        });  

      },
      setVideoItemData:function(data){
        var _this = this;
        setTimeout(function(){
           _this.isBusy = false;
        }, 200);
        _this.pageIndex++;
         if(data.length == 0 || data.length < 10){
            _this.isNoMore = true;
        }
        data.forEach(function(item,i){
            if(_this.videoWaterFallData.type == 0){
              if(i == 1){
                item.isRight = true;
              }
              if(i%2 == 0 && i >1){
                item.isRight = true;
              }
            }
            if(_this.videoWaterFallData.type == 1){
               if(i%2 != 0){
                 item.isRight = true;
               };
            }
            if(item.realViewCount){
              if(item.realViewCount == 0){
                item.realViewCount = '0';
              };
              if(item.realViewCount>9999){
                item.realViewCount = '1万+';
              };
            };
            if(item.viewCount>9999){
              item.viewCount = '1万+';
            };
            item.type = 2;
            item.width = 187;
            item.height = 245;
            if(_this.pageIndex == 2 && _this.videoWaterFallData.type == 0 && i == 0){
              item.height =305;
            };
            item.imgSrc1= g.url.imgFormat(item.coverImg);
            item.imgSrc2= g.url.imgFormat(item.authorImg);
            item.tags = [];
            if(item.tagNames){
              item.tags = item.tagNames.split(',');
            }
            if(item.category){
              item.tags.push(item.category);
            }
            if(item.tags.length >2){
                item.tags = item.tags.splice(0,2);
                item.tags.push('...');
             };
            _this.items.push(item);
        });
      },
      addItems: function () {
        if(!this.isBusy && !this.isNoMore){
           this.isBusy = true;
           if(this.videoWaterFallData.type == 0){
              this.getAppDemoVideos();
           }else if(this.videoWaterFallData.type == 1){
              this.getAppOrgVideos();
           }
           // this.getAppDemoVideos();
        }
      },
      reflowed: function () {
      
      },
      scrollEvent:function(){
        var _this = this;
        window.addEventListener('scroll', function () {
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          if(scrollTop + window.innerHeight +95 >= $('.waterfall-wrapper').height()) {
            if($('.waterfall-wrapper').height() !=0){
              _this.addItems();
            }   
          }
        })
      },
      clicktag:function(){
        this.$emit('clicktag');
      },
      tapvideo:function(id){
        this.$emit('tapvideo',id);
      }
    },
    mounted:function(){
      this.getInitData();
      this.scrollEvent(); 
    },
    watch:{
      queryData:{
        handler:function(newData){
            this.getInitData();
        },
        deep:true,
      }
    }
  }
</script>
<style scoped>
.wf-item {
    position: absolute;
    top: 0px;
    bottom: 2px;
    left: 0px;
    right: 2px;
    line-height: 1;
    color: rgb(0, 158, 107);
    background-color: #fff;
    display: flex;
    flex-direction: column;
}
.wf-item p {
    margin: 0;
}
.wf-right-item {
    left: 2px;
    right: 0px;
}
.wf-right-item2 {
    left: 2px;
    right: 0px;
}
.wf-enter {
    opacity: 0;
}
.waterfall-top {
    padding: 10px 16px;
    height: 22px;
    align-items: center;
    position: relative;
    border-top: 1px solid #e6e6e6;
    background-color: #fff;
}
.waterfall-top .decoration-block {
    top: 10px;
}
.waterfall-top .waterfall-top-title {
    font-size: 16px;
    color: #1A1A1A;
    font-weight: bold;
    line-height: 22px;
}
.loading-tips,
.no-more-tips {
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #8a8a8a;
}
.loading-tips img {
    margin-right: 12px;
    animation: loading 0.8s infinite;
}
@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(60deg);
    }
    50% {
        transform: rotate(150deg);
    }
    75% {
        transform: rotate(270deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.wf-live .live-img-wrapper {
    position: relative;
    font-size: 0;
}
.wf-live .live-poster {
    width: 100%;
}
.wf-live .live-btn {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 30px;
    border-radius: 15px;
    color: #fff;
    font-size: 15px;
    background-color: #CDB283;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wf-live .live-btn .iconfont {
    margin-left: 2px;
    font-size: 22px;
    color: #fff;
}
.wf-live .live-audience {
    position: absolute;
    top: 6px;
    left: 5px;
    display: flex;
    font-size: 16px;
    line-height: 36px;
    font-weight: bold;
    color: #fff;
}
.wf-live .live-audience img {
    width: 34px;
    height: 34px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    margin-right: 4px;
}
.wf-live .live-title {
    flex: 1;
    font-size: 13px;
    display: flex;
    align-items: center;
    color: #1A1A1A;
    margin-top: 12px;
    padding: 0 12px 0 5px;
}
.wf-ad {
    background-color: #CDB283;
    font-size: 0;
    color: #fff;
    text-align: center;
}
.wf-ad img {
    width: 100%;
}
.wf-ad .all-activity-text,
.wf-ad .btn-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
}
.wf-ad .view-all-btn {
    width: 70px;
    line-height: 20px;
    border: 1px solid #fff;
    border-radius: 11px;
    text-align: center;
    font-size: 13px;
}
.wf-video {
    line-height: 1;
}
.wf-video .video-img-box {
    position: relative;
    font-size: 0;
}
.wf-video .video-img-box .video-poster {
    width: 49.5vw;
    height: 49.5vw;
}
.wf-video .video-img-box .video-guider-avatar {
    position: absolute;
    left: 4px;
    bottom: -18px;
    width: 34px;
    height: 34px;
    border: 1px solid #fff;
    border-radius: 50%;
}
.wf-video .video-shop {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #4D4D4D;
    padding: 6px 6px 0 47px;
}
.wf-video .video-shop .iconfont {
    font-size: 12px;
    margin-right: 2px;
}
.wf-video .tags-block {
    flex: 1;
    padding-left: 5px;
    align-items: center;
}
.wf-video .tags-block .tag-item {
    padding: 0 7px;
}
.wf-video .tags-block .tag-item.no-border{
   border-color: #fff;
}
.wf-demo-tips{
  background-color: #CDB283;
}
.wf-demo-tips .tips-text{
  color: #fff;
  font-size: 15px;
  text-align: center;
  line-height: 60px;
}

/*tags标签*/
.tags-block{
    display: flex;
    font-size: 12px;
    
}
.tags-block .tag-item{
    white-space: nowrap;
    padding:0 9px;
    line-height: 20px;
    color: #1A1A1A;
    border: 1px solid #BDBDBD;
    border-radius: 11px;
    margin-right: 3px;
}
</style>