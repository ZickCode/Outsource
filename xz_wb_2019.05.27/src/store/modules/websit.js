/**网站全局配置*/
/** searchs*/
const state = {
    data:{},
    timestamp:'',
    isWeix:false
}

const mutations = {
    /**更新站点配置 */
    updataWebSit (state,val){
        state.data = val;
    },
    upIsWeiXin(state,val){
        state.isWeix = val;
    },
    upTimestamp(state,val){
        state.timestamp = val;
    }
}
const actions = {
    updataWebSit:({commit},val)=>{
        commit('updataWebSit',val)
    },
    upIsWeiXin:({commit},val)=>{
        commit('upIsWeiXin',val)
    },
    upTimestamp:({commit},val)=>{
        commit('upTimestamp',val)
    }
}
const getters = {
    getWeSit(state){
        return state.data
    },
    getTimestamp(state){
        return state.timestamp
    }
}
export default {
    /**开启命名空间 */
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}