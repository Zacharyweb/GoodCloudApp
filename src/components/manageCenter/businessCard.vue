<template>
  <div id="businesscard">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="businesscard-container container-gray">
      <div class="top-danger">
        <div class="danger-text">填写真实的名片信息，会让客户更愿意联系您。</div>
      </div>
      <div class="card-content">
        <ul class="list-group new-list-group">
          <li class="list-group-item name">
            <span class="list-title">姓名</span>
            <span class="list-content" @click="write({type:'input',name:'nickName'})">{{information.nickName||'输入姓名'}}</span>
            <span class="list-back"></span>
          </li>
          <li class="list-group-item number">
            <span class="list-title">手机号</span>
            <span class="list-content">{{information.phone||'输入手机号'}}</span>
          </li>
          <li class="list-group-item  head-icon ">
            <span class="list-title">头像</span>
            <span class="list-content list-content-flex flex-center" @click="photo">点击上传头像</span>
            <span class="phone-icon" @click="photo">
              <img :src="information.img" v-if="information.img?information.img:'photo.png'">
            </span>
          </li>
          <li class="list-group-item WeChat">
            <span class="list-title">微信号</span>
            <span class="list-content" @click="write({type:'input',name:'wechat'})">{{information.wechat||'输入微信号'}}</span>
            <span class="list-back"></span>
          </li>
          <li class="list-group-item Myself">
            <span class="list-title">自我介绍</span>
            <span class="list-content list-content-flex" @click="write({type:'textarea',name:'remark'})">{{information.remark||'写一句话描述自己的优势'}}</span>
            <span class="list-back"></span>
          </li>
          <li class="list-group-button">
            <!--<div class="control-button-left">
              <button class="btn btn-green btn-normal btn-block noradius " @click="previewClick">预览名片</button>
            </div>-->
            <button class="btn btn-gray-lighter btn-normal btn-block noradius" @click="loginout">退出</button>
          </li>
        </ul>

      </div>
      <!--<div class="car-show" >
        <h3>
          <span class="color"></span>
          <span class="examples">范例展示</span>
          <span class="fail">优秀范例</span>
        </h3>

        <BCard :Bcardata="Bcardata"></BCard>
        <p class="reason">理由：XXXXXXXXXXXXXXXXXXXXXX</p>
      </div>
      <div class="car-show" >
        <h3>
          <span class="color"></span>
          <span class="examples">范例展示</span>
          <span class="fail">不及格范例</span>
        </h3>
        <BCard :Bcardata="Bcardata"></BCard>
        <p class="reason">理由：XXXXXXXXXXXXXXXXXXXXXX</p>
      </div>-->
    </div>
    <div class="preview" v-if="preview" @click="previewClick">
      <div class="card">
        <BCard :Bcardata="information"></BCard>
      </div>
    </div>
    <circleProgress :circleProgressData = "progress" v-if="progress.isShow" @close="colseProgress"></circleProgress>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  import BCard from '../common/card'
  import circleProgress from '../common/circleProgress'
  import '../../assets/plugins/upload/cropper.js'
  import '../../assets/plugins/qCloud/crypto.js'
  import '../../assets/plugins/qCloud/cos-js-sdk-v4.js'
  import '../../assets/plugins/qCloud/qCloud.js'
  import '../../assets/plugins/upload/qcloud-cropper.js'
  let obj;
  export default {
    name: 'businessCard',
    components:{
      Topheader,
      BCard,
      circleProgress
    },
    data() {
      return {
        Hdata:{
          title:'个人名片',
          back:function () {
            g.window.closeWithData();
          },
        },
        Bcardata:{
          name:'周二珂',
          text:'在南通已经15年了，欢迎您加我微信，我今天晚上10点前都在，非常高兴能与你交流。',
          phone:'1351654894',
          wechat:'simuzu',
          img:'pic.png'
        },
        preview:false,
        information:{},
        photoimg:'',
        progress:{
          isShow:false,
          percent:0
        }
      }
    },
    methods: {
      previewClick:function () {
        let _this = this;
        _this.preview = !_this.preview;
      },
      write:function (objdata) {
        g.window.openNew(g.url.urlHref("/write?type="+objdata.type+"&name="+objdata.name),"write");
      },
      colseProgress:function () {
        var _this = this;
        _this.progress.isShow = false;
      },
      photo:function () {
        var _this = this;
        $.imgUpload({
          progressCallBack:function (curr) {
              if(!_this.progress.isShow && (curr<1)){
                _this.progress.isShow = true;
              }
              _this.progress.percent = parseInt(curr * 100);
          },
          successCallback:function(path){
            g.ajax({
              type: 'POST',
              url: g.url.format('/account/updateUserOuthers'),
              data:{text:path,type:1},
              success: function (result) {
                if (result.statusCode == 0) {
                  _this.information.img = g.url.imgFormat(path);
                  obj.data.img = g.url.imgFormat(path);
                  g.storage.set("token", JSON.stringify(obj));
                } else {
                  alert(result.errorMsg);
                }
              }
            });
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
      loginout:function () {
        g.window.loginOut(g.url.urlHref('/'));
      },
      getGuideInfor:function () {
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/shop/getGuideInfo'),
          success: function (result) {
            if (result.statusCode == 0) {
             debugger
            } else {
              alert(result.errorMsg);
            }
          }
        });
      }
    },
    mounted:function () {
      //全局配置类
      var _this = this;
      obj = g.storage.getUserInfo();
//      _this.getGuideInfor();
      _this.information = obj.data;
      window.frame_callback =function(){
        obj = g.storage.getUserInfo();
        _this.information = obj.data;
      }
     },
  }

</script>
<style scoped>
  @import '../../assets/css/businesscard.css';
  @import '../../assets/plugins/upload/cropper.css';
</style>
