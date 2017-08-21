<template>
    <div class="edit-photo-title-pane">
      <div class="input-bar">
        <span class="iconfont icon-houtui" @click="close"></span>
        <input type="text" placeholder="请输入描述,限制15字" maxlength="15" v-model="inputVal">
        <span class="submit-text" @click="submit">确定</span>
      </div>
    </div>
</template>
<script>
  export default {
    data:function(){
        return {
          inputVal:'',
        }
    },
    props: ['editTitlePaneData'],
    methods:{
         submit:function(){
           this.$emit('submit',this.inputVal);
           this.close();
         },
         close:function(){
           this.inputVal = '';
           this.$emit('close');
         }
    },
    mounted:function(){
      this.inputVal = this.editTitlePaneData.nowTitle;   
    }
  }
</script>
<style scoped>
.edit-photo-title-pane{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1005;
  background-color: #fff;
  padding: 10px;
}
.edit-photo-title-pane .input-bar{
  padding-bottom: 28px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.edit-photo-title-pane .input-bar .iconfont{
  color: #37bc9b;
  font-size: 18px;
  padding-left: 5px;
  margin-right: 15px;
}
.edit-photo-title-pane .input-bar input{
  flex:1;
  border: none;
  background-color: #ededed;
  height: 32px;
  font-size: 14px;
  color: #333;
  padding:0 15px;
  line-height: 32px;
  border-radius: 16px;
}
.edit-photo-title-pane .input-bar .submit-text{
  color: #37bc9b;
  font-size: 14px;
  margin-left: 10px;
}

</style>