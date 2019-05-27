import Vue from 'vue';
import Vuex from 'vuex';
import shopCar from './modules/shopCar'
import userMessage from './modules/userMessage'
import search from './modules/search'
import websit from './modules/websit'
import footprint from './modules/footprint'
import order from './modules/order'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        shopCar,
        userMessage,
        footprint,
        search,
        websit,
        order
    },
});
