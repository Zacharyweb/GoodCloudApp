<template>
    <div class="pt-tab-box">
      <div class="pt-tab-item" v-for="(item,index) in Ptabdata.tabList" :class="{active:currentTab == index}" @click="tabclick(index)">
        {{ item.text}}
      </div>
    </div>
</template>
<script>
  export default {
    data:function(){
        return {
           currentTab:this.Ptabdata.nowTab,
        }
    },
    props: ['Ptabdata'],
    methods:{
      tabclick:function(index){
          this.currentTab = index;
          this.$emit('tabclick',index);
      }
    }
  }
</script>
<style scoped>
  /*页头Tab栏*/
  .pt-tab-box{
    position: fixed;
    z-index: 1000;
    top:50px;
    left:0;
    right:0;
    height: 45px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
  }
  .pt-tab-box .pt-tab-item{
    flex:1;
    height: 45px;
    box-sizing: border-box;
    padding-top: 13px;
    text-align: center;
    font-size: 15px;
    color:#ccc;
  }

  .pt-tab-box .pt-tab-item.active{
    color:#37bc9b;
    border-bottom:5px solid #37bc9b;
  }
</style>