<template>
    <div class="dot-video-detail-wrapper">
      <div class="pagetop-video" >
        <div class="video-msg-bar">
          <span class="close-video">
              <i class="iconfont icon-guanbi" @click="close"></i>
          </span>
          <span class="product-model" v-if="currentVideoMsg.model">型号：{{currentVideoMsg.model}}</span>
          <span class="collect-video" @click="collectVideo">
              <i class="iconfont icon-shoucang" v-show="currentVideoMsg.fav == 0" ></i>
              <i class="iconfont icon-shoucangshixin" v-show="currentVideoMsg.fav == 1"></i>
           </span>
        </div>
        <video class="dot-video" controls :poster="currentVideoMsg.cSrc" :src="currentVideoMsg.vSrc" v-show="!photoSwiperData.show" type="video/mp4"></video>
        <div class="pt-video-top" v-if="currentVideoMsg.title">
            <span class="decoration-block"></span>
            <p class="pt-video-tl" :class="{'show-all-title':showAllTitle}">{{currentVideoMsg.title}}</p>
            <span class="pt-video-tr iconfont icon-xiajiantou1" v-show="!showAllTitle && showSmallArr" @click="toShowAllTitle"></span>
            <span class="pt-video-tr iconfont icon-jiantoushang" v-show="showAllTitle && showSmallArr" @click="toHideAllTitle"></span>
        </div>
        <div class="video-swiper-btn" v-if="swiperBtnShow">
           <span  @click="showPhotoSwiper"><i class="iconfont icon-tupian"></i>相关实拍图（{{photoNum}}）</span>
        </div>
     </div>
     <div class="others-dot-video">
       <div class="module-top-bar-flex"> 
         <span class="decoration-line"></span> 
         <span class="relevant-video-text">相关视频</span>
         <span class="decoration-line"></span> 
       </div>
       <div class="others-dot-video-body">
           <ul class="swiper-wrapper">
           <li class="swiper-slide" v-for="(item,index) in videoList" @click="changevideo(index,item.id)">
               <div class="video-poster-wrapper">
                  <img class="video-poster" :src="item.cSrc"> 
                  <span class="play-video-icon" v-if="index != currentVideo"></span>
                  <i class="iconfont icon-bofang" v-if="index != currentVideo"></i>
                  <div class="current-video-mask" v-if="index == currentVideo"></div> 
                  <div class="loader" v-if="index == currentVideo">
                     <div class="loader-inner line-scale-pulse-out">
                       <div></div>
                       <div></div>
                       <div></div>
                       <div></div>
                       <div></div>
                     </div>
                   </div>
               </div>
           </li>
         </ul>
       </div>
     </div>
     <Photoswiper :photo-swiper-data="photoSwiperData" :photo-list="photoList" v-if="photoSwiperData.show" @close="hidePhotoSwiper"></Photoswiper>
    </div>
