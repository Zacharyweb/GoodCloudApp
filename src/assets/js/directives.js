export default(Vue) => {
  Vue.directive('touch', {
    bind: function (el, binding) {
      var timeOutEvent = 0;
      var startTime = 0;
      el.addEventListener('touchstart', function (ev) {
        binding.value.press();
        //判断长按
        timeOutEvent = setTimeout(() =>{
          startTime++;
          timeOutEvent = 0 ;
          binding.value.longTouch();
        } , 1000);
      }, false);

      /*el.addEventListener('touchmove' , function (ev) {
        if(startTime<1){
          binding.value.duan();
        }
        startTime = 0;
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        binding.value.restore();
      }, false);*/

      el.addEventListener('touchend', function (ev) {
        if(startTime<1){
          binding.value.duan();
        }
        startTime = 0;
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        binding.value.restore();
      }, false);
    },
  })
}
