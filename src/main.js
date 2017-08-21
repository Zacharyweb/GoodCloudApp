// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './route'
const NotFound = { template: '<p>找不到页面</p>' }
import './assets/css/iconfont.css'
import './assets/plugins/bootstrap/css/bootstrap.min.css'
import './assets/css/common.css'
import './assets/js/jquery.min'
import './assets/plugins/bootstrap/js/bootstrap.min'
import './assets/js/gkee'
import Promise from './assets/js/es6-promise'
import './assets/js/gtr'
import inputItem from './components/common/input-item.vue'
import directives from './assets/js/directives'
directives(Vue);
Vue.component('input-item', inputItem);
new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.hash.replace("#","").split("?")[0]
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound;
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
});

Vue.config.productionTip = false;


Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
});