</template>
<script>
  import  Photoswiper from './photoSwiper.vue'
  export default {
    data:function(){
        return {
          photoSwiperData:{
            show:false,
            currentSlide:0
          },
          showAllTitle:false,
          videoList:[],
          currentVideo:0,
          photoList:[],
          currentVideoMsg:{},
          swiperBtnShow:false,
          showSmallArr:true,
          photoNum:0
        }
    },
    props: ['dotVideoDetailData'],
    components:{
      Photoswiper
    },
    methods:{
     getRelationVideos:function(){
         var _this = this;
         g.ajax({
           type: 'GET',
           url: g.url.format('/pano/getRelationVideos'),
           data:{hotsnotKey:_this.dotVideoDetailData.hotsnotKey},
           success: function (result) {
              _this.setVideoDetailsData(result.data)
           }
         }); 
     },
     setVideoDetailsData:function(data){
          if(data.length == 0){
              g.box.waiting({title:"这里什么都没有唉~"});
              return ;
          };
         data.forEach(function(item){
           item.cSrc = g.url.imgFormat(item.coverImg);
           item.vSrc = g.url.videoFormat(item.videoSrc);
         })
         this.currentVideoMsg = data[0];
         this.getRelationPic(data[0].id);
         this.videoList = data;
         if($('.pt-video-tl').width() < $('.dot-video').width()-60){
             this.showSmallArr = false;
         };
         this.initSwiper();
     },
     getRelationPic:function(id){
        var _this = this;
         g.ajax({
           type: 'GET',
           url: g.url.format('/video/getVideoDetails'),
           data:{videoId:id},
           success: function (result) {
               result.data.relationPics.forEach(function(item){
                 item.imgSrc = g.url.imgFormat(item.pic);
               });
               if(result.data.relationPics.length > 0){
                   _this.swiperBtnShow = true;
                   _this.photoNum = result.data.relationPics.length;
                   _this.photoList = result.data.relationPics;
               }
           }
        }); 
     },
     collectVideo:function(){
        if(this.currentVideoMsg.fav == 0){
           this.videoFav(1);
           this.currentVideoMsg.fav = 1;
        }else{
           this.videoFav(0);
           this.currentVideoMsg.fav =  0;
        };
     },
     videoFav:function(fav){
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/video/fav'),
          data:{videoId:_this.currentVideoMsg.id,fav:fav},
          success:function (result) {
             console.log(result);
          }
        });  
     },
     toShowAllTitle:function(){
        this.showAllTitle = true;
     },
     toHideAllTitle:function(){
       this.showAllTitle = false;
     },
     showPhotoSwiper:function(){
       this.photoSwiperData.show = true;
       $('video')[0].pause();
     },
     hidePhotoSwiper:function(){
       this.photoSwiperData.show = false;
     },
     changevideo:function(index,id){
        this.currentVideo = index;
        this.currentVideoMsg = this.videoList[index];
        $('.dot-video')[0].play();
        this.getRelationPic(this.videoList[index].id);
     },
     close:function(){
      this.$emit('close');
     },
     initSwiper:function(){
        var othersVideoSwiper = new Swiper('.others-dot-video-body', {
           slidesPerView: 'auto',
           observer:true,
           observeParents:true,
           freeMode: true
        });
      }
    },
    mounted:function(){
   
      this.getRelationVideos();
    },
  }
</script>
<style scoped>
  /*页头Tab栏*/
  p{
    margin-bottom: 0;
  }
  .dot-video-detail-wrapper{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 1005;
    overflow: scroll;
  }
  /*视频详情页头部视频*/
  .dot-video-detail-wrapper .pagetop-video {
    margin-bottom: 16px;
    color: #1A1A1A;
    position: relative;
  }
 .dot-video-detail-wrapper span.decoration-block {
     position: absolute;
     width: 7px;
     height: 22px;
     left: 0;
     top: 0;
     background-color: #CDB283;
 }
 .dot-video-detail-wrapper .video-msg-bar{
    box-sizing: border-box;
    padding:0 15px;
    background-color: #fff;
    width: 100%;
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
}
.dot-video-detail-wrapper .video-msg-bar .product-model{
    font-size: 18px;
    color: #1a1a1a;
}
.dot-video-detail-wrapper .video-msg-bar  span{
    color: #1a1a1a;
}
.dot-video-detail-wrapper .video-msg-bar  span .iconfont{
    font-size: 20px;
}
.dot-video-detail-wrapper .video-msg-bar  span .icon-shoucangshixin{
    color: #CDB283;
}

