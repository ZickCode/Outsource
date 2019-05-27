
import util from '@/libs/util'
/**管理搜索历史 */
/** searchs*/
const state = {
    searchs:[]
}

const mutations = {
    /**添加搜索记录 */
    addSearch (state,val){
        if(util.isEmpty(val)){
            return;
        }
         let _searchs = state.searchs;
         _searchs.forEach((item,index) => {
            if(item == val){
                state.searchs.splice(index,1);
            }
        });
        state.searchs.unshift(val)
        if(state.searchs.length>10){
            state.searchs.pop()
        }
        window.localStorage.setItem("searchs",JSON.stringify(state.searchs));
    },
    emptySearch(){
        state.searchs = [];
        window.localStorage.setItem("searchs",JSON.stringify(state.searchs));
    },
    updatedSearch() {
        let _searchs = window.localStorage.getItem("searchs");
        if(util.isEmpty(_searchs)){
            state.searchs =[];
        }else{
        state.searchs = JSON.parse(_searchs);
        }
     }
}
const actions = {
    addSearch:({commit},val)=>{
        commit('addSearch',val)
    },
    emptySearch:({commit})=>{
        commit('emptySearch')
    },
    updatedSearch:({commit})=>{
        commit('updatedSearch')
    },
}
const getters = {
    getSearch (state){
        return state.searchs
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