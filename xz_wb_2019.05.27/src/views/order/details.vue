<template>
    <div class="nav-main nav-main-bottom bg-f0">
        <van-nav-bar
            ref="nav"
            @click-left="go_back"
            class="xz-nva-bar"
            title="订单详情"
            fixed
            left-arrow
        />
        <form class="g-form" v-if="!util.isEmpty(orderDetail.sub_sn)">
            <div class="order-detil">
                <article ref="orderSN" class="flex-wrap purchase-hd zod-bg">
                    <p class="flex-one p-name" v-text="'订单号：'+orderDetail.sub_sn"></p>
                    <span class="flex-wd p-time" v-text="orderDetail._status.wait_ch"></span>
                </article>
                <div class="c-order-hd mb-20" ref="address">
                    <article class="re-goods">
                        <a href="javascript:void(0)" class="flex-wrap z-link">
                            <span class="flex-wd lab-tit">收货人</span>
                            <div class="flex-one gd-msg-txt">
                                <p class="sh-name">
                                    <i v-text="orderDetail._main.address_name"></i>
                                    <span v-text="orderDetail._main.address_mobile"></span>
                                </p>
                                <p v-text="orderDetail._main.address_detail"></p>
                            </div>
                        </a>
                    </article>
                </div>
                <div class="o-logistics mb-20" v-if="orderDetail._status.now=='all_delivery'">
                    <article class="re-goods">
                        <a href="#/user/Logistics" class="flex-wrap z-link">
                            <span class="flex-wd lab-tit">物流</span>
                            <div class="flex-one gd-msg-txt">
                                <p class="xz-title" v-text="orderDetail._track[0].msg"></p>
                                <p>{{orderDetail._track[0].time | formatDateTime}}</p>
                            </div>
                        </a>
                    </article>
                </div>
                <div class="frd-wrap mb-20">
                    <div class="freight">
                        <ul class="ordmsg-list">
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">下单时间：</span>
                                <div
                                    class="flex-one gd-msg-txt"
                                >{{orderDetail.system_time | formatDateTime}}</div>
                            </li>
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">商品合计：</span>
                                <div
                                    class="flex-one gd-msg-txt"
                                >{{websit.data.currency}}{{orderDetail.sku_price}}</div>
                            </li>
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">运费：</span>
                                <div
                                    class="flex-one gd-msg-txt"
                                >{{websit.data.currency}}{{orderDetail.delivery_price}}</div>
                            </li>
                            <li class="flex-wrap last">
                                <span class="flex-wd lab-tit">应付合计：</span>
                                <div class="flex-one gd-msg-txt">
                                    <span
                                        class="red-cor"
                                    >{{websit.data.currency}}{{orderDetail.real_price}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="receipt" v-if="!util.isEmpty(orderDetail._main.invoice_title)">
                        <ul class="ordmsg-list">
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">发票：</span>
                                <div class="flex-one gd-msg-txt">
                                    <p>{{orderDetail._main.invoice_title}}</p>
                                    <span class="o-type">{{orderDetail._main.invoice_content}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="judge">
                    <article class="eval-item">
                        <div class="flex-wrap judge-hd">
                            <p class="flex-one">商品明细</p>
                        </div>
                        <div class="judge-bd">
                            <ul class="judge-list">
                                <li
                                    class="mui-table-view-cell"
                                    v-for="(list,li) in orderDetail._skus"
                                >
                                    <div class="flex-wrap judli-wrap" :class="{'other-goods':list.is_give==1}">
                                        <a
                                            :href="'#/goods/detail/'+list.sku_id"
                                            class="flex-wd z-gpic"
                                        >
                                            <img v-lazy="util.reImg(list.sku_thumb)">
                                        </a>
                                        <div class="flex-one judli-msg">
                                            <h3 class="judli-tit">
                                                <a
                                                    :href="'#/goods/detail/'+list.sku_id"
                                                >{{list.sku_name}}</a>
                                            </h3>
                                            <p class="norms" v-if="list.is_give==1">加钱换购</p>
                                            <p class="norms" v-html="list._sku_spec" v-else></p>
                                            <div class="flex-wrap sunburn">
                                                <p class="flex-one sun-price">
                                                    {{websit.data.currency}}
                                                    <span>
                                                        <label>{{list.real_price | changePrice}}.</label>
                                                        <i
                                                            class="samll-num"
                                                        >{{list.real_price | splicePrice}}</i>
                                                    </span>
                                                </p>
                                                <span class="flex-wd sun-num">x {{list.buy_nums}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li
                                    class="mui-table-view-cell"
                                    v-for="(item,i) in orderDetail.gifts"
                                    :key="i"
                                >
                                    <div class="flex-wrap judli-wrap other-goods">
                                        <a
                                            href="javascript:void(0)"
                                            class="flex-wd z-gpic"
                                        >
                                            <img v-lazy="util.reImg(item.thumb)">
                                        </a>
                                        <div class="flex-one judli-msg">
                                            <h3 class="judli-tit">
                                                <a
                                                    href="javascript:void(0)"
                                                    v-text="item.gift_title"
                                                ></a>
                                            </h3>
                                            <p class="norms">满额赠品</p>
                                            <div class="flex-wrap sunburn">
                                                <p class="flex-one sun-price">
                                                    {{websit.data.currency}}
                                                    <span>
                                                        <span>0.</span>
                                                        <i class="samll-num">00</i>
                                                    </span>
                                                </p>
                                                <span class="flex-wd sun-num">x{{item.number}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </form>
        <div
            class="xz-btn-bottom"
            v-if="!util.isEmpty(orderDetail._status) && orderDetail._status.now!='pay'"
        >
            <div class="flex-wrap or-menu-wrap">
                <a
                    class="flex-wd od-link"
                    href="javascript:void(0)"
                    @click="cancel_order(orderDetail.sub_sn)"
                    v-if="orderDetail._status.now=='create'"
                >取消订单</a>
                <a
                    class="flex-wd od-link"
                    :href="'#/order/Logistics/'+orderDetail._skus[0].delivery_id"
                    v-if="orderDetail._status.now=='all_delivery'"
                >查看物流</a>
                <a
                    class="flex-wd od-link"
                    href="javascript:void(0)"
                    @click="finish_order(orderDetail.sub_sn,orderDetail._skus[0].delivery_id)"
                    v-if="orderDetail._status.now=='all_delivery'"
                >确认收货</a>
                <a
                    class="flex-wd od-link"
                    href="javascript:void(0)"
                    v-if="orderDetail._status.now=='all_finish' || orderDetail._status.now=='cancel'"
                    @click="buy_again(orderDetail._skus)"
                >再次购买</a>
                <a
                    class="flex-wd od-link rt-pay"
                    :href="'#/order/common'"
                    v-if="orderDetail._status.now=='all_finish' && orderDetail._skus.filter(c=>c.isComment==0).length>0"
                >评价晒单</a>
                <a
                    class="flex-wd od-link rt-pay"
                    :href="'#/order/pay/'+orderDetail.order_sn"
                    @click="isSubmit = true"
                    v-if="orderDetail._status.now=='create'"
                >立即付款</a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            sn: "",
            isConfirm: false,
            confirm: null,
            isSubmit: false,
            orderDetail: {}
        };
    },
    computed: {
        ...mapState(["websit"])
    },
    created() {
        this.sn = this.$route.params.sn;
        this.loadData();
    },
    methods: {
        loadData() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.order.order.detail",
                    order_sn: _this.sn
                },
                function(data) {
                    _loading.clear();
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    _this.orderDetail = data.result;
                }
            );
        },
        cancel_order(sn, ref) {
            let _this = this;
            _this.confirm = _this.$dialog
                .confirm({
                    message: "确定取消该订单吗？"
                })
                .then(() => {
                    let _loading = _this.$xzLoading();
                    _this.isConfirm = false;
                    _this.post(
                        {
                            method: "api.module.order.order.cancel",
                            sub_sn: sn
                        },
                        function(data) {
                            _loading.clear();
                            if (200 !== data.code) {
                                _this.$toast({
                                    message: data.msg,
                                    position: "bottom"
                                });
                                return;
                            }
                            _this.$toast({
                                message: "取消订单成功",
                                position: "bottom"
                            });
                            _this.loadData();
                        }
                    );
                })
                .catch(() => {
                    _this.isConfirm = false;
                });
            _this.isConfirm = true;
        },
        finish_order(sn, o_d_id) {
            let _this = this;
            _this.confirm = _this.$dialog
                .confirm({
                    message: "确定收货吗？"
                })
                .then(() => {
                    let _loading = _this.$xzLoading();
                    _this.isConfirm = false;
                    _this.post(
                        {
                            method: "api.module.order.order.finish",
                            sub_sn: sn,
                            o_d_id: o_d_id
                        },
                        function(data) {
                            _loading.clear();
                            if (200 !== data.code) {
                                _this.$toast({
                                    message: data.msg,
                                    position: "bottom"
                                });
                                return;
                            }
                            _this.$toast({
                                message: "确定收货成功",
                                position: "bottom"
                            });
                            _this.loadData();
                        }
                    );
                })
                .catch(() => {
                    _this.isConfirm = false;
                });
            _this.isConfirm = true;
        },
        buy_again(_skus) {
            let _this = this;
            let _params = {};
            let _confirmIds=[];
            _skus.forEach(item => {
                _params[item.sku_id]=item.buy_nums;
                _confirmIds.push({
                    sku_id:item.sku_id,
                    buy_nums:item.buy_nums
                })
            });
            let _buy_againData = {
                method: "api.module.order.cart.add",
                params: JSON.stringify(_params),
                buynow: true
            };
            let _loading = _this.$xzLoading();
            _this.post(_buy_againData, function(data) {
                _loading.clear();
                if (200 !== data.code) {
                    _this.$toast({
                        message: data.msg,
                        position: "bottom"
                    });
                    return;
                }
                _this.$router.push({
                    name: "orderconfirm",
                    query: {
                        s: _confirmIds.map(c=>c.sku_id+','+c.buy_nums).join(";")
                    }
                });
            });
        },
        onScroll() {
            let _address = this.$refs.address;
            let _nav = this.$refs.nav._vnode.elm;
            let _orderSN = this.$refs.orderSN;
            if (!this.util.isEmpty(_address)) {
                if (
                    document.documentElement.scrollTop - _address.offsetHeight >
                    -50
                ) {
                    _address.style["position"] = "fixed";
                    _address.style["top"] = _nav.offsetHeight + "px";
                    _orderSN.style["margin-bottom"] =
                        _address.offsetHeight + "px";
                } else {
                    console.log(
                        document.documentElement.scrollTop - _address.offsetTop
                    );
                    _address.style["position"] = "initial";
                    _address.style["top"] = 0;
                    _orderSN.style["margin-bottom"] = 0;
                }
            }
        }
    },
    updated() {
        window.addEventListener("scroll", this.onScroll);
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll);
    },
    beforeRouteLeave(to, from, next) {
        if (this.isConfirm) {
            this.$dialog.close();
            this.isConfirm = false;
            next(false);
        } else if (
            !this.util.isEmpty(to.name) &&
            to.name.indexOf("pay") > -1 &&
            !this.isSubmit
        ) {
            this.$router.push("/user");
            next(false);
        } else {
            window.removeEventListener("scroll", this.onScroll); //离开页面删除监听
            next();
        }
    }
};
</script>
