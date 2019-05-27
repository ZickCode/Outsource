<template>
    <div class="scroller-view">
        <van-nav-bar
            class="xz-nva-bar"
            title="购物车"
            fixed
            :right-text="edit_text"
            @click-right="handleClickQuery(edit_text)"
            :z-index="9"
        />
        <div class="cart-footprint-list" slot="listContent" style="overflow:auto">
            <div class="footprint-item" v-for="shop in dataList.store" :key="shop.id">
                <div class="footprint-hd">
                    <span>{{shop.name}}</span>
                </div>
                <div class="footprint-bd" v-for="hd in shop.activity" :key="hd.id">
                    <div class="active-group white" v-if="hd.id>0">
                        <p class="active-txt">
                            <em>{{hd.info.type}}</em>
                            {{hd.info.msg}}
                        </p>
                        <a href="javascript:void(0)" @click="go_reduction(hd)" class="look-btn">
                            去凑单
                            <xz-icon type="forward"/>
                        </a>
                    </div>
                    <van-swipe-cell
                        :right-width="120"
                        :disabled="!isShowEdit"
                        v-for="(sku,index) in shop.sku_list"
                        :key="sku.sku_id"
                        v-if="sku._incordec && sku._incordec.id == hd.id"
                    >
                        <div class="or-goods-list-item" @click="swipcell_click($event,sku)">
                            <!--选择状态-->
                            <van-checkbox
                                v-model="sku.check"
                                :disabled="sku.store==0"
                                @click="swipcell_click($event,sku)"
                                class="or-item-check"
                            ></van-checkbox>
                            <span class="goods-list-pic" @click="swipecell_change($event,sku)">
                                <img v-lazy="util.reImg(sku.img)">
                            </span>
                            <div class="or-item-conten" @click="swipecell_change($event,sku)">
                                <div class="or-item-title">
                                    <div class="xz-title">
                                        <span class="hd-tip tip-no" v-if="sku.store <=0">已售罄</span>
                                        <span class="hd-tip" v-if="sku._preferential">限时抢购</span>
                                        {{sku.name}}
                                    </div>
                                </div>
                                <div
                                    class="or-item-sku xz-title"
                                    v-html="sku.title"
                                ></div>
                                <div class="or-item-price sun-price">
                                    <strong>{{websit.data.currency}}</strong>
                                    <span>
                                        <label>{{(sku._preferential)?sku._preferential.price:sku.price| changePrice}}.</label>
                                        <i
                                            class="samll-num"
                                        >{{(sku._preferential)?sku._preferential.price:sku.price | splicePrice}}</i>
                                    </span>
                                    <div class="or-number" @click="stepper_click" v-if="sku.store>0">
                                        <van-stepper
                                            v-model="sku.number"
                                            integer
                                            :min="1"
                                            :max="sku.store"
                                            @overlimit="overlimit(sku)"
                                            @plus="countsChange(sku,2)"
                                            @minus="countsChange(sku,1)"
                                            @blur="countsChange(sku)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div slot="right" class="swipe-btns">
                            <a class="xz-btn btn-8c swipe-btn" @click="on_collect(sku.sku_id)">收藏</a>
                            <a
                                class="xz-btn btn-e43 swipe-btn"
                                href="javascript:void(0);"
                                @click="on_delete(sku.sku_id,index)"
                            >删除</a>
                        </div>
                    </van-swipe-cell>
                </div>
                <div class="footprint-bd">
                    <van-swipe-cell
                        :right-width="120"
                        :disabled="!isShowEdit"
                        v-for="(sku,index) in shop.sku_list"
                        :key="sku.sku_id"
                        v-if="!sku._incordec"
                    >
                        <div class="or-goods-list-item judli-wrap" @click="swipcell_click($event,sku)">
                            <!--选择状态-->
                            <van-checkbox
                                v-model="sku.check"
                                :disabled="sku.store==0"
                                @click="swipcell_click($event,sku)"
                                class="or-item-check"
                            ></van-checkbox>
                            <span class="goods-list-pic" @click="swipecell_change($event,sku)">
                                <img v-lazy="util.reImg(sku.img)">
                            </span>
                            <div class="or-item-conten"  @click="swipecell_change($event,sku)">
                                <div class="or-item-title">
                                    <div class="xz-title">
                                        <span class="hd-tip tip-no" v-if="sku.store <=0">已售罄</span>
                                        <span class="hd-tip" v-if="sku._preferential">限时抢购</span>
                                        {{sku.name}}
                                    </div>
                                </div>
                                <div
                                    class="or-item-sku xz-title"
                                    v-html="sku.title"
                                ></div>
                                <div class="or-item-price sun-price">
                                    <strong>{{websit.data.currency}}</strong>
                                    <span>
                                        <label>{{(sku._preferential)?sku._preferential.price:sku.price| changePrice}}.</label>
                                        <i
                                            class="samll-num"
                                        >{{(sku._preferential)?sku._preferential.price:sku.price | splicePrice}}</i>
                                    </span>
                                    <div class="or-number" @click="stepper_click" v-if="sku.store>0">
                                        <van-stepper
                                            v-model="sku.number"
                                            integer
                                            :min="1"
                                            :max="sku.store"
                                            @overlimit="overlimit(sku)"
                                            @plus="countsChange(sku,2)"
                                            @minus="countsChange(sku,1)"
                                            @blur="countsChange(sku)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div slot="right" class="swipe-btns">
                            <a class="xz-btn btn-8c swipe-btn" @click="on_collect(sku.sku_id)">收藏</a>
                            <a
                                class="xz-btn btn-e43 swipe-btn"
                                href="javascript:void(0);"
                                @click="on_delete(sku.sku_id,index)"
                            >删除</a>
                        </div>
                    </van-swipe-cell>
                </div>
            </div>
        </div>
        <div
            class="scroller-tip scroller-tip-bottom"
            v-if="dataList.store && dataList.store.length == 0 "
        >
            <xz-icon type="cart"/>
            <span>购物车还是空的</span>
            <a class="xz-btn btn-e43 xz-radius" href="#/cate">马上选购</a>
        </div>
        <!-- </pull-up> -->
        <div class="xz-bottom" v-if="dataList.store && dataList.store.length > 0">
            <div class="xz-bottom cart-bottom" v-if="isShowEdit">
                <van-checkbox v-model="isAll" @click="check_change">全选</van-checkbox>
                <div class="van-submit-bar__text" style="font-size:10px;margin-top:14px;">
                    合计金额:
                    <span
                        class="van-submit-bar__price"
                        style="font-size:15px;"
                    >{{websit.data.currency}}{{all_prices | numFilter}}</span>
                </div>
                <!-- <span class="or-item-price" style="display:inline-block">￥{{all_prices}}</span> -->
                <van-button
                    type="button"
                    class="xz-btn btn-e43"
                    @click="on_goPay"
                    :disabled="pay_btn_flag"
                >结算({{pay_length}})</van-button>
            </div>
            <div class="xz-bottom cart-bottom" v-if="!isShowEdit">
                <van-goods-action v-if="!isShowEdit">
                    <van-checkbox v-model="isAll" @click="check_change">全选</van-checkbox>
                    <div class="center"></div>
                    <button
                        type="button"
                        class="xz-btn btn-8c"
                        @click="on_collect()"
                        style="width:70px"
                    >加入收藏</button>
                    <button
                        type="button"
                        class="xz-btn btn-e43"
                        @click="all_delete"
                        style="width:70px"
                    >删除</button>
                </van-goods-action>
            </div>
        </div>
    </div>
