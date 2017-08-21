<template>
  <div id="createVideo">
    <div class="create-video-header">
       <span class="iconfont icon-guanbi" @click="returnPrev"></span>
       <h4>选择封面</h4>
       <span class="edit-ohters-text" @click="returnPrev">继续编辑视频</span>
    </div>
    <div class="create-video-body">
      <div class="video-cover">
        <img :src="newVideoData.coverImg">
      </div>
 <!--      <div class="edit-action-item">
        <span class="iconfont icon-tupian text-icon">设置封面</span>
        <span class="iconfont icon-xiayiye"></span>
      </div> -->
      <div class="edit-action-item" @click="showTagsPane">
        <span class="iconfont icon-biaoqian text-icon">选择标签</span>
        <div class="tags-block-wrapper">
          <p class="tags-block">
            <span v-for="(tag,index) in newVideoData.tags" v-if="index < 3">#{{tag}}</span>
            <span v-if="newVideoData.tags.length > 3">...</span>
          </p>
          <span class="iconfont icon-xiayiye"></span>
        </div>
      </div>
      <div class="edit-action-item edit-title" @click="showEditTitlePane">
        <span class="iconfont icon-bianji text-icon">点击添加标题<i>（最多140字）</i></span>
        <p>{{newVideoData.title}}</p>
      </div>
    </div>
    <div class="submit-btn" @click="submitVideo">发布</div>
    <Tagandcate v-if="tagsPaneData.tagComp.isShow" :tag-comp="tagsPaneData.tagComp" :now-tag ="tagsPaneData.nowTag" @editmodel = "showProductModelPane" @close="hideTagsPane"></Tagandcate>
    <Productmodelpane  v-if="productModelPaneData.isShow" :product-model-pane-data="productModelPaneData" @submit="submitProductModelPane" @close="hideProductModelPane"></Productmodelpane>
    <Edittitlepane  v-if="editTitlePaneData.isShow" :edit-title-pane-data="editTitlePaneData" @submit="submitEditTitlePane" @close="hideEditTitlePane"></Edittitlepane>
  </div>
