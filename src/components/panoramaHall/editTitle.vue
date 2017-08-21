<template>
  <div id="editTitle">
    <div class="shadow" @click="editCancel"></div>
    <div class="edit">
      <Topheader :Hdata="editModel.Hdata"></Topheader>
      <div class="edit-write">
        <input type="text" maxlength="15" placeholder="请输入标题，限制15字" class="no-border">
      </div>
      <div class="buttons">
        <button class="btn btn-gray-lighter btn-block btn-normal" @click="editCancel">取消</button>
      </div>
      <div class="buttons">
        <button class="btn btn-green btn-block btn-normal">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  export default {
    name: 'hallList',
    components:{
      Topheader
    },
    props: ['editModel'],
    data() {
      return {

      }
    },
    methods: {
      editCancel:function () {
        var _this =this;
        _this.editModel.editContent = false;
      }
    },
    mounted: function () {

    }
  }
</script>
<style>

  nav{ background: #fff;}
</style>
