<template>
    <div class="myorder-view">
        <van-nav-bar
            @click-left="go_back"
            class="xz-nva-bar"
            fixed
            :z-index="100"
            title="我的订单"
            left-arrow
        />
        <van-tabs
            v-model="active"
            sticky
            :offset-top="tabOffsetTop"
            swipeable
            :swipe-threshold="5"
            @change="handleTabChange"
            ref="ortabs"
        >
            <van-tab :title="tb.title" v-for="(tb ,i ) in orTabs" :key="i">
                <div class="xz-tab" slot="title" v-text="tb.title"></div>
                <!--说明： postData： 需要传的加的数据    loadListSuccFn： 加载成功后回调，返回加载后的数据  ablePull：String 是否可以下拉刷新 取值： true或false ;
                ableLoad 是否可以上拉加载，String  true或false-->
                <pull-up
                    :postData="tb.postData"
                    @loadListSuccFn="loadListSuccFn"
                    ablePull="true"
                    ableLoad="true"
                    :ref="tb.ref"
                    :pullid="i"
                >
                    <div slot="listContent" style="overflow: hidden;">
                        <article class="order-item" v-for="item in tb.dataList" :key="item.id">
                            <div class="order-hd">
                                <span class="status">{{item._status.wait_ch}}</span>
                                <h4 class="order-num">订单号：{{item.sub_sn}}</h4>
                            </div>
                            <div class="order-bd">
                                <ul class="order-list">
                                    <li class="item" v-for="(list,index) in item._skus" :key='index'>
                                        <a :href="'#/order/detail/'+item.sub_sn" class="item-cont" :class="{'other-goods':list.is_give==1}">
                                            <div class="order-pic">
                                                <img v-lazy="util.reImg(list.sku_thumb)" alt>
                                            </div>
                                            <div class="order-txt">
                                                <div class="order-tit">
                                                    <span>{{list.sku_name}}</span>
                                                </div>
                                                <p class="norms" v-if="list.is_give==1">加钱换购</p>
                                            <p class="norms" v-html="list._sku_spec" v-else></p>
                                                <p class="price">
                                                    <em>x{{list.buy_nums}}</em>
                                                    <span>
                                                        <label>{{websit.data.currency}}</label>
                                                        <strong>{{list.sku_price}}</strong>
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                     <li class="item" v-for="(list,index) in item._gifts" :key='index'>
                                        <a :href="'#/order/detail/'+item.sub_sn" class="item-cont other-goods">
                                            <div class="order-pic">
                                                <img v-lazy="util.reImg(list.thumb)" alt>
                                            </div>
                                            <div class="order-txt">
                                                <div class="order-tit">
                                                    <span>{{list.gift_title}}</span>
                                                </div>
                                                <p class="norms" >满额赠品</p>
                                                <p class="price">
                                                    <em>x{{list.number}}</em>
                                                    <span>
                                                        <label>{{websit.data.currency}}</label>
                                                        <strong>0.00</strong>
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="order-ftr">
                                <div class="total">
                                    <p class="total-order">共{{item.buy_nums}}件商品</p>
                                    <p class="total-price">实付款：{{item.real_price}}</p>
                                </div>
                                <div class="btn-box">
                                    <a
                                        href="javascript:void(0)"
                                        @click="cancel_order(item.sub_sn,tb.ref)"
                                        v-if="item._status.now=='create'"
                                    >取消订单</a>
                                    <a
                                        :href="'#/order/Logistics/'+item._skus[0].delivery_id"
                                        v-if="item._status.now=='all_delivery'"
                                    >查看物流</a>
                                    <a
                                        href="javascript:void(0)"
                                        @click="finish_order(item.sub_sn,item._skus[0].delivery_id,tb.ref)"
                                        v-if="item._status.now=='all_delivery'"
                                    >确认收货</a>
                                    <a
                                        :href="'#/order/common'"
                                        v-if="item._status.now=='all_finish' && item._skus.filter(c=>c.iscomment==0).length>0"
                                    >评价晒单</a>
                                    <a
                                        :href="'#/order/pay/'+item.order_sn"
                                        class="red"
                                        v-if="item._status.now=='create'"
                                    >立即付款</a>
                                    <a
                                        href="javascript:void(0)"
                                        class="red"
                                        v-if="item._status.now=='all_finish'"
                                        @click="buy_again(item._skus)"
                                    >再次购买</a>
                                </div>
                            </div>
                        </article>
                    </div>
                </pull-up>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { Tab, Tabs } from "vant";
import pullUp from "../../components/pull/index.vue";
import { mapState } from "vuex";
export default {
    name: "myorder",
    components: {
        "van-tabs": Tabs,
        "van-tab": Tab,
        pullUp: pullUp
    },
    data() {
        return {
            edit_text: "编辑",
            tabOffsetTop: 50,
            active: 0,
            isConfirm: false,
            confirm: null,
            orTabs: [
                {
                    title: "全部",
                    ref: "orPull0",
                    postData: {
                        method: "api.module.order.order.lists",
                        limit: 5
                    },
                    dataList: []
                },
                {
                    title: "待付款",
                    ref: "orPull1",
                    postData: {
                        method: "api.module.order.order.lists",
                        type: 1,
                        limit: 5
                    },
                    dataList: []
                },
                {
                    title: "待发货",
                    ref: "orPull2",
                    postData: {
                        method: "api.module.order.order.lists",
                        type: 3,
                        limit: 5
                    },
                    dataList: []
                },
                {
                    title: "待收货",
                    ref: "orPull3",
                    postData: {
                        method: "api.module.order.order.lists",
                        type: 4,
                        limit: 5
                    },
                    dataList: []
                },
                {
                    title: "已完成",
                    ref: "orPull4",
                    postData: {
                        method: "api.module.order.order.lists",
                        type: 5,
                        limit: 5
                    },
                    dataList: []
                }
            ]
        };
    },
    computed: {
        ...mapState(["websit"])
    },
    created() {
        let _id = this.$route.params.id;
        if (!this.util.isEmpty(_id)) {
            this.active = parseInt(_id);
        }
    },
    methods: {
        loadListSuccFn(dataList, data, i) {
            // tab 数据加载成功以后回调
            this.orTabs[i].dataList = dataList;
        },
        handleTabChange(index, title) {
            this.active = index;
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
                            _this.$refs[ref][0].onRefresh();
                        }
                    );
                })
                .catch(() => {
                    _this.isConfirm = false;
                });
            _this.isConfirm = true;
        },
        finish_order(sn, o_d_id, ref) {
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
                            _this.$refs[ref][0].onRefresh();
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
        }
    },
    mounted() {
        var _this = this;
        let _navbar = document.getElementsByClassName("navbar");
        if (_navbar.length > 0) {
            this.tabOffsetTop = _navbar[0].offsetHeight;
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.isConfirm) {
            this.$dialog.close();
            this.isConfirm = false;
            next(false);
        } else {
            next();
        }
    }
};
</script>
