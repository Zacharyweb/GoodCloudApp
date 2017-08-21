<template>
  <div id="shareguide2">
    <div class="container-fluid apply-container container-gray" style="top: 0;">
      <div class="apply-content container">
        <div class="logo-content"></div>
        <ul class="list-group">
          <li class="list-group-item apply-list">
            <div class="input-group">
              <div class="input-group-btn">
                <i class="icon iconfont icon-mendian input-img" style="color: #37BC9B"></i>
              </div>
              <div class="input-group">
                <input type="text" id="shopName" v-model="shopName" class="form-control no-border" placeholder="请填写您的门店名字" maxlength="15">
                <span class="input-group-btn input-btn-close" v-if="shopName?true:false" @click="clear">
                  <button class="btn" type="button">&times;</button>
                </span>
              </div>
            </div>
          </li>
          <li class="list-group-item apply-list">
            <div class="input-group">
              <div class="input-group-btn">
                <i class="icon iconfont icon-fenlei input-img" style="color: #37BC9B"></i>
              </div>
              <div class="ui-select">
                <div>{{selectCategroy| optionTxt(optionCategroy)}}</div>
                <select v-model='selectCategroy' class="form-control no-border" id="categroyId" >
                  <option v-for="option of optionCategroy" :value='option.val'>{{option.txt}}</option>
                </select>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="button-content container">
        <button type="button" class="btn btn-block btn-hei46 btn-green" :class="{disabled:!(shopName&&selectCategroy)}" :disabled="!(shopName&&selectCategroy)" id="submit" v-on:click="submitform">提交申请</button>
      </div>

    </div>
  </div>
</template>
<script>
  var obj={};
  export default {
    name: 'shareguide2',
    data() {
      return {
        shopName:'',
        selectCategroy:'',
        optionCategroy:[
          {val:'',txt:'选择主营类目'},
          {val:'1',txt:'类目1'},
          {val:'2',txt:'类目2'}
        ]
      }
    },
    methods: {
      submitform:function () {
        var _this = this;
        alert(_this.shopName+","+_this.selectCategroy);
        obj.shopName = _this.shopName;
        obj.categroyId = _this.selectCategroy;
        if(!obj.shopName || !obj.categroyId){
          g.box.waiting({
            title:"请填写完整的信息！"
          })
          return;
        }
        $.post(g.url.format("/login/registerShop"),obj,function(data){
          if(data.statusCode==0){
            window.location.hash ='/shareSuccess';
          }else{
            alert(data.errorMsg);
          }
        })
      },
      clear:function () {
        var _this = this;
        _this.shopName = "";
      }
    },
    beforeCreate:function () {
      obj = JSON.parse(localStorage.getItem("weixinuser"));
    },
  }


</script>
<style scoped>
  @import '../../assets/css/login.css';
</style>
