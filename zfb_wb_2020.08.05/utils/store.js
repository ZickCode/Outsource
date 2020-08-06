//store.js
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        phone: '',
        amt: '',
        pwd: '',
        type: '',
        isPhoneLogin: true,
        accountList: [],
        payway: {
            all_n: [],
            all_y: [],
            mf: ''
        },
        payType: '',
        isGetCode: false
    },
    mutations: {
        setLoginType(that, info) {
            that.isPhoneLogin = info;
        },
        setIsGetCode(that, info) {
            that.isGetCode = info;
        },
        setPhone(that, info) {
            that.phone = info;
        },
        setAmt(that, info) {
            that.amt = info;
        },
        setPwd(that, info) {
            that.pwd = info;
        },
        setType(that, info) {
            that.type = info;
        },
        setAccountList(that, info) {
            that.accountList = info;
        },
        setPaywayList(that, info) {
            that.payway = info;
        },
        setPayType(that, info) {
            that.payType = info;
        }
    }
})
export default store;