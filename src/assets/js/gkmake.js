var gkAndroid ={
  baseUrl:"http://1.1.1.12:8080/izanamishowtime",

  imgShowUrl:"http://files.yetong.org/"
  //关闭录音
  ,closeAudio:function(){
    audio.stopMedia();
  }
  //打开录音
  ,openAudio:function(fileId){
    var file= document.getElementById(fileId);
    file.accept="audio/*";
    file.capture=true;
    file.click();
  }
  //打开相机
  ,openCamera:function(fileId){
    var file= document.getElementById(fileId);
    file.accept="image/jpeg";
    file.capture=true;
    file.click();
  }
  //打开相册
  ,openPhoto:function(fileId){
    var file= document.getElementById(fileId);
    file.accept="image/jpeg,image/x-ms-bmp,image/x-png;";
    file.capture=null;
    file.removeAttribute("capture");
    file.click();
  }
  //微信登入
  ,weiXinLogin :function(){
    gkee.weixinLog();
    var str = gkee.getwxstr();
    return str;
  }
  //获取联系人
  ,getContacts:function(){
    var ccc=gkee.getContacts();
    //alert(ccc[0].name)
    return ccc;
  }
  //打开日历
  ,getCalendar:function(callback){
    gkee.getCalendar();
    this.calendarBack =callback;
  }
  ,calendarCallback:function(year,month,day){
    if(this.calendarBack){
      alert(year+"-"+month+"-"+day);
      this.calendarBack(year,month,day);
    }
  }
  //用原生打开新页面
  ,createWebView:function(url,viewkey){
    gkee.createWebView(url,viewkey);
  }
  //关闭当前新页面
  ,closeWebView:function(){
    gkee.closeWebView();
  }
  //关闭页面且回传值
  ,closeWebvViewWithData:function(data){
    gkee.closeWebvViewWithData(data);
  }
  //关闭指定页面
  ,closeWebViewByKey :function(viewkey){
    gkee.closeWebViewByKey(viewkey);
  }
  //登入
  ,login:function(token,url){
    gkee.login(token,url);
  }
  //退出
  ,logout:function(url){
    gkee.logout(url);
  }
  //微信分享
  ,weixinShare:function(flag,url,title,description,iconUrl){
    gkee.weixinShare(flag,url,title,description,iconUrl);
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
    gkee.weixinShareForPic(title,imgstr);
  }
  /**
   * 获取文件
   */
  ,getDirectoryFile:function(path){
    return gkee.getDirectoryFile(path)
  }

  /**
   * 设置缓存
   */
  ,addLocalStorage:function(key,value){
    gkee.addLocalStorage(key,value);
  }
  /**
   * 获取缓存
   */
  ,getLocalStorage:function(key){
    return gkee.getLocalStorage(key);
  }
  /**
   * 删除缓存
   */
  ,dleLocalStorage:function(key){
    gkee.dleLocalStorage(key);
  }
  ,calendarBack:null,
  /**
   * 异常弹层
   * 调用方式事例
   gkAndroid.MsgBox.open({
  type:"Confirm",
  title:"标题",
  errorMess:"错误信息报错",
  submitCallBack:function () {
    alert("同意操作");
  },
  closeCallBack:function () {
    alert("拒绝操作")
  },
  closeDiv:function () {
    alert("关闭操作")
  }
});
   gkAndroid.MsgBox.Toast({
          type:"Toast",
          title:"我试试的弹出信息"
        })
   */
  MsgBox:{
    Toast:function (options) {
      var that = this;
      this.opt=options;
      $("body").append('<div id="MsgBox" class="MsgBox-toast">'+this.opt.title+'</div>');
      if(!this.opt.wait){
        setTimeout(function(){
          $("#MsgBox").fadeOut("slow","swing",function () {
            $("#MsgBox").remove();
            if(!that.opt.closeDiv){
              return false;
            }
            that.opt.closeDiv();
          });
        },1000);
      }
    },
    open:function (options) {
      this.opt=options;
      this.MsgBoxHtml();
      var that = this;
      $("#MsgBox").find(".close").on("click",function () {
        that.closeDiv();
      });
      $("#MsgBox").find(".btnOk").on("click",function () {
        that.submitCallBack();
      });
      $("#MsgBox").find(".btnNo").on("click",function () {
        that.closeCallBack();
      });
    },
    MsgBoxHtml:function () {
      var _foothtml='';
      switch (this.opt.type){
        case "Alert":
          _foothtml='<div class="MsgBoxbtn btnOk">好</div>';
          break;
        case "Confirm":
          _foothtml = '<div class="MsgBoxbtn btnOk">同意</div>';
          _foothtml += '<div class="MsgBoxbtn btnNo">拒绝</div>';
          break;
        default:
          _foothtml='<div class="MsgBoxbtn btnOk">好</div>';
          break;
      }
      var _html = "";
      _html += '<div id="MsgBox">';
      _html += '  <div class="MsgBox-mask"></div>';
      _html += '  <div class="MsgBox-content">';
      _html += '    <div class="title">'+this.opt.title+'';
      _html += '      <button type="button" class="close"><span>&times;</span></button>';
      _html += '    </div>';
      _html += '    <div class="text">'+this.opt.errorMess+'</div>';
      _html += '    <div class="foot">';
      _html +=_foothtml;
      _html += '    </div>';
      _html += '  </div>';
      _html += '</div>';
      $("body").append(_html);
    },
    submitCallBack:function () {
      $("#MsgBox").remove();
      this.opt.submitCallBack();
    },
    closeCallBack:function () {
      $("#MsgBox").remove();
      if(!this.opt.closeCallBack){
        return false;
      }
      this.opt.closeCallBack();
    },
    closeDiv:function () {
      $("#MsgBox").remove();
      if(!this.opt.closeDiv){
        return false;
      }
      this.opt.closeDiv();
    }
  },
  config:{
    imgShowUrl:"http://files.yetong.org/",
    bucket : 'keegz',
    appid : 1252902336,
    sid : "AKIDjLlz1rxvCIG2hBubWSGuMchfV8Zoo8Y4",
    skey : "UnuoZCfw3yTr35vZ0FIE78CD2f5MSp6C",
    region : 'gz',
    myFolder : '/web/',
  },
  dataURLtoFile:function (dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while(n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  },

}
export default gkAndroid
