<template>
  <div id="keyboard" :class="{active:keyModel.show}">
    <ul class="keyboard"><li @click="num('1')">1</li><li @click="num('2')">2</li><li @click="num('3')">3</li></ul>
    <ul class="keyboard"><li @click="num('4')">4</li><li @click="num('5')">5</li><li @click="num('6')">6</li></ul>
    <ul class="keyboard"><li @click="num('7')">7</li><li @click="num('8')">8</li><li @click="num('9')">9</li></ul>
    <ul class="keyboard"><li @click="num('.')">.</li><li @click="num('0')">0</li><li class="affirm" @click="affirm">确定</li></ul>
  </div>
</template>
<script>
  export default {
    name: 'keyboard',
    props:['keyModel'],
    data() {
      return {

      }
    },
    methods: {
      num:function (numb) {
        var _this = this;
//        _this.$options.propsData.keyModel.keyboardData = numb;
        this.$parent.$emit("ok",numb);

      },
      affirm:function () {
        var _this = this;
        _this.$options.propsData.keyModel.show = false;
      }
    },
    mounted: function () {

    }
  }
</script>
<style scoped>
  #keyboard{ position: fixed; bottom: -100%; left: 0; right: 0; z-index: 999;border-top: 1px #CCCCCC solid;
    webkit-box-shadow: -4px -4px 3px -3px rgba(0, 0, 0, .1);
    -moz-box-shadow: -4px -4px 3px -3px rgba(0, 0, 0, .1);
    box-shadow: -4px -4px 3px -3px rgba(0, 0, 0, .1);
    -webkit-transition:all .5s;
    -moz-transition:all .5s;
    -o-transition:all .5s;
  }
  #keyboard.active{
    bottom: 0;
  }
  .keyboard{ display: flex;}
  .keyboard li{ float: left; text-align: center; width: 33.3%;height: 75px; line-height: 75px; background: #fff;
                border-right: 1px #CCCCCC solid; border-bottom:1px #CCCCCC solid; font-size:36px; }
  .keyboard li:nth-child(n+3){ border-right: 0; flex: 1;}
  .affirm{ background: #37BC9B!important; color: #fff; font-size: 20px!important;}
</style>
