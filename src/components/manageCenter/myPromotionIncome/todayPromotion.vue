<template>
    <div class="promotion" id="todayPromotion">
       <Datepicker :Dpdata="Dpdata" @initfinish="dateChange" @datechange="dateChange" @toprevdate="dateChange" @tonextdate="dateChange"></Datepicker>
      <div class="my-promotion">
        <span class="label-icon">我的</span>
        <img class="my-avatar" :src="myBaseMsg.img || '../../../../static/pic.png'">
        <div class="my-promotion-result">
          <p class="nick-name">{{myBaseMsg.nickName || '还没有昵称'}}</p>
          <p class="my-bonus font-red">估计可获&nbsp;{{myMsg.Money || 0}}&nbsp;元佣金&nbsp;<i class="iconfont icon-tishi"></i></p>
          <p class="my-achivement"><i class="iconfont icon-iconset0399"></i>{{myMsg.UserCount || 0 }}&nbsp;人&nbsp;{{myMsg.ShopCount || 0}}&nbsp;个门店</p>
        </div>
      </div>
        <div class="ranking-list-wrapper">
          <ul class="ranking-list">
            <li class="ranking-list-item" v-for="(item,index) in resultList">
                <span class="font-grey ranking-num" :class="{'font-green':index<=2}">{{index+1}}</span>
                <img class="others-avatar" :src="item.Img || '../../../../static/pic.png'">
                <div class="others-promotion-result">
                  <p class="nick-name">{{item.NickName || '导购'+index}}</p>
                  <p class="others-achivement"><i class="iconfont icon-iconset0399"></i>{{item.UserCount}}&nbsp;人&nbsp;{{item.ShopCount}}&nbsp;个门店</p>
                </div>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
  // import Topheader from '../common/header'
  // import TopTab from '../common/topTab'
  import Datepicker from '../../common/datePicker'

  export default {
    name: 'todayPromotion',
    components:{

      Datepicker
    },
    data() {
      return {
        Dpdata:{
          isTop:false
        },
        myBaseMsg:{},
        myMsg:{},
        resultList:[]
      }
    },
    methods: {

        getInitData:function(timeStamp){
            var vm = this;
          g.ajax({
                type: "get",
                url: g.url.format('/api/shared/getSingleTodaySpread'),
                data: {current:timeStamp},
                dataType: "json",
                success: function(result) {
                   vm.myMsg = result.data || {};
                }
            });

          g.ajax({
                type: "get",
                url:g.url.format('/api/shared/summaryTodaySpread'),
                data: {top:30,current:timeStamp},
                dataType: "json",
                success: function(result) {
                  vm.resultList = result.data;
                }
            });
         },
         dateChange:function(timeStamp){
            this.getInitData(timeStamp);
         }
    },
    mounted:function () {
      var obj = g.storage.getUserInfo();
      var information = obj.data;
      this.myBaseMsg = information;
    }
  }
</script>
