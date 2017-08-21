<template>
  <div id="customerFootPrint">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="customer-msg-box">
      <div class="customer-msg-wrapper">
        <div class="customer-msg-top">
          <img :src="customerMsg.Img">
          <div class="customer-text-msg">
            <p class="customer-name">{{customerMsg.NickName}}</p>
            <p class="customer-tel">{{customerMsg.Phone}}</p>
          </div>
        </div>
        <div class="customer-msg-bottom">
          <p class="create-time" v-if="type == 1">最后直播服务时间<span>{{customerMsg.Ctime}}</span><b v-if="customerMsg.Status">未接通</b></p>
          <p class="create-time" v-if="type == 2">留电话时间<span>{{customerMsg.Ctime}}</span></p>
        </div>
    </div>
    </div>
    <div class="foot-print-tab">
      <p class="tab-item" :class="{active:currentTab == 0}" @click="changeTab(0)">短视频</p>
      <p class="tab-item" :class="{active:currentTab == 1}" @click="changeTab(1)">全景展厅</p>
    </div>
     <ul class="fp-video-list" v-if="currentTab == 0">
       <li class="video-item" v-for="item in videoList" :class="{'not-first':!item.isGroupFirst}">
          <p class="footprint-time"  v-if="item.isGroupFirst">{{item.Ctime}}</p>
          <div class="video-item-content">
            <div class="video-item-left" @click="showVideoDetail(item.id)">
              <img :src="item.coverImg">
              <span v-if="item.model">{{item.model}}</span>
            </div>
            <div class="video-item-right">
              <p class="shop-name">{{item.shopName}}</p>
              <p class="tags-block">
                <span class="tag-item2" v-for="(tag,index) in item.tags" v-if="index < 2">#{{tag}}</span>
                    <span class="tag-item2" v-if="item.tags&&item.tags.length>2">...</span>
              </p>
              <p class="video-title" v-if="item.title">{{item.title}}</p>
            </div>
          </div>
       </li>
      </ul>
      <ul class="fp-hall-list" v-if="currentTab == 1" >
      <li class="swiper-slide panorama-item" v-for="item in panoramaList" :class="{'not-first':!item.isGroupFirst}">
          <p class="footprint-time" v-if="item.isGroupFirst">{{item.Ctime}}</p>
          <div class="panorama-item-content">
              <div class="panorama-item-top" @click="panoramaDetail(item.Id,item.PanoKey)">
                <img :src="item.CoverImg">
                <span class="position-center icon-3D-wrapper"></span>
                <span class="position-center icon-3D-text">3D</span>
                <span class="product-model" v-if="item.Title">{{item.Title}}</span>
              </div>
              <div class="panorama-item-bottom">
                <span class="product-brand">{{item.ShopName}}</span>
                <p class="tags-block">
                  <span class="tag-item2" v-for="(tag,index) in item.tags" v-if="index < 2">#{{tag}}</span>
                    <span class="tag-item2" v-if="item.tags&&item.tags.length>2">...</span>
                </p>
              </div>
          </div>
      </li>
    </ul>

    <p class="no-more-tips" v-show="isNoMore && !isBusy">没有更多啦~</p>
    <Videodetail :video-detail-data="videoDetailData" v-if="videoDetailData.show" @close="hideVideoDetail"></Videodetail>
  </div>
