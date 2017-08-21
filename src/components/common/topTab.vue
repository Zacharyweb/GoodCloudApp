<template>
  <div class="tab-wrapper-box">
      <ul class="tab-wrapper">
         <li class="tab-item"  v-for="(item,index) in tabData.tabList" :class="{active:currentTab == index}" @click="tabclick(index)">
          {{ item.text }}
        </li>
      </ul>
  </div>
</template>
<script>
  export default {
    data:function(){
        return {
           currentTab:this.tabData.nowTab,
        }
    },
    props: ['tabData'],

    methods:{
      tabclick:function(index){
          this.currentTab = index;
          this.$emit('tabclick',this.tabData.tabList[index].text,index); 
          // location.hash = this.tabData.tabList[index].tabhash;
          this.tabData.tabList[index].tabhash;
      }
    }
   
  }
</script>
<style scoped>
  /*topTab栏样式*/
  .tab-wrapper{
    position: fixed;
    top:50px;
    left:0;
    right:0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    color:#999999;
    z-index: 1000;
  }
  .tab-wrapper .tab-item{
    flex:1;
    line-height: 1;
    padding: 16px 0 11px 0;
    text-align: center;
    position: relative;
    border-bottom: 5px solid transparent;
  }
  .tab-wrapper .tab-item.active{
    border-bottom: 5px solid #37bc9b;
  }
  .tab-wrapper .tab-item+.tab-item:before{
    content: '';
    position: absolute;
    width: 1px;
    height: 13px;
    left:0;
    top:16px;
    background-color: #37bc9b;
  }
</style>