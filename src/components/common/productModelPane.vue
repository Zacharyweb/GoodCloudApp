<template>
    <div class="product-model-pane">
      <div class="input-bar">
        <span class="iconfont icon-houtui" @click="close"></span>
        <input type="text" placeholder="请输入商品型号,限制15字" maxlength="15" v-model="productModel">
        <span class="submit-text" @click="submit">确定</span>
      </div>
      <p class="history-model-text" v-if="showHistory">历史商品型号</p>
      <div class="history-models" v-if="showHistory">
        <ul class="history-models-list">
            <li v-for="(model,index) in historyModelList"  @click="clickHistrotModel(index)">{{model.name}}</li>
        </ul>
      </div>
    </div>
</template>
<script>
  export default {
    data:function(){
        return {
          productModel:'',
          initialMoldel:'',
          historyModelList:[],
          selectedHistoryModel:-1,
          showHistory:true
        }
    },
    props: ['productModelPaneData'],
    methods:{
         clickHistrotModel:function(index){
          this.productModel = this.historyModelList[index].name;
         },
         getHistoryModel:function(){
            var _this = this;
            g.ajax({
              type: 'GET',
              url: g.url.format('/video/getModels'),
              data:{},
              success: function (result) {
                 // console.log(result);
                 if(result.length == 0){
                   _this.showHistory = false;
                 }else{
                   _this.historyModelList = result.data;
                 }; 
              }
            }); 
         },
         submit:function(){
          if(this.productModel == ''){
            g.box.waiting({'title':'型号不能为空'});
            return;
          } 
          this.$emit('submit',this.productModel);
          
         },
         close:function(){
            this.productModel = this.initialMoldel;
            if(this.productModel){
                this.$emit('submit',this.productModel);
            }else{
                this.$emit('close');
            }
         }
    },
    mounted:function(){
      this.productModel = this.productModelPaneData.nowModel || '';
      this.initialMoldel = this.productModelPaneData.nowModel || '';
      if(this.productModel === true){
        this.productModel = '';
        this.initialMoldel = '';
      };
      this.getHistoryModel();
    }
  }
</script>
<style scoped>
.product-model-pane{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1005;
  background-color: #fff;
  padding: 10px;
}
.product-model-pane .input-bar{
  padding-bottom: 28px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.product-model-pane .input-bar .iconfont{
  color: #37bc9b;
  font-size: 18px;
  padding-left: 5px;
  margin-right: 15px;
}
.product-model-pane .input-bar input{
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
.product-model-pane .input-bar .submit-text{
  color: #37bc9b;
  font-size: 14px;
  margin-left: 10px;
}
.product-model-pane .history-model-text{
   line-height: 1;
   padding-left: 5px;
   padding-bottom: 5px;
   font-size: 12px;
   color: #ccc;
   margin-bottom: 0;
}
.product-model-pane .history-models{
  padding-left: 10px;
}
.product-model-pane .history-models ul{
  display: flex;
  flex-wrap: wrap;
}
.product-model-pane .history-models ul li{
  min-width: 29.56%;
  box-sizing: border-box;
  padding: 0 14px;
  text-align: center;
  font-size: 14px;
  color: #4d4d4d;
  line-height: 30px; 
  border:1px solid #ccc;
  border-radius: 3px;
  margin-right: 12px; 
  margin-top: 10px;
}
.product-model-pane .history-models ul li.active{
  color: #37bc9b;
  border-color: #37bc9b;
}
</style>