<template>
  <div id="openShop">
    <shop :shopTime="shopTime"></shop>
  </div>
</template>
<script>
  import shop from '../common/shop'
  export default {
    name: 'openShop',
    data() {
      return {
        shopTime:{
          Hdata:{
            title: '申请开店',
          }
        }
      }
    },
    components:{
      shop
    },
    methods: {
      submitform:function (_this,shopData) {
        $.ajax({
          type: 'post',
          url: g.url.format("/login/applicationShop"),
          data:shopData,
          success: function (data) {
            if(data.statusCode==0){
              g.box.waiting({
                title:'保存成功！',
                closeDiv:function () {
                    g.window.loginOut(g.url.urlHref('/'));
                }
              })
            }else{
              alert(data.errorMsg);
            }
          }
        });
      }
    },
    mounted:function () {
      var _this = this;
    }
  }


</script>
<style scoped>
  @import '../../assets/css/login.css';
</style>
