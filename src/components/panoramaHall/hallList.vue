<template>
  <div id="hallList">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="hall-container">
      <v-scroll :on-refresh="onRefresh"><!-- :on-infinite="onInfinite"-->
        <div class="hall-problem">怎么样才能让全景展厅的效果最佳？</div>
      <ul class="hall-list">
        <li v-for="list in panoList">
          <div class="hall-list-content">
            <div class="hall-pic">
              <img :src="list.CoverImg" class="hall-pic-background" @click="hallDetail(list.Id,list.PanoKey)">
              <div class="hall-pic-tag" v-if="list.NoHotsnot==0"><div class="tag"><i class="point"></i>商品标签</div></div>
              <div class="hall-pic-title" v-if="list.Title">{{list.Title}}</div>
              <div class="hall-pic-type" @click="hallDetail(list.Id,list.PanoKey)">3D</div>
              <button class="btn btn-red-light hall-pic-stick" @click="placeTop()" v-if="list.Top" >已置顶</button>
              <button class="btn btn-white-light hall-pic-stick"  @click="placeTop(list.Id)" v-else>置顶</button>
            </div>
            <div class="hall-type" v-if="list.TagNames || list.CateName">
              <div class="hall-type-text" v-if="list.CateName? (list.TagNames.length>2?true:false):(list.TagNames.length>3?true:false)">...</div>
              <div class="hall-type-text" v-for="(name,index) in list.TagNames" v-if="list.CateName?(index < 2):(index < 3)">{{ '#'+name}}</div>
              <div class="hall-type-text" v-if="list.CateName">{{'#'+list.CateName}}</div>
              <div class="clearfix"></div>
            </div>
            <div class="hall-line"></div>
            <div class="hall-action">
              <div class="action" @click="editTitle(list.Id,list.Title)">
                <div class="icon iconfont icon-bianji1"></div>
                <p>编辑标题</p>
              </div>
              <div class="action" @click="tagClass(list.Id,list.TagIds,list.CateId)">
                <div class="icon iconfont icon-biaoqian"></div>
                <p>标签类目</p>
              </div>
              <div class="action" @click="video(list.Id,list.PanoKey)">
                <div class="icon iconfont icon-guanlian"></div>
                <p>关联短视频</p>
              </div>
              <div class="action" @click="voice(list.Id)">
                <div class="icon iconfont icon-huatong"></div>
                <p>{{list.VoiceSrc?'编辑录音':'开始录音'}}</p>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </li>
      </ul>
      </v-scroll>
    </div>

    <!--编辑标题-->
    <div id="editTitle" v-if="editModel.isShow" >
      <div class="edit-content">
        <div class="button back" @click="editModel.isShow = !editModel.isShow"><i class="icon iconfont icon-houtui-copy"></i></div>
        <div class="input">
          <input-item placeholder="请输入标题，限制15字" classname="form-control no-border" type="text" maxlength="15" v-model="editModel.editText" focus></input-item>
        </div>
        <div class="button ensure" @click="eaitEnsure(editModel.id,editModel.editText)">确定</div>
      </div>
    </div>
    <!--标签类目-->
    <tagAndCate :tag-comp="tagComponent" @tagensure="tagEnsure" v-if="tagComponent.isShow">
      <div slot="slide-title1">
        类目标签：(单选)&nbsp;<span class="require-star">*</span>
      </div>
    </tagAndCate>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
