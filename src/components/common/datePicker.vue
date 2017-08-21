<template>
  <div class="date-picker-box" :class={top:Dpdata.isTop,bottom:!Dpdata.isTop} v-cloak>
       <div class="to-prev-day" :class="{disabled:toPrevDisabled}" @click="toprevdate">前一日</div>
       <div class="calendar-trigger">
           <select name="date" id="selectDate"  @change="datechange($event)">
             <option v-for="(item,index) in prevThirtyDays" :value="index" :selected="selectOptionIndex == index">{{item.date}}</option>
           </select>
           <p class="select-date" @click="toSelectDate"><span class="iconfont icon-0067rili-copy"></span>选择日期</p>
      
       </div>
       <div class="to-next-day" :class="{disabled:toNextDisabled}" @click="tonextdate">后一日</div>
  </div>
</template>
<script>
function openSelect(ele) {
   if (document.createEvent) {
       var e = document.createEvent("MouseEvents");
       e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
       ele[0].dispatchEvent(e);
   } else if (element.fireEvent) {
       ele[0].fireEvent("onmousedown");
   }
};
var getDate = (function (){
    var getFormatDate = function(date) {
        var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var Y = date.getFullYear();
        var M = date.getMonth() + 1;
        var D = date.getDate();
        var W = week[date.getDay()];
        if (M >= 1 && M <= 9) { M = "0" + M;}
        if (D >= 0 && D <= 9) { D = "0" + D;}
        var result1 = Y + '/' + M + '/' + D + " " + W;
        var result2 = Y + '/' + M + '/' + D; 
        var timeStamp = new Date(result2).getTime();    
        return {
          date:result1,
          timeStamp:timeStamp 
        };
    };
    var getCurrentDate = function(){
      return getFormatDate(new Date()).date;
    };
    var getPrevDate = function(days){
      var dateArr = [];
      for(var i = 0;i < days; i++){
        var nowDate = new Date();
        var date = new Date(nowDate -24*60*60*1000*i);
        dateArr.unshift(getFormatDate(date));
      }
      return dateArr;
    };
    return {
      getCurrentDate:getCurrentDate,
      getPrevDate:getPrevDate
    }
})();
  export default {
    data:function(){
        return {
          nowDate:'',
          prevThirtyDays:[],
          isSelectDate:true,
          selectOptionIndex:29,
          toPrevDisabled:false,
          toNextDisabled:true
        }
    },
    props: ['Dpdata'],
    methods:{
      toSelectDate:function(){
          openSelect($('#selectDate'))
      },
      initfinish:function(){
          this.$emit('initfinish',this.prevThirtyDays[this.selectOptionIndex].timeStamp);
      },
      datechange:function(e){
        console.log(e.target.value);
        this.selectOptionIndex = e.target.value;
        this.checkPrevNextBtn();
        this.$emit('datechange',this.prevThirtyDays[this.selectOptionIndex].timeStamp);
      },
      toprevdate:function(){
        if(this.selectOptionIndex == 0) return;
        this.selectOptionIndex--;
        this.checkPrevNextBtn();
        this.$emit('toprevdate',this.prevThirtyDays[this.selectOptionIndex].timeStamp);
      },
      tonextdate:function(){
        if(this.selectOptionIndex == 29) return;
        this.selectOptionIndex++;
        this.checkPrevNextBtn();
        this.$emit('tonextdate',this.prevThirtyDays[this.selectOptionIndex].timeStamp);
      },
      checkPrevNextBtn:function(){
        this.toPrevDisabled = false;
        this.toNextDisabled = false;
        if(this.selectOptionIndex == 0){
            this.toPrevDisabled = true;
        };
        if(this.selectOptionIndex == 29){
            this.toNextDisabled = true;
        }
      }
    },
    mounted:function(){
      this.nowDate = getDate.getCurrentDate();
      this.prevThirtyDays = getDate.getPrevDate(30);
      this.checkPrevNextBtn();
      this.initfinish();
    }
   
  }
</script>

<style scoped>
/*日期选择器*/
.date-picker-box{
  height: 48px;
  background-color: #fff;
  display: flex;
  color: #44c0a2;
  z-index: 1000;
  font-size: 15px;
}
.date-picker-box.top{
  border-bottom: 1px solid #e6e6e6;
  position: fixed;
  top:50px;
  left: 0;
  right: 0;
}
.date-picker-box.bottom{
  border-top: 1px solid #e6e6e6;
  position: fixed;
  bottom:0;
  left: 0;
  right: 0;
}
.date-picker-box select{
  font-size: 14px;
}
.date-picker-box .calendar-trigger{
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.date-picker-box .calendar-trigger p{
  margin:0;
}
.date-picker-box .calendar-trigger .select-date{
  display: flex;
  align-items: center;
}
.date-picker-box .calendar-trigger .select-date .iconfont{
  font-size: 18px;
}
.date-picker-box .calendar-trigger .current-date{
  color:#333;
}
.date-picker-box .to-prev-day,
.date-picker-box .to-next-day{
  position: relative;
  flex: 1;
  text-align: center;
  line-height: 45px;
}
.date-picker-box .to-prev-day.disabled,
.date-picker-box .to-next-day.disabled{
    color:#ccc;
}
.date-picker-box .to-prev-day:after,
.date-picker-box .to-next-day:before{
    content: '';
    position: absolute;
    width: 1px;
    height: 13px;
    right:0;
    top:50%;
    transform: translateY(-50%);
    background-color: #37bc9b;
}
.date-picker-box .to-next-day:before{
  left:0;
}
#selectDate{
  padding-top: 5px;
  border: solid 0 #fff;
  line-height: 1;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  outline:none;
  color:#333;
}
</style>