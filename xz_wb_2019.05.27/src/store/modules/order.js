
import util from '@/libs/util'
/**订单活动模块 */
/** searchs*/
const state = {
    coupon: [],//订单优惠券
    incdec: [],//订单满减满赠
}

const mutations = {
    /**更新订单可用优惠券列表 */
    updateCoupon(state, val) {
        if (util.isEmpty(val)) {
            return;
        }
        state.coupon = val;
    },
    /**更新订单可用满减满赠列表 */
    updateIncdec(state, val) {
        if (util.isEmpty(val)) val = [];
        state.incdec = val;
    }
}
const actions = {
    updateCoupon: ({ commit }, val) => {
        commit('updateCoupon', val)
    },
    updateIncdec: ({ commit }, val) => {
        commit('updateIncdec', val)
    }
}
const getters = {
}
export default {
    /**开启命名空间 */
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}