/**
 * Created by Spring on 2017/5/16.
 */
var pano = (function (embedpano) {
  var kr = null;
  var setting = {};
  //region 初始化
  var init = function (params) {
    var defaults = {
      xmlpath: "",
      target: "pano",
      onAddHot: function (name, atv, ath) {
        console.log("添加了--,name:" + name + ",atv:" + atv + ",ath:" + ath);
      },
      onHotClick: function (name) {
        console.log("点击了" + name);
      },
      onHotDelete: function (name) {
        console.log("删除了" + name);
      },
      onHotMoveEnd: function (name, atv, ath) {
        console.log("移动了" + name);
      },
      onVrExit:function(){
        console.log("我退出了VR");
      },
      normalIcon: "http://image.yetong.org/panos/config/plugins/chuosini.png",
      focusIcon: "http://image.yetong.org/panos/config/plugins/chuosini.png",
      closeIcon: "http://image.yetong.org/panos/config/close.png",
      editmod: true
    }
    setting = Object.assign({}, defaults, params);
    // setTimeout(function () {
      embedpano({
        xml: setting.xmlpath,
        target: setting.target,
        html5: "only",
        mobilescale: 1.0,
        passQueryParameters: true
      });
      kr = document.getElementById("krpanoSWFObject");
    // }, 200);
     kr.call("startup");
  }
  //endregion

  //region 操作方法
  var hotsnot = {
    unfocus: function () {
      var arr = kr.get("hotspot").getArray();
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item.name.indexOf("_close") != -1) {
          this.del(item.name);
          var realEleName = item.name.replace("_close", "");
          var realEle = kr.get("hotspot[" + realEleName + "]");
          this.del(realEleName);
          hotsnot.add(realEleName, null, null, null, realEle.atv, realEle.ath,true)
        }
      }
    },
    addClose: function (name, url, width, height, atv, ath) {
      width = width ? width : 20;
      height = height ? height : 20;
      url = url ? url : setting.closeIcon;
      kr.call("addHot(" + name + "_close," + ath + "," + atv + "," + url + "," + width + "," + height + ",false)");
    },
    add: function (name, url, width, height, atv, ath,state) {
      //hotsnot.del(name+"_close");
      width = width ? width : 50;
      height = height ? height : 50;
      if(!state){
        state=false;
      }
      if(!url){
        url=setting.normalIcon;
        kr.call("addHot(" + name + "," + ath + "," + atv + "," + url + "," + width + "," + height + ","+state+")");
      }else{
        kr.call("addHot(" + name + "," + ath + "," + atv + "," + url + "," + width + "," + height + ","+state+")");
      }

    },
    del: function (name) {
      if (!setting.editmod)return;
      kr.call("delHot(" + name + ")");
    },
    click: function (name) {
      if (!setting.editmod) {
        setting.onHotClick(name);
        return;
      }
      if (name.indexOf("_close") != -1) {
        hotsnot.del(name);
        hotsnot.del(name.replace("_close", ""));
        setTimeout(function () {
          setting.onHotDelete(name.replace("_close", ""));
        }, 300)
      } else {
        if (kr.get("hotspot[" + name + "_close]") == null) {
          hotsnot.unfocus();
          var current = kr.get("hotspot[" + name + "]");
          var ath = current.ath;
          var atv = current.atv;
          hotsnot.add(name, setting.focusIcon, 50, 50, atv, ath);
          hotsnot.addClose(name, setting.closeIcon, 20, 20, atv - 7, ath - 7);
        }
        if (setting.onHotClick) {
          setting.onHotClick(name);
        }
      }
    },
    pos: function (name, ath, atv) {
      if (!setting.editmod)return;
      setTimeout(function(){
        if (name.indexOf("_close") != -1) {
          //hotsnot.add(name.replace("_close", ""), setting.focusIcon, 50, 50, parseFloat(atv) + 5, parseFloat(ath) + 3);
        } else {
          hotsnot.unfocus();
          var current = kr.get("hotspot[" + name + "_close]");
          hotsnot.add(name, setting.focusIcon, 50, 50, atv, ath)
          hotsnot.addClose(name, setting.closeIcon, 20, 20, atv - 7, ath - 4)
        }
        setting.onHotMoveEnd(name.replace("_close", ""), atv, ath);
      },200)

    },
    getCurrent: function () {
      if (!setting.editmod)return;
      var arr = kr.get("hotspot").getArray();
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item.name.indexOf("_close") != -1) {
          var realEleName = item.name.replace("_close", "");
          var realEle = kr.get("hotspot[" + realEleName + "]");
          return {
            name: realEleName,
            atv: realEle.atv,
            ath: realEle.ath
          }
        }
      }
    }
  };
  var vr = {
    enter: function () {
      kr.call("webvr.enterVR()");
    },
    enterGyro:function(){
      kr.call("entergyro");
    },
    exitGyro:function(){
      kr.call("exitgyro");
    },
    exitVR : function () {
      setting.onVrExit();
    }
  }
  //endregion

  return {
    init: init,
    change: function (xmlpath) {
      kr.call("loadpano(" + xmlpath + ", null, MERGE, BLEND(1));");
      kr.call("startup");
    },
    getVR: function () {
      return kr;
    },
    enterVR: vr.enter,
    exitVR:vr.exitVR,
    enterGyro: vr.enterGyro,
    exitGyro: vr.exitGyro,
    addHot: function (name, url, width, height, atv, ath) {
      if (!setting.editmod)return;
      hotsnot.del(name);
      atv = atv ? atv : kr.get("view.vlookat");
      ath = ath ? ath : kr.get("view.hlookat");
      hotsnot.unfocus();
      hotsnot.add(name, url, width, height, atv, ath,true);
      setting.onAddHot(name, atv, ath);
      setTimeout(function(pname){
        hotsnot.click(pname);
      },200,name)
    },
    delHot: hotsnot.del,
    hotClick: hotsnot.click,
    pos: hotsnot.pos,
    getCurrent: hotsnot.getCurrent
  }
})(window.embedpano)
window.pano = pano;
