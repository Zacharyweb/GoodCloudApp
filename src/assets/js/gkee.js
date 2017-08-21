var gkee={
  baseUrl:"http://1.1.1.12:8080/izanamishowtime"
  ,appId:2
  ,isApp:function(){
    return typeof(gkeePhoto) !='undefined';
  }
  ,sacnQr:function(func){
    this.sacnQrCallback =func;
    gkeePhoto.sacnQr();
  }
  ,sacnQrCallback:null
  ,openPhoto:function(func){
    this.openPhotCallBack = func;
    gkeePhoto.openPhoto();
  }
  ,openPhotCallBack:null
  ,openCamera:function(func){
    this.openCameraCallback=func;
    gkeePhoto.openCamera();
  }
  ,openCameraCallback:null

  /**
   * 录音器
   */
  ,createAudioManager:function(obj){
    var backAudioName="";
    var timer =0;
    var backstep =obj.step;
    var timestep = function(){
      timer ++;
      if(backstep){
        backstep(timer);
      }
    }

    var t ;
    var startTimer =function(){
      t=setInterval(timestep,1000);
    }
    var stopTiemr =function(){
      clearInterval(t);
    }

    var ispause =false;
    var isrunniong =false;
    var audioPath =obj.path;

    var startRecord =function(){
      if(isrunniong){
        alert("正在录音");
        return;
      }
      var ret;
      if(!ispause){
        timer=0;
        ret= gkeeAudio.startRecord(audioPath);
      }else{
        ret= gkeeAudio.startRecord('');
      }
      ispause =false;
      isrunniong =true;
      if(ret==1){
        startTimer();
      }
    }
    var pauseRecord =function(){
      ispause =true;
      isrunniong =false;
      var ret= gkeeAudio.pauseRecord();
      if(ret==1){
        stopTiemr();
      }
    }

    var stopRecord =function(){
      isrunniong =false;
      ispause =false;
      var ret= gkeeAudio.stopRecord();
      if(ret!=""){
        stopTiemr();
        backAudioName =ret;
      }
    }

    var resret = function(){
      ispause =false;
      isrunniong =false;
      stopTiemr();
      tiem=0;
      backAudioName ="";
    }

    return {
      start:startRecord,
      pause:pauseRecord,
      stop:stopRecord,
      resret:resret,
      getTimeCount:function(){
        return timer;
      }
      ,getAudioName:function(){
        return backAudioName;
      }
    }
  }
  /**
   * 播放器
   */
  ,createAudioManagerPlay:function(obj){
    var timerCount =obj.timerCount;
    var timer =0;
    var backstep =obj.step;
    var finish = obj.finish;
    var islooping = obj.islooping;
    var timestep = function(){
      timer ++;
      if(timer>timerCount){
        timer=1;
        if(!islooping){
          stopTiemr();
          finish();
          return;
        }
      }
      if(backstep){
        backstep(timer);
      }
    }

    var t ;
    var startTimer =function(){
      t=setInterval(timestep,1000);
    }
    var stopTiemr =function(){
      clearInterval(t);
    }

    var url = obj.url;

    var startAudioPlay =function(){
      var ret= gkeeAudio.playRecord(url,islooping);
      if(ret==1){
        startTimer();
      }
    }
    var pauseAudioPlay =function(){
      var ret= gkeeAudio.pausePlay(url);
      if(ret==1){
        stopTiemr();
      }
    }
    var stopAudioPlay =function(){
      var ret= gkeeAudio.stopPlay(url);
      if(ret==1){
        stopTiemr();
      }
    }

    return {
      play:startAudioPlay,
      pause:pauseAudioPlay,
      stop:stopAudioPlay
    }
  }

  /**
   * 上传图片
   */
  ,uploadImage:function(image,func){
    this.uploadImageCallback =func;
    gkeePhoto.uploadImage(image);
  }
  ,uploadImageCallback:null
  ,uploadFile:function(type,start,progress,success,cancle,error){
    this.uploadstart=start;
    this.uploadprogress =progress;
    this.uploadsuccess = success;
    this.uploadcancle =cancle;
    this.uploaderror = error;
    gkeeSystem.uploadFile(type);
  }
  ,uploadprogress:null
  ,uploadsuccess:null
  ,uploadcancle:null
  ,uploaderror:null
  ,uploadstart:null
  ,uploadFileByPath:function(uploadType,url){
    if(this.uploadstart)
      this.uploadstart();
    gkeeSystem.uploadFileByPath(uploadType,url);
  }

  ,uploadFileByPathAndCallBack:function(uploadType,url,success,error){
    this.uploadcallBackSuccess =success;
    this.uploadeBackError =error;
    gkeeSystem.uploadFileByPathAndCallBack(uploadType,url);
  }
  ,uploadcallBackSuccess:null
  ,uploadeBackError:null
  ,createWebView:function(url,key){
    if(this.isApp()){
      gkeeActivity.createWebView(url,key);
    }else{
      window.chrome_webkey=key;
      window.open(url);
    }
  }
  ,createMenuWebView:function(urls,key){
    if(this.isApp()){
      var _urls="";
      for(var i=0;i<urls.length;i++){
        _urls +=urls[i];
        if(i !=urls.length-1){
          _urls+=",";
        }
      }
      gkeeActivity.createMenuWebView(_urls,key);
    }else{
      alert("方法还没实现");
    }
  }
  ,updateMainUrl:function(i,url){
    if(this.isApp()){
      gkeeActivity.updateMainUrl(i,url);
    }
    else{
      alert("方法还没实现");
    }
  }
  /**
   * 关闭页面
   */
  ,closeWebView:function(){
    if(this.isApp()){
      gkeeActivity.closeWebView();
    }else{
      window.close();
    }
  }
  /**
   * 关闭指定页面
   */
  ,closeWebviewByKey:function(key){
    if(this.isApp()){
      gkeeActivity.closeWebviewByKey(key);
    }else{
      var closeParent= function(w){
        var opener =window.opener;
        if(opener==null)return;
        if(opener.chrome_webkey==key){
          opener.close();
          return;
        }
        closeParent(opener);
      }
      closeParent(window);
    }
  }
  /**
   * 关闭页面并回传值
   */
  ,closeWebvViewWithData:function(data){
    if(this.isApp()){
      gkeeActivity.closeWebViewWithData(data);
    }else{
      window.opener.frame_callback(data);
      window.close();
    }
  }
  //登入
  ,login:function(token,url){
    if(this.isApp()){
      gkeeActivity.login(token,url);
    }
    else{

    }
  }
  /**
   * 更新登入
   */
  ,updateLogin:function(token,url){
    if(this.isApp()){
      gkeeActivity.updateLogin(token,url);
    }
    else{

    }
  }

  //退出
  ,logout:function(url){
    if(this.isApp()){
      gkeeActivity.logout(url);
    }else{

    }
  }

  /**
   * 微信登入
   */
  ,weixinLogin:function(func){
    this.weixinLoginCallback=func;
    gkeeWeixin.weixinLog();
//		var str = gkeeWeixin.getwxstr();
//		return str;
  }
  ,weixinLoginCallback:null
  //微信分享
  ,weixinShare:function(flag,url,title,description,iconUrl){
    gkeeWeixin.weixinShare(flag,url,title,description,iconUrl);
  }
  //图片
  ,weixinShareForPic:function(title,images){
    var imgstr ="";
    for(var i=0;i<images.length;i++){
      imgstr +=images[i];
      if(i!=images.length-1){
        imgstr+=",";
      }
    }
    gkeeWeixin.weixinShareForPic(title,imgstr);
  }
  ,weixinpay:function(data,func){
    this.payback =func;
    gkeeWeixin.pay(data);
  }
  ,payback:null
  ,weixinCallback:function(type,result,data){
    if(type==0 && this.weixinLoginCallback !=null){
      this.weixinLoginCallback(result,data);
    }
    else if(type==1 && this.payback !=null){
      this.payback(result);
    }
    else if(type==2){

    }
  }
  //获取联系人
  ,getContacts:function(){
    var ccc=gkeeSystem.getContacts();
    return ccc;
  }
  //打开日历
  ,getCalendar:function(callback){
    gkeeSystem.getCalendar();
    this.calendarBack =callback;
  }
  ,calendarCallback:function(year,month,day){
    if(this.calendarBack){
      //alert(year+"-"+month+"-"+day);
      this.calendarBack(year,month,day);
    }
  }
  ,hideStatusBar:function(){
    gkeeSystem.hideStatusBar();
  }
  ,setStatusBarColor:function(a,r,g,b){
    gkeeSystem.setStatusBarColor(a,r,g,b);
  }
  ,showMenu:function(){
    if(this.isApp()){
      gkeeSystem.showMenu();
    }
  }
  ,hideMenu:function(){
    if(this.isApp()){
      gkeeSystem.hideMenu();
    }
  }
  ,selectBottomItem:function(i){
    gkeeSystem.selectBottomItem(i);
  }
  /**
   * 录制视频
   */
  ,openVideo:function(){
    gkeeSystem.openVideo();
  }
  /**
   * 获取视频封面
   */
  ,getVideoPhoto:function(){
    return gkeeSystem.getVideoPhoto();
  }
  /**
   * 上传视频封面
   */
  ,uploadVideoImg:function(src,success,error){
    this.uploadcallBackSuccess =success;
    this.uploadeBackError =error;
    gkeeSystem.uploadVideoImg(src);
  }
  /**
   * 上传视频
   */
  ,uploadVideo:function(success,error){
    this.uploadcallBackSuccess =success;
    this.uploadeBackError =error;
    gkeeSystem.uploadVideo();
  }

  ,calendarBack:null
  /**
   * 设置缓存
   */
  ,addLocalStorage:function(key,value){
    if(this.isApp()){
      gkeeSystem.addLocalStorage(key,value);
    }else{
      localStorage[key] = value;
    }
  }
  /**
   * 获取缓存
   */
  ,getLocalStorage:function(key){
    if(this.isApp()){
      return gkeeSystem.getLocalStorage(key);
    }else{
      return localStorage[key];
    }
  }
  /**
   * 删除缓存
   */
  ,dleLocalStorage:function(key){
    if(this.isApp()){
      gkeeSystem.dleLocalStorage(key);
    }else{
      localStorage.removeItem(key);
    }
  }

  ,viewBack:function(){
    if(this.isApp()){
      gkeeView.back();
    }else{
      window.history.back(-1);
    }
  }

  /**
   * 获取网络权限
   */
  ,getNetWork:function(){
    if(this.isApp()){
      return gkeeSystem.getNetWorkType();
    }else{
      return 1;
    }
  }

  ,createRoom:function(roomId){
    if(this.isApp()){
      gkeeSystem.createRoom(roomId);
    }else{

    }
  }
  ,joinRoom:function(roomId){
    if(this.isApp()){
      gkeeSystem.joinRoom(roomId);
    }else{

    }
  }

  /**
   * type:1 消费者发给导购
   * type:2导购发给消费者
   */
  ,sendMcc:function(userName,mtype,shopId,guideId,func){
    this.sendMccCallback =func;
    gkeeSystem.sendMessage(userName,mtype,shopId,guideId);
  }

  /**
   *
   */
  ,sendMccNoMoney:function(userName,shopId,guideId,func){
    this.sendMccCallback =func;
    gkeeSystem.sendMessageNoMeny(userName,shopId,guideId);
  }
  ,sendMccCallback:null

  /**
   * 获取APPID
   */
  ,getAappId:function(){
    if(this.isApp()){
      return gkeeSystem.appId();
    }
    else{
      return this.appId;
    }
  }
  /**
   * 获取手机唯一标识
   */
  ,getAndroIdIMEI:function(){
    if(this.isApp()){
      return gkeeSystem.getAndroIdIMEI();
    }else{
      return "";
    }
  }
}


window.gkee = gkee;
