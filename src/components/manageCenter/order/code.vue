<template>
  <div id="code">
    <div v-if="!success" class="container">
      <form class="form-inline">
        <div class="form-group">
          <label>姓名</label>
          <input type="text" class="form-control" v-model="username">
        </div>
        <div class="form-group">
          <label>手机号</label>
          <input type="text" class="form-control" v-model="userphone">
        </div>
      </form>
      <button type="submit" class="btn btn-block btn-green" @click="submit">参加连单联购</button>
    </div>
    <div v-if="success" class="container">
      <div class="code-img"> <img :src="img?img:'../../../static/pic.png'">{{username}}</div>
      <p>姓名：{{username}}</p>
      <p>电话：{{userphone}}</p>
      <div class="code-img"><img :src="img?img:'../../../static/pic.png'"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'code',
    data() {
      return {
        username:'',
        userphone:'',
        img:'',
        codeimg:'',
        success:false,
      }
    },
    methods: {
      submit:function () {
        var _this = this;
        if(!_this.username){
          g.box.alert({
            title:'提示',
            errorMess:'姓名为空'
          });
          return;
        }
        if(!_this.userphone){
          g.box.alert({
            title:'提示',
            errorMess:'这手机号为空'
          });
          return;
        }
        alert("这里检查手机号");
        _this.success = !_this.success;
      }
    },

  }
</script>
<style scoped>
  .code-img img{ width: 200px; height: 200px;}
</style>