</template>
<script>
import {
    SwipeCell,
    Checkbox,
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Button
} from "vant";
import pullUp from "@/components/pull/index.vue";
import xzStepper from "@/components/stepper";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            edit_text: "",
            isShowEdit: true,
            all_prices: 0,
            isAll: false,
            pay_btn_flag: true,
            pay_length: 0,
            dataList: [],
            sku_ids: [],
            all_delete_flag: true,
            isAjax: false,
            isBlur: false
        };
    },
    components: {
        vanSwipeCell: SwipeCell,
        vanCheckbox: Checkbox,
        pullUp,
        vanGoodsActionBigBtn: GoodsActionBigBtn,
        vanGoodsAction: GoodsAction,
        vanGoodsActionMiniBtn: GoodsActionMiniBtn,
        Button,
        xzStepper
    },
    methods: {
        ...mapActions("shopCar", [
            "addShop",
            "removeShop",
            "updateShopcar",
            "changeFlag",
            "upSku_ids"
        ]),
        loadData() {
            let _this = this;
            if (_this.userMessage.isLogin) {
                let _loading = _this.$xzLoading();
                _this.post(
                    {
                        method: "api.module.order.cart.lists",
                        check_ids: _this.sku_ids.join(";")
                    },
                    function(data) {
                        _loading.clear();
                        if (data.code == 200) {
                            let _list = data.result;
                            _list.store.forEach(shop => {
                                shop.sku_list.forEach(item => {
                                    item.check = false;
                                    if (
                                        _this.sku_ids.indexOf(item.sku_id) > -1
                                    ) {
                                        item.check = true;
                                    }
                                });
                            });
                            _this.updateShopcar(_list);
                            _this.dataList = _list;
                            _this.sun_money();7
                        }
                    }
                );
            } else {
                _this.dataList = _this.shopCar.shopCar;
                _this.sun_money();
            }
        },
        edit_click() {
            let _this = this;
            if (_this.dataList.store.length == 0) {
                _this.$toast({
                    message: "没有可以编辑的收藏",
                    position: "bottom"
                });
                return;
            }
            if (_this.isShowEdit) {
                _this.isShowEdit = false;
                _this.edit_text = "编辑";
            } else {
                _this.isShowEdit = true;
                _this.edit_text = "完成";
            }
        },
        check_change() {
            let _this = this;
            _this.dataList.store.forEach(shop => {
                shop.sku_list.forEach(item => {
                    if(item.store>0){
                        item.check = _this.isAll;
                    }
                });
            });
            _this.sun_money();
            _this.loadData();
        },
        on_goPay() {
            let _this = this;
            if (!_this.pay_btn_flag) {
                let _skus = [];
                _this.dataList.store.forEach(shop => {
                    shop.sku_list.forEach(item => {
                        if (item.check) {
                            _skus.push(item);
                        }
                    });
                });
                this.$router.push({
                    name: "orderconfirm",
                    query: {
                        s: _skus.map(c => c.sku_id).join(";")
                    }
                });
            }
        },
        on_collect(sku_id) {
            let _this = this;
            let _sku_ids = [];
            if (_this.util.isEmpty(sku_id)) {
                _this.dataList.store.forEach((shop, index) => {
                    shop.sku_list.forEach(item => {
                        if (item.check) {
                            _sku_ids.push({
                                spu_id: item.spu_id,
                                sku_id: item.sku_id
                            });
                        }
                    });
                });
            } else {
                _sku_ids.push(sku_id);
            }
            if (_sku_ids.length == 0) {
                _this.$toast({
                    message: "请选择要加入收藏的商品",
                    position: "bottom"
                });
                return;
            }
            _this.up_collect(_sku_ids, "确定要加入收藏吗");
        },
        up_collect(_sku_ids) {
            let _this = this;
            _this.$dialog
                .confirm({
                    message: "确定要加入收藏吗?"
                })
                .then(() => {
                    let params = {
                        method: "api.module.member.favorite.addmore",
                        ids: ""
                    };
                    let ids = {};
                    _(_sku_ids).forEach((item, index) => {
                        ids[item.spu_id]=item.sku_id;
                    });
                    params.ids = JSON.stringify(ids);
                    _this.upCollectAxios(params);
                })
                .catch(() => {
                    //cancel
                });
        },
        sun_money() {
            this.all_prices = 0;
            this.pay_length = 0;
            let _isAll = true;
            let _sku_ids = [];
            this.dataList.store.forEach(shop => {
                shop.sku_list.forEach(item => {
                    if (item.check && item.store>0) {
                        _sku_ids.push(item.sku_id);
                        this.all_prices +=
                            Number.parseFloat(
                                item._preferential
                                    ? item._preferential.price
                                    : item.price
                            ) * item.number;
                        this.pay_length += Number(item.number);
                    } else if(!item.check && item.store>0) {
                        _isAll = false;
                    }
                });
            });
            this.isAll = _isAll;
            this.sku_ids = _sku_ids;
            this.upSku_ids(_sku_ids);
            if (this.pay_length > 0) {
                this.pay_btn_flag = false;
            } else {
                this.pay_btn_flag = true;
            }
        },
        swipecell_change(e,sku) {
            e.stopPropagation();
            this.$router.push("/goods/detail/" + sku.sku_id);
        },
        swipcell_click(e, sku) {
            let check = sku.check;
            if (
                !(e.target.className.indexOf("van-stepper__plus") > -1) &&
                !(e.target.className.indexOf("van-stepper") > -1)
            ) {
            } else if (!(e.target.className.indexOf("van-icon") > -1)) {
                this.$set(sku, "check", !sku.check);
            }
            if (!(e.target.className.indexOf("van-stepper") > -1)) {
            }
            if (!(e.target.className.indexOf("van-icon") > -1)) {
                this.$set(sku, "check", !sku.check);
            }
            this.sun_money();
            this.loadData();
        },
        stepper_click(e){
            e.stopPropagation();
        },
        overlimit(sku) {
            if (sku.number >= sku.store) {
                this.$toast({
                    message: "您最多可以购买" + sku.store + "件该商品"
                });
            }
        },
        /**步进器变动 */
        countsChange(sku, t = 0) {
            let counts = sku.number;
            switch (t) {
                case 1:
                    counts--;
                    break;
                case 2:
                    counts++;
                    break;
            }
            if (counts <= 0 || this.isAjax) {
                counts = 1;
            }
            /**判断接口传完的时间 */
            /**请求api */
            let nums = counts,
                sku_id = sku.sku_id,
                params = {
                    method: "api.module.order.cart.set_nums",
                    nums,
                    sku_id
                };
            if (this.userMessage.user.username == "游客") {
                /**改变数据的价格状态 */
                let flag = false;
                this.$set(sku, "number", counts);
                this.$toast({
                    message: "更新成功",
                    position: "bottom"
                });
                this.sun_money();
            } else {
                this.upNumForDetail(params, sku);
            }
            let second = 800;
        },
        /**点编辑 */
        handleClickQuery(e) {
            if (e == "编辑") {
                this.edit_text = "完成";
                this.isShowEdit = false;
            } else {
                this.edit_text = "编辑";
                this.isShowEdit = true;
            }
        },
        upNumForDetail(params, sku) {
            let _this = this;
            let second = 800;
            _this.isAjax = true;
            let _loading = _this.$xzLoading();
            _this.post(
                params,
                data => {
                    _loading.clear();
                    if (data.code == 200) {
                        _this.$toast({
                            message: "更新成功",
                            position: "bottom"
                        });
                        /**改变数据的价格状态 */
                        let flag = false;
                        if (Number(data.result) < sku.number) {
                            _this.$set(sku, "number", Number(data.result));
                        }
                        _this.sun_money();
                        _this.loadData();
                    } else {
                    }
                },
                res => {
                    _this.isAjax = false;
                }
            );
        },
        /**批量删除 */
        all_delete() {
            let _this = this;
            let _sku_ids = [];
            _this.dataList.store.forEach((shop, index) => {
                shop.sku_list.forEach(item => {
                    if (item.check) {
                        _sku_ids.push(item.sku_id);
                    }
                });
            });
            if (_sku_ids.length == 0) {
                _this.$toast({
                    message: "请选择要删除的商品",
                    position: "bottom"
                });
                return;
            }
            _this.$dialog
                .confirm({
                    message: "确定要删除吗"
                })
                .then(() => {
                    let p = 0;
                    let params = {
                        method: "api.module.order.cart.delpro",
                        sku_id: ""
                    };
                    params.sku_id = _sku_ids.join(",");
                    _this.delAxios(params);
                    this.all_delete_flag = false;
                    this.all_prices = 0;
                })
                .catch(() => {});
        },
                /**点击删除 */
        on_delete(sku_id, index) {
            let _this = this;
            _this.del_fun(sku_id, "确定删除？", index);
        },
                /**删除接口 */
        del_fun(ids, title, index) {
            let _this = this;
            /**设置删除标记 */
            let obj = {
                start: index,
                len: 1
            };
            _this.$dialog
                .confirm({
                    message: title
                })
                .then(() => {
                    /**准备参数 */
                    let params = {
                        method: "api.module.order.cart.delpro",
                        sku_id: ids
                    };
                    _this.delAxios(params);
                    _this.isAll = false;
                    // _this.sun_money();
                })
                .catch(() => {
                    // on cancel
                });
        },
        delAxios(params) {
            let _this = this;
            let sku_ids = params.sku_id.split(",");
            if (_this.userMessage.isLogin) {
                let _loading = _this.$xzLoading();
                _this.post(params, function(data) {
                    _loading.clear();
                    if (data.code == 200) {
                        _this.$toast({
                            message: "删除成功",
                            position: "bottom"
                        });
                        let _listData = _this.dataList;
                        _listData.store.forEach(item => {
                            let _list = item.sku_list.filter(c => sku_ids.indexOf(c.sku_id) == -1);
                            item.sku_list = _list;
                        });
                        _this.removeShop(sku_ids);
                        _this.dataList = _listData;
                    } else {
                        _this.$toast({
                            message: "删除失败",
                            position: "bottom"
                        });
                    }
                });
            } else {
                _this.removeShop(sku_ids);
                _this.dataList = _this.shopCar.shopCar;
            }
        },
        upCollectAxios(params) {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(params, function(data) {
                _loading.clear();
                if (data.code == 200) {
                    _this.$toast({
                        message: "收藏成功",
                        position: "bottom"
                    });
                } else {
                    _this.$toast({
                        message: "收藏失败",
                        position: "bottom"
                    });
                }
            });
        },
        go_reduction(item){
            this.$router.push({
                name:'reduction',
                query:{
                    id:item.id,
                    s:this.sku_ids.join(";")
                    }
            });
        }
    },
    watch: {
        dataList(newVlue) {
            this.sun_money();
        }
    },
    computed: {
        ...mapState(["websit"]),
        ...mapState(["shopCar"]),
        ...mapState(["userMessage"]),
        ...mapGetters("shopCar", ["Shoplen"])
    },
    updated() {},
    /**创建dom实例的时候,需要先调接口,对比vuex和接口的数据 */
    created() {
        this.sku_ids = this.shopCar.checkSku_ids;
        this.loadData();
    },
    beforeMount() {
        this.edit_text = "编辑";
        this.loadData();
    },
    mounted() {}
};
</script>
<style scoped>
.fade-enter,
.fade-leave-active {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.xz-bottom .cart-bottom {
    position: fixed;
    background: #fff;
    bottom: 100px;
    justify-content: space-between;
}
.xz-bottom {
    position: fixed;
    background: #fff;
    bottom: 100px;
    /* justify-content: space-between */
}
.cart-footprint-list {
    padding: 90px 0 100px 0;
}
.cart-counts {
    padding-top: 32px;
    margin-left: 30px;
    display: inline-block;
}
.cart-counts-desc {
    color: #8c8c8c;
    text-align: center;
}
.van-goods-action {
    position: absolute;
}
.center {
    flex: 1;
}
</style>

   