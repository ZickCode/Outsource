import 'amfe-flexible'
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/routes/router.js'
import { post, get } from '@/libs/api';
//导入async风格的api
import { api } from '@/libs/async_api';
import _ from 'lodash';
import store from '@/store/'
import { Toast, NavBar, Lazyload, Button, Actionsheet, Dialog, Stepper, Popup, Loading } from 'vant';
import util from '@/libs/util'
import * as custom from '@/libs/filter'
import * as directives from '@/libs/directives'
import validata from '@/libs/validata'
import 'vant/lib/index.css'
import 'assets/css/components.css'
import 'assets/sass/index.scss'
import 'assets/sass/public.scss'
import FastClick from 'fastclick'
import xzicon from '@/components/icon/index.vue'
import xzLoading from '@/components/loading'

Vue.component('xz-icon', xzicon)
//Vue.config.productionTip = false // 下拉上拉配置

//  diy测试 start
import axios from 'axios'
import Qs from 'qs'
//QS是axios库中带的，不需要我们再npm安装一个
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;
//  diy测试 end 以上类容为diy测试axios临时用，该功能开发完后删除此配置
Vue.config.productionTip = true

Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})
Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
})
Vue.prototype.util = util;
Vue.prototype.post = post;
Vue.prototype.get = get;
Vue.prototype.api = api;
Vue.prototype.validata = validata;
Vue.prototype.go_back = function () {
    window.history.length > 1
        ? router.go(-1)
        : router.push('/');
}
Vue.prototype.loading = function () {
    return Toast({
        type: "loading",
        forbidClick: true,
        duration: 0,
    });
}
Vue.use(_);
Vue.use(NavBar);
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
Vue.use(Lazyload, {
    loading: require('./assets/images/loading.png'),
    error: require('./assets/images/default.png')
});
Vue.use(Button);
Vue.use(Actionsheet);
Vue.use(Dialog);
Vue.use(Stepper);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(xzLoading)//{message:"提示文字"}
window.vm = new Vue();
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
//window.vm = Vue
