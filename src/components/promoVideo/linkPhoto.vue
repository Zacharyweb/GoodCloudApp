<template>
  <div id="linkPhoto">
    <Topheader :Hdata="Hdata"></Topheader>
    <Edittitlepane  v-if="editTitlePaneData.isShow" :edit-title-pane-data="editTitlePaneData" @submit="submitEditTitlePane" @close="hideEditTitlePane"></Edittitlepane>
    <Photoswiper  :photo-swiper-data="photoSwiperData" :photo-list="photoList" v-if="photoSwiperData.show" @close="hidePhotoSwiper"></Photoswiper>
    <p class="grey-bar"></p>
    <div class="target-video-item">
      <div class="target-video-box">
        <h4><span :class="{'font-grey':!videoData.title}">{{videoData.title || '暂未设置标题'}}</span></h4>
        <div class="video-content">
          <div class="video-poster-warpper">
            <img :src="videoData.imgSrc">
            <p v-if="videoData.model">{{videoData.model}}</p>
          </div>
          <div class="video-content-text">
            <p class="last-edit-time">最后修改时间&nbsp;<span>{{videoData.time1}}</span></p>
            <p class="create-time">生成时间&nbsp;<span>{{videoData.time2}}</span></p>
            <div>
            <!-- <p class="tags-block">
                <span class="tag-item" v-for="tag in videoData.tags">#{{tag}}</span>
              </p> -->
               <p class="tags-block">{{videoData.tagsText}}</p>
              <span class="btn btn-green" @click="showPhotoSwiper(0)">预览</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="add-photo-tips">正确添加相关图片的姿势<span class="iconfont icon-tishi"></span></p>
    <div class="photos-wrapper">
      <ul>
        <li class="photo-item" v-for="(item,index) in photoList">
          <img :src="item.imgSrc" class="photo-img" @click="showPhotoSwiper(index)">
          <div class="photo-msg">
            <p class="photo-title" :class="{'grey-font':!item.title}">{{item.title || '添加描述（可不填）'}}<span class="iconfont icon-bianji1" @click="showEditTitlePane(index)"></span></p>
            <p class="photo-edit">
              <span class="last-edit-time">{{item.cTime}}</span>
              <span class="btn btn-white-light" @click="deletePhoto(index)">删除</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="submit-btn-wrapper">
      <span class="btn btn-green" @click="uploadPhoto">上传图片</span>
    </div>
    <circleProgress :circleProgressData = "progress" v-if="progress.isShow" @close="colseProgress"></circleProgress>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew.vue'
  import Edittitlepane from '../common/editTitlelPane2.vue'
  import Photoswiper from '../common/photoSwiper.vue'
  import circleProgress from '../common/circleProgress'
  import '../../assets/plugins/upload/cropper.js'
  import '../../assets/plugins/qCloud/crypto.js'
  import '../../assets/plugins/qCloud/cos-js-sdk-v4.js'
  import '../../assets/plugins/qCloud/qCloud.js'
  import '../../assets/plugins/upload/qcloud-cropper.js'
  export default {
    name: 'linkPhoto',
    components:{
      Topheader,Edittitlepane,Photoswiper,circleProgress
    },
    data() {
      return {
        Hdata:{
          title:'关联实拍',
          right:false,
          rigclick:function () {
            alert("右边按钮的点击事件")
          }
        },
        editTitlePaneData:{
          isShow:false,
          nowTitle:'',
          editIndex:null
        },
        photoSwiperData:{
          dataUrl:'',
          show:false,
          currentSlide:0
        },
        videoId:null,
        videoData:{},
        photoList:[],
        progress:{
          isShow:false,
          percent:0
        }
      }
    },
    methods: {
      getInitData:function(){
          this.getSingleVideo();
          this.getRelationPic();
      },
      getSingleVideo:function(){
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/video/single'),
          data:{videoId:_this.videoId},
          success: function (result) {
            _this.setVideoData(result.data)
          }
        });
      },
      setVideoData:function(data){
          data.tags = [];
          if(data.tagNames){
            var tags = data.tagNames.split(',');
            data.tags = tags;
          };
          if(data.category){
            data.tags.push(data.category);
          };
          for(var i = 0; i < data.tags.length; i++){
             data.tags[i] = '#'+ data.tags[i];
          };
          data.tagsText = data.tags.join(' ');
          var imgSrc = g.url.imgFormat(data.coverImg);
          data.imgSrc = imgSrc;
          data.time1 = data.updateTime.substr(5);
          data.time2 = data.createTime.substr(5);
          this.videoData = data
      },
      getRelationPic:function(){
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/video/getRelationPic'),
          data:{videoId:_this.videoId},
          success: function (result) {
            _this.setPhotoList(result.data);
          }
        });
      },
      setPhotoList:function(data){
         data.forEach(function(item){
            var imgSrc = g.url.imgFormat(item.pic);
            item.imgSrc = imgSrc;
            item.cTime = item.createTime.dateFormat('MM.dd hh:mm');
            // console.log(item.createTime);
          })
         this.photoList = data;
      },
      // 编辑标题面板出现
      showEditTitlePane:function(index){
        var currentItem = this.photoList[index];
        this.editTitlePaneData.editIndex = index;
        this.editTitlePaneData.nowTitle = currentItem.title;
        this.editTitlePaneData.isShow = true;
      },
      // 提交编辑标题面板
      submitEditTitlePane:function(title){
        var index = this.editTitlePaneData.editIndex;
        var relationId = this.photoList[index].id;
        this.photoList[index].title = title;
        this.setRelationTitle(relationId,title);
      },
      setRelationTitle:function(relationId,title){
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/video/setRelationTitle'),
          data:{relationId:relationId,title:title},
          success: function (result) {
            console.log(result);
          }
        });
      },
      // 关闭编辑标题面板
      hideEditTitlePane:function(){
        this.editTitlePaneData.isShow = false;
      },
      deletePhoto:function(index){
          var _this = this;
          g.box.confirm({
            title:'确认删除',
            errorMess:'删除后不可恢复哦',
            submitName:'确定',
            refuseName:'取消',
            submitCallBack:function(){
              _this.unrelationPic(index);
              _this.photoList.splice(index,1);
            }
          })
      },
      unrelationPic:function(index){
        var picId = this.photoList[index].id;
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/video/unrelationPic'),
          data:{picId:picId},
          success: function (result) {}
        });
      },
      colseProgress:function () {
        var _this = this;
        _this.progress.isShow = false;
      },
      uploadPhoto:function(){
        var _this = this;
        $.imgUpload({
          progressCallBack:function (curr) {
            if(!_this.progress.isShow && (curr<1)){
              _this.progress.isShow = true;
            }
            _this.progress.percent = parseInt(curr * 100);
          },
          successCallback:function(path){
            _this.relationPic(path);
          },
          cropper:false,
          /*cropperOpts: {
            aspectRatio: 1 / 1,//截图框的比例
            preview:$('.cropper-preview'),//预览框
            zoomable:false, //禁用鼠标滚轮放大缩小
            viewMode:1, //截图框只能在图片区域内移动
          }*/
        },cos);
        /*gkee.openPhoto(function(data){
          g.box.waiting({title:'图片上传中...',wait:true});
          gkee.uploadImage(data,function(path,status){
             _this.relationPic(path);
          });
        });*/
      },
      relationPic:function(picSrc){
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/video/relationPic'),
          data:{videoId:_this.videoId,title:'',pic:picSrc},
          success: function (result) {
            _this.getRelationPic();
          }
        });
      },
      showPhotoSwiper:function(index){
        if(this.photoList.length==0){
          g.box.waiting({title:'暂无关联的实拍图'});
          return;
        }
        this.photoSwiperData.currentSlide = index;
        this.photoSwiperData.show = true;
      },
      hidePhotoSwiper:function(){
        this.photoSwiperData.show = false;
      }
    },
    mounted:function () {
      this.videoId = location.hash.match(/id=(\d+)/)[1];
      this.getInitData();
    }
  }
</script>
<style scoped>
  @import '../../assets/css/linkPhoto.css';
  @import '../../assets/plugins/upload/cropper.css';
</style>