</template>
<script>
  import Topheader from '../../common/headerNew.vue'
   import Videodetail from '../../common/videoDetail.vue'
  export default {
    name: 'customerFootPrint',
    components:{
      Topheader,Videodetail
    },
    data() {
      return {
        Hdata:{
          title:'足迹',
          right:false,
          rigclick:function () {
            alert("右边按钮的点击事件")
          }
        },
        customerMsg:{},
        type:0,
        userId:null,
        currentTab:0,
        isBusy:false,
        isNoMore:false,
        pageIndex:1,
        videoList:[],
        videoPrintDate:[],
        panoramaList:[],
        panoramaPrintDate:[],
        videoDetailData:{
          show:false,
          videoId:null
        }
      }
    },
    methods: {
      changeTab:function(index){
        this.currentTab = index;
        this.initParams();
        if(index == 0){
          this.getVideoPrint();
        }
        if(index == 1){
          this.getPanoramaPrint();
        }
      },
      initParams:function(){
        $('body').scrollTop(0);
        this.videoList.splice(0);
        this.videoPrintDate.splice(0);
        this.panoramaList.splice(0);
        this.panoramaPrintDate.splice(0);
        this.pageIndex = 1;
        this.isBusy = false;
        this.isNoMore = false;
      },
      getVideoPrint:function(){
        var _this = this;
        g.ajax({
             type: 'GET',
             url: g.url.format('/video/history'),
             data:{userId:_this.userId,pageIndex:_this.pageIndex,pageSize:10},
             success: function (result) {
              console.log(result);
                 if(result.statusCode == 0){
                     var data = result.data;
                     if(data.length == 0 || data.length <= 9 ){  
                         _this.isNoMore = true;
                     }
                     for(var i = 0; i<data.length;i++){
                         if(data[i].coverImg) {
                          data[i].coverImg = g.url.imgFormat(data[i].coverImg);
                         };
                         data[i].tags = _this.setTags(data[i].category,data[i].tagNames);
                         if(data[i].CreateTime) {
                           data[i].Ctime = data[i].CreateTime.dateFormat('MM月dd日');
                         };
                         if(_this.videoPrintDate.indexOf(data[i].Ctime) == -1){
                            data[i].isGroupFirst = true;
                            _this.videoPrintDate.push(data[i].Ctime);
                      
                         }else{
                            data[i].isGroupFirst = false;
                         }
                     }
                     _this.isBusy = false;
                     _this.videoList = _this.videoList.concat(data);
                 }else{
                     alert(result.errorMsg);
                 }
             }
         });
      },
      getPanoramaPrint:function(){
          var _this = this;
          g.ajax({
             type: 'GET',
             url: g.url.format('/panorama/history'),
             data:{userId:_this.userId,pageIndex:_this.pageIndex,pageSize:5},
             success: function (result) {
                 if(result.statusCode == 0){
                     var data = result.data;
                     if(data.length == 0 ){
                         _this.isNoMore = true;
                     }
                     for(var i = 0; i<data.length;i++){
                         if(data[i].CoverImg){
                            data[i].CoverImg = g.url.imgFormat(data[i].CoverImg)
                         };
                         data[i].tags = _this.setTags(data[i].CateName,data[i].TagNames);
                         if(data[i].CreateTime) {
                          data[i].Ctime = data[i].CreateTime.dateFormat('MM月dd日')
                        };
                        if(_this.panoramaPrintDate.indexOf(data[i].Ctime) == -1){
                            data[i].isGroupFirst = true;
                            _this.panoramaPrintDate.push(data[i].Ctime);
                      
                        }else{
                            data[i].isGroupFirst = false;
                        }
                     }
                     _this.isBusy = false;
                     _this.panoramaList = _this.panoramaList.concat(data);
                 }else{
                     alert(result.errorMsg);
                 }
             }
         });
      },
      setTags:function(cate,tags,length){//标签数量大于length(默认为2)时取前两个标签
            var result = [];
            if(cate){
              result.push(cate);
            };
            if(tags){
              var tagsArr = tags.split(',');
              result = result.concat(tagsArr);
            };
            var subLength = length || 2; 
            if(result.length > subLength){
               result = result.splice(0, subLength);
               result.push('...');
            };
            return result;
      },
      addItems: function () {
        var _this = this;
        if (!_this.isBusy && !_this.isNoMore) {
            _this.isBusy = true;
            _this.pageIndex++;
            if(_this.currentTab == 0){
               _this.getVideoPrint();
            }
            if(_this.currentTab == 1){
               _this.getPanoramaPrint();
            }
        }
      },
      scrollEvent:function(){
        var _this = this;
        window.addEventListener('scroll', function () {
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          if (scrollTop + window.innerHeight >= $('#customerFootPrint').height()) {
            _this.addItems();
          }
        })
      },
      panoramaDetail:function(id,panoKey){
        var url = '/hallDetail?id=' + id +'&panoKey=' + panoKey;
        g.window.openNew(g.url.urlHref(url),"hallDetail");
      },
      showVideoDetail:function(id){
        this.videoDetailData.videoId = id;
        this.videoDetailData.show = true;
      },
      hideVideoDetail:function(){
        this.videoDetailData.show = false;
      },
      getServiceObjSingle:function(id){
        var _this = this;
         g.ajax({
             type: 'POST',
             url: g.url.format('/guide/getMyServiceUser'),
             data:{targetUser:id},
             success: function (result) {
              // console.log(result)
              if(result.data){
                result.data.Img = g.url.imgFormat(result.data.Img,null,null,0);
                result.data.Ctime = result.data.CreateTime.dateFormat('MM/dd hh:mm');
                _this.customerMsg = result.data;
              };
                 
             }
         });

      },
      getPhoneObjSingle:function(id){
         var _this = this;
         g.ajax({
             type: 'GET',
             url: g.url.format('/accountPhone/single'),
             data:{id:id},
             success: function (result) {
                result.data.Img = g.url.imgFormat(result.data.Img,null,null,0);
                result.data.Ctime = result.data.CreateTime.dateFormat('MM/dd hh:mm');
                _this.customerMsg = result.data;
           
             }
         });
      }
    },
    mounted:function () {
       this.type = g.params.get('type') || 1;
       this.userId = g.params.get('id') || 194;

       if(this.type == 1){
          this.getServiceObjSingle(this.userId);
       }
       if(this.type == 2){
         this.getPhoneObjSingle(this.userId);
       }
       this.scrollEvent();
       this.getVideoPrint();
    }
  }
</script>
<style scoped>
  @import '../../../assets/css/customerPage/customerFootPrint.css'

</style>
