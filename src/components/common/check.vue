<template>
  <div id="classification">
    <div class="shadow"  @click="close"></div>
    <div class="cf-conetnt">
      <div class="con">
        <div class="cf-content-title">
          <div class="title"><slot name="title">选择分类</slot></div>
          <div class="choose" @click="close"><div class="icon iconfont icon-bofang"></div></div>
        </div>
        <div class="cf-content-types "><!--swiper-wrapper-->
          <slot name="topTips">
            <!--<div class="cf-content-tips swiper-slide">
              <p><span>活动</span>和<span>爆款</span>各自只能关联一个短视频。重复关联会取消之前的关联。</p>
            </div>-->
          </slot>
          <div class="type " v-for="(btns,index) in btnLists"><!--swiper-slide-->
            <div class="title">
              <slot :name="'slide-title'+index">
                其他标签：(可多选)
              </slot>
            </div>
            <ul class="chooseBtns">
              <li class="chooseBtn" v-for="tag in btns.lists">
              <label class="checkbox" >
                <input  type="checkbox" name="cate" :value="tag.id" v-model="nowclass[btns.name]" v-if="btns.type != 'radio'">
                <input  type="radio" name="cate" :value="tag.id" v-model="nowclass[btns.name]" v-if="btns.type == 'radio'">
                <span>{{ tag.name }}</span>
              </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="cf-content-btns">
          <slot name="content-btns">
            <div class="btns cancel"><button class="btn btn-hui btn-block btn-normal" @click="close">取消</button></div>
            <!--<div class="btns cancel"><button class="btn btn-hui btn-block btn-normal" @click="empty">重置</button></div>-->
          </slot>
          <div class="btns ensure"><button class="btn btn-green btn-block btn-normal" @click="tagEnsure">确定</button></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'tagAndCate',
    props: ['tagComp'],
    data() {
      return {
        tagComponent:this.tagComp,
        nowclass:this.tagComp.checkedList,
        btnLists:this.tagComp.btnLists,
      }
    },
    methods: {
      close:function(){
        this.tagComponent.isShow = false;
        this.$emit('close');
      },
      empty:function(){
        this.$emit('empty');
      },
      tagEnsure:function () {
        this.$emit('tagensure');
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
      editmodel:function(){
        this.$emit('editmodel');
      },
    },
    mounted: function () {
    }
  }
</script>

<style>
  ul{ padding-left: 0;}
  #classification{position: absolute; top:0; bottom: 0; left: 0; right: 0;z-index: 999; }
  #classification .shadow{ position: absolute; top:0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.5); z-index: 999;  }
  #classification .cf-conetnt{ position: absolute; top:150px; bottom: 0; left: 0; right: 0; z-index: 1000; background: #f5f5f5; overflow: hidden; display: flex;  flex-direction: column;}
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
  #classification .cf-conetnt .cf-content-types{ padding:0 25px 0 25px;
    position: absolute;
    top: 40px;
    bottom: 60px;
    left: 0;
    right: 0;
    z-index: 999;
    overflow-y: scroll;
  }
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
  #classification .cf-conetnt .cf-content-btns{ position: absolute; bottom: 0; left: 0; right: 0; overflow: hidden; background: #fff;width: 100%; height: 60px; z-index: 2;}
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
