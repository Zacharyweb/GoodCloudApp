<template>
  <div id="myPromoVideo">
    <Pagetoptab :Ptabdata="Ptabdata" @tabclick="pageTopTabChange"></Pagetoptab>
    <Tagandcate v-if="tagsPaneData.tagComp.isShow" :tag-comp="tagsPaneData.tagComp" :now-tag ="tagsPaneData.nowTag" @editmodel = "showProductModelPane" @close="hideTagsPane"></Tagandcate>
    <Productmodelpane  v-if="productModelPaneData.isShow" :product-model-pane-data="productModelPaneData" @submit="submitProductModelPane" @close="hideProductModelPane"></Productmodelpane>
    <Edittitlepane  v-if="editTitlePaneData.isShow" :edit-title-pane-data="editTitlePaneData" @submit="submitEditTitlePane" @close="hideEditTitlePane"></Edittitlepane>
    <div class="my-video-zero" v-if="currentTab == 0 && myVideoList.length == 0  && endFirstGetmyVideoList">
       <div class="wihte-fill-block">
         <div class="zero-content">
           <div class="zero-text">您当前还没有上传短视频</div>
           <div class="zero-p">短视频制作简单，比图片、文字更全面直观地展示产品。</div>
           <div class="zero-p">制作好的短视频分享到业主装修群，更能引起客户的兴趣，迅速提升客户对我的信任感，增加邀约到店的成功率。</div>
         </div>

       </div>
       <div class="btn-wrapper1">
         <span class="btn-green" @click="todemovideo">范例优质视频</span>
         <span class="btn-green" @click="toshot">去拍摄</span>
       </div>
       <p>优质的短视频会大幅度提升成交率<span class="iconfont icon-tishi"></span></p>
    </div>
    <div class="my-videos" v-if="currentTab == 0 && myVideoList.length != 0">
      <p>什么样的短视频才能抓住用户<span class="iconfont icon-tishi"></span></p>
      <ul>
        <li v-for="(item,index) in myVideoList">
          <h4 :class="{'font-grey':!item.title }"><span>{{item.title || "暂未设置标题"}}</span></h4>
          <span class="iconfont icon-trash delete" @click="deleteMyVideo(index)"></span>
          <div class="video-content">
            <div class="video-poster-warpper">
              <img :src="item.imgSrc" @click="showVideoDetail(item.id)">
              <p v-if="item.model">{{item.model}}</p>
            </div>
            <div class="video-content-text">
              <p class="last-edit-time">最后修改时间&nbsp;<span>{{item.time1}}</span></p>
              <p class="create-time">生成时间&nbsp;<span>{{item.time2}}</span></p>
              <div>
                 <p class="tags-block">{{item.tagsText}}</p>
                <span class="btn btn-green" v-if="item.display == 1" @click="cancelInShow(index)">展现中</span>
                <span class="btn btn-white-light" v-if="item.display != 1" @click="toInShow(index)">未展现</span>
              </div>
            </div>
          </div>
          <div class="video-actions">
            <p @click="showSharePane(index)">
              <span class="iconfont icon-fenxiang1"></span>
              <span>分享</span>
            </p>
             <p @click="showEditTitlePane(index)">
              <span class="iconfont icon-bianji1"></span>
              <span>修改标题</span>
            </p>
             <p @click="showTagsPane(index)">
              <span class="iconfont icon-biaoqian"></span>
              <span>选择标签</span>
            </p>
             <p @click="toLinkPhoto(index)">
              <span class="iconfont icon-guanlian"></span>
              <span>关联案例照片</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="my-drafts-zero" v-if="currentTab == 1 && myDraftsList.length ==0">
      <div class="zero-content">
        <div class="zero-text">您还没有未编辑的短视频</div>
        <div class="zero-p">未编辑的短视频将会被保存在这里，您可以选择“编辑”或“删除”这些短视频。编辑完的短视频将转移到已发布，且不再支持重新编辑。</div>
      </div>
    </div>
    <div class="my-drafts" v-if="currentTab == 1 && myDraftsList.length !=0">
      <p>什么样的短视频才能抓住用户<span class="iconfont icon-tishi"></span></p>
      <ul>
        <li class="my-drafts-item" v-for="(item,index) in myDraftsList">
          <img :src="item.imgSrc" class="draft-poster">
          <div class="draft-msg">
            <p class="create-time">生成时间<span>{{item.time}}</span></p>
            <p class="btns-wrapper">
              <span class="btn btn-white-light" @click="editDraft(index)">编辑{{index}}</span>
              <span class="btn btn-white-light" @click="deleteDraft(index)">删除</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <Loadingicon v-if="isBusy"></Loadingicon>
    <p class="no-more-tips" v-if="!isBusy && noMoreVideosData">没有更多啦~</p>
    <Videodetail :video-detail-data="videoDetailData" v-if="videoDetailData.show" @close="hideVideoDetail"></Videodetail>
    <transition name="share-pane-slide">
        <Sharepane :share-pane-data="sharePaneData" v-if="sharePaneData.show"></Sharepane>
    </transition>
    <div class="share-pane-mask" v-if="sharePaneData.show" @click="hideSharePane"></div>
  </div>
