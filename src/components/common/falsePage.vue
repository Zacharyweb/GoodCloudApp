<template>
  <div class="not-join-shop-page">
    <div class="false-header"><slot></slot></div>
    <div class="not-join-shop-box"></div>
    <p>赶快加入门店，就可以愉快地使用这些功能了</p>
  </div>
</template>
<script>
  export default {
    data:function(){
        return {
       
        }
    },
    props: [],
    methods:{
   
    },
    mounted:function(){

    }
  }
</script>
<style scoped>
/*没有加入门店页面*/
.not-join-shop-page{
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 1002;
}
.not-join-shop-page .not-join-shop-box{
  box-sizing: content-box;
  margin-top: 46%;
  margin-bottom: 12%;
  text-align: center;
  height: 191px;
  background: url("../../assets/img/shopHouse.png") no-repeat center center;
  background-size: 289px 191px;
}
.not-join-shop-page  p{
  font-size: 15px;
  color:#ccc;
  text-align: center;
}
.not-join-shop-page .false-header{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #37bc9b; 
  color: #fff;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
}
</style>