.dot-video-detail-wrapper .pagetop-video video {
    width: 100vw;
    height: 100vw;
}
.dot-video-detail-wrapper .pagetop-video .pt-video-top {
    margin-top: 10px;
    padding: 0 38px 0 16px;
    line-height: 24px;
    position: relative;
}
.dot-video-detail-wrapper .pagetop-video .pt-video-top .pt-video-tl {
    display: inline-block;
    max-width: 100%;
    font-weight: bold;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.dot-video-detail-wrapper .pagetop-video .pt-video-top .pt-video-tl.show-all-title {
    overflow: visible;
    white-space: normal;
}
.dot-video-detail-wrapper .pagetop-video .pt-video-top .pt-video-tr {
    position: absolute;
    top: 1px;
    right: 13px;
    font-size: 16px;
}
.dot-video-detail-wrapper .pagetop-video .video-swiper-btn{
    padding:18px 15px 0 15px;
}

.dot-video-detail-wrapper .pagetop-video .video-swiper-btn span{
    display: inline-block;
    border:1px solid #CDB283;
    border-radius: 4px;
    color: #CDB283;
    width: 100%;
    text-align: center;
    line-height: 44px;
    font-size: 18px;
}
.dot-video-detail-wrapper .pagetop-video .video-swiper-btn span .iconfont{
    font-size: 18px;
    margin-right: 8px;
}


/*相关视频*/
 .dot-video-detail-wrapper .others-dot-video .module-top-bar-flex{
     display: flex;
     padding-left:17.8%;
     padding-right:17.8%;
     justify-content: center;
     align-items: center;
 }
 .dot-video-detail-wrapper .others-dot-video .module-top-bar-flex .relevant-video-text {
     padding:0 18px;
     font-weight: bold;
     font-size: 16px;
     color: #1A1A1A;
 }
 .dot-video-detail-wrapper .others-dot-video .module-top-bar-flex .decoration-line{
     flex: 1;
     height: 1px;
     background-color: #383838;
 }

 .dot-video-detail-wrapper .others-dot-video .others-dot-video-body {
     padding: 16px 0 0 15px;
     overflow: hidden;
 }
 .dot-video-detail-wrapper .others-dot-video ul li {
     font-size: 0;
     padding-bottom: 16px;
     margin-right: 11px;
     width: 90px;
 }
 .dot-video-detail-wrapper .others-dot-video ul .video-poster-wrapper {
     position: relative;
 }
 .dot-video-detail-wrapper .others-dot-video ul .video-poster{
     width: 90px;
     height: 90px;
 }
 .dot-video-detail-wrapper .others-dot-video ul .play-video-icon {
     width: 28px;
     height: 28px;
     border: 2px solid #fff;
     border-radius: 50%;
     background-color: #000;
     opacity: 0.5;
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
 }

 .dot-video-detail-wrapper .others-dot-video  ul .icon-bofang {
     color: #fff;
     font-size: 13px;
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-35%, -55%);
 }
 .dot-video-detail-wrapper .others-dot-video ul .current-video-mask{
     position: absolute;
     width: 100%;
     height: 100%;
     top:0;
     left: 0;
     background-color: rgba(0,0,0,0.35);
 }
 .dot-video-detail-wrapper .others-dot-video  ul .loader{
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     z-index: 1;
 }
 /*正在播放的视频图标*/
 @-webkit-keyframes line-scale-pulse-out {
   0% {
     -webkit-transform: scaley(1);
             transform: scaley(1); }

   50% {
     -webkit-transform: scaley(0.4);
             transform: scaley(0.4); }

   100% {
     -webkit-transform: scaley(1);
             transform: scaley(1); } }

 @keyframes line-scale-pulse-out {
   0% {
     -webkit-transform: scaley(1);
             transform: scaley(1); 
      }

   50% {
     -webkit-transform: scaley(0.4);
             transform: scaley(0.4); 
        }

   100% {
     -webkit-transform: scaley(1);
             transform: scaley(1); 
        } 
   }
 .line-scale-pulse-out > div {
   background-color: #fff;
   width: 2px;
   height: 18px;
   border-radius: 2px;
   margin: 2px;
   -webkit-animation-fill-mode: both;
           animation-fill-mode: both;
   display: inline-block;
   -webkit-animation: line-scale-pulse-out 0.9s 0s infinite cubic-bezier(.85, .25, .37, .85);
           animation: line-scale-pulse-out 0.9s 0s infinite cubic-bezier(.85, .25, .37, .85); }
   .line-scale-pulse-out > div:nth-child(2), .line-scale-pulse-out > div:nth-child(4) {
     -webkit-animation-delay: 0.2s !important;
             animation-delay: 0.2s !important; }
   .line-scale-pulse-out > div:nth-child(1), .line-scale-pulse-out > div:nth-child(5) {
     -webkit-animation-delay: 0.4s !important;
             animation-delay: 0.4s !important; }
</style>