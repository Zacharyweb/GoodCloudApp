<template>
  <div id="guide2">
    <shop :shopTime="shopTime"></shop>
  </div>
</template>
<script>
  import shop from '../common/shop'
  var obj={};
  export default {
    name: 'guide2',
    data() {
      return {
        shopTime:{
          Hdata:{
            title: '注册门店',
          }
        }
      }
    },
    components:{
      shop
    },
    methods: {
      submitform:function (_this,shopData) {
        obj.shopName = shopData.shopName;
        obj.categroyId = shopData.categroyId;
        g.ajax({
          type: 'POST',
          url: g.url.format("/login/registerShop"),
          data:obj,
          success: function (data) {
            if(data.statusCode==0){
              //缓存token
              var _data = data.data;
              g.storage.set("token",JSON.stringify(_data));
              gkee.login(JSON.stringify(_data),'');
              g.storage.del("weixinuser");										//删除缓存
            }else{
              alert(data.errorMsg);
            }
          }
        });
      }
    },
    mounted:function () {
      var _this = this;
      obj = JSON.parse(g.storage.get("weixinuser"));
    }
  }


</script>
<style scoped>
  @import '../../assets/css/login.css';
</style>