</template>
<script>
  import Pagetoptab from '../common/pageTopTab.vue'
  import Tagandcate from '../common/tagAndCate.vue'
  import Productmodelpane from '../common/productModelPane.vue'
  import Edittitlepane from '../common/editTitlelPane.vue'
  import Videodetail from '../common/videoDetail.vue'
  import Sharepane from '../common/sharePane.vue'
  import Loadingicon from '../common/loadingIcon.vue'
  import '../../assets/exclude/wechat-shared'
  export default {
    name: 'myPromoVideo',
    components:{
      Pagetoptab,Tagandcate,Productmodelpane,Edittitlepane,Videodetail,Sharepane,Loadingicon
    },
    data() {
      return {
        myVideoList:[],
        myDraftsList:[],
        pageIndex:1,
        noMoreVideosData:false,
        noMoreDraftsData:false,
        isBusy:false,
        endFirstGetmyVideoList:false,
        Ptabdata:{tabList:[{text:'已完成短视频'},{text:'草稿箱（未完成）'}], nowTab:0},
        // showFinished:true,
        // showUnfinished:false,
        currentTab:0,
        tagsPaneData:{
          tagComp:{
            isShow:false,
            // hideTitle:true,
            // cateIsMulti:true
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
          },
          editIndex:null
        },
        // cateList:[],
        // tagsList:[],
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
        videoDetailData:{
          show:false,
          videoId:null
        },
        sharePaneData:{
          show:false,
          title:'',
          imgSrc:'',
          shareUrl:'',
          remark:'上班没时间？赶快来这里，看实拍视频，选装修材料',
          type:6,
          shopId:0
        },
        hasGetTagAndCate:false
        // isLoading:false
      }
    },
    methods: {
        pageTopTabChange:function(index){
          this.noMoreVideosData = false;
          g.dom.scrollToTop();
          this.currentTab = index;
          this.getInitData();
        },
        getInitData:function(){
          // this.getTagAndCate();
          this.pageIndex = 1 ;
          this.endFirstGetmyVideoList = false;
          if(this.currentTab == 0){
            this.myVideoList.splice(0);
            this.noMoreVideosData = false;
            this.getMyVideosData();
          }
          if(this.currentTab == 1){
            this.myDraftsList.splice(0);
            this.noMoreDraftsData = false;
            this.getMyDraftsData();
          }
        },
        getTagAndCate:function(){
          var _this = this;
          _this.hasGetTagAndCate = false;
          g.ajax({
            type: 'GET',
            url: g.url.format('/video/getTagAndCate'),
            data:{},
            success: function (result) {
              // this.cateList = result.data.cateList;
              // this.tagsList = result.data.tagsList;
              _this.tagsPaneData.tagComp.cateList = result.data.cateList;
              _this.tagsPaneData.tagComp.tagsList = result.data.tagsList;
              _this.hasGetTagAndCate = true;
            }
          });
        },
        getMyVideosData:function(){
          this.isBusy = true;
          var _this = this;
          g.ajax({
            type: 'GET',
            url: g.url.format('/video/getGuideManageVideos'),
            data:{pageSize:5,pageIndex:_this.pageIndex},
            success: function (result) {
              setTimeout(function(){
                _this.isBusy = false;
              }, 500);
              if(!_this.endFirstGetmyVideoList){
                 _this.endFirstGetmyVideoList = true;
              };
              if(result.data.length == 0 || result.data.length < 5){
                _this.noMoreVideosData = true;
                return;
              };
              _this.setMyVideoList(result.data);
              _this.pageIndex++;
            }
          });
        },
        setMyVideoList:function(data){
          data.forEach(function(item){
            item.tags = [];
            if(item.category){
              item.tags.push(item.category);
            };
            if(item.tagNames){
              var tags = item.tagNames.split(',');
              item.tags = item.tags.concat(tags);
            };
            for(var i = 0; i < item.tags.length; i++){
               item.tags[i] = '#'+ item.tags[i];
            };
            item.tagsText = item.tags.join(' ');
            var imgSrc = g.url.imgFormat(item.coverImg);
            item.imgSrc = imgSrc;
            item.time1 = item.updateTime.dateFormat('MM.dd hh:mm');
            item.time2 = item.createTime.dateFormat('MM.dd hh:mm');
          })
          this.myVideoList = this.myVideoList.concat(data);
        },
        getMyDraftsData:function(){
          /*this.myDraftsList = [
            {id:'1',imgSrc:'../../../static/pic.png',time:'04.15 20:33'},
            {id:'2',imgSrc:'../../../static/pic.png',time:'04.15 20:33'},
            {id:'3',imgSrc:'../../../static/pic.png',time:'04.15 20:33'},
            {id:'4',imgSrc:'../../../static/pic.png',time:'04.15 20:33'},
            {id:'9',imgSrc:'../../../static/pic.png',time:'04.15 20:33'},
          ];*/
        },
        getNextMyDraftsData:function(){
          if(this.myDraftsList.length >= 10){
             return;
          }
          var nextData = [
            // {id:'5',imgSrc:'../../../static/pic.png',time:'04.15 20:33'},
            // {id:'6',imgSrc:'../../../static/pic.png',time:'04.15 20:33'},
            // {id:'7',imgSrc:'../../../static/pic.png',time:'04.15 20:33'},
            // {id:'8',imgSrc:'../../../static/pic.png',time:'04.15 20:33'},
            // {id:'10',imgSrc:'../../../static/pic.png',time:'04.15 20:33'},
          ];
          this.myDraftsList = this.myDraftsList.concat(nextData);
        },
        showTagsPane:function(index){
          if(this.hasGetTagAndCate){
              var currentItem = this.myVideoList[index];
              this.$parent.hideVideoIcon();
              this.tagsPaneData.editIndex = index;
              this.initTagsPane(currentItem);
              this.tagsPaneData.tagComp.isShow = true;
          }  
        },
        initTagsPane:function(currentItem){
          this.tagsPaneData.nowTag.model = currentItem.model;
          this.tagsPaneData.nowTag.id = currentItem.id;
          this.tagsPaneData.nowTag.tags.splice(0);
          this.tagsPaneData.nowTag.cates = null;
          if(currentItem.tagIds){
            var tags = currentItem.tagIds.split(',');
            this.tagsPaneData.nowTag.tags = tags;
          }
          if(currentItem.categoryId){
            this.tagsPaneData.nowTag.cates = currentItem.categoryId;
          }
        },
        hideTagsPane:function(){
          this.$parent.showVideoIcon();
          this.tagsPaneData.tagComp.isShow = false;
          
        },
        // 出现产品型号面板
        showProductModelPane:function(){
          var index = this.tagsPaneData.editIndex;

          this.productModelPaneData.nowModel = this.tagsPaneData.nowTag.model;
          // this.productModelPaneData.nowModel =  this.myVideoList[index].model;
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
        showEditTitlePane:function(index){
          var currentItem = this.myVideoList[index];
          this.editTitlePaneData.editIndex = index;
          this.editTitlePaneData.nowTitle = currentItem.title;
          this.editTitlePaneData.isShow = true;
        },
        // 提交编辑标题面板
        submitEditTitlePane:function(title){
          var index = this.editTitlePaneData.editIndex;
          var id = this.myVideoList[index].id;
          this.setVideoTitle(id,title);
          this.myVideoList[index].title = title;
        },
        setVideoTitle:function(id,title){
          var _this = this;
          g.ajax({
            type: 'GET',
            url: g.url.format('/video/setTitle'),
            data:{id:id,title:title},
            success: function (result) {
              _this.getInitData();
            }
          });
        },
        // 关闭编辑标题面板
        hideEditTitlePane:function(){
          this.editTitlePaneData.isShow = false;
        },
        deleteMyVideo:function(index){
          var _this = this;
          var id = this.myVideoList[index].id;
          g.box.confirm({
            title:'确定删除短视频',
            errorMess:'删除后，不可恢复',
            submitName:'确定',
            refuseName:'取消',
            submitCallBack:function(){
              _this.delVideo(id)
              // _this.myVideoList.splice(index,1);
            }
          })
        },
        delVideo:function(id){
          var _this = this;
          g.ajax({
            type: 'GET',
            url: g.url.format('/video/del'),
            data:{videoId:id},
            success: function (result) {
              _this.getInitData();
            }
          });
        },
        cancelInShow:function(index){
          var _this = this;
          var id = this.myVideoList[index].id;
          g.box.confirm({
            title:'取消展现中',
            errorMess:'取消展现中后，短视频会从建材城对应位置下架，消费者无法再次看见它。',
            submitName:'确定',
            refuseName:'取消',
            submitCallBack:function(){
              _this.myVideoList[index].display = 0;
              _this.setDisplayAtHome(id,0);
              _this.getInitData();
            }
          })
        },
        toInShow:function(index){
           var id = this.myVideoList[index].id;
           this.myVideoList[index].display = 1;
           this.setDisplayAtHome(id,1);
        },
        setDisplayAtHome:function(id,state){
          var _this = this;
          g.ajax({
            type: 'GET',
            url: g.url.format('/video/setDisplayAtHome'),
            data:{videoId:id,state:state},
            success: function (result) {
              _this.getInitData();

            }
          });
        },
        toLinkPhoto:function(index){
           var id = this.myVideoList[index].id;
           var url = '/linkPhoto?id=' + id;
           g.window.openNew(g.url.urlHref(url),"linkPhoto");
        },
        //草稿箱
        editDraft:function(index){

        },
        deleteDraft:function(index){
          var _this = this;
          g.box.confirm({
            title:'确认删除',
            errorMess:'删除后不可恢复哦',
            submitName:'确定',
            refuseName:'取消',
            submitCallBack:function(){
              _this.myDraftsList.splice(index,1);
            }
          })
        },
        todemovideo:function(){
          this.$emit('todemovideo');
        },
        toshot:function(){
          // alert('去拍摄');
          gkee.openVideo();
        },
        tagEnsure:function(params,obj){
           var index = this.tagsPaneData.editIndex;
           this.myVideoList[index].categoryId = params.cateId;
           this.myVideoList[index].tagIds = params.tagIds;
           this.myVideoList[index].model = params.model;
           this.myVideoList[index].tags = obj.tagname;
           if(!this.myVideoList[index].tags[0]){
             this.myVideoList[index].tags = [];
           };
           if(obj.catename){
             this.myVideoList[index].tags.push(obj.catename);
           };
           this.setCateOrTagOrModel(params);
        },
        setCateOrTagOrModel:function(params){
          var _this = this;
          g.ajax({
            type: 'GET',
            url: g.url.format('/video/setCateOrTagOrModel'),
            data:params,
            success: function (result) {
              _this.hideTagsPane();
              // location.reload();
              _this.getInitData();
            }
          });
        },
        //检测是否滚动到底部
        scrollEvent:function(){
          var _this = this;
          window.addEventListener('scroll', function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop + window.innerHeight >= document.body.clientHeight) {
                if(!_this.isBusy && !_this.noMoreVideosData && _this.currentTab == 0){
                  _this.getMyVideosData();
                }
                if(_this.currentTab == 1){
                   _this.getNextMyDraftsData();
                }
            }
          });
        },
        showVideoDetail:function(id){
          this.videoDetailData.videoId = id;
          this.videoDetailData.show = true;
        },
        hideVideoDetail:function(){
          this.videoDetailData.show = false;
        },
        showSharePane:function(index){
            var currentItem = this.myVideoList[index];
            this.sharePaneData.title = currentItem.shopName + '的' + currentItem.authorName +'为您拍摄了一个商品短视频';
            this.sharePaneData.imgSrc = g.url.imgFormat(currentItem.coverImg,150,150);
            this.sharePaneData.shareUrl =  g.url.wechatFormat('/page/videoDetail.html?v='+g.version.v+'&videoId='+currentItem.id);
            this.sharePaneData.show = true;
        },
        hideSharePane:function(){
           this.sharePaneData.show = false;
        }
    },
    mounted:function (){
      this.scrollEvent();
      this.getTagAndCate();
      this.getInitData();
    },
    watch:{
      myVideoList:function(newList){
         if(newList.length >=1){
            $('body').css({'height':'auto'});
         };
         if(newList.length == 0){
            $('body').css({'height':'100%'});
         }
      },
      myDraftsList:function(newList){
         if(newList.length >=1){
            $('body').css({'height':'auto'});
         };
         if(newList.length == 0){
            $('body').css({'height':'100%'});
         }
      }
    }
  }
</script>
<style scoped>
  .zero-content{ padding:20px 15px;}
  .zero-text{ text-align: center;  margin: 10px 0 30px;  color: #ccc;  font-size: 16px;}
  .zero-p{color: #999; line-height: 24px; margin-bottom: 20px; }
</style>
