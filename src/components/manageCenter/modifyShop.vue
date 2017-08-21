<template>
  <div id="modifyShop">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="container-fluid apply-container container-gray">
      <div class="apply-content container">
        <div class="modify" @click="modify" v-show="!modifying"><i class="icon iconfont icon-bianji"></i><span>编辑门店</span></div>
        <!--<div class="logo-content"></div>-->
        <ul class="list-group">
          <li class="list-group-item apply-list">
            <div class="input-group">
              <div class="input-group-btn">
                <i class="icon iconfont icon-mendian input-img" :style="{ color:modifying ? '#37BC9B':'#999999' }"></i>
              </div>
              <div class="input-group">
                <!--<input type="text" id="shopName" v-model="shopName" class="form-control no-border" placeholder="请填写您的门店名字" :disabled="!modifying">
                <span class="input-group-btn input-btn-close" v-if="(shopName&&modifying)?true:false" @click="clear">
                  <button class="btn" type="button">&times;</button>
                </span>-->
                <input-item placeholder="请填写您的门店名字" classname="form-control no-border" type="text" id="shopName" maxlength="15" v-model="shopName" ></input-item>
              </div>
            </div>
          </li>
          <li class="list-group-item apply-list">
            <div class="input-group">
              <div class="input-group-btn">
                <i class="icon iconfont icon-fenlei input-img" :style="{ color:modifying ? '#37BC9B':'#999999' }"></i>
              </div>
              <div class="ui-select">
                <div :class="{ selectmodify: !modifying }">{{selectCategroy| optionTxt(optionCategroy)}}</div>
                <select v-model='selectCategroy' class="form-control no-border" id="categroyId" v-if="modifying">
                  <option v-for="option of optionCategroy" :value='option.id'>{{option.name}}</option>
                </select>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="apply-content container shop-sign">
        <div class="title"><span class="icon iconfont icon-tupian" :style="{ color:modifying ? '#37BC9B':'#999999' }"></span>门店招牌</div>
        <div class="shopimg" @click="changeimg"><img :src="shopimg?shopimg:'logo-new.png'"></div>
        <div class="tape tape-left"></div>
        <div class="tape tape-right"></div>
      </div>
      <div class="button-content container" v-show="modifying">
        <button type="button" class="btn btn-green btn-normal btn-lg btn-block" @click="modifysubmit">确认修改</button>
      </div>
    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  export default {
    name: 'guide2',
    data() {
      return {
        Hdata:{
          title:'编辑门店',
        },
        shopName:'',
        selectCategroy:'',
        shopimg:'',
        id:'',
        optionCategroy:[],
        modifying:false
      }
    },
    components:{
      Topheader
    },
    methods: {
      modify:function () {
        this.modifying = true;
      },
      modifysubmit:function () {
        var params ={};
        params.shopName = this.shopName;
        params.categroyId = this.selectCategroy;
        params.logo = this.shopimg;
        if(!(params.shopName&&params.categroyId&&params.logo)){
          g.box.waiting({
            title:"请填写完整的信息！"
          })
          return;
        }
        g.ajax({
          type: 'POST',
          url: g.url.format('/shop/updateShopInfo'),

          data:params,
          success: function (result) {
            if(result.statusCode==0){
              g.box.waiting({
                title:"修改店铺成功！",
                closeDiv:function () {
                  g.window.closeWithData();
                }
              })
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      changeimg:function () {
        var _this = this;
        if(!_this.modifying) return;
        gkee.openPhoto(function(data){
          g.box.waiting({
            title:"图片上传中，请等待.....",
            wait:true
          })
          gkee.uploadImage(data,function(path,status){
            _this.shopimg = g.url.imgFormat(path);
            g.box.closeDiv();
          });
        });

      },
      clear:function () {
        var that = this;
        that.shopName = "";
      },
      getShopInfoDetail:function (_this) {
        if(!_this) {
          var _this = this;
        }
        g.ajax({
          type: 'GET',
          url: g.url.format('/shop/getShopInfoDetail'),

          success: function (result) {
            if(result.statusCode==0){
              var infoDetail = result.data;
              _this.shopName =infoDetail.ShopName;
              _this.selectCategroy =infoDetail.CategroyId;
              _this.shopimg =infoDetail.Logo;
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      getoptionCategroy:function (_this) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/api/operate/getCategories'),

          data: {text: '', pageIndex: 1,pageSize:100},
          success: function (result) {
            if(result.statusCode==0){
              _this.optionCategroy = result.data;
              _this.optionCategroy.unshift({id:'',name:'选择主营类目'});
            }else{
              alert(result.errorMsg);
            }
          }
        })
      }
    },
    mounted:function () {
        var _this = this;
      _this.$options.methods.getShopInfoDetail(_this);
      _this.getoptionCategroy(_this);
    },
    filters:{
      optionTxt:function (value,obj) {
        var newObj = {};
        if(value=='选择主营类目') return value;
        else{
          for(var i = 0; i < obj.length; i ++) newObj[obj[i].id] = obj[i].name;
          return newObj[value];
        }
      }
    }
  }


</script>
<style scoped>
  @import '../../assets/css/login.css';
  .list-group-item{ padding: 10px 0px;}
  .tape{ width: 7px ; height: 23px; background: #37bc9b;border-radius: 7px; position: absolute;top:-17px;}
  .tape-left{ left: 17%;}
  .tape-right{ right: 17%;}
  .shop-sign .title{ color: #333; font-size: 15px;}
  .shop-sign .title span.icon{ margin-right: 20px; font-size: 20px;}
  .shop-sign .shopimg{width: 200px;margin:10px auto; }
  .shop-sign .shopimg img{ width: 200px;min-height: 104px;}
  .apply-container .apply-content{ padding: 35px 30px 25px;}
</style>
