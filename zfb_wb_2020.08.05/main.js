import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

import'./utils/useSocket';
import store from "./utils/store";
Vue.prototype.$store = store;

App.mpType = 'app';

const app = new Vue({
    ...App,
    store
})
app.$mount();
