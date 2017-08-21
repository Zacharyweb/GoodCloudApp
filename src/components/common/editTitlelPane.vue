<template>
    <div class="edit-title-pane">
      <div class="input-bar">
        <span class="iconfont icon-houtui" @click="close"></span>
     <!--    <input type="text" placeholder="请输入标题,限制15字" maxlength="15" v-model="inputVal"> -->
        <h4>输入标题</h4>
        <span class="submit-text" @click="submit">确定</span>
      </div>
      <div class="textarea-wrapper">
          <textarea  maxlength="140" v-model="inputVal" @input="textInput"></textarea>
          <p class="count-text">最多还可输入<span :class="{'font-green':remainLength < 15}">{{remainLength}}</span>字</p>
      </div>
    </div>
</template>
<script>
  export default {
    data:function(){
        return {
          inputVal:'',
          remainLength:140
        }
    },
    props: ['editTitlePaneData'],
    methods:{
         textInput:function(){
           this.remainLength = 140 - this.inputVal.length;
         },
         submit:function(){
           if(!this.inputVal){
            g.box.waiting({'title':'标题不能为空'});
            return;
           }
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
      this.remainLength = 140 - this.inputVal.length;
    }
  }
</script>
<style scoped>
.edit-title-pane{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1005;
  background-color: #fff;
  padding: 10px;
}
.edit-title-pane .input-bar{
  padding-bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.edit-title-pane .input-bar .iconfont{
  color: #37bc9b;
  font-size: 18px;
  padding-left: 5px;
  margin-right: 15px;
}
.edit-title-pane .input-bar h4{
  font-size: 18px;
  color:#383838;
  margin:0;
}

.edit-title-pane .textarea-wrapper{
  position: relative;
  padding-right: 2%;
  padding-left: 2%;
}
.edit-title-pane .textarea-wrapper textarea{
  box-sizing: border-box;
  width: 100%;
  height: 175px;
  border: none;
  outline: none;
  background-color: #ededed;
  border-radius: 13px;
  padding: 15px;
  resize:none;
}
.edit-title-pane .textarea-wrapper .count-text{
  position: absolute;
  font-size: 14px;
  color: #ccc;
  right: 18px;
  bottom: 12px;
  margin:0;
}
.edit-title-pane .textarea-wrapper .count-text span.font-green{
  color: #37bc9b;
}
.edit-title-pane .input-bar .submit-text{
  color: #37bc9b;
  font-size: 14px;
  margin-left: 10px;
}
</style>