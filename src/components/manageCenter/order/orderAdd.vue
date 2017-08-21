<template>
  <div id="orderAdd">
    <Topheader :Hdata="Hdata"></Topheader>
    <div class="orderDetail-container container-gray">
      <div class="information">
        <ul>
          <li class="width100">
            <div class="information-title text-middle">微信昵称</div>
            <div class="information-content">
              <span>{{information.nickName}}</span>
              <img :src="information.img">
            </div>
            <div class="clearfix"></div>
          </li>
          <li class="width50">
            <div class="information-title">姓名</div>
            <div class="information-content">{{information.name}}</div>
            <div class="clearfix"></div>
          </li>
          <li class="width50">
            <div class="information-title">手机号</div>
            <div class="information-content">{{information.tel}}</div>
            <div class="clearfix"></div>
          </li>
          <li class="width100">
            <div class="information-content">
              <textarea class="no-border text-left" placeholder="点击输入备注" v-model="addOrderByShop.remark" @click="inputClick('备注',$event)"></textarea>
            </div>
          </li>
          <li class="width100">
            <div class="information-title">订单金额</div>
            <div class="information-content" @click="inputClick('金额',$event)" >
              <input-item placeholder="输入订单金额" classname="no-border text-right" type="text" readonly v-model="cash" inputstyle="padding-right: 5px;"></input-item>
            </div>
            <div class="clearfix"></div>
          </li>
          <li class="width100">
            <label class="radio"><input type="radio" v-model="addOrderByShop.join" value="1"><i></i>参加联单活动<span class="icon iconfont icon-tishi"></span></label>
            <label class="radio"><input type="radio" v-model="addOrderByShop.join" value="0"><i></i>普通订单<span class="icon iconfont icon-tishi"></span></label>
          </li>
          <div class="clearfix"></div>
        </ul>
      </div>
      <div class="cost-buts">
        <button class="cost-btn btn btn-white btn-normal noradius">缓缓再说</button>
        <button class="cost-btn btn btn-green btn-normal noradius" @click="submitForm">新增订单</button>
      </div>
    </div>
    <keyboard :key-model="keyboard"></keyboard>
  </div>
</template>
<script>
  import Topheader from '../../common/headerNew'
  import keyboard from '../../common/keyboard'
  let sysdata={};
  export default {
    name: 'orderAdd',
    components:{
      Topheader,
      keyboard
    },
    data() {
      return {
        Hdata:{
          title:'新增订单',
          backhtml:'<i class="icon iconfont icon-wrong"></i>',
        },
        keyboard:{
          keyboardData:'',
          show:false
        },
        information:{},
        cash:'11',
        addOrderByShop:{
          join:'1',
          remark:'',
          accountExtendId:''
        },
        keyname:{
          name:'',
          event:$()
        }
      }
    },
    methods: {
      submitForm:function () {
        var _this = this;
        _this.addOrderByShop.accountExtendId = _this.information.accountExtendId;
        _this.addOrderByShop.cash = _this.cash.inputmodel;
        g.ajax({
          type: 'POST',
          url: g.url.format('/order/addOrderByShop'),
          data:_this.addOrderByShop,
          success: function (result) {
            if(result.statusCode==0){
              g.storage.del('sysdata');
              g.window.openNew(g.url.urlHref("/orderlist"),"orderlist");
              g.window.close();
            }else{
              alert(result.errorMsg);
            }
          }
        });
      },
      inputClick:function (field,event) {
          var _this = this;
          _this.keyname = {name:field,event:event};
          if(_this.keyboard.show) return;
          _this.keyboard.show = true;
      },
      setInputNum:function () {
        var _this = this;
        var keynum = _this.keyboard.keyboardData;
        /*var e = _this.keyname.event;
        var position = _this.getTxt1CursorPosition(e.target);*/
        switch (_this.keyname.name){
          case '金额':
              /*if(position){
                _this.cash.inputmodel = _this.insertFlg(_this.cash.inputmodel,keynum,position);
              }else{
                _this.cash.inputmodel +=keynum;
              }*/
            _this.cash +=keynum;
            break;
          case '备注':
            _this.addOrderByShop.remark += keynum;
            break;
        }
      },
      getTxt1CursorPosition:function(event){
        var $input = event;
        var cursurPosition=0;
        if($input.selectionStart){//非IE
          cursurPosition= $input.selectionStart;
        }else{//IE
          try{
            var range = document.selection.createRange();
            range.moveStart("character",-$input.value.length);
            cursurPosition=range.text.length;
          }catch(e){
            cursurPosition = 0;
          }
        }
        return cursurPosition;
      },
      insertFlg : function(str,flg,sn){
        var newstr="";
        for(var i=0,j=0;i<str.length;i+=sn,j++){
          var tmp=str.substring(i, i+sn);
          if(j==0){
            newstr+=tmp+flg;
          }else{
            newstr+=tmp;
          }
        }
        return newstr;
      }
    },
    mounted: function () {
      var _this = this;
      _this.$on("ok",function (a) {
        _this.keyboard.keyboardData = a;
        _this.setInputNum();
      })
      sysdata = JSON.parse(g.storage.get("sysdata"));
      _this.information = sysdata;
    },
    watch:{
      /*keyboard:{
        handler:function(keyboard){
            if(keyboard.keyboardData){
              this.setInputNum();
            }
            if(!keyboard.show){
              this.keyboard.keyboardData = '';
            }
        },
        deep:true
      },*/
      /*cash:{
        handler:function(cash){
            if(!cash.inputmodel){
              this.keyboard.keyboardData = '';
            }
        },
        deep:true
      },*/
      /*keyname:{
        handler:function(keyname){
          this.keyboard.keyboardData = '';
        },
        deep:true
      }*/
    }
  }
</script>
<style scoped>
  @import '../../../assets/css/order/detail.css';
  .cost-buts{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
  }
  .cost-buts .cost-btn{
    float: left;
    width: 50%;
    height: 100%;
  }
</style>
