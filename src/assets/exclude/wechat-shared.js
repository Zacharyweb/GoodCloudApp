var shared = (function ($, config,urlFunc) {
  var utils = {
    createID: function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    createGUID: function () {
      return this.createID() + this.createID() + this.createID() + this.createID() + this.createID() + this.createID() + this.createID() + this.createID();
    },
    processUrl: function (url, newId) {
      url = url.replace(/(sharedId=[\w\d_-]+)/, "").replace(/(sharedid=[\w\d_-]+)/, "");
      if (url.indexOf("?") != -1) {
        url = url + "&sharedId=" + newId;
      } else {
        url = url + "?sharedId=" + newId;
      }
      return url;
    },

  }
  //region 初始化分享
  var config = function (title, img, templink, desc,pageType, shopId,sharedType) {
    var newId = utils.createGUID();

    var data= {
      newId: newId,
      oldId: "appshared_"+g.config.getAppId(),
      sharedShopId:shopId,//分享店铺,店铺详情时使用
      pageType:pageType,//页面类型
      pageTitle: title,
      pageDesc: desc,
      pageImg: img,
      pageLink: utils.processUrl(templink,newId)
    };
    $.ajax({
      type: "post",
      url:urlFunc.format("/api/shared/create"),
      headers: {'token':  g.storage.getToken()},
      data: data,
      dataType: "json",
      success: function (result) {
        //保存分享链接 成功
      },
      error: function () {
        alert("保存分享信息失败")
      }
    });
    sharedType=sharedType?sharedType:0;
    gkee.weixinShare(sharedType,data.pageLink,data.pageTitle,data.pageDesc,data.pageImg);
  }
  //endregion

  //region 对外公开接口
  return {
    config: config
  }
  //endregion

})($,g.config,g.url)
window.shared=shared;
//分享类型说明
//页面类型 (1:下载页面 2:店铺详情 3 知识库详情页面 4店铺列表 5:全景详情 6：视频详情)
// shared.config("哇咔咔", "https://open.weixin.qq.com/cgi-bin/openproxy?url=http%3A%2F%2Fwx.qlogo.cn%2Fmmhead%2FQ3auHgzwzM7ic5IpZKm3kX3LibBtvPUXva7pkMg2iaP6SIPxcic801sm3Q%2F0", "http://www.baidu.com?sharedId=11223sasasa_aaa", "测试描述",1, 0);
