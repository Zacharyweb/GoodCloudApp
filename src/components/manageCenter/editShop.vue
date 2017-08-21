<template>
  <div class="editShop">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="es-container">
      <div class="es-text">修改后立即生效</div>
      <div class="es-content">
        <ul class="es-co">
          <li @click="edit(0,information.ShopName,true)">
            <div class="es-co-icon"><span class="red-start">*</span><i class="icon iconfont icon-mendian"></i></div>
            <div class="es-co-text">
              <div class="title">{{ information.ShopName || '请填写您的门店名称'}}</div>
              <div class="text">门店名称就是您门店的招牌</div>
            </div>
            <div class="es-co-ri"><i class="icon iconfont icon-xiayiye"></i></div>
          </li>
          <li @click="edit(1,information.BrandName,true)">
            <div class="es-co-icon"><span class="red-start">*</span><i class="icon iconfont icon-pinpaibang"></i></div>
            <div class="es-co-text">
              <div class="title">{{information.BrandName?information.BrandName:'请填写您经营的品牌名称'}}</div>
              <div class="text">品牌名称会出现在很多地方，请准确填写</div>
            </div>
            <div class="es-co-ri"><i class="icon iconfont icon-xiayiye"></i></div>
          </li>
          <li @click="open(5,information.CategroyId,true)">
            <div class="es-co-icon"><span class="red-start">*</span><i class="icon iconfont icon-cate"></i></div>
            <div class="es-co-text">
              <div class="title">{{ information.CategroyId ? categroyName :'选择经营类目'}}</div>
              <div class="text">请选择您经营的主营商品类目</div>
            </div>
            <div class="es-co-ri"><i class="icon iconfont icon-xiayiye"></i></div>
          </li>
          <li @click="edit(2,information.Address,true)">
            <div class="es-co-icon"><span class="red-start">*</span><i class="icon iconfont icon-dizhi-copy"></i></div>
            <div class="es-co-text">
              <div class="title">{{information.Address?information.Address:'请填写门店所在地址'}}</div>
              <div class="text">例2A-303，建材城地址会自动补全</div>
            </div>
            <div class="es-co-ri"><i class="icon iconfont icon-xiayiye"></i></div>
          </li>
          <li @click="edit(3,information.Notice)">
            <div class="es-co-icon"><i class="icon iconfont icon-huodong"></i></div>
            <div class="es-co-text">
              <div class="title">{{information.Notice?information.Notice:'一句话描述门店当前活动'}}</div>
              <div class="text">会出现在很多地方，好的描述会让效果爆棚</div>
            </div>
            <div class="es-co-ri"><i class="icon iconfont icon-xiayiye"></i></div>
          </li>
          <li @click="changeimg">
            <div class="es-co-icon"><i class="icon iconfont icon-pinpai"></i></div>
            <div class="es-co-text">
              <div class="title">品牌LOGO</div>
              <div class="text">重要的店铺展示，没准备好，注册完成后再上传</div>
            </div>
            <div class="es-co-ri"><i class="icon iconfont icon-xiayiye"></i></div>
          </li>
        </ul>
        <div class="es-co-logo" @click="changeimg"><img :src="information.Logo"></div>
      </div>
      <div class="button-content container" v-if="type==1" style="margin-bottom: 10px;">
        <button type="button" class="btn btn-normal btn-block btn-green"
                :class="{disabled:!(information.ShopName && information.BrandName && information.CategroyId && information.Address)}"
                :disabled="!(information.ShopName && information.BrandName && information.CategroyId && information.Address)"
                id="submit" @click="submitform">提交申请</button>
      </div>
    </div>
    <editTitle :editData="editData"></editTitle>
    <!--类目-->
    <tanchu :tag-comp="tagComponent" v-if="tagComponent.isShow"  @tagensure="tagEnsure">
      <div slot="slide-title0"></div>
    </tanchu>

    <circleProgress :circleProgressData = "progress" v-if="progress.isShow" @close="colseProgress"></circleProgress>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  import editTitle from '../common/editTitle'
