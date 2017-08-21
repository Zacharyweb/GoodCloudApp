<template>
  <div id="shoppingguide">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="shoppingguide-container container-gray">
      <!--已经有导购的时候展示的页面-->
      <div v-if="guideShow==1">
        <div class="top-danger">
          <div class="danger-text">填写真实的名片信息，会让客户更愿意联系您。</div>
        </div>
        <ul class="shoppingGuides">
          <li v-for="infor in guideinformation">
            <div class="shoppingGuides-li-content">
              <div class="guideimg">
                <img :src="infor.img">
                <div class="guidename">{{infor.NickName||'暂无昵称'}}</div>
              </div>
              <div class="guid-container">
                <div class="guidetext">{{infor.Remark||'暂无描述'}}</div>
                <!--<button class="btn btn-red" @click="viewGuideCard(infor.Id)"><i class="icon iconfont icon-mingpianxuanzhong01 icon-guide"></i>查看名片</button>-->
                <button class="btn btn-gray pull-right" @click="removeGuide(infor.Id)">删除</button>
              </div>
              <div class="activate" v-if="infor.AccountId==0?true:false">未激活</div>
            </div>
          </li>
        </ul>
        <div class="newAdd-shoppingGuide" @click="addGuide">新增导购</div>
      </div>
      <!--没有导购的时候展示的页面-->
      <div class="Add-shoppingguide"  v-if="guideShow==0">
        <p class="prompt">你还没有添加过导购<br/>点击下方添加按钮哦</p>
        <p class="Add-button" @click="addGuide">添加导购</p>
        <!--<p class="show-title">范例展示</p>-->
      </div>
    </div>

    <div class="preview" v-if="oneguide.preview" @click="previewClick">
      <div class="card">
        <BCard :Bcardata="oneguide.information"></BCard>
      </div>
    </div>


  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  import BCard from '../common/card'
  export default {
    name: 'businessCard',
    components:{
      Topheader,
      BCard,
    },
    data() {
      return {
        Hdata:{
          title:'导购管理',
        },
        /*Bcardata:{
          name:'周二珂',
          text:'在南通已经15年了，欢迎您加我微信，我今天晚上10点前都在，非常高兴能与你交流。',
          phone:'1351654894',
          wechat:'simuzu',
          img:'../../../static/pic.png'
        },*/
        guideinformation:[],
        oneguide:{
          preview:false,
          information:{}
        },
        guideShow:null
//        candeleteGuiude:false
      }
    },
    methods: {
      loginout:function () {
        g.window.loginOut(g.url.urlHref('/'));
      },
      getguide:function (self) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/account/getShopUser'),
          success: function (result) {
            if(result.statusCode==0){
                var data = result.data;
                for(var i = 0; i<data.length ;i++){
                  data[i].img = g.url.imgFormat(data[i].Img,100,100,0);
                }
              self.guideinformation = data;
              if(self.guideinformation.length > 0){
                self.guideShow = 1;
              }else{
                self.guideShow = 0;
              }
              console.log(result.data);
            }else{
              g.box.waiting({
                title:result.errorMsg
              })
            }
          }
        });
      },
      addGuide:function () {
        g.window.openNew(g.url.urlHref("/addGuide"),"addGuide");
      },
      viewGuideCard:function (id) {
          var _this = this;
        for(let i =0; i< _this.guideinformation.length;i++){
            if(_this.guideinformation[i].Id == id){
                var infor = _this.guideinformation[i]
                infor.name = _this.guideinformation[i].NickName;
                infor.phone = _this.guideinformation[i].Tel;
                infor.wechat = _this.guideinformation[i].Wechat;
            }
        }
        _this.oneguide.information = infor;
        _this.oneguide.preview = true;
      },
      removeGuide:function (id) {
        var _this = this;
        g.box.confirm({
          title:"温馨提示",
          errorMess:"您确定要删除这个导购了么？",
          submitCallBack:function () {
            g.ajax({
              type: 'POST',
              url: g.url.format('/shop/deleteGuiude'),

              data:{guideId:id},
              success: function (result) {
                if(result.statusCode==0){
                  _this.getguide(_this);
                }else{
                    g.box.alert({
                      errorMess:result.errorMsg
                    });
                }
              }
            });
          }
        });

      },
      previewClick:function () {
        this.oneguide.preview = false;
      }
    },
    mounted:function () {
      var _this = this;
      _this.$options.methods.getguide(_this);
      window.frame_callback =function(){
        _this.$options.methods.getguide(_this);
      }
    }
  }
</script>
<style scoped>
  @import '../../assets/css/shoppingGuide.css';
  .btn-red{ font-size: 12px;}
  .btn-gray{ font-size: 12px;}
</style>
