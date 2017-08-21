/**
 * js 配置/工具集合isApp
 * Created by Spring on 2017/5/4.
 */
var gtr = (function ($) {
  //region 版本说明
  var version={
    v:"1.0.1",
    author:""
  }
  //endregion

  //region  基础配置
  var config = {
    debugger:false,
    wechatAuthor:"http://app.yetong.org/showtime/wechat/first?appId=wx75d264c0d5ba7218&returnUrl="+encodeURIComponent(window.location.href),
    // baseUrl:"http://1.1.1.10:8080/showtime/",
    baseUrl:"http://1.1.1.10:8080/showtime",//春雷
    // baseUrl2:"http://1.1.1.10:8080/showtime",//春雷
    //locallurl:"http://1.1.1.86:8084/project",
    locallurl:"http://1.1.1.10:8083/app/#",
    wechatLocalUrl:"http://app.yetong.org/wechat/",
    imgShowUrl:"http://image.yetong.org",
    voiceShowUrl:"http://files.yetong.org",
    videoShowUrl:"http://files.yetong.org",
    bucket : 'keegz',
    appid : 1252902336,
    sid : "AKIDjLlz1rxvCIG2hBubWSGuMchfV8Zoo8Y4",
    skey : "UnuoZCfw3yTr35vZ0FIE78CD2f5MSp6C",
    region : 'gz',
    myFolder : '/web/',
    getAppId:function(){
      return gkee.getAappId();
    },
    isApp:function(){
      return gkee.isApp();
    }
  }
  //endregion

  //region url处理相关
  var url = {
    wechatFormat:function(url){
      if(url.indexOf("http")!=-1){
        return url;
      }
      if(url){
        return config.wechatLocalUrl + url;
      }else{
        return config.wechatLocalUrl;
      }
    },
    format: function(url) {//接口路径
      if(url.indexOf("http")!=-1){
        return url;
      }
      if(url){
        return config.baseUrl + url;
      }else{
        return config.baseUrl;
      }

    },
    imgFormat:function(url,width,height,itype){
      if(!url){
        //默认图片处理
        if(!itype){
          return "http://files.yetong.org/web/default_guide.png";
        }
        switch(itype){
          case 0:
            return "http://files.yetong.org/web/default_guide.png";
          case 1:
            return "http://files.yetong.org/web/default_shop.png";
          default:
            return "http://files.yetong.org/web/default_guide.png";
        }
      }
      if(url.indexOf("http")!=-1){
        return url;
      }
      var baseUrl=config.imgShowUrl +url+"?";
      if(width&&height){
        baseUrl=baseUrl+"imageView2/2/w/"+width+"/h/"+height;
        return baseUrl;
      }
      if(width){
        baseUrl=baseUrl+"imageView2/2/w/"+width;
        return baseUrl;
      }
      if(height){
        baseUrl=baseUrl+"imageView2/2/h/"+height;
        return baseUrl;
      }
      return baseUrl;
    },
    voiceFormat:function (url) {
      if(url.indexOf("http")!=-1){
        return url;
      }
      if(url) {
        return config.voiceShowUrl + url;
      }else{
        return config.voiceShowUrl;
      }
    },
    urlHref:function (url) {//跳转路径
      if(url.indexOf("http")!=-1){
        return url;
      }
      if(url) {
        if(url.indexOf("&v")!=-1||url.indexOf("?v")!=-1){
          return config.locallurl+url;
        }
        url=(url.indexOf("?")!=-1)?(url+"&v="+version.v):(url+"?v="+version.v);
        return config.locallurl+url;
      }else{
        return config.locallurl;
      }
    },
    videoFormat:function (url) {//跳转路径
      if(url.indexOf("http")!=-1){
        return url;
      }
      if(url) {
        return config.videoShowUrl + url;
      }else{
        return config.videoShowUrl;
      }
    }
  }
  //endregion

  //region 等待框,弹出框alert,确认框confirm
  var box = {
    waiting: function (opts) {
      var defaultOpts = {
        title: "请等待……",
        icon:""
      }
      var setting = $.extend({}, defaultOpts, opts);
      this.opt=setting;
      var plugin = this;
      plugin.createWaitHtml(setting);
      if(!setting.wait){
        setTimeout(function(){
          $(".MsgBox").fadeOut("slow","swing",function () {
            $(".MsgBox").remove();
            if(!plugin.opt.closeDiv){
              return false;
            }
            plugin.opt.closeDiv();
          });
        },1000);
      }
    },
    alert:function(opts){
      var defaultOpts = {
        title:'错误提示',
        errorMess:'出错了',
        submitName:'好'
      }
      var setting = $.extend({}, defaultOpts, opts);
      this.opt=setting;
      var plugin = this;
      plugin.createHtml('Alert');
      $(".MsgBox").find(".btnOk").on("click",function () {
        plugin.submitCallBack();
      });
      $(".MsgBox").find(".close").on("click",function () {
        plugin.closeDiv();
      });
    },
    confirm:function(opts){
      var defaultOpts = {
        title:'温馨提示',
        errorMess:'出错了',
        submitName:'同意',
        refuseName:'拒绝'
      }
      var setting = $.extend({}, defaultOpts, opts);
      this.opt=setting;
      var plugin = this;
      plugin.createHtml('Confirm');
      $(".MsgBox").find(".close").on("click",function () {
        plugin.closeDiv();
      });
      $(".MsgBox").find(".btnOk").on("click",function () {
        plugin.submitCallBack();
      });
      $(".MsgBox").find(".btnNo").on("click",function () {
        plugin.closeCallBack();
      });
    },
    createHtml:function (type) {
      var _foothtml='';
      switch (type){
        case "Alert":
          _foothtml='<div class="MsgBoxbtn btnOk">'+this.opt.submitName+'</div>';
          break;
        case "Confirm":
          _foothtml = '<div class="MsgBoxbtn btnNo">'+this.opt.refuseName+'</div>';
          _foothtml += '<div class="MsgBoxbtn btnOk">'+this.opt.submitName+'</div>';
          break;
        default:
          _foothtml='<div class="MsgBoxbtn btnOk">'+this.opt.submitName+'</div>';
          break;
      }
      var _html = "";
      _html += '<div class="MsgBox">';
      _html += '  <div class="MsgBox-mask"></div>';
      _html += '  <div class="MsgBox-content">';
      _html += '    <div class="title">'+this.opt.title+'';
      _html += '      <button type="button" class="close"><span class="icon iconfont icon-wrong"></span></button>';
      _html += '    </div>';
      _html += '    <div class="text">'+this.opt.errorMess+'</div>';
      _html += '    <div class="foot">';
      _html +=_foothtml;
      _html += '    </div>';
      _html += '  </div>';
      _html += '</div>';
      $("body").append(_html);
    },
    createWaitHtml:function (setting) {
      var waitHtml ='<div class="MsgBox MsgBox-toast '+(setting.position || '')+'">' +
        '   <div class="MsgBox-toast-content">'+setting.title+'</div>' +
        '</div>';
      $("body").append(waitHtml);
    },
    submitCallBack:function () {
      if(this.opt.submitCallBack){
        this.opt.submitCallBack();
      }
      $(".MsgBox").remove();
    },
    closeCallBack:function () {
      if(this.opt.closeCallBack){
        this.opt.closeCallBack();
      }
      $(".MsgBox").remove();
    },
    closeDiv:function () {
      if(this.opt.closeDiv){
        this.opt.closeDiv();
      }
      $(".MsgBox").remove();
    },
    ajaxError:function (errorMess) {
      var plugin = this;
      if($(".system-error-pane").length) return ;
      var errorClickNum =0;
      plugin.creatError();
      $(".system-error-pane").find(".return-btn").on("click",function () {
        win.close();
      });
      $(".system-error-pane").find(".error-mag-trigger").on("click",function () {
        errorClickNum ++;
        if(errorClickNum == 2){
          errorClickNum = 0;
          alert(errorMess);
        }
      });
    },
    creatError:function () {
      var _html = '';
      _html ='<div class="system-error-pane">'
        +   '<div class="system-error-box">'
        +      '<div class="error-img-wrapper"></div>'
        +      '<p class="system-error-tip">哎呦，系统貌似出错了...</p>'
        +      '<p class="return-btn" >点击返回</p>'
        +      '<p class="error-mag-trigger"></p>'
        +   '</div>'
        +'</div>';
      $("body").append(_html);
    }
  }
  //endregion

  //region ajax 相关
  var ajax=function(opts){
    //备份opt中error和success方法
    var fn = {
      error: function (XMLHttpRequest, textStatus, errorThrown) { },
      success: function (data, textStatus) { }
    }
    if (opts.success) {
      fn.success = opts.success;
    }
    var token = storage.getToken();
    //var token = 'fc66MvOz9z4z8KUGT5piB7UxMQjQ28GdhYMkX5bdaXg=';
    // var token = 'rS/dVTxRci7J33BFH8Vb5NjqaebtzTKe7Jb9ugSegPS6kvtqs5Wm8cLlxkLpWFb8';
    // var token = 'DHkfmlAhYGOXf+WInCUyyWW1Kd1LstdvgzMaXLt4yVm6kvtqs5Wm8cLlxkLpWFb8';
    console.log('token:'+ token);
    opts.headers = $.extend({},{'token':token},opts.headers);
    if (/\?/g.test(opts.url)) {
      opts.url = opts.url+"&isajax=1";
    } else {
      opts.url = opts.url+"?isajax=1";
    }

    //扩展增强处理
    var _opt = $.extend(opts, {
      success: function (data, textStatus) {
        if(data.statusCode == 403){
          box.alert({
            errorMess:data.errorMsg
          });
        }else{
          fn.success(data, textStatus);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var systemErrorPaneData = JSON.stringify({jqXHR:jqXHR,textStatus:textStatus,errorThrown:errorThrown});
        // box.ajaxError(systemErrorPaneData);
      }

    });
    return $.ajax(_opt);
  }
  //endregion

  //region 日期相关
  Date.prototype.format=function (pattern) {
    if(!pattern){
      pattern = 'yyyy-MM-dd hh:mm:ss'; //默认形式
    }
    var date = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(pattern)) {
      pattern = pattern.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(pattern)) {
        pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1
          ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return pattern;
  }
  String.prototype.dateFormat=function (pattern) {
    return this.toDate().format(pattern);
  }
  Number.prototype.dateFormat=function(pattern){
    return this.toDate().format(pattern);
  }

  String.prototype.toDate=function(){
    return new Date(this);
  }
  Number.prototype.toDate=function(){
    return new Date(this);
  }
  var date={
    toDate:function(obj){
      //根据类型分别作转换
      //typeof obj =="String"
      //typeof obj =="String"
    }
  }
  //endregion

  //region 存储相关
  var storage={
    getToken:function(){
      //return  '2mdFOEP87TSly8KJWjPC+aV+x7ll+pKFdGj6XaiYLTG6kvtqs5Wm8cLlxkLpWFb8';
      var _information =window.gkee.getLocalStorage("token");
      if(_information && typeof (_information) != "undefined"){
        return JSON.parse(_information).token;
      }else {
        return '';
      }
    },
    setToken:function(data){
      var _information =window.gkee.getLocalStorage("token");
      if(_information && typeof (_information) != "undefined"){
        var Info = JSON.parse(this.getUserInfo());
        Info.token = data;
        window.gkee.addLocalStorage("token",JSON.stringify(Info));
      }else {
        console.log("异常情况！");
      }
    },
    delToken:function(){
      var _information =window.gkee.getLocalStorage("token");
      if(_information && typeof (_information) != "undefined"){
        var Info = JSON.parse(this.getUserInfo());
        Info.token = '';
        window.gkee.addLocalStorage("token",JSON.stringify(Info));
      }else {
        console.log("异常情况！");
      }
    },
    getUserInfo:function(){
      console.log(window.gkee.getLocalStorage("token"));
      var _token =window.gkee.getLocalStorage("token");
      if( _token && typeof (_token) != "undefined" ){
        console.log(_token)
        return JSON.parse(_token);
      }else{
        console.log("wu")
        return '';
      }

    },
    setUserInfo:function(data){
      window.gkee.addLocalStorage("token",data);
    },
    delUserInfo:function(){
      window.gkee.dleLocalStorage("token");
    },
    getSystemData:function(){

    },
    setSystemData:function(data){

    },
    delSystemData:function () {

    },
    set:function(key,value){
      window.gkee.addLocalStorage(key,value);
    },
    get:function (key) {
      return window.gkee.getLocalStorage(key);
    },
    del:function(key){
      window.gkee.dleLocalStorage(key);
    },
    getCurrentSourceId:function(){
      var _information =window.gkee.getLocalStorage("token");
      if(_information && typeof (_information) != "undefined"){
        var IdList = JSON.parse(_information).userIdentityList;
        for(var i = 0; i <= IdList.length; i++){
          if(IdList[i].isCurrent == 1 && IdList[i].status == 0){
              return IdList[i].sourceId;
          }
        }
        return -1;
      }
    }
  };
  //endregion

  //region 参数相关
  var params={
    get:function(key){
      return this.getAll()[key];
    },
    getAll:function(){
      if (window.location.href.indexOf('?') == -1) {
        return false;
      }
      var vars = {}, hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i = 0; i < hashes.length; i++) {
        if(hashes[i]!=''){
          hash = hashes[i].split('#')[0].split('=');
          vars[hash[0]] = hash[1];
        }
      }
      return vars;
    }
  }
  //endregion

  //region 跳转，webview相关
  var win={
    open:function(url){
      window.location.href(url);
    },
    openNew:function(url,key){
      if(url.indexOf("http")==-1){
        url=config.locallurl+url;
      }
      if(!key){
        key = new Date().getTime().toString();
      };
      if(url.indexOf("&v")!=-1||url.indexOf("?v")!=-1){
        window.gkee.createWebView(url,key);
        return;
      }
      url=url.indexOf("?")!=-1?(url+"&v="+version.v):(url+"?v="+version.v);
      window.gkee.createWebView(url,key);
    },
    openMenuNew:function (urls,key) {
      window.gkee.createMenuWebView(urls,key);
    },
    close:function(key){
      if(key){
        window.gkee.closeWebviewByKey(key);
      }else {
        window.gkee.closeWebView();
      }
    },
    closeWithData:function (data) {
      window.gkee.closeWebvViewWithData(data);
    },
    back:function () {
      window.history.go(-1);
    },
    loginOut:function (logoutUrl) {
      if(window.gkee){
        window.gkee.logout(logoutUrl);
      }
    }
  }
  //endregion

  //region验证的一些方法
  var validate = {
    isPhone:function (phone) { //验证手机（首位为1的11位数字）
      if(!(/^[1][0-9]{10}$/.test(phone))){
        box.waiting({
          title:'请输入正确的手机号',
        })
        return false;
      }
      return true;
    },
    checkJson:function(value){
      try{
        if(typeof value === 'object')
          return true;
      }catch(e){
        return false;
      }
    },
    mobile:function(value){
      var MobileReGexp = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
      if(MobileReGexp.test(value)){
        return true;
      }
      return false;
    }
  }
  //endregion

  //region dom操作
  var dom = {
    bodyUnScroll:function(){
      $('body').on('touchmove',function(event){
        event.preventDefault();
      });
      $('body').css({'overflow':'hidden'});
    },
    bodyScroll:function(){
      $("body").off("touchmove");
      $('body').css({'overflow':'auto'});
    },
    scrollToTop:function(){
      $('body').scrollTop(0);
    },
    hideMenu:function () {
      if(gkee){
        gkee.hideMenu();
      }
    },
    showMenu:function () {
      if(gkee){
        gkee.showMenu();
      }
    }
  };
  //endregion


  //region一些常规的规范化
  var standard ={
    returnFloat : function(value){ //金额保持2位小数
      var value=Math.round(parseFloat(value)*100)/100;
      var xsd=value.toString().split(".");
      if(xsd.length==1){
        value=value.toString()+".00";
        return value;
      }
      if(xsd.length>1){
        if(xsd[1].length<2){
          value=value.toString()+"0";
        }
        return value;
      }
    },
    formatTags:function(cate,tags,length){//标签数量大于length(默认为2)时取前两个标签
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
    }
  }
  //endregion

  //region 支付相关
  var pay =function (paydata,callback) {
    ajax({
      type:"post",
      async:true,
      headers: {
        Accept: "application/json;charset=utf-8",
        "Content-Type": "application/json",
      },
      url:url.format('/prepay'),
      data:JSON.stringify(paydata),
      success:function(data){
        var _data= JSON.stringify(data);
        gkee.weixinpay(_data,function(cc){
          if(cc>0){
            box.waiting({
              title: '支付失败了，不管了'
            });
          }else{
            setTimeout(function () {
              ajax({
                type: 'GET',
                url: url.format('/getPayStatus'),
                data:paydata,
                success: function (result) {
                  if(result>0){
                    //真正支付成功了
                    callback(paydata);
                  }
                }
              })
            },2000)

          }

        });
      }
    });
  }
  //endregion

  //region 直播相关
  var liveVideo= {
    sendMcc:function(name,shopId,guideId,notup){
      if(!config.isApp()){
        alert('去下载App');
        return;
      };
      if(config.getAppId() != 0 && config.isApp()){
        gkee.sendMcc(name, 1, shopId, guideId,function (data) {
          if (data) {
            notup(data);
          }
        });
      };
    },
    sendMccNoMoney:function(name,shopId,guideId,notup){
      if(!config.isApp()){
        alert('去下载App');
        return;
      };
      if(config.getAppId() != 0 && config.isApp()){
        gkee.sendMccNoMoney(name, shopId, guideId, function (data) {
          if (data == -2) {
            notup(data);
          }
        })
      };
    }
  };
  //endregion
  return {
    version:version,
    config: config,
    url: url,
    box:box,
    ajax:ajax,
    date:date,
    storage:storage,
    params:params,
    window:win,
    validate:validate,
    standard:standard,
    pay:pay,
    dom:dom,
    liveVideo:liveVideo
  }
})($);

if(!window.gkee){
  window.gkee = {};
}
window.g = gtr;


