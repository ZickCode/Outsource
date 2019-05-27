import util from '@/libs/util'
import { of } from 'rxjs';
/*管理足迹状态*/
const state = {
    footNote: [

    ]
}
const getters = {

}
const mutations = {
    /**加足迹 */
    addFoot(state, obj) {
        state.footNote.push(obj);
        state.footNote.slice(0, 50);
        let footArr = JSON.parse(window.localStorage.getItem('footNote'));
        if (footArr) {
            footArr.push(obj)
            window.localStorage.setItem("footNote", JSON.stringify(state.footNote));
        } else {
            window.localStorage.setItem("footNote", JSON.stringify(state.footNote));
        }
    },
    /**更新足迹 */
    updateFoot(state, obj) {
        //window.console.log(state);
        state.footNote = obj
    },
    /**删足迹 */
    reduceFoot(state, obj) {
        let start = obj.start
        let len = obj.len
        state.footNote.splice(start, len);
        window.localStorage.setItem(
            "footNote",
            JSON.stringify(state.footNote)
        );
    },
    /**批量删除 */
    deleteFoot(state, obj) {
        for (let [key, val] of obj.entries()) {
            let i = _.findIndex(state.footNote, (o) => {
                return o.item.info.sku_id == val
            });
            let footArr = JSON.parse(window.localStorage.getItem('footNote'));
            let k = _.findIndex(state.footNote, (o) => {
                return o.item.info.sku_id == val
            });
            //console.log(footArr);            
            footArr.splice(k, 1);
            window.localStorage.setItem('footNote', JSON.stringify(footArr));
            state.footNote.splice(i, 1);
        }
    }
}
const actions = {
    /**接收新添加货物 */
    addFoot: ({ commit }, obj) => {
        commit('addFoot', obj)
    },
    /**接收要去除的货(标记) */
    reduceFoot: ({ commit }, obj) => {
        commit('reduceFoot', obj);
    },
    updateFoot: ({ commit }, obj) => {
        commit('updateFoot', obj)
    },
    deleteFoot: ({ commit }, obj) => {
        commit('deleteFoot', obj)
    }
}
export default {
    /**开启命名空间 */
    namespaced: true,
    state,
    mutations,
    actions,
}