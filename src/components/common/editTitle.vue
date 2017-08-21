<template>
  <div class="editTitle" v-if="editData.ifShow">
    <div class="edit-content">
      <div class="button back" @click="close"><i class="icon iconfont icon-houtui-copy"></i></div>
      <div class="input">
        <input-item :placeholder="placeholder" classname="form-control no-border" type="text" :maxlength="maxlength" v-model="editData.editText" focus></input-item>
      </div>
      <div class="button ensure" @click="submit">确定</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'editTitle',
    props: ['editData'],
    data() {
      return {
       /* maxlength: this.editData.maxlength ? this.editData.maxlength :15,
        placeholder: this.editData.maxlength ? '请输入内容，限制'+this.editData.maxlength+'字' : '请输入内容，限制15字'*/
        maxlength:15,
        placeholder:'请输入内容，限制15字'
      }
    },
    methods:{
      close:function () {
          this.editData.ifShow = false;
      },
      submit:function () {
        var _this = this;
        if(_this.editData.require){
          if(!_this.editData.editText){
            g.box.waiting({
              title:'请输入信息！'
            });
            return ;
          }
        }
        var params = {type:_this.editData.editType,value:_this.editData.editText};
        _this.$parent.editTitle(params,function () {
          _this.close();
        });
      }
    },
   /* mounted:function () {
        g.dom.bodyUnScroll();
    },
    destroyed:function () {
      g.dom.bodyScroll();
    },*/
    watch:{
      editData:{
        handler: function (val, oldVal) {
            if(val.maxlength){
                this.maxlength = val.maxlength;
                this.placeholder = '请输入内容，限制'+this.editData.maxlength+'字';
            }else{
                this.maxlength=15;
                this.placeholder='请输入内容，限制15字';
            }
        },
        deep: true
      }
    }

  }
</script>
<style>
  .editTitle{ position: absolute; top:0px;bottom: 0; left: 0; right: 0;background: #fff;}
  .editTitle .edit-content{ padding: 16px 0; display: flex;}
  .editTitle .edit-content .button{ width: 48px; height: 32px; line-height: 32px; text-align: center; color: #37BC9B;}
  .editTitle .edit-content .back .iconfont{ font-size: 18px!important;}
  .editTitle .edit-content .ensure{ font-size: 14px;}
  .editTitle .edit-content .input{ flex: 1;width: 48px; height: 32px; line-height: 32px;    border-radius: 16px;  background: #EDEDED;  padding: 0 15px; }
  .editTitle .edit-content .input input{ width: 100%; height: 32px; border-radius: 16px; background: #EDEDED; padding: 0 15px;}
  .editTitle .edit-content .input input::-webkit-input-placeholder { color:#ccc;}
  .editTitle .edit-content .input input:-moz-placeholder {color:#ccc;}
  .editTitle .edit-content .input input::-moz-placeholder {color:#ccc;}
  .editTitle .edit-content .input input:-ms-input-placeholder {color:#ccc; }
</style>
