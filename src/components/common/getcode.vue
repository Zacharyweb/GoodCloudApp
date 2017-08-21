<template>
    <button type="button" id="getcode" @click="getcode" class="btn btn-green-o btn-smaller btn-radius" :class="{disabled:!Codedata.tel||getcodeing}" :disabled="!Codedata.tel||getcodeing">{{getcodeing?getcodeingtime:'获取验证码'}}</button>
</template>
<script>
  export default {
    name: 'getcode',
    data() {
      return {
        getcodeing:false,
        getcodeingtime:60
      }
    },
    props: [
      'Codedata',
    ],
    methods: {
      time:function () {
        var _this = this;
        _this.getcodeing = true;
        var timer = setInterval(function () {
          _this.getcodeingtime -= 1;
          if(_this.getcodeingtime==0){
            _this.getcodeing = false;
            _this.getcodeingtime = 60;
            clearInterval(timer);
          }
        },1000)
      },
      getcode:function () {
        var _this = this;
        this.$parent.$options.methods.getcode(_this.$parent,_this.time);
      }
    }
  }
</script>
