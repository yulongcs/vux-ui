// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import VueWechatTitle from 'vue-wechat-title';
import { AjaxPlugin } from 'vux';
import qs from 'qs';
import App from './App';
import router from './router';

require('es6-promise').polyfill();

Vue.use(VueWechatTitle);
Vue.use(AjaxPlugin);

Vue.config.productionTip = false;
Vue.prototype.$http.defaults.baseURL = 'http://api.yznt.com/api/services/app/';
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

FastClick.attach(document.body);

// POST传参序列化(添加请求拦截器)
AjaxPlugin.$http.interceptors.request.use((config) => {
  // 发送请求之前做某件事
  if (config.method === 'post') {
    /* eslint-disable */
    config.data = qs.stringify(config.data);
  }
  return config;
}, error => error);

/* eslint-disable */
const ClearDataMixin = Vue.mixin({
  created() {
    this.defaultData = JSON.parse(JSON.stringify(this.$data));
  },
  methods: {
    resetData() {
      this.$data = Object.assign(this.$data, this.defaultData);
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
