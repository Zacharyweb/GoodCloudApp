<template>
  <ul class="list-group info" id="card">
    <li>
      <img :src="Bcardata.img" >
      <!--<span class="car-show-collect"></span>-->
      <p class="car-show-introduce" v-if="(Bcardata.nickName || Bcardata.remark)?true:false">
        <b class="name">{{Bcardata.nickName}}</b>
        <span>{{Bcardata.remark}}</span>
      </p>
    </li>
    <li class="shoujihao">
      <p class="text">视频时你能看见TA，但TA看不见你</p>
      <p class="callMe"><i class="iconfont icon-shexiang"></i>向TA发起视频对话</p>
    </li>
    <li class="phoneNumber">
      <span @click="tocontacttel(Bcardata.phone)"><i class="icon iconfont icon-dianhua icon-phone-black"></i><span class="line-under">{{Bcardata.phone}}</span></span>
      <span @click="tocontactwx(Bcardata.wechat)"><i class="icon iconfont icon-weixin"></i>{{Bcardata.wechat}}</span>
    </li>
  </ul>
</template>
<script>
  export default {
    props: [
      'Bcardata',
    ],
    data() {
      return {
      }
    },
    methods:{
      tocontacttel:function (tel) {
        window.location.href='tel:'+tel;
      },
      tocontactwx:function (wechat) {

      }
    }
  }
</script>
