<template>
  <div class="ykl-layout">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="panorama-img-wrapper">
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
    </div>
    <div class="panorama-msg">
      <img :src="shopDetail.ShopImg">
      <div>
        <p class="panorama-title">{{shopDetail.ShopName}}</p>
        <p class="panorama-shop">{{shopDetail.Title}}</p>
      </div>
    </div>
    <div class="users-action">
      <p><span class="iconfont icon-yuyin1" :class="{'active':openVoice}" @click="actionChange(0)"></span></p>
      <p><span class="iconfont icon-icon212" :class="{'active':openSecond}" @click="actionChange(1)"></span></p>
      <p class="VR-btn-wrapper"><span class="VR-text" :class="{'active':openVR}" @click="actionChange(2)">VR</span></p>
    </div>
    <select-room :select-room-data="selectRoomData" ref="selectinit"></select-room>
    <audio id="audio" controls="controls"
           style="display:none;position:fixed;top:0;left:0;z-index:-1;opacity:0">
      <source src="" type="audio/mpeg">
    </audio>
    <Dotvideodetail :dot-video-detail-data="dotVideoDetailData" @close="hideDotVideoDetail" v-if="dotVideoDetailData.show"></Dotvideodetail>
  </div>
</template>
<script>
  // 选择房间
  var selectRoom = {
    template: '<div class="select-room-wrapper">'
    + '<div class="select-room-layer">'
    + '<ul class="swiper-wrapper">'
    + '<li class="swiper-slide" v-for="(item,index) in roomList" @click="toRoom(item.Id,item.PanoKey)" :class="{\'active\':currentRoom == item.Id}">'
    + '<img :src="item.CoverImg">'
    + '<p>{{item.Title}}</p>'
    + '</li>'
    + '</ul>'
    + '</div> '
    + '<div class="select-room-btn" @click="toggLayer">'
    + '<span :class="{\'icon-rotate-n\':icon1Rotate,\'icon-rotate-s\':icon2Rotate}">'
    + '<i class="iconfont icon-fangjianshu"  v-show="!isLayerShow" ></i>'
    + '<i class="iconfont icon-guanbi"  v-show="isLayerShow"></i>'
    + '</span>'
    + '</div>'
    + '</div>',
    props: ['selectRoomData'],
    data: function () {
      return {
        roomList: [],
        layerShow: false,
        isLayerShow: false,
        currentRoom: 0,
        icon1Rotate: false,
        icon2Rotate: false,
      }
    },
    methods: {
      getPanoSimpleList: function (callback) {
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/getPanoSimpleList'),
          data: {shopId: _this.selectRoomData.ShopId},
          success: function (result) {
            if (result.statusCode == 0) {
              var data = result.data;
              for (var i = 0; i < data.length; i++) {
                data[i].CoverImg = g.url.imgFormat(data[i].CoverImg);
              }
              _this.roomList = data;
              callback(data);
            } else {
              alert(result.errorMsg);
            }
          }
        });
      },
      getInitData: function () {
        var _this = this;
        _this.getPanoSimpleList(function () {
          _this.initSwiper();
        });
      },
      initSwiper: function () {
        var selectRoomSwiper = new Swiper('.select-room-layer', {
          slidesPerView: 'auto',
          // initialSlide:2,
          observer: true,
          observeParents: true,
          freeMode: true,
        });
      },
      toRoom: function (id, panoKey) {
        var _this = this;
        _this.currentRoom = id;
        _this.$parent.toRoom(id, panoKey);
//        location.hash = "/hallDetail?id="+id+"&panoKey="+panoKey;
      },
      toggLayer: function () {
        this.layerShow = !this.layerShow;
        this.tottleSelectRoomLayer();

        if (this.layerShow) {
          this.icon1Rotate = true;
        } else {
          this.icon2Rotate = true;
        }
        setTimeout(function () {
          this.isLayerShow = !this.isLayerShow;
          this.icon1Rotate = false;
          this.icon2Rotate = false;
        }.bind(this), 300);
      },
      tottleSelectRoomLayer: function () {
        if (this.layerShow) {
          $('.select-room-layer').slideDown(200);
        } else {
          $('.select-room-layer').slideUp(200);
        }
      }
    },
    mounted: function () {
      var _this = this;
      _this.currentRoom = g.params.get('id');
//      this.getInitData();
    }
  };
  var audioInterval;
  import Topheader from '../common/headerNew'
  import '../../assets/exclude/tour.js'
  import '../../assets/exclude/pano-client.js'
  import '../../../static/swiper.jquery.min'
  import Dotvideodetail from '../../components/common/dotVideoDetail'
  import '../../assets/exclude/wechat-shared'
  export default {
    name: 'hallList',
    components: {
      Topheader,
      'select-room': selectRoom,
      'right-item': {
        template: '<i class="icon iconfont icon-shoucang"></i>'
      },
      Dotvideodetail
    },
    data() {
      return {
        Hdata: {
          title: '全景展厅',
          haveright: true,
          specialright: [
            {html: '<i class="icon iconfont icon-shoucang"></i>', event: this.shoucang},
//            { html:'<i class="icon iconfont icon-fenxiang1"></i>',event: this.fenxiang}
          ]
        },
        openVoice: false,
        openSecond: false,
        openVR: false,
        dotVideoShow: false,
        selectRoomData: {},
        shopDetail: {},
        panoramaId: '',
        panoKey: '',
        audioHtml: '',
        dotVideoDetailData:{show:false,hotsnotKey:''}
      }
    },
    methods: {
      shoucang: function (el) {
        var _this = this;
        var params = {
          panoramaId: _this.panoramaId,
          fav: 1
        }
        if (el.target.className.indexOf("icon-shoucangshixin") > -1) {
          console.log("解绑");
          params.fav = 0;
          var callback = function () {
            el.target.className = "icon iconfont icon-shoucang";
          }
        } else {
          console.log("绑定");
          var callback = function () {
            el.target.className = "icon iconfont icon-shoucangshixin";
          }
        }
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/fav'),
          data: params,
          success: function (result) {
            if (result.statusCode == 0) {
              callback();
            } else {
              alert(result.errorMsg);
            }
          }
        });
      },
      /*fengxiang:function () {
       alert("分享功能")
       },*/
      startVoice:function () {
        var _this = this;
        $("#audio")[0].play();
        _this.openVoice = true;
        var allTime =parseInt($("#audio")[0].duration?$("#audio")[0].duration:_this.shopDetail.VoiceSeconds) ;
        console.log("音频时间"+allTime);
        if(audioInterval){
          console.log("关闭计时器")
          clearInterval(audioInterval);
        }
        audioInterval = setInterval(function() {
          allTime -- ;
          if( allTime < 0){
            clearInterval(audioInterval);
            _this.stopVioce();
          }
        },1000);
        console.log('开启录音')
      },
      stopVioce:function () {
        var _this = this;
        _this.openVoice = false;
        $("#audio")[0].load();
        if(audioInterval){
          console.log("关闭计时器")
          clearInterval(audioInterval);
        }
        console.log('关闭录音')
      },
      playAudio: function () {
        var _this = this;
        if (!_this.shopDetail.VoiceSrc) {
          g.box.waiting({
            title:'没有相关联的音频。'
          })
          return;
        }
        if(_this.openVoice){
          _this.stopVioce();
        }else{
          _this.startVoice();
        }
      },
      getPanoDetails: function () {
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/getPanoDetails'),
          data: {panoramaId: _this.panoramaId},
          success: function (result) {
            if (result.statusCode == 0) {
              var panorama = result.data.panorama;
              panorama.ShopImg = g.url.imgFormat(panorama.ShopImg);
              _this.shopDetail = panorama;
              _this.shopDetail.VoiceSrc = panorama.VoiceSrc;
              if (_this.shopDetail.VoiceSrc!=""&&_this.shopDetail.VoiceSrc!=null) {
                 $("#audio").attr("src", g.url.voiceFormat(_this.shopDetail.VoiceSrc));
                 setTimeout(function () {
                   _this.startVoice();
                 }, 0);
               }else{
                $("#audio").attr("src", "");
                setTimeout(function () {
                  _this.stopVioce();
                }, 0);
              };
              _this.selectRoomData.ShopId = panorama.ShopId;
              if (panorama.fav == 1) {
                _this.Hdata.specialright[0].html = '<i class="icon iconfont icon-shoucangshixin"></i>';
              } else {
                _this.Hdata.specialright[0].html = '<i class="icon iconfont icon-shoucang"></i>';
              }
              var hotsnots = result.data.hotsnots;
              setTimeout(function () {
                for (var i = 0; i < hotsnots.length; i++) {
                  var hots = hotsnots[i];
                  pano.addHot(hots.HotsnotKey, null, null, null, hots.Atv, hots.Ath);
                }
              },1000);
              _this.$refs.selectinit.getInitData();
            } else {
              alert(result.errorMsg);
            }
          }
        });
      },
      actionChange: function (index) {
        var _this = this;
        switch (index) {
          case 0:
            _this.playAudio();
            break;
          case 1:
            this.openSecond = !this.openSecond;
            if (this.openSecond) {
              pano.enterGyro();
            } else {
              pano.exitGyro();
            }
            break;
          case 2:
            //todo 这里是测试的分享
            //var currentUrl ="http://app.guangkee.com/wechat/project/page/falseList/falseList.html";
            //window.shared.config("门店列表","http://imgs.fangtuwang.com/img2/upload/201608/295/128/m_94e7d14ee12d4063bddfa1881cc8e57b.jpg",currentUrl, "这里是门店列表页，不知道说些什么，就这样吧",4, 0);
            this.openVR = !this.openVR;
            pano.enterVR();
            break;
        }
      },
      toRoom: function (id, panoKey) {
        var _this = this;
        _this.panoramaId = id;
        _this.panoKey = panoKey;
        pano.change(g.url.format('/pano/xml?key=' + _this.panoKey));
        _this.getPanoDetails();
      },
      showDotVideoDetail:function(hotsnotKey){
        this.dotVideoDetailData.hotsnotKey = hotsnotKey;
        this.dotVideoDetailData.show = true;
      },
      hideDotVideoDetail:function(){
        this.dotVideoDetailData.show = false;
      }
    },
    mounted: function () {
      var _this = this;
      _this.panoramaId = g.params.get('id');
      _this.panoKey = g.params.get('panoKey');
      _this.getPanoDetails();
      pano.init({
        xmlpath: g.url.format('/pano/xml?key=' + _this.panoKey),
        target: "panorama",
        onAddHot: function (name, atv, ath) {
          console.log("添加了--" + name + "位置：" + atv + "," + ath + ",执行数据库操作");
        }, onHotClick: function (name) {
            _this.showDotVideoDetail(name);
        }, onHotDelete: function (name) {
          console.log("删除了啊啊啊--" + name);
        }, onHotMoveEnd: function (name, atv, ath) {
          console.log("移动了位置需要保存哦--name:" + name + ",atv:" + atv + ",ath" + ath);
        }, onVrExit: function () {
//          _this.navigationBarData.isShow = true;
          _this.openVR = false;
        },
        editmod: false
      });
    }
  }
</script>
<style>
  @import '../../assets/plugins/swiper/swiper.min.css';
  @import '../../assets/css/hallDetail.css';

  .navbar-brand span {
    margin-left: 15px;
  }

  .navbar-brand span:first-child {
    margin-left: 0;
  }
</style>