//  import tagAndCate from '../common/tagAndCate.vue'
  import tagAndCate from '../common/check.vue'
  import Scroll  from '../common/scroll.vue'
  export default {
    name: 'hallList',
    components:{
      Topheader,
      tagAndCate,
      'v-scroll': Scroll
    },
    data() {
      return {
        Hdata:{
          title:'全景展厅',
          theme:'green',
          lefthide:true
        },
        editModel:{
          id:'',
          editText:'',
          isShow:false
        },
        tagComponent:{
          id:'',
          isShow:false,
          btnLists:[],
          checkedList:{
            tags:[],
            cates:'20'
          }
        },
        panoList:[],
        hasGetTagAndCate:false,
      }
    },
    methods: {
      onRefresh:function (done) {
          this.getPanoList(done);
      },
      onInfinite:function (done) {
          console.log('onInfinite');
          this.getPanoList(done);
      },
      editTitle:function (id,title) {
        var _this =this;
        _this.editModel.id= id;
        _this.editModel.editText= title;
        _this.editModel.isShow = !_this.editModel.isShow;
      },
      tagClass:function (id,tags,cate) {
        var _this =this;
        if(_this.hasGetTagAndCate){
          _this.tagComponent.isShow = !_this.tagComponent.isShow;
          _this.tagComponent.id = id || '';
          _this.tagComponent.checkedList.tags = tags || [];
          _this.tagComponent.checkedList.cates = cate || '';
        }
      },
      eaitEnsure:function (id,title) {
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/setTitle'),
          data:{id:id,title:title},
          success: function (result) {
            if(result.statusCode == 0){
              for(var i=0; i<_this.panoList.length;i++){
                if(_this.panoList[i].Id == id){
                  _this.panoList[i].Title = title;
                  _this.editModel.isShow = false;
                  return;
                }
              }
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      getName:function (value,obj) {
        var newObj = {},name='';
        for(var i = 0; i < obj.length; i ++){
          newObj[obj[i].id] = obj[i].name;
        }
        if(typeof (value) == 'number'){
          name = newObj[value];
        }else{
          for(var j = 0; j < value.length; j ++){
            if(value[j]){
              name += newObj[value[j]]+',';
            }
          }
        }
        return name;
      },
      tagEnsure:function () {
        var _this = this;
        var params = {
          id: _this.tagComponent.id,
          cateId : _this.tagComponent.checkedList.cates,
          tagIds : _this.tagComponent.checkedList.tags.join(","),
        };
        var names ={
          tagNames:_this.getName(_this.tagComponent.checkedList.tags,_this.tagComponent.btnLists[0].lists),
          cateName:_this.getName(_this.tagComponent.checkedList.cates,_this.tagComponent.btnLists[1].lists)
        }
        names.tagNames = names.tagNames.substr(0, names.tagNames.length - 1).split(",");
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/setCateOrTag'),
          data:params,
          success: function (result) {
            if(result.statusCode == 0){
              for(var i=0; i<_this.panoList.length;i++) {
                if (_this.panoList[i].Id == _this.tagComponent.id) {
                  _this.panoList[i].TagNames = names.tagNames;
                  _this.panoList[i].TagIds = _this.tagComponent.checkedList.tags;
                  _this.panoList[i].CateName = names.cateName;
                  _this.panoList[i].CateId = _this.tagComponent.checkedList.cates;
                  _this.tagComponent.isShow = false;
                  return;
                }
              }
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      getPanoList:function (done) {
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/getPanoList'),
          data:{shopId:0},
          success: function (result) {
            if(result.statusCode == 0){
                var list = result.data;
                for(var i=0; i<list.length;i++){
                  if(list[i].TagNames){
                    list[i].TagNames = list[i].TagNames.split(",");
                    list[i].TagIds = list[i].TagIds.split(",");
                  }else{
                    list[i].TagNames = [];
                  }
                  list[i].CoverImg = g.url.imgFormat(list[i].CoverImg);
                }
              _this.panoList = list;
              if(done){
                done();
              }
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      setTop:function (id,_this) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/setTop'),
          data:{shopId:0,panoramaId:id},
          success: function (result) {
            if(result.statusCode == 0){
              var panoList = _this.panoList;
              for(var i=0; i<panoList.length; i++){
                  if(panoList[i].Top!=0) panoList[i].Top=0;
                  if(panoList[i].Id==id) panoList[i].Top=1;
              }
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      placeTop:function (id) {
        var _this = this;
        g.box.confirm({
          title:'置顶',
          errorMess:'置顶是把对应的全景图，放在店铺首页最顶部的位置。',
          submitName:'确定',
          refuseName:'取消',
          submitCallBack:function () {
              if(id) _this.setTop(id,_this);
          }
        })

      },
      video:function (id,panoKey) {
        g.window.openNew(g.url.urlHref("/video?id="+id +"&panoKey="+panoKey),"video");
      },
      voice:function (id) {
        g.window.openNew(g.url.urlHref("/voice?id="+id),"voice");
      },
      hallDetail:function (id,panoKey) {
        g.window.openNew(g.url.urlHref("/hallDetail?id="+id +"&panoKey="+panoKey),"hallDetail");
      },
      getTagAndCate:function(){
        var _this = this;
        _this.hasGetTagAndCate = false;
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/getTagAndCate'),
          data:{shopId:0},
          success: function (result) {
            if(result.statusCode == 0){
                var tagsList ={};
                tagsList.lists = result.data.tagsList;
                tagsList.name = 'tags';
                _this.tagComponent.btnLists.push(tagsList);
                var cateList ={};
                cateList.lists = result.data.cateList;
                cateList.name = 'cates';
                cateList.type = 'radio';
                _this.tagComponent.btnLists.push(cateList);
             /* _this.tagComponent.tagsList = result.data.tagsList;
              _this.tagComponent.cateList = result.data.cateList;*/
              _this.hasGetTagAndCate = true;
            }else{
              alert(result.errorMsg);
            }
          }
        });
      }
    },
    mounted: function () {
      var _this = this;
      _this.getPanoList();
      _this.getTagAndCate();
      window.frame_callback =function(data){
          if(data!='undefined'){
              var smipleList = JSON.parse(data);
              for(var i =0; i< _this.panoList.length;i++){
                  if(_this.panoList[i].Id == smipleList.Id){
                      for (var a in smipleList){
                        _this.panoList[i][a] = smipleList[a];
                      }
                  }
              }
          }else{
            _this.getPanoList();
          }
      }
    }
  }
</script>
<style scoped>
  @import '../../assets/css/hallList.css';
</style>
