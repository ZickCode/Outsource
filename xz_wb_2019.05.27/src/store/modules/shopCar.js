import util from '@/libs/util'
/*管理购物车状态*/
const state = {
    shopCar: {
        store:[],
    },
    checkSku_ids:[],
    flag: 0,
    replacement: {
        sku_ids: '',
        list: []
    }
}
const getters = {
    Shoplen: state => {
        let len = 0;
        state.shopCar.store.forEach(shop=>{
            len+=shop.sku_list.length;
        })
        return len
    }
}
const mutations = {

    /**加购物 已存在更新数量*/
    addShop(state, shop) {
        let _index = state.shopCar.store.findIndex(c => c.id == shop.id);
        if (_index == -1) {
            let _shop = {
                id:shop.id,
                name:shop.name,
                sku_list:[shop.sku]
            }
            state.shopCar.store.unshift(_shop);
        } else {
            let skuIndex = state.shopCar.store[_index].sku_list.findIndex(c=>c.sku_id==shop.sku.sku_id);
            //sku不存在添加，存在改数量
            if(skuIndex==-1){
                state.shopCar.store[_index].sku_list.push(shop.sku);
            }else{
                state.shopCar.store[_index].sku_list[skuIndex].number+=shop.sku.number;
            }
        }
        var token = util.getLS('token', 7);
        if (util.isEmpty(token)) {
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar));
        }
    },
    /**删除指定sku_id的数据*/
    removeShop(state, sku_ids) {
        state.shopCar.store.forEach(item => {
            let _list = item.sku_list.filter(c => sku_ids.indexOf(c.sku_id) == -1);
            item.sku_list = _list;
        });
        state.shopCar.store = state.shopCar.store.filter(c => c.sku_list.length>0);
        var token = util.getLS('token', 7);
        if (util.isEmpty(token)) {
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar));
        }
    },
    EmptyShopCar(state) {
        state.shopCar.store = [];
        var token = util.getLS('token', 7);
        if (util.isEmpty(token)) {
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar));
        }
    },
    updateShopcar(state, list) {
        state.shopCar = list;
    },
    changeFlag(state, f) {
        state.flag = f
    },
    upSku_ids(state,sku_ids){
        state.checkSku_ids = sku_ids
    },
    updateReplacement(state, _replacement) {
        state.replacement = _replacement;
    },
    EmptyReplacement() {
        state.replacement = {
            sku_ids: '',
            list: []
        };
    }
}
const actions = {
    /**接收新添加货物 */
    addShop: ({ commit }, shop) => {
        commit('addShop', shop)
    },
    /**删除指定sku_id的数据*/
    removeShop: ({ commit }, sku_ids) => {
        commit('removeShop', sku_ids);
    },
    EmptyShopCar({ commit }) {
        commit('EmptyShopCar');
    },
    updateShopcar: ({ commit }, list) => {
        commit('updateShopcar', list)
    },
    changeFlag: ({ commit }, f) => {
        commit('changeFlag', f)
    },
    upSku_ids: ({ commit }, sku_ids) => {
        commit('upSku_ids', sku_ids)
    },
    updateReplacement:({ commit }, val) => {
        commit('updateReplacement', val)
    },
    EmptyReplacement:({ commit })=>{
        commit('EmptyReplacement',)
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