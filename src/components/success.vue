<template>
  <div>
    成功咯
    <div style="margin-top: 0px;">
      <input type="button" id="back" v-on:click="back" value="退出登入" >
    </div>
    <div style="margin-top: 800px;">
      <input type="button" id="share" v-on:click="share" value="分享九张图"  />
    </div>
    <div style="margin-top: 800px;">
      <input type="button" id="share1" value="分享朋友圈"  />
    </div>
    <div style="margin-top: 800px;">
      <input type="button" id="share2" value="分享好友"  />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    methods: {
      back:function () {
        gkee.logout(gkee.locallurl);
      },
      share:function () {
        var img=[];
        img.push("http://imgs.fangtuwang.com/img2/upload/201608/295/128/m_94e7d14ee12d4063bddfa1881cc8e57b.jpg");
        img.push("http://imgs.fangtuwang.com/img2/upload/201608/295/128/m_94e7d14ee12d4063bddfa1881cc8e57b.jpg");
        img.push("http://imgs.fangtuwang.com/img2/upload/201608/295/128/m_94e7d14ee12d4063bddfa1881cc8e57b.jpg");
        img.push("http://imgs.fangtuwang.com/img2/upload/201608/295/128/m_94e7d14ee12d4063bddfa1881cc8e57b.jpg");
        img.push("http://imgs.fangtuwang.com/img2/upload/201608/295/128/m_94e7d14ee12d4063bddfa1881cc8e57b.jpg");
        img.push("http://imgs.fangtuwang.com/img2/upload/201608/295/128/m_94e7d14ee12d4063bddfa1881cc8e57b.jpg");
        img.push("http://imgs.fangtuwang.com/img2/upload/201608/295/128/m_94e7d14ee12d4063bddfa1881cc8e57b.jpg");
        img.push("http://imgs.fangtuwang.com/img2/upload/201608/295/128/m_94e7d14ee12d4063bddfa1881cc8e57b.jpg");
        img.push("http://imgs.fangtuwang.com/img2/upload/201608/295/128/m_94e7d14ee12d4063bddfa1881cc8e57b.jpg");
        gkee.weixinShareForPic("这货是个。。。",img);
      }
    }
  }
</script>
