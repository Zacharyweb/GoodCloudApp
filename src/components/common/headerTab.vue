<template>
    <div class="header-tab-box">
      <div class="header-tab-item" v-for="(item,index) in Htabdata.tabList" :class="{active:currentTab == index}" @click="tabclick(index)">
        {{ item.text}}
      </div>
      <span v-if="Htabdata.showVideoIcon"  v-touch:press="touchEvent" class="iconfont icon-iconfontshipin to-shot-video-icon"></span>
    </div>
</template>
<script>
  export default {
    data:function(){
        return {
           currentTab:this.Htabdata.nowTab,
            touchEvent:{
              longTouch:this.longTouch,
              duan: this.shortTouch,
              restore:this.restore,
              press:this.press
            },
            onPress:false,
        }
    },
    props: ['Htabdata'],
    methods:{
      tabclick:function(index){
          this.currentTab = index;
          // location.hash = this.Htabdata.tabList[index].tabhash
          this.$emit('tabclick',index);
      },
      longTouch:function () {
          var _this = this;
          g.box.confirm({  
            title:'请选择上传视频方式',
            errorMess:'',
            submitName:'从本地上传',
            refuseName:'直接拍摄',
            submitCallBack:function(){
              _this.$emit('uploadvideo');
            },
            closeCallBack:function(){
               gkee.openVideo();
            }
          })
         this.restore(); 
      },
      shortTouch:function () {
         gkee.openVideo();
      },
      restore:function () {
        this.onPress = false;
      },
      press:function () {
        this.onPress = true;
      }
    },
    watch:{
      Htabdata:{
        handler:function(newData){
          this.tabclick(newData.nowTab);
        },
        deep:true
      }
    }
  }
</script>
<style scoped>
  /*页头Tab栏*/
  .header-tab-box{
    position: fixed;
    z-index: 1002;
    top:0;
    left:0;
    right:0;
    height: 50px;
    background-color: #37bc9b;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-tab-box .header-tab-item{
    width: 110px;
    height: 30px;
    border:1px solid #fff;
    text-align: center;
    line-height: 30px;
    color:#fff;
  }
  .header-tab-box .header-tab-item:nth-of-type(1){
    border-radius: 4px 0 0 4px;
  }
  .header-tab-box .header-tab-item:nth-last-of-type(1){
    border-radius: 0 4px 4px 0;
  }
  .header-tab-box .header-tab-item.active{
    background-color: #fff;
    color:#37bc9b;
  }
  .to-shot-video-icon{
    position: absolute;
    color: #fff;
    right: 8px;
    top:14px;
    font-size: 18px;
  }
</style>