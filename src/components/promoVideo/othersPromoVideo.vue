<template>
  <div id="othersPromoVideo">
  <Pagetoptab :Ptabdata="Ptabdata" @tabclick="pageTopTabChange"></Pagetoptab>
    <p class="top-tips" v-if="currentTab == 1">怎样才能让自己的视频排的更靠前<span class="iconfont icon-tishi"></span></p>
    <Videowaterfall :video-water-fall-data="videoWaterFallData0" :query-data="queryData" v-if="currentTab == 0" @clicktag="showTagsPane" @tapvideo="showVideoDetail"></Videowaterfall>
    <Videowaterfall :video-water-fall-data="videoWaterFallData1" :query-data="queryData" v-if="currentTab == 1" @clicktag="showTagsPane" @tapvideo="showVideoDetail"></Videowaterfall>
    <Tagandcate v-if="tagsPaneData.tagComp.isShow" :tag-comp="tagsPaneData.tagComp" :now-tag ="tagsPaneData.nowTag" @close="hideTagsPane" @empty="emptyTags"></Tagandcate>
    <Videodetail :video-detail-data="videoDetailData" v-if="videoDetailData.show" @close="hideVideoDetail" ></Videodetail>
  </div>
</template>
<script>
  import Pagetoptab from '../common/pageTopTab.vue'
  import Videowaterfall from '../common/videoWaterFall.vue'
  import Tagandcate from '../common/tagAndCate.vue'
  import Videodetail from '../common/videoDetail.vue'
  export default {
    name: 'othersPromoVideo',
    components:{
      Pagetoptab,Videowaterfall,Tagandcate,Videodetail
    },
    data() {
      return {
         Ptabdata:{tabList:[{text:'范例视频'},{text:'建材城全部视频'}], nowTab:0},
         currentTab:0,
         videoWaterFallData0:{
          type:0
         },
         videoWaterFallData1:{
          type:1
         },
         queryData:{
          cateIds:'',
          tagIds:'',
          model:''
         },
         tagsPaneData:{
          tagComp:{
            isShow:false,
            hideTitle:true,
            cateIsMulti:true,
            type:3,
            isForSearch:true,
            // showTopTips:true
            cateList:[],
            tagsList:[],
          },
          nowTag:{
            tags:[],
            cates:null,
            catess:[],
            model:'',
            id:null, 
          }
         },
         demoVideoList:[],
         allVideoList:[],
         videoDetailData:{
           show:false,
           videoId:null
         },
         hasGetTagAndCate:false
      }
    },
    methods: {
      pageTopTabChange:function(index){
        $('body').scrollTop(0);
        this.currentTab = index;
        this.tagsPaneData.nowTag.tags.splice(0);
        this.tagsPaneData.nowTag.catess.splice(0);
        if(index == 0){
          this.tagsPaneData.tagComp.type = 3;
          this.getVideoTagAndCate(2);
        }else{
          this.tagsPaneData.tagComp.type = 2;
          this.getVideoTagAndCate(1);
        };
        this.queryData = {cateIds:'', tagIds:'',model:''};
      },
      showTagsPane:function(index){
        if(this.hasGetTagAndCate){
           this.tagsPaneData.tagComp.isShow = true;
        }
      },
      hideTagsPane:function(){
        this.tagsPaneData.tagComp.isShow = false;
      },
      tagEnsure:function(params,obj){
        this.queryData = {
          cateIds: params.cateIds, 
          tagIds: params.tagIds,
          model: params.model    
        };
        this.hideTagsPane();
      },
      showVideoDetail:function(id){
        this.videoDetailData.videoId = id;
        this.videoDetailData.show = true;
      },
      hideVideoDetail:function(){
        this.videoDetailData.show = false;
      },
      emptyTags:function(){
        this.tagsPaneData.nowTag.tags = [];
        this.tagsPaneData.nowTag.catess = [];
      },
      getVideoTagAndCate:function(type){
        var ajaxUrl;
        this.hasGetTagAndCate = false;
        if(type == 1){
          ajaxUrl = '/video/getTagAndCate';
        }
        if(type == 2){
          ajaxUrl = '/demoVideo/getTagAndCate';
        }
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format(ajaxUrl),
          data:{shopId:0},
          success: function (result) {
            if(result.statusCode == 0){
              _this.tagsPaneData.tagComp.tagsList = result.data.tagsList;
              _this.tagsPaneData.tagComp.cateList = result.data.cateList;
              _this.hasGetTagAndCate = true;
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
    },
    mounted:function () {
      this.getVideoTagAndCate(2);
    },

  }
</script>
