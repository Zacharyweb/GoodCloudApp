<template>
    <div class="loading-box">
       <div class="icon-box">
          <p class="icon-wrapper"></p>
          <span class="iconfont icon-zhuangxiu"></span>
       </div>
       <p class="loading-text"><slot>加载中</slot></p>
    </div>
</template>
<script>
  export default {
    data:function(){
        return {
         
        }
    },
    props: [],
    components:{},
    methods:{

    },
    mounted:function(){
     
    },
    destroyed:function(){
      
    }
  }
</script>
<style scoped>
   /*加载中条*/
  .loading-box{
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     height: 56px;
   }
   .loading-box p{
    margin-bottom: 0;
   }     
   .loading-box .icon-box{
     position: relative;
   }
   .up-tip.loading-box,
   .refresh-tip.loading-box{
     height: 56px;
   }
   .up-tip.loading-box .icon-box,
   .refresh-tip.loading-box .icon-box{
     width: 24px;
     height: 24px;
     margin:0 auto;
     position: relative;
   }
   .loading-box .iconfont{
     position: absolute;
     top:3px;
     left: 50%;
     transform: translateX(-50%);
   }
   .loading-box .icon-wrapper{
     width: 20px;
     height: 20px;
     background-color: #f5f5f5;
     border: 1px solid #999;
     border-left-color:#e6e6e6;
     border-radius: 50%;
     animation: rotateIcon 0.8s ease-in infinite;
   }
   @keyframes rotateIcon{
     0%{
       transform: rotate(0deg);
     }
     50%{
       transform: rotate(120deg);
     }
     100%{
       transform: rotate(360deg);
     }
   }
   .loading-box  .iconfont{
     color: #999;
     font-size: 12px;
   }
   .loading-box .loading-text{
     font-size: 0.5625rem;
     color: #666;
     margin-top: 6px;
   }
</style>
