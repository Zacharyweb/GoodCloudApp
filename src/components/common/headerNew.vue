<template>
  <div>
    <nav class="navbar" :class="{ headergreen: (theme=='green'?true:false),noBorder: Hdata.noBorder}">
      <div class="container-fluid">
        <div class="navbar-header header-back">
          <a class="navbar-brand" v-if="!lefthide" @click="back" v-html="backhtml">
            {{ backhtml }}
          </a>
          <h4 class="header-title" id="titleBar">{{ Hdata.title}}</h4>
          <div v-if="haveright">
            <a class="navbar-brand pull-right" v-if="Hdata.specialright">
              <span v-for="right in Hdata.specialright" v-html="right.html" @click="event(right.event,$event)">
                {{right.html}}
              </span>
            </a>
            <a class="navbar-brand pull-right" v-if="!Hdata.specialright" v-html="rightHtml" @click="rightClick">
              {{ rightHtml }}
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
  export default {
    name: 'headerNew',
    props: ['Hdata'],
    data() {
      return {
        theme:'white',
        lefthide:false,
        backhtml:'<div><div class="icon iconfont icon-houtui-copy"></div><div>返回</div></div>',
        haveright:false,
        rightevent:this.Hdata.rightevent,
        rightHtml:this.Hdata.rightHtml,
        rightClick:this.Hdata.rightClick
      }
    },
    methods: {
      event:function (fun,el) {
        fun(el);
      },
      back:function () {
        var _this = this;
        if(_this.Hdata.back){
          _this.Hdata.back();
          return ;
        }
        g.window.close();
      },
      shipin:function () {
        alert("点击视频按钮");
      },
      suiyi:function () {
        alert("随意点击事件");
      },
      add:function () {
        this.$parent.add(this.$parent);
      },
      shezhi:function () {
        alert("设置");
      }
    },
    mounted: function () {
      var _this = this;
      if(_this.Hdata.theme) _this.theme = _this.Hdata.theme;
      if(_this.Hdata.lefthide) _this.lefthide = _this.Hdata.lefthide;
      if(_this.Hdata.backhtml) _this.backhtml = _this.Hdata.backhtml;
      if(_this.Hdata.haveright) _this.haveright = _this.Hdata.haveright;
      if(_this.rightevent){
        switch (_this.rightevent){
          case 'shipin':
              _this.rightHtml = '<i class="icon iconfont icon-iconfontshipin"></i>';
              _this.rightClick =_this.shipin;
              break;
          case 'suiyi':
            _this.rightHtml = '<i class="icon iconfont icon-iconfontshipin"></i>';
            _this.rightClick = _this.suiyi;
              break;
          case 'shezhi':
            _this.rightHtml = '<i class="icon iconfont icon-shezhi"></i>';
            _this.rightClick = _this.shezhi;
            break;
          default:
              break;
        }
      }
      /*if(_this.Hdata.rightevent) _this.rightevent = _this.Hdata.rightevent;
      if(_this.Hdata.rightHtml) _this.rightHtml = _this.Hdata.rightHtml;
      switch (_this.rightevent){
        case 'shipin':
            _this.rightHtml = '<i class="icon iconfont icon-iconfontshipin"></i>';
            _this.rightClick = _this.shipin;
            break;
        case 'suiyi':
          _this.rightHtml = '<i class="icon iconfont icon-iconfontshipin"></i>';
          _this.rightClick = _this.suiyi;
          break;
        case 'add':
          if(_this.Hdata.rightHtml){
            _this.rightHtml =_this.Hdata.rightHtml;
          }else{
            _this.rightHtml = '<span class="add">确认添加<span>';
          }
          _this.rightClick = _this.add;
          break;
        case 'wu':
          _this.rightClick = function () {}
          break;
        case 'shezhi':
          _this.rightClick = function () {
              alert("设置");
          }
            break;
        default:
//          _this.rightHtml = '<i class="icon iconfont icon-iconfontshipin"></i>';
//          _this.rightClick = _this.shipin;
          break;
      }*/
    }
  }
</script>
