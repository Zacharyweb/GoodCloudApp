<template>
  <div id="classification">
    <div class="shadow"  @click="close"></div>
      <div class="cf-conetnt">
        <div class="con">
        <div class="cf-content-title">
          <div class="title">选择分类</div>
          <div class="choose" @click="close"><div class="icon iconfont icon-bofang"></div></div>
        </div>
          <div class="cf-content-types swiper-wrapper">
            <div class="cf-content-tips swiper-slide" v-if="tagComponent.showTopTips" >
              <!--<p>选择标签：门店只能有1个#活动&nbsp;和#爆款&nbsp;标签</p>
              <p>选择<span>#活动</span>和<span>#爆款</span>标签</p>
              <p class="last-line-text">会自动取消其他短视频的这两个标签</p>-->
              <p><span>活动</span>和<span>爆款</span>各自只能关联一个短视频。重复关联会取消之前的关联。</p>
            </div>
            <div class="type swiper-slide">
              <div class="title" v-if ='!hideTitle'>其他标签：(可多选)</div>
              <ul class="chooseBtns">
                <li class="chooseBtn" v-if="tagComponent.showEditModelTag">
                  <label class="checkbox">
                    <input type="checkbox" name="model" :value="nowclass.model" v-model="nowclass.model" @click="editmodel"><span>{{ nowclass.model || '#商品型号'}}</span>
                  </label>
                </li>
                <li class="chooseBtn" v-for="tag in tagsList">
                  <label class="checkbox">
                    <input type="checkbox" name="tags" :value="tag.id" v-model="nowclass.tags"><span>{{'#'+tag.name}}</span>
                  </label>
                </li>
              </ul>
            </div>
            <div class="type mar-b swiper-slide">
              <div class="title" v-if ='!hideTitle'>类目标签：(单选)&nbsp;<span class="require-star">*</span></div>
              <ul class="chooseBtns">
                <li class="chooseBtn" v-for="cate in cateList">
                  <label class="checkbox" v-if="!tagComponent.cateIsMulti">
                    <input  type="radio" name="cate" :value="cate.id" v-model="nowclass.cates"><span>{{ cate.name }}</span>
                  </label>
                  <label class="checkbox" v-if="tagComponent.cateIsMulti">
                    <input type="checkbox" name="cate" :value="cate.id" v-model="nowclass.catess"><span>{{ cate.name }}</span>
                  </label>
                </li>

              </ul>
            </div>
          </div>
        <div class="cf-content-btns">
          <div class="btns cancel" v-if="!tagComp.isForSearch"><button class="btn btn-hui btn-block btn-normal" @click="close">取消</button></div>
          <div class="btns cancel" v-if="tagComp.isForSearch"><button class="btn btn-hui btn-block btn-normal" @click="empty">重置</button></div>
          <div class="btns ensure"><button class="btn btn-green btn-block btn-normal" @click="tagEnsure">确定</button></div>
        </div>
        </div>
      </div>
  </div>