//  import tanchu from '../common/tanchu'
  import tanchu from '../common/check'
  import circleProgress from '../common/circleProgress'
  import '../../assets/plugins/upload/cropper.js'
  import '../../assets/plugins/qCloud/crypto.js'
  import '../../assets/plugins/qCloud/cos-js-sdk-v4.js'
  import '../../assets/plugins/qCloud/qCloud.js'
  import '../../assets/plugins/upload/qcloud-cropper.js'
  export default {
    name: 'editShop',
    components:{
      Topheader,
      editTitle,
      tanchu,
      circleProgress
    },
    data() {
      return {
        Hdata:{
          title:'查看门店',
        },
        type:'',
        editData:{
          editText:'',
          editType:'',
          maxlength:'',
          require:false,
          ifShow:false
        },
        information:{
          ShopName:'',
          BrandName:'',
          CategroyId:'',
          Address:'',
          Notice:'',
          Logo:g.url.imgFormat('',150,150,1)
        },
        tagComponent:{
          btnLists:[],
          checkedList:{
            checkedId:''
          },
          isShow:false,
        },
        categroyName:'',
        progress:{
          isShow:false,
          percent:0
        }
      }
    },
    methods:{
      edit:function (type,text,require) {
        var _this = this;
        _this.editData.editType = type;
        if(type==3){
          _this.editData.maxlength = 10;
        }
        _this.editData.editText = text;
        _this.editData.require = require?require:false;
        _this.editData.ifShow = true;
      },
      open:function (type,id,require) {
        var _this = this;
        _this.tagComponent.checkedList.checkedId = id;
        _this.tagComponent.isShow = true;
      },
      getShopInfoDetail:function () {
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/shop/getShopInfoDetail'),
          success: function (result) {
            if(result.statusCode==0){
                var data = result.data;
                data.Logo = g.url.imgFormat(data.Logo,150,150,1);
                _this.information = result.data;
                _this.categroyName = _this.getName(_this.information.CategroyId,_this.tagComponent.btnLists[0].lists);
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      getoptionCategroy:function (callback) {
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/api/operate/getCategories'),
          data: {text: '', pageIndex: 1,pageSize:100},
          success: function (result) {
            if(result.statusCode==0){
              var tagsList ={};
              tagsList.lists = result.data;
              tagsList.name = 'checkedId';
              tagsList.type = 'radio';
              _this.tagComponent.btnLists.push(tagsList) ;
              console.log(JSON.stringify(_this.tagComponent.btnLists));
              if(callback){
                callback();
              }
            }else{
              alert(result.errorMsg);
            }
          }
        })
      },
      tagEnsure:function () {
        var _this = this;
        var value = _this.tagComponent.checkedList.checkedId ;
         if(_this.type == 1){
          _this.information.CategroyId = value;
          _this.tagComponent.isShow = false;
        }else{
          _this.updateShopData({type:5,value:value},function () {
            _this.tagComponent.isShow = false;
          });
        }

      },
      getName:function (value,obj) {
        var newObj = {};
        if(value=='选择主营类目') return value;
        else{
          for(var i = 0; i < obj.length; i ++) newObj[obj[i].id] = obj[i].name;
          return newObj[value];
        }
      },
      editTitle:function (params,callback) {
        var _this = this;
        if(_this.type == 1){
          var type = params.type;
          switch (type){
            case 0:
                _this.information.ShopName = params.value;
                break;
            case 1:
              _this.information.BrandName = params.value;
              break;
            case 2:
              _this.information.Address = params.value;
              break;
            case 3:
              _this.information.Notice = params.value;
              break;
          }
          console.log(JSON.stringify(_this.information));

          callback();
        }else{
          _this.updateShopData(params,function () {
            callback();
          });
        }
      },
      colseProgress:function () {
        var _this = this;
        _this.progress.isShow = false;
      },
      changeimg:function () {
        var _this = this;
        $.imgUpload({
          progressCallBack:function (curr) {
              if(!_this.progress.isShow && (curr<1)){
                _this.progress.isShow = true;
              }
            _this.progress.percent = parseInt(curr * 100);
          },
          successCallback:function(path){
            if(_this.type ==1){
              _this.information.Logo = g.url.imgFormat(path,150,150,1);
            }else{
              _this.updateShopData({type:4,value:path},function () {
                _this.information.Logo = g.url.imgFormat(path);
              });
            }
          },
          cropper:true,
          cropperOpts: {
            aspectRatio: 1 / 1,//截图框的比例
            preview:$('.cropper-preview'),//预览框
            zoomable:false, //禁用鼠标滚轮放大缩小
            viewMode:1, //截图框只能在图片区域内移动
          }
        },cos);
      },
      updateShopData:function (params,callback) {
        var _this = this;
        g.ajax({
          type: 'POST',
          url: g.url.format('/shop/updateShopData'),
          data:{type:params.type,value:params.value},
          success: function (result) {
            if(result.statusCode==0){
              callback();
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      submitform:function () {
        var _this = this;
        var infor = {
          shopName:_this.information.ShopName,
          bandName:_this.information.BrandName,
          categroyId:_this.information.CategroyId,
          addrees:_this.information.Address,
          notice:_this.information.Notice,
          logo:_this.information.Logo
          };
        g.ajax({
          type: 'post',
          url: g.url.format("/login/applicationShop"),
          data:infor,
          success: function (data) {
            if(data.statusCode==0){
              g.box.waiting({
                title:'保存成功！',
                closeDiv:function () {
                    g.window.loginOut(g.url.urlHref('/'));
                }
              });
            }else{
              alert(data.errorMsg);
            }
          }
        });
      }
    },
    mounted:function () {
      var _this = this;
      _this.type = g.params.get('type');
      if(_this.type == 1){
          _this.Hdata.title = '申请开店';
      }
      _this.getoptionCategroy(function () {
        if(_this.type !=1){
          _this.getShopInfoDetail();
        }
      });
    },
    watch:{
      editData:{
        handler: function (val, oldVal) {
            if(!val.ifShow && this.type !=1){
              this.getShopInfoDetail();
            }
        },
        deep: true
      },
      tagComponent:{
        handler: function (val, oldVal) {
          if(!val.ifShow && this.type !=1){
            this.getShopInfoDetail();
          }
        },
        deep: true
      },
      information:{
        handler: function (val, oldVal) {
          if(val.CategroyId){
            this.categroyName = this.getName(val.CategroyId,this.tagComponent.btnLists[0].lists);
          }
        },
        deep: true
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/editShop.css";
  @import '../../assets/plugins/upload/cropper.css';
</style>
