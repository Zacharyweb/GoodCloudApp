<template>
  <div id="manageCenter">
    <Topheader :Hdata="Hdata"></Topheader>
    <shopManager v-if="information.utype==3|| information.utype==6" :shop-data="information"></shopManager>
    <guide v-else-if="information.utype==2" :shop-data="information"></guide>
   <!-- <button class="btn btn-green btn-block" @click="ceshi">测试</button>
    <button class="btn btn-green btn-block" @click="loginOut">退出</button>-->
  </div>
</template>
<script>
  /**
   * information.utype 身份：（3 店长）(2普通用户) (6 门店导购)
   * */
  import Topheader from '../common/headerNew'
  import shopManager from '../common/shopManager'
  import guide from '../common/user'
  let obj;
  export default {
    name: 'manageCenter',
    components: {
      Topheader,
      shopManager,
      guide
    },
    data() {
      return {
        Hdata: {
          title: '管理中心',
          theme: 'green',
          lefthide: true,
/*          haveright: true,
          rightHtml: '<i class="icon iconfont icon-shezhi"></i>',
          rightevent: 'shezhi'*/
        },
        information: {},
      }
    },
    methods: {
      getUserInfoByAccount: function () {
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/account/getUserInfoByAccount'),
          success: function (result) {
            if (result.statusCode == 0) {
              var data = result.data;
              if (data.img) data.img = g.url.imgFormat(data.img,150,150);
              _this.information = data;
              if (data.organize) {
                _this.Hdata.title = data.organize.name;
              }
            } else {
              alert(result.errorMsg);
            }

          }
        });
      },
      ceshi: function () {
        g.window.openNew('http://1.1.1.86:8089/#/ceshi', "ceshi");
      },
      loginOut: function () {
        g.window.loginOut(g.url.urlHref('/'));
      }
    },
    mounted: function () {
      var _this = this;
      _this.getUserInfoByAccount();
      window.frame_callback = function () {
        _this.getUserInfoByAccount();
      }
    }
  }
</script>
<style scoped>
  @import '../../assets/css/manageCenterNew.css';
</style>
