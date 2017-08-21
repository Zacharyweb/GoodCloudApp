<template>
  <div id="video">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="vd-content">
      <div id="panorama" style="width:100%;height:100%;">
        <noscript>
          <table style="width:100%;height:100%;">
            <tr style="vertical-align:middle;">
              <td>
                <div style="text-align:center;">ERROR:<br/><br/>Javascript not activated<br/><br/></div>
              </td>
            </tr>
          </table>
        </noscript>
      </div>
      <div class="vd-qus"  v-if="step==1||step==2"><div>为什么关联短视频非常重要<i class="icon iconfont icon-tishi"></i></div></div>
      <div class="vd-button" v-if="step==1" @click="addHot">添加一个标记</div>
      <div class="vd-explain" v-if="step==2">拖动&nbsp;&nbsp;“闪动的标记”&nbsp;&nbsp;到对应的商品旁</div>
      <div class="vd-button" v-if="step==2" @click="next">下一步</div>
      <div class="vd-buts" v-if="step==3">
        <div class="vd-btn modify"><button class="btn btn-hui btn-normal btn-block" @click="relate">关联短视频</button></div>
        <div class="vd-btn continue"><button class="btn btn-green btn-normal btn-block" @click="addHot">添加新标记</button></div>
      </div>
    </div>
    <div id="relate" v-if="relateShow">
      <div id="shadow" @click="relateShow = !relateShow"></div>
      <div class="re-con">
        <div class="re-con-search">
          <input type="text" placeholder="请输入产品型号" class="text-center no-border input-gary" v-model="text" @keyup.enter="getVideos()"/>
          <i class="icon iconfont icon-sou"></i>
        </div>
        <div class="re-con-text text-center">可多选，复选取消</div>
        <ul class="re-con-list">
          <li v-for="video in videos">
            <div class="list-img" @click="showVideoDetail(video.id)">
              <img :src="video.coverImg">
              <div class="model" v-if="video.model">{{video.model}}</div>
            </div>
            <div class="list-text">
              <div class="title">{{video.author}}</div>
              <div class="title">{{video.title}}</div>
              <div class="type">
                <span v-for="tag in video.TagNames">{{'#'+tag}}</span>
                <span>{{'#'+video.category}}</span>
              </div>
              <div class="title">{{video.createTime}}</div>
            </div>
            <div class="list-checkbox">
              <label class="checkbox" v-if="video.relationOther==1" @click="unrelation(video.id)"><input type="checkbox" :disabled="video.relationOther==1?true:false" @change="unrelationVideo(video.id)" :value="video.id" v-model="relation"><i></i></label><!--@change="unrelationVideo(video.id)"  :disabled="video.relationThis==1?true:false"-->
              <label class="checkbox" v-if="video.relationOther==0"><input type="checkbox" :value="video.id" @change="ifRelation(video.id)" v-model="relation"><i></i></label>
          </div>
          <div class="list-active" v-if="video.relationOther==1">已关联</div>
          </li>
        </ul>
      </div>
    </div>
    <videoDetail :video-detail-data="videoDetailData" v-if="videoDetailData.show" @close="hideVideoDetail"></videoDetail>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
 import '../../assets/exclude/tour.js'
  import '../../assets/exclude/pano-client.js'
  import videoDetail from '../common/videoDetail.vue'
  export default {
    name: 'hallList',
    components: {
      Topheader,
      videoDetail
    },
    data() {
      return {
        Hdata:{
          back:this.add,
          backhtml:'<i class="icon iconfont icon-wrong"></i>',
//          back: this.add,
          title:'关联短视频',
          haveright:true,
          rightHtml:'完成',
          rightClick:this.add
        },
        step:1,
        relateShow:false,
        videos:[],
        relation:[],
        panoramaId:'',
        hotsnotKey:'',
        text:'',
        videoDetailData:{
          show:false,
          videoId:null
        }
      }
    },
    methods: {
      checkHavePano:function (callback) {
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/getPanoDetails'),
          data: {panoramaId: _this.panoramaId},
          success: function (result) {
            if(result.statusCode == 0){
              callback(result.data);
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      add:function () {
        var _this = this;
        var params = {
          Id:_this.panoramaId,
          NoHotsnot: 1
        };
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/processUnusedSnot'),
          data:{panoramaId:_this.panoramaId},
          success: function (result) {
            if(result.statusCode == 0){
              _this.checkHavePano(function (data) {
                if(data.hotsnots.length){
                  params.NoHotsnot = 0;
                }
                g.window.closeWithData(JSON.stringify(params));
              });
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      next:function () {
        this.step ++;
      },
      relate:function () {
        var _this = this;
        if(pano.getCurrent()){
          _this.hotsnotKey = pano.getCurrent().name;
        } else{
          _this.hotsnotKey = '';
        }
        if(!_this.hotsnotKey){
          g.box.waiting({title:'请选择一个热点。'});
          return ;
        }
        this.relateShow = ! this.relateShow;
        _this.getVideos(_this);
      },
      getVideos:function (_this) {
        console.log("getVideos");
        if(!_this) _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/getVideos'),
          data:{hotsnotKey:_this.hotsnotKey,text:_this.text},
          success: function (result) {
            if(result.statusCode == 0){
                var data = result.data;
                _this.relation =[];
                for(var i=0;i<data.length;i++){
                  data[i].coverImg = g.url.imgFormat(data[i].coverImg);
                  if(data[i].TagNames) data[i].TagNames = data[i].TagNames.split(",");
                  if(data[i].createTime) data[i].createTime = data[i].createTime.dateFormat('yyyy.MM.dd');
                  if(data[i].relationThis==1){
                    _this.relation.push(data[i].id);
                  }
                }
                _this.videos = data;
              console.log("选中"+JSON.stringify(_this.relation));
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      getPanoDetails:function (_this,id) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/getPanoDetails'),
          data:{panoramaId:id},
          success: function (result) {
            if(result.statusCode == 0){
              var data = result.data;
              if(data.hotsnots.length){
                  _this.step = 3;
              }
              for(var i=0; i< data.hotsnots.length;i++){
                var hots = data.hotsnots[i];
                pano.addHot(hots.HotsnotKey,null,null,null,hots.Atv,hots.Ath);
              }
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      addHot:function () {
        var _this = this;
        pano.addHot('spot_'+new Date().getTime());
        if(_this.step == 3) return;
        _this.next();
      },
      addOrUpdateHotsnot:function (params) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/addOrUpdateHotsnot'),
          data:params,
          success: function (result) {
//            g.box.waiting({ title:'成功生成标记'});
          }
        });
      },
      delHotsnot:function (name) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/delHotsnot'),
          data:{hotsnotKey:name},
          success: function (result) {
//            g.box.waiting({ title:'删除成功'});
          }
        });
      },
      relationVideo:function (id) {
        var _this = this;
        g.ajax({
         type: 'GET',
         url: g.url.format('/pano/relationVideo'),
         data:{hotsnotKey:_this.hotsnotKey,videoId:id},
         success: function (result) {
           if(result.statusCode == 0){
              g.box.waiting({title:'正在绑定中...'});
              _this.getVideos(_this);
           }else{
              alert(result.errorMsg);
             }
           }
         });
      },
      unrelationVideo:function (id) {
        var _this = this;
        console.log('unrelationVideo'+id);
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/unrelationVideo'),
          data:{videoId:id},
          success: function (result) {
            if(result.statusCode == 0){
                g.box.waiting({title:'正在解绑中....'});
              _this.getVideos(_this);
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      unrelation:function (id) {
        var _this = this;
        console.log('unrelation');
        g.box.confirm({
          title:'确定选择短视频',
          errorMess:'选择这个小视频，会撤销它在其他全景展厅里的关联',
          submitName:'确定',
          refuseName:'取消',
          submitCallBack:function () {
            _this.$emit('videoId', id);
          },
        });
      },
      ifRelation:function (id,callback) {
        var _this = this;
        var ifRelation = false;
        for(let i =0;i<_this.videos.length;i++){
          if(_this.videos[i].id==id && _this.videos[i].relationThis ==1){
            ifRelation = true;
          }
        }
        if(ifRelation){
          _this.unrelationVideo(id,callback);
        }else{
          _this.relationVideo(id,callback);
        }
      },

      showVideoDetail:function(id){
        this.videoDetailData.videoId = id;
        this.videoDetailData.show = true;
      },
      hideVideoDetail:function(){
        this.videoDetailData.show = false;
      }
    },
    mounted: function (opts) {
      var _this = this;
      _this.$on('videoId',function (data) {
          _this.relationVideo(data);
      });
      var id = g.params.get('id');
      var key = g.params.get('panoKey');
      pano.init({
        xmlpath: g.url.format('/pano/xml?key='+key),
        target:"panorama",
        onAddHot: function (name, atv, ath) {
          _this.addOrUpdateHotsnot({
            panoramaId:id,
            hotsnotKey:name,
            ath:ath,
            atv:atv
          });
          console.log("添加了--" + name + "位置："+atv+","+ath+",执行数据库操作");
        },onHotClick: function (name) {
          _this.hotsnotKey = name;
          console.log("点击了--------" + name);
        }, onHotDelete: function (name) {
          _this.delHotsnot(name);
          console.log("删除了啊啊啊--" + name);
        }, onHotMoveEnd: function (name, atv, ath) {
          _this.addOrUpdateHotsnot({
            panoramaId:id,
            hotsnotKey:name,
            ath:ath,
            atv:atv
          });
          console.log("移动了位置需要保存哦--name:" + name + ",atv:" + atv + ",ath" + ath);
        },
        editmod:true
      });
      _this.panoramaId = id;
      _this.$options.methods.getPanoDetails(_this,id);

    }
  }
</script>
<style scoped>
  @import '../../assets/css/video.css';
</style>