</template>
<script>
  /**
   * type 1:全景 （在tagComp传入，默认为1）
   * hideTitle  隐藏标签上的title（在tagComp传入，默认为false）
   * tagComponent.topHtml  解释性文字
   * */
  import '../../../static/swiper.jquery.min.js'
  export default {
    name: 'tagAndCate',
    props: ['tagComp','nowTag'],
    data() {
      return {
        tagComponent:this.tagComp,
        nowclass:this.nowTag,
        tagsList:[],
        cateList:[],
        model:'',
        hideTitle: this.tagComp.hideTitle ? this.tagComp.hideTitle : false,
        type:this.tagComp.type? this.tagComp.type : 1,
        ajaxUrl:'',
      }
    },
    methods: {
      close:function(){
         this.tagComponent.isShow = !this.tagComponent.isShow;
         this.$emit('close');
      },
      empty:function(){
        this.$emit('empty');
      },
      tagEnsure:function () {
        var _this = this;
        var params = {
          id: _this.nowclass.id,
          cateId : _this.nowclass.cates,
          tagIds : _this.nowclass.tags.join(","),
          model: _this.nowclass.model,
        };
        if(_this.nowclass.catess){
          params.cateIds = _this.nowclass.catess.join(",");
        }
        var tagname = _this.getName(_this.nowclass.tags,_this.tagsList);
        if(tagname) {
          tagname = tagname.substr(0, tagname.length - 1).split(",");
        }else{
          tagname = [];
        };
        var catename = '';
        if(!_this.nowclass.cates){
          _this.nowclass.cates = '';
        }
        if(!_this.nowclass.catess){
          catename = _this.getName(_this.nowclass.cates,_this.cateList);
        }
        console.log(catename);
        _this.$parent.tagEnsure(params,{tagname:tagname,catename:catename});
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
      // getTagAndCate:function () {
      //   var _this = this;
      //   g.ajax({
      //     type: 'GET',
      //     url: g.url.format(_this.ajaxUrl),
      //     data:{shopId:0},
      //     success: function (result) {
      //       if(result.statusCode == 0){
      //         _this.tagsList = result.data.tagsList;
      //         _this.cateList = result.data.cateList;
      //         setTimeout(function () {
      //           _this.initSwiper();
      //         },0);
      //       }else{
      //         alert(result.errorMsg);
      //       }
      //     }
      //   });
      // },
      editmodel:function(){
        this.$emit('editmodel');
      },
      initSwiper:function(){
        var tagsPaneSwiper = new Swiper('.con', {
            slidesPerView: 'auto',
            direction: 'vertical',
            observer: true,
            observeParents: true,
            freeMode: true,
        });

      }
    },
    mounted: function () {
      var _this = this;
      // if(_this.type == 1){
      //    _this.ajaxUrl = '/pano/getTagAndCate'; 
      // }
      _this.tagsList = _this.tagComp.tagsList;
      _this.cateList = _this.tagComp.cateList;
      _this.initSwiper();
      g.dom.bodyUnScroll();
    },
    destroyed:function(){
       g.dom.bodyScroll();
    }
  }
</script>
<style>
ul{ padding-left: 0;}
#classification .shadow{ position: absolute; top:0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.5);   }
#classification .cf-conetnt{ position: absolute; top:150px; bottom: 0; left: 0; right: 0; background: #f5f5f5; overflow: hidden; display: flex;  flex-direction: column;}
#classification .cf-conetnt .con{ height: 100%; display: flex; flex-direction: column;}
#classification .cf-conetnt .cf-content-title{ background: #fff; height: 40px; line-height: 40px; display: flex;position: relative;z-index: 10;}
#classification .cf-conetnt .cf-content-title .title{ padding: 0 10px; font-size: 16px; font-weight: bold; flex: 1;}
#classification .cf-conetnt .cf-content-tips{ /*padding:0 25px; height: auto;*/}
#classification .cf-conetnt .cf-content-tips p{ margin:0; line-height: 1; font-size: 13px; color: #999; margin-top: 15px;}
#classification .cf-conetnt .cf-content-tips p+p{ padding-left: 65px; }
#classification .cf-conetnt .cf-content-tips p span{ color: #e94f4f; }
#classification .cf-conetnt .cf-content-tips .last-line-text{ padding-bottom: 15px; border-bottom: 1px solid #ccc;}
#classification .cf-conetnt .cf-content-title .choose{ border-left: 1px #ccc solid; text-align: center; width: 40px;}
#classification .cf-conetnt .cf-content-title .choose .icon{transform:rotate(270deg);  -ms-transform:rotate(270deg);-moz-transform:rotate(270deg);-webkit-transform:rotate(270deg); -o-transform:rotate(270deg); }
/*#classification .cf-conetnt .cf-content-types{ padding:0 25px 360px 25px; height: auto;}*/
#classification .cf-conetnt .cf-content-types{ padding:0 25px 0 25px;}
/*#classification .cf-conetnt .cf-content-types ul{ overflow: hidden;margin-bottom: 0;padding-top: 15px; }*/
#classification .cf-conetnt .cf-content-types .type{ border-bottom: #ccc solid 1px;}
#classification .cf-conetnt .cf-content-types .type:last-child{ border-bottom: 0; }
#classification .cf-conetnt .cf-content-types .title{line-height: 1;color: #999; font-size: 13px;padding-top: 12px;}
#classification .cf-conetnt .cf-content-types .chooseBtns{ display: flex;flex-wrap:wrap;padding-top: 15px;}
#classification .cf-conetnt .cf-content-types .chooseBtn{ /*position: relative;float: left;*/  width: 30%;height: 35px;line-height: 33px; text-align: center; margin:0 3.08% 12px  0; }
#classification .cf-conetnt .cf-content-types .chooseBtn:nth-child(3n){ margin-right: 0;}
#classification .cf-conetnt .cf-content-types .chooseBtn .checkbox{    position: inherit; margin-top: 0; margin-bottom: 0; font-weight: normal;}
#classification .cf-conetnt .cf-content-types .chooseBtn input{ position: absolute;  width: 0; height: 0;opacity: 0;}
#classification .cf-conetnt .cf-content-types .chooseBtn span{ display: inline-block; width: 100%; height: 100%; border:1px #ccc solid; background: #fff; color: #4d4d4d; border-radius: 3px;    overflow: hidden;  text-overflow: ellipsis;  white-space: nowrap;}
#classification .cf-conetnt .cf-content-types .chooseBtn input[type=radio]:checked+span{ border:1px #37bc9b solid; color: #37bc9b;background:#fff url("../../assets/img/radiocheck.png") no-repeat bottom right; background-size: 20px 20px!important; }
#classification .cf-conetnt .cf-content-types .chooseBtn input[type=checkbox]:checked+span{ border:1px #37bc9b solid; color: #37bc9b;background:#fff url("../../assets/img/checkboxcheck.png") no-repeat bottom right; background-size: 20px 20px!important; }
#classification .cf-conetnt .cf-content-btns{ overflow: hidden; background: #fff;width: 100%; height: 60px; z-index: 2;}
#classification .cf-conetnt .cf-content-btns .btns{ width: 50%; float: left; padding: 8px; }
#classification .cf-conetnt .cf-content-btns .btns.cancel{ padding-right: 4px;}
#classification .cf-conetnt .cf-content-btns .btns.ensure{ padding-left: 4px;}
#classification .swiper-wrapper{ flex: 1;  width: inherit;}
#classification .require-star{
  color: #e94f4f;
  font-size: 16px;
}
@media screen and (max-width: 330px){
  #classification .cf-conetnt .cf-content-types .chooseBtn {
    width:30%;
    margin:0 3.08% 12px  0;
    font-size: 13px;
  }
}
/*滑入滑出动画*/
.tags-pane-slide-enter-active {
  transition: all .3s ease;
}
.tags-pane-slide-leave-active {
  transition: all .2s ease;
}
.tags-pane-slide-enter,
.tags-pane-slide-leave-active {
  transform: translateY(100%);
}
 @import "../../assets/plugins/swiper/swiper.min.css";
.swiper-slide{ height: auto;}
  .mar-b{ padding-bottom: 100px;}
</style>

