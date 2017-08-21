<template>
  <div id="voice">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="v-content">
      <img :src="CoverImg" class="v-content-img">
      <div class="v-content-text">
        <div>为全景录制语音介绍，可以吸引客户对门店和产品的兴趣。</div>
        <div>掌握几个录音小技巧，让客户跑不了；</div>
        <div>1、在录制之前，请尽量保持周围环境安静；&nbsp;</div>
        <div>2、录制的语音可以是普通话也可以是方言，根据当地的情况而定；&nbsp;</div>
      </div>
      <button class="btn record" :class="{green:onPress}" v-show="!hasVoice" v-touch:press="touchEvent">
        <div class="noVoice" v-if="!onPress">
          <div class="icon iconfont icon-maikefeng-copy"></div>
          <p class="text">按住录音</p>
        </div>
        <div class="noVoice"  v-if="onPress">
          <div class="icon iconfont icon-maikefeng-copy"></div>
          <p class="text">松开结束</p>
        </div>
      </button>

      <div class="v-content-time" v-if="!(!hasVoice && !onPress)">{{showSeconds}}</div>
      <button class="btn record" v-show="hasVoice" @click="play">
        <div class="hasVoice">
          <div class="icon iconfont" :class="playIcon"></div>
          <p class="text">回放录音</p>
        </div>
        <audio id="audio" :src="voiceSrc"></audio>
      </button>
      <div class="delete" v-if="hasVoice" @click="clearVoice"><i class="icon iconfont icon-trash"></i></div>
      <div class="recording" v-if="type==1">
        <div class="icon iconfont icon-maikefeng-copy"></div>
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
        <p>录音中</p>
        <p>还剩<span class="restTime">{{restTime}}</span>秒</p>
      </div>
    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  var audioInterval;
  var tempSrc ='';
  var audioManager;
  var audioManagerPlay;
  export default {
    name: 'hallList',
    components: {
      Topheader
    },
    data() {
      return {
        Hdata:{
          back:this.back,
          title:'添加语音介绍',
          haveright:true,
          rightHtml:'完成',
          rightClick:this.add,
        },
        hasVoice: false,
        type:0, //0未按 1长按 2短按 3结束
        touchEvent:{
          longTouch:this.longTouch,
          duan: this.duan,
          restore:this.restore,
          press:this.press
        },
        onPress:false,
        voiceSrc:'',
        voiceSeconds:0,
        showSeconds:'00:00',
        CoverImg:'',
        id:'',
        onPlay:false,
        ifStartRecord:false,
        addMess:'',
        restTime:30
      }
    },
    methods: {
      stopVioce:function () {
          var _this = this;
        console.log(_this.voiceSrc);
        _this.onPlay = false;
        if(_this.voiceSrc.indexOf("http")!=-1){
          console.log("stop1");
          if($("#audio")[0].played){
            clearInterval(audioInterval);
            var allTime = _this.voiceSeconds ? _this.voiceSeconds: $("#audio")[0].duration;
            _this.timeChange(allTime);
            $("#audio")[0].load();
          }
        }else{
          console.log("stop2");
          if(audioManagerPlay){
            audioManagerPlay.stop();
            _this.timeChange(audioManager.getTimeCount());
          }
        }
      },
      startVioce:function () {
        var _this = this;
        _this.onPlay = true;
        console.log(_this.voiceSrc);
        if(_this.voiceSrc.indexOf("http")!=-1){
          console.log("start1")
          var allTime = _this.voiceSeconds ? _this.voiceSeconds: $("#audio")[0].duration;
          $("#audio")[0].play();
          audioInterval = setInterval(function() {
            allTime -- ;
            _this.timeChange(allTime);
            if( allTime < 0){
              clearInterval(audioInterval);
              _this.stopVioce();
            }
          }, 1000);
        }else{
          console.log("start2")
          if(audioManagerPlay ==null)
            audioManagerPlay =gkee.createAudioManagerPlay({url:audioManager.getAudioName(),timerCount:audioManager.getTimeCount(),islooping:false,step:function(t){
              _this.timeChange(audioManager.getTimeCount()-t);
            },finish:function(){
              _this.stopVioce();
            }});
          audioManagerPlay.play();
        }
      },
      back:function () {
        var _this = this;
        g.box.confirm({
          title: '确定',
          errorMess: '点击确定，不会保存任何录音',
          submitName: '确定',
          refuseName: '取消',
          submitCallBack: function () {
            if(tempSrc){
              _this.stopVioce();
            }
            g.window.closeWithData();
          }
        });
      },
      add:function () {
          var _this = this;
        g.box.confirm({
          title:'确定',
          errorMess:_this.addMess,
          submitName:'确定',
          refuseName:'取消',
          submitCallBack:function () {
            console.log(tempSrc);
            if(tempSrc){
              _this.stopVioce();
              gkee.uploadFileByPathAndCallBack(1,audioManager.getAudioName(),function(data){
                _this.voiceSrc="/voice"+data.substring(data.lastIndexOf("/"),data.length);
                g.ajax({
                  type: 'GET',
                  url: g.url.format('/pano/setVoice'),
                  data:{id:_this.id,src:_this.voiceSrc,seconds:_this.voiceSeconds},
                  success: function (result) {
                    if(result.statusCode == 0){
                      console.log("保存好录音")
                      g.window.closeWithData();
                    }else{
                      alert(result.errorMsg);
                    }
                  }
                });
              },function(){

              });
            }else if(!_this.voiceSrc && !tempSrc){
              console.log("删除");
              g.ajax({
                type: 'GET',
                url: g.url.format('/pano/delVoice'),
                data: {id: _this.id},
                success: function (result) {
                  if(result.statusCode == 0){
                    g.window.closeWithData();
                  }else{
                    alert(result.errorMsg);
                  }
                }
              });
            }else{
              console.log('未保存好录音')
              g.window.closeWithData();
            }
          },
        });
      },
      longTouch:function () {
        var _this = this;
        _this.type = 1;
        tempSrc = new Date().getTime();
        if(audioManager ==null){
          audioManager = gkee.createAudioManager({path:"/"+tempSrc+".aac",step:function(ti){
            _this.timeChange(ti);
            _this.restTime = 30 - ti;
            if(_this.restTime<1){
                _this.restore();
            }
          }});
        }
        audioManager.start();
        _this.ifStartRecord = true;
      },
      duan:function () {
        this.type = 2;
        g.box.waiting({title:'时间太短',position:'bottom'});
      },
      restore:function () {
        var _this = this;
        this.onPress = false;
        this.type = 0;
        if(_this.ifStartRecord){
          audioManager.stop();
          _this.voiceSeconds = audioManager.getTimeCount();
          _this.hasVoice = true;
          _this.ifStartRecord = false;
        }
      },
      press:function () {
        this.onPress = true;
      },
      clearVoice:function () {
        var _this = this;
        _this.stopVioce();
        tempSrc = '';
        _this.hasVoice = false;
        _this.voiceSrc ='';
        _this.showSeconds = '00:00';
        _this.onPlay = false;
        _this.ifStartRecord = false;
        _this.restTime = 30;
      },
      play:function () {
        var _this = this;
        if(!_this.onPlay){
          _this.startVioce();
        }else{
          _this.stopVioce();
        }
      },
      timeChange(time) { //默认获取的时间是时间戳改成我们常见的时间格式
        var _this = this;
        //分钟
        if(isNaN(time)){
          var allTime = "00:00";
        }else{
          var minute = time / 60;
          var minutes = parseInt(minute);
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          //秒
          var second = time % 60;
          var seconds = parseInt(second);
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          var allTime = "" + minutes + "" + ":" + "" + seconds + "";
        }
        _this.showSeconds = allTime;
      },
      getVioceDetail:function () {
        var _this = this;
        g.ajax({
          type: 'GET',
          url: g.url.format('/pano/getPanoDetails'),
          data:{panoramaId:_this.id},
          success: function (result) {
            if(result.statusCode == 0){
                var data = result.data.panorama;
              _this.hasVoice = data.VoiceSrc?true : false;
              _this.addMess = data.VoiceSrc ? '确定保存新录音吗？新录音会覆盖之前的录音':'确定保存新录音吗？';
              if(data.VoiceSrc) {
                _this.voiceSrc = g.url.voiceFormat(data.VoiceSrc);
              }
              _this.voiceSeconds = parseInt(data.VoiceSeconds);
              _this.timeChange(_this.voiceSeconds);
              _this.CoverImg = g.url.imgFormat(data.CoverImg);

            }else{
              alert(result.errorMsg);
            }
          }
        });
      }
    },
    computed:{
      playIcon:function () {
        var _this = this;
        return {
          'icon-bofang': !_this.onPlay,
          'icon-zanting': _this.onPlay
        }
      }
    },
    mounted: function () {
      var _this = this;
      _this.id = g.params.get('id');
      _this.getVioceDetail();
      _this.timeChange(parseInt(g.params.get('VoiceSeconds')));

    }
  }
