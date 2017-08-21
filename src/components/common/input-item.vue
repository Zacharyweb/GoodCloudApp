<template>
  <div class="input-group" id="inputgroup">
    <input  :type="type" v-if="focus" v-focus :placeholder="placeholder" :class="classname" :value="currentValue" :readonly="readonly" :style="inputstyle" :maxlength="maxlength" @input="handleInput"/>
    <input  :type="type" v-else :placeholder="placeholder" :class="classname" :value="currentValue" :readonly="readonly" :style="inputstyle" :maxlength="maxlength" @input="handleInput"/>
    <span class="input-group-btn input-btn-close" v-if="currentValue?true:false" @click="clear">
      <button class="btn" type="button">&times;</button>
    </span>
  </div>
</template>
<script>
  /**
   * 带清除功能的输入框
   * */
  export default {
    name: 'inputgroup',
    props:{
      type: {
        type: String,
        default: 'text'
      },
      value:{},
      placeholder: String,
      readonly: Boolean,
      focus: Boolean,
      classname:{},
      inputstyle:{},
      maxlength:{}
    },
    data() {
      return {
        currentValue: this.value
      };
    },
    methods:{
      clear:function () {
        this.currentValue ='';
      },
      handleInput(evt) {
        this.currentValue = evt.target.value;
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val);
      },
    }
  }
</script>
<style scoped>
  /*输入框里的跟上的 X，默认click清空输入框*/
  .input-group{
    width: 100%;
    position: relative;
    display: table;
    border-collapse: separate;
  }
  .input-item .input-btn-close{
    position: absolute;
    right: 16px;
    top:50%;
    transform: translateY(-50%);
    z-index: 3;
  }
  .input-btn-close button{
    padding: 0px;
    border-radius: 50%!important;
    width: 13px;
    height: 13px;
    line-height: 12px;
    font-size: 13px;
    color: #fff;
    background: #ccc;
    margin-left: 0px!important;
  }
</style>
