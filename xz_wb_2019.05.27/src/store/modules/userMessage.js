/**管理用户信息状态 */
/**获取local */
// import {
// 	setStore,
// 	getStore
// } from '@/libs/loactalStorage.js';
/** 定义user*/
const state = {
    user: {

    },
    isLogin: false,
    isWechatLogin: 1,
    wechatData:{}
}
/**用户操作 */
const mutations = {
    setUser(state, val) {
        state.user = val
        if (state.user.id > 0) {
            state.isLogin = true
        } else {
            state.isLogin = false
        }
        sessionStorage.setItem(
            "userData",
            JSON.stringify(state.user)
        );
    },
    /**改用户信息 */
    changeUserMsg(state, obj) {
        state.user = obj
    },
    /**获取用户信息 */
    getUserMessage(state) {
        let _u = sessionStorage.getItem("userData");
        state.user = _u && _u != 'undefined' ? JSON.parse(_u) : null;
        if (state.user.id != 0) {
            state.isLogin = true
        } else {
            state.isLogin = false
        }
    },
    updataWechatLogin(state, val) {
        if(!val){
        state.isWechatLogin = 0;
        }else{
            state.isWechatLogin++;
        }
    },
    updataWechatData(state,val){
        state.wechatData = val;
    }
}
const actions = {
    setUser: ({ commit }, val) => {
        commit('setUser', val)
    },
    getUser: ({ commit }) => {
        commit('getUserMessage')
    },
    changeUserMsg: ({ commit }, val) => {
        commit('changeUserMsg', val)
    },
    updataWechatLogin: ({ commit }, val) => {
        commit('updataWechatLogin', val)
    },
    updataWechatData: ({ commit }, val) => {
        commit('updataWechatData', val)
    },
}
const getters = {
    userStatus(state) {
        return state.user
    },
    getWechatLogin(state) {
        return state.isWechatLogin
    },
    getisLogin(state){
        return state.isLogin;
    }

}
export default {
    /**开启命名空间 */
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}