</script>
<style scoped>
  .v-content .v-content-img{ width: 100%; max-height:190px; padding-bottom: 7px; background: #f5f5f5; }
  .v-content .v-content-text{ margin: 20px 0; padding: 0 15px; color: #999; font-size: 14px; }
  .v-content-text > div{  color: #999;  line-height: 24px; }
  .v-content .v-content-time{ position: absolute; left: 0; right: 0; bottom:160px; text-align: center; font-size: 15px; color: #4c4c4c; }
  .v-content .delete{ position: absolute; bottom: 80px; right: 50px; width: 20px; height: 20px;}
  .v-content .record{ position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);color: #4d4d4d; width: 130px; height: 130px; text-align: center; border:1px #ccc solid; border-radius: 50%; background: #fcfcfc;}
  .v-content .record.green{ background: #37bc9b; color: #fff;}
  .v-content .record .noVoice .icon-maikefeng-copy{ font-size: 20px; }
  .v-content .record .noVoice .text{ font-size: 18px; margin-bottom: 0;}
  .v-content .record .hasVoice .icon{color: #37bc9b; font-size: 20px; }
  .v-content .record .hasVoice .text{ font-size: 18px; color: #37bc9b; margin-bottom: 0;}
  .v-content .record .hasVoice .time{ font-size: 14px; color: #4c4c4c;}
  .recording{ color: #fefefe; text-align: center; position: absolute; top:210px; left: 50%; width: 185px; height: 185px; transform:translateX(-50%); background:#000; opacity: .6; border-radius: 5px;}
  .recording .icon-maikefeng-copy{ font-size: 80px;}
  .recording p{ margin-bottom: 5px;}
  .recording p .restTime{ font-size: 20px;  margin: 0 5px;}
  .spinner {  margin: -10px auto 0;  width: 100%;  text-align: center;  }
  .spinner > div {  width: 8px;  height: 8px;  background-color: #fefefe;  border-radius: 100%;  display: inline-block;  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;  animation: bouncedelay 1.4s infinite ease-in-out;  -webkit-animation-fill-mode: both;  animation-fill-mode: both;  }
  .spinner .bounce1 {  -webkit-animation-delay: -0.32s;  animation-delay: -0.32s;  }
  .spinner .bounce2 {  -webkit-animation-delay: -0.16s;  animation-delay: -0.16s;  }
  @-webkit-keyframes bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
  }
  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 40% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
  }

</style>
