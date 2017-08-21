<template>
    <div class="video-detail-wrapper">
      <div class="video-detail">
        <div class="video-detail-top"><span class="iconfont icon-guanbi" @click="close"></span>详情</div>
        <div class="video-detail-content">
        <span class="product-model" v-if="videoData.model">型号：{{videoData.model}}</span>
          <video controls :poster="videoData.cSrc" :src="videoData.vSrc" v-show="!photoSwiperData.show"></video>
        </div>
        <div class="video-detail-msg">
          <h4>{{videoData.title}}</h4>
          <p class="tags-block">
            <span class="tags-item" v-for="tag in videoData.tags">#{{tag}}</span>
          </p>
        </div>
        <p class="btn-wrappers" v-if="showPhotoSwiperBtnShow"><span class="btn btn-green" @click="showPhotoSwiper">相关实拍图（{{photoNum}}）</span></p>
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
          videoData:{},
          photoList:[],
          videoShow:true,
          showPhotoSwiperBtnShow:false,
          photoNum:0
        }
    },
    props: ['videoDetailData'],
    components:{
      Photoswiper
    },
    methods:{
      getVideoDetail:function(){
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/video/single'),
          data:{videoId:_this.videoDetailData.videoId},
          success: function (result) {
            _this.setVideoDetailData(result.data)
          }
        });    
      },
      setVideoDetailData:function(data){
          data.tags = [];
          if(data.category){
            data.tags.push(data.category);
          };
          if(data.tagNames){
            var tags = data.tagNames.split(',');
            data.tags = data.tags.concat(tags);
          };
          if(data.tags.length >3){
            data.tags = data.tags.splice(0,3);
            data.tags[2] = data.tags[2] + ' ...';
          };
          data.cSrc = g.url.imgFormat(data.coverImg);
          data.vSrc = g.url.videoFormat(data.videoSrc);
          this.videoData = data;
      },
      getRelationPic:function(){
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/video/getRelationPic'),
          data:{videoId:_this.videoDetailData.videoId},
          success: function (result) {
            _this.setPhotoList(result.data);
          }
        });    
      },
      setPhotoList:function(data){
        if(data.length > 0){
          this.showPhotoSwiperBtnShow = true;
          this.photoNum = data.length;
        };
        data.forEach(function(item){
           var imgSrc = g.url.imgFormat(item.pic);
           item.imgSrc = imgSrc;
           item.cTime = item.createTime.dateFormat('MM.dd hh:mm');
         })
        this.photoList = data;
      },
      showPhotoSwiper:function(){
        this.photoSwiperData.show = true;
        $('video')[0].pause(); 
      },
      hidePhotoSwiper:function(){
        this.photoSwiperData.show = false;   
      },
      close:function(){
         this.$emit('close')
      }
    },
    mounted:function(){
      g.dom.bodyUnScroll();
      this.getVideoDetail();
      this.getRelationPic();
    },
    destroyed:function(){
      g.dom.bodyScroll();
    }
  }
</script>
<style scoped>
  /*页头Tab栏*/
  .video-detail-wrapper{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f5f5f5;
    z-index: 1005;
  }
  .video-detail-wrapper .video-detail-top{
    background-color: #fff;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    color: #1a1a1a;
    font-weight: bold;
    position: relative;
  }
  .video-detail-wrapper .video-detail-top .iconfont{
    position:absolute;
    top:50%;
    transform: translateY(-50%);
    left:12px;
    color: #37bc9b;
    font-size: 18px;
  
  }
  .video-detail-wrapper .video-detail-content{
    position: relative;
    font-size: 0;
  }
  .video-detail-wrapper .video-detail-content .product-model{
    position: absolute;
    top:10px;
    left: 10px;
    line-height: 1;
    font-size: 14px;
    color: #fff;
    background-color: rgba(0,0,0,0.6);
    padding: 8px 10px;
    border-radius: 3px;
  }
  .video-detail-wrapper  video{
   /* width: 100%;*/
   width: 100vw;
   height: 100vw;
  }
  .video-detail-wrapper .video-detail-msg{
    padding-top: 7px;
    padding-bottom: 10px;
    background-color: #fff;
  }
  .video-detail-wrapper .video-detail-msg h4{
    margin:0;
    margin-bottom: 12px;
    font-size: 16px;
    line-height: 21px;
    color: #1a1a1a;
    font-weight: bold;
    padding-left: 10px;
    border-left: 5px solid #37bc9b;
  }
  .video-detail-wrapper .video-detail-msg .tags-block{
    display: flex;
    padding-left: 16px;
    margin:0;
  }
  .video-detail-wrapper .video-detail-msg .tags-block .tags-item{
    font-size: 14px;
    color: #999;
    margin-right: 6px;
  }
  .video-detail-wrapper .btn-wrappers{
    margin:0;
    padding:10px 4%;
  }
  .video-detail-wrapper .btn-wrappers .btn{
    width: 100%;
    height: 45px;
    padding:0;
    font-size: 18px;
    text-align: center;
    line-height: 45px;
  }
</style>