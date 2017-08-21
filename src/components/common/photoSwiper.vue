<template>
  <div class="photo-swiper-wrapper">
    <div class="photo-swiper swiper-container">
        <p class="photo-swiper-top">
            <span class="photo-num">{{currentNum}}/{{totalNum}}</span>
            <span class="iconfont icon-guanbi" @click="close"></span>
        </p>
        <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="item in photoList">
                <div class="swiper-slide-img">
                    <img :src="item.imgSrc">
                </div>
                <p class="swiper-slide-text">
                  {{item.title}}
                </p>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
  import '../../assets/plugins/swiper/swiper.min.css'
  import '../../../static/swiper.jquery.min.js'
  export default {
    data:function(){
        return {
           totalNum:0,
           currentNum:1,
        }
    },
    props: ['photoSwiperData','photoList'],
    methods:{
       getInitData:function(){
          this.totalNum =  this.photoList.length;
          this.initSwiper();
          console.log(this.photoList);
          g.dom.bodyUnScroll();
      },
      initSwiper:function(){
        var _this = this;
        var lastIndex = _this.photoList.length - 1;
        // var swiperLength = $('.swiper-slide').width()*lastIndex;
        var swiperLength = $('.photo-swiper-top').width()*lastIndex;
        var photoSwiper = new Swiper('.swiper-container', {
            initialSlide:_this.photoSwiperData.currentSlide,
            observer:true,
            observeParents:true,
            onSliderMove:function(swiper){
            },
            onTouchEnd:function(swiper){
              if(swiper.activeIndex == 0 && swiper.translate > 50){
                  g.box.waiting({title:'已到第一张'});
                  console.log('已到第一张');
              }
              if(swiper.activeIndex == lastIndex  && swiper.translate < -swiperLength){
                  g.box.waiting({title:'已到最后一张'});
                  console.log('已到最后一张');
              }
            },
            onTransitionEnd: function(swiper){
                _this.currentNum = swiper.activeIndex + 1;
            }
        });
      },
      close:function(){
        this.$emit('close');
      }

    },
    mounted:function(){
      this.getInitData();
    },
    destroyed:function(){
      g.dom.bodyScroll();
    }
  }
</script>
<style scoped>
ul{
  padding-left: 0;
}
  .photo-swiper-wrapper{
      position: fixed;
      top:0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 666;
      opacity: 1;
  }
  .photo-swiper-wrapper .photo-swiper{
      max-width: 640px;
      min-width: 300px;
      margin:0 auto;
      height: 100%;
      background-color:#000;
      position: relative;
  }
  .photo-swiper-wrapper .photo-swiper .photo-swiper-top{
      position: absolute;
      width: 100%;
      background-color: #000;
      top:0;
      left: 0;
      line-height: 50px;
      text-align: center;
      z-index: 1000;
  }
  .photo-swiper-wrapper .photo-swiper .photo-swiper-top span{
      color: #fff;
      font-size: 15px;
  }
  .photo-swiper-wrapper .photo-swiper .photo-swiper-top .iconfont{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      right: 18px;
  }
  .photo-swiper-wrapper .photo-swiper  li .swiper-slide-img{
      position: absolute;
      width: 100%;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
  }
  .photo-swiper-wrapper .photo-swiper  li .swiper-slide-img img{
      width: 100%;
  }
  .photo-swiper-wrapper .photo-swiper  li .swiper-slide-text{
      margin:0;
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      bottom: 0;
      left: 0;
      color: #fff;
      padding:15px;
      font-size: 12px;
      line-height: 1.5;
      background-color: #000;
  }
  .photo-swiper-slide-enter-active {
      transition: all .5s ease;
  }
  .photo-swiper-slide-leave-active {
      transition: all .3s ease;
  }
  .photo-swiper-slide-enter,
  .photo-swiper-slide-leave-active {
      opacity: 0;
  }
</style>
