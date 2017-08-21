<template>
  <div class="share-pane-wrapper">
    <div class="share-pane">
      <p>分享至</p>
      <ul>
        <li v-for="(item,index) in sharePaneList">
          <span class="share-target-icon" :style="{'background-color':item.color}" @click="toShare(index)">
            <i class="iconfont icon-weixin1" :class="item.icon"></i>
          </span>
          <span class="share-target-name" @click="toShare(index)" >{{item.name}}</span>
        </li>    
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data:function(){
        return {
         sharePaneList: [
            {icon:{'icon-weixin2':true},name:'微信好友',color:'#7ed321'},
            {icon:{'icon-pengyouquan':true},name:'朋友圈',color:'#7ed321'},
            {icon:{'icon-tencentqq1188698easyiconnet':true},name:'QQ',color:'#51a1ff'},
            {icon:{'icon-QQkongjian':true},name:'QQ空间',color:'#f5be3f'},
            {icon:{'icon-unie61d':true},name:'新浪微博',color:'#f56423'},
            {icon:{'icon-module-link':true},name:'复制链接',color:'#f5a623'}
          ],
          data:{}
        }
    },
    props: ['sharePaneData'],
    methods:{
      toShare:function(index){
        // 1:下载页面 2:店铺详情 3 知识库详情页面 4店铺列表 5:全景详情 6：视频详情
        var _this = this;
        // console.log(this.sharePaneData);
        switch(index) {
            case 0:
                shared.config(_this.sharePaneData.title,_this.sharePaneData.imgSrc,_this.sharePaneData.shareUrl,_this.sharePaneData.remark,_this.sharePaneData.type, _this.sharePaneData.shopId);
                break;
            case 1:
                shared.config(_this.sharePaneData.title,_this.sharePaneData.imgSrc,_this.sharePaneData.shareUrl,_this.sharePaneData.remark,_this.sharePaneData.type, _this.sharePaneData.shopId,1);
         
                break;
            case 2:
                g.box.waiting({'title':'暂不支持QQ分享'});
                break;
            case 3:
                g.box.waiting({'title':'暂不支持QQ空间分享'});
                break;
            case 4:
                g.box.waiting({'title':'暂不支持新浪微博分享'});
                break;
            case 5:
                break;
        }
      }  
    },
    mounted:function(){
       this.data = this.sharePaneData;
    }
  }
</script>
<style scoped>
.share-pane-wrapper{
    position: fixed;
    height: 215px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1006;
}
.share-pane-wrapper .share-pane{
    height: 100%;
    border-top: 1px solid #d9d9d9;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}
.share-pane-wrapper .share-pane p{
    padding:10px 0;
    line-height: 1;
    font-size: 12px;
    color: #808080;
    text-align: center;
}
.share-pane-wrapper .share-pane ul{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
/*    justify-content: space-between;
    align-items: center;*/
}
.share-pane-wrapper .share-pane ul li{
  width: 25%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.share-pane-wrapper .share-pane ul li .share-target-icon{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.share-pane-wrapper .share-pane ul li .share-target-icon .iconfont{
    font-size: 22px;
    color: #fff;
}
.share-pane-wrapper .share-pane ul li .share-target-name{
    font-size: 13px;
    line-height: 1;
    color: #1a1a1a;
}
</style>