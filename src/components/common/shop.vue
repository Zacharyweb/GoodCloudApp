<template>
  <div id="shop">
    <Topheader :Hdata="shopTime.Hdata"></Topheader>
    <div class="apply-container container-gray">
      <div class="apply-content container">
        <div class="logo-content"></div>
        <ul class="list-group" style="margin-bottom: 0;">
          <li class="list-group-item apply-list">
            <div class="input-group">
              <div class="input-group-btn">
                <i class="icon iconfont icon-mendian input-img" style="color: #37BC9B"></i>
              </div>
              <div class="input-group">
                <input-item placeholder="请填写您的门店名字" classname="form-control no-border" type="text" id="shopName" maxlength="15" v-model="shopName" ></input-item>
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
                  <option v-for="option of optionCategroy" :value='option.id'>{{option.name}}</option>
                </select>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="button-content container">
        <button type="button" class="btn btn-normal btn-block btn-hei46 btn-green" :class="{disabled:!(shopName&&selectCategroy)}" :disabled="!(shopName&&selectCategroy)" id="submit" @click="submitform">提交申请</button>
      </div>
    </div>
  </div>
</template>
<script>
  import Topheader from '../common/headerNew'
  export default {
    name: 'shop',
    props:['shopTime'],
    data() {
      return {
        selectCategroy:'',
        optionCategroy:[
          /*{id:'',name:'选择主营类目'},
          {id:'1',name:'1'}*/
        ],
        shopName:''
        /*shopName:{
          inputmodel: "",
          attribute:{
            type:"text",
            id:"shopName",
            class:"form-control no-border",
            placeholder:"请填写您的门店名字",
            maxlength:"15"
          }
        }*/
      }
    },
    components:{
      Topheader
    },
    methods: {
      submitform:function () {
        var _this = this;
        var shopData = {shopName:_this.shopName,categroyId:_this.selectCategroy};
        if(!(shopData.shopName || shopData.categroyId)){
          g.box.waiting({
            title:'请填写完整的信息！'
          })
          return;
        }
        _this.$parent.$options.methods.submitform(_this.$parent,shopData);
      },
      getoptionCategroy:function (_this) {
        g.ajax({
          type: 'GET',
          url: g.url.format('/api/operate/getCategories'),
          data: {text: '', pageIndex: 1,pageSize:100},
          success: function (result) {
            if(result.statusCode==0){
              _this.optionCategroy = result.data;
              _this.optionCategroy.unshift({id:'',name:'选择主营类目'});
            }else{
              alert(result.errorMsg);
            }
          }
        })
      }
    },
    mounted:function () {
      var _this = this;
      _this.getoptionCategroy(_this);
    },
    filters:{
      optionTxt:function (value,obj) {
        var newObj = {};
        if(value=='选择主营类目') return value;
        else{
          for(var i = 0; i < obj.length; i ++) newObj[obj[i].id] = obj[i].name;
          return newObj[value];
        }
      }
    }

  }


</script>
<style scoped>
  @import '../../assets/css/login.css';
</style>