</template>
<script>
  import Tagandcate from '../common/tagAndCate.vue'
  import Productmodelpane from '../common/productModelPane.vue'
  import Edittitlepane from '../common/editTitlelPane.vue'
  export default {
    name: 'myPromoVideo',
    components:{
      Tagandcate,Productmodelpane,Edittitlepane
    },
    data() {
      return {
        newVideoData:{
          originalImgSrc:'',
          imgSrc:'',
          videoSrc:'',
          categoryId:'',
          tagIds:'',
          tags:[],
          model:'',
          title:'',
          coverImg:''
        },
        tagsPaneData:{
          tagComp:{
            isShow:false,
            showTopTips:true,
            type:2,
            showEditModelTag:true,
            modelTagVal:'new',
            cateList:[],
            tagsList:[],
          },
          nowTag:{
            id:'',
            tags:[],
            cates:'',
            model:'',
            name:{
              tagNames:'',
              cateNames:''
            }
          }
        },
        cateList:[],
        tagsList:[],
        productModelPaneData:{
          isShow:false,
          nowModel:'',
          editId:null
        },
        editTitlePaneData:{
          isShow:false,
          nowTitle:'',
          editIndex:null
        },
        hasClickSubmit:false,
        hasGetTagAndCate:false
      }
    },
    methods: {
        getInitData:function(){
          this.getCurrentCate();
          this.getTagAndCate();
          this.newVideoData.originalImgSrc = gkee.getVideoPhoto();
          this.newVideoData.coverImg = g.url.imgFormat(gkee.getVideoPhoto());
          // alert(coverSrc);
          // this.newVideoData.imgSrc = gkee.getVideoPhoto();
          // this.newVideoData.imgSrc = g.url.imgFormat(gkee.getVideoPhoto());

        },
        getCurrentCate:function(){
          var _this = this;
          g.ajax({
            type: 'GET',
            url: g.url.format('/video/getShopDetail'),
            data:{},
            success: function (result) {
             console.log(result);
             _this.newVideoData.tags.push(result.data.CategoryName);
             _this.tagsPaneData.nowTag.cates = result.data.CategroyId+'';
            }
          });
        },
        getTagAndCate:function(){
          var _this = this;
          _this.hasGetTagAndCate = false;
          g.ajax({
            type: 'GET',
            url: g.url.format('/video/getTagAndCate'),
            data:{},
            success: function (result) {
              _this.tagsPaneData.tagComp.tagsList = result.data.tagsList;
              _this.tagsPaneData.tagComp.cateList = result.data.cateList;
              _this.hasGetTagAndCate = true;
            }
          });
        },
        showTagsPane:function(index){
          if(this.hasGetTagAndCate){
            this.initTagsPane();
            this.tagsPaneData.tagComp.isShow = true;
          };
        },
        initTagsPane:function(currentItem){
          this.tagsPaneData.nowTag.model = this.newVideoData.model;
        },
        hideTagsPane:function(){
          this.tagsPaneData.tagComp.isShow = false;
        },
        // 出现产品型号面板
        showProductModelPane:function(){
          this.productModelPaneData.nowModel =  this.tagsPaneData.nowTag.model;
          this.productModelPaneData.isShow = true;
        },
        // 提交产品型号面板
        submitProductModelPane:function(model){
          this.tagsPaneData.nowTag.model = model;
          this.productModelPaneData.isShow = false;
        },
        //隐藏产品型号面板
        hideProductModelPane:function(){
          this.tagsPaneData.nowTag.model = '';
          this.productModelPaneData.isShow = false;
        },
        // 编辑标题面板出现
        showEditTitlePane:function(){
          this.editTitlePaneData.nowTitle = this.newVideoData.title;
          this.editTitlePaneData.isShow = true;
        },
        // 提交编辑标题面板
        submitEditTitlePane:function(title){
          // var index = this.editTitlePaneData.editIndex;
          // this.setVideoTitle(id,title);
          this.newVideoData.title = title;

        },
        setVideoTitle:function(id,title){
          var _this = this;
          g.ajax({
            type: 'GET',
            url: g.url.format('/video/setTitle'),
            data:{id:id,title:title},
            success: function (result) {
            }
          });
        },
        // 关闭编辑标题面板
        hideEditTitlePane:function(){
          this.editTitlePaneData.isShow = false;
        },
        tagEnsure:function(params,obj){
           this.newVideoData.tags.splice(0)
           this.newVideoData.categoryId = params.cateId;
           this.newVideoData.tagIds = params.tagIds;
           this.newVideoData.model = params.model;
           if(obj.catename){
             this.newVideoData.tags.push(obj.catename);
           }
           if(obj.tagname){
             this.newVideoData.tags = this.newVideoData.tags.concat(obj.tagname);
           };
           this.hideTagsPane();
        },
        submitVideo:function(){
          if(this.hasClickSubmit){
            return;
          }
          this.hasClickSubmit = true;
          var _this = this;
          g.box.waiting({'title':'上传中，请稍后',wait:true});
          setTimeout(function(){
            _this.uploadVideo1();
          },3000);
        },
        uploadVideo1:function(){
            var _this = this;
            gkee.uploadVideoImg(_this.newVideoData.originalImgSrc,function(s){
              _this.newVideoData.imgSrc = s;
              gkee.uploadVideo(function(s){
                _this.newVideoData.videoSrc = s;
                _this.createVideo();
              },function(){
                alert("error2");
              });
            },function(){
              alert("error1");
            });
        },
        createVideo:function(){
          var flag1 = this.newVideoData.videoSrc.indexOf('/video/');
          var videoSrc = this.newVideoData.videoSrc.substr(flag1);
          var flag2 = this.newVideoData.imgSrc.indexOf('/web/');
          var coverSrc = this.newVideoData.imgSrc.substr(flag2);
          var _this = this;
          var params = {
            tagIds:this.tagsPaneData.nowTag.tags.join(','),
            categoryId:this.tagsPaneData.nowTag.cates,
            model:this.tagsPaneData.nowTag.model,
            title:this.newVideoData.title,
            coverImg:coverSrc,
            videoSrc:videoSrc
          };
          g.ajax({
            type: 'GET',
            url: g.url.format('/video/create'),
            data:params,
            success: function (result) {
               g.box.closeDiv();
               g.box.waiting({'title':'上传成功'});
               gkee.updateMainUrl(3,g.url.urlHref('/promoVideo'));
            },
          });
       },
       returnPrev:function(){
         g.window.close();
       }
    },
    mounted:function (){
      this.getInitData();
    }
  };
</script>
<style scoped>
  @import '../../assets/css/createVideo.css';
</style>
