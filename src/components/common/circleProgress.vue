<template>
  <div class="circle-progress-mask">
  <div class="circle-progress">
      <div class="circle-progress-box">
          <div class="circle" :class="{'clip-auto':!flag }">
              <div class="percent left" :style="{'-webkit-transform':rotateDeg}"></div>
              <div class="percent right" :class="{'wth0':flag}"></div>
          </div>
          <div class="progress-num"><span>{{circleProgressData.percent}}</span>%</div>
      </div>
  </div>
  </div>
</template>
<script>
  export default {
    data:function(){
        return {
            flag:true,
            rotateDeg:'rotate(0deg)'
        }
    },
    props: ['circleProgressData'],
    components:{},
    methods:{

    },
    mounted:function(){
      g.dom.bodyUnScroll();
    },
    destroyed:function(){
      g.dom.bodyScroll();

    },
    watch:{
      circleProgressData:{
        handler:function(newData){
          if(newData.percent >= 100){
            this.$emit('close');
            this.flag = true;
          }else if(newData.percent > 50){
            this.flag = false;
          }
          this.rotateDeg = "rotate("+(18/5)*newData.percent+"deg)";
        },
        deep:true
      }
    }
  }
</script>
<style scoped>
     .circle-progress-mask{
       position: fixed;
       top:0;
       left: 0;
       right: 0;
       bottom: 0;
       z-index: 1003;
     }
     .circle-progress{
      position: fixed;
      width: 50px;
      height: 50px;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 50%;
      background-color: rgba(0,0,0,0.7);
    }
    .circle-progress .circle-progress-box,
    .circle-progress .circle,
    .circle-progress .percent{
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .circle-progress .circle-progress-box{
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .circle-progress .circle{
        box-sizing: border-box;
        border:20px solid transparent;
        clip:rect(0,40px,40px,20px);
    }
    .circle-progress .clip-auto{
        clip:rect(auto, auto, auto, auto);
    }
    .circle-progress .percent{
        box-sizing: border-box;
        top:-20px;
        left:-20px;
    }
    .circle-progress .left{
        transition:transform ease;
        border:2px solid #37BC9B;
        clip: rect(0,20px,40px,0);
    }
    .circle-progress .right{
        border:2px solid #37BC9B;
        clip: rect(0,40px,40px,20px);
    }
    .circle-progress .wth0{
        width:0;
    }
    .circle-progress .progress-num{
        position: absolute;
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 12px;
        color: #e6e6e6;
        left: 0px;
        top: 0px;
        z-index: 1;
    }
    .circle-progress .progress-num span{
      font-size: 15px;
    }
</style>
