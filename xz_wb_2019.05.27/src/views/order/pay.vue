<template>
    <div class="nav-main nav-main-bottom bg-f0">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="支付订单" fixed left-arrow/>
        <div class="add-addres">
            <form class="g-form">
                <div class="amount">
                    <ul class="amount-list">
                        <li class="amount-num">
                            <h4>订单金额</h4>
                            <!-- <p>￥<i>5798</i>.00</p> -->
                            <p>
                                {{websit.data.currency}}
                                <i>{{orderDetail.real_amount | changePrice}}</i>
                                <span>.{{orderDetail.real_amount | splicePrice}}</span>
                            </p>
                        </li>
                        <li class="flex-wrap">
                            <span class="flex-wd lab-tit">订单号</span>
                            <div class="flex-one">
                                <p class="invoice-pic">{{orderDetail.sn}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="pay">
                    <div class="pay-nth1" v-if="userData.money>0 && websit.data.balance_pay==1">
                        <div class="c-store-hd">
                            <h3 class="z-tit">余额支付</h3>
                        </div>
                        <div class="pay-bd">
                            <ul class="pay-list">
                                <li>
                                    <input
                                        type="checkbox"
                                        name="yuebao"
                                        class="g-checked"
                                        :value="0"
                                        @change="balance_click"
                                    >
                                    <article class="gd-msg">
                                        <span class="z-gpic">
                                            <img src="../../assets/images/common/ico_p1.png">
                                        </span>
                                        <div class="gd-msg-txt">
                                            <p>余额钱包 ({{websit.data.currency}}{{userData.money}} )</p>
                                        </div>
                                    </article>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="pay-nth1">
                        <div class="c-store-hd">
                            <h3 class="z-tit">
                                选择支付方式
                                <span
                                    v-if="otherMoney>0"
                                >（还需支付{{websit.data.currency}}{{otherMoney | numFilter}}）</span>
                            </h3>
                        </div>
                        <div class="pay-bd">
                            <ul class="pay-list">
                                <li v-for="(bank,middleKey) in payitems" :key="middleKey">
                                    <input
                                        type="radio"
                                        name="yuebao"
                                        :checked="bank.checked"
                                        class="g-checked"
                                        :value="bank.paycode"
                                        @change="other_click"
                                    >
                                    <article class="gd-msg">
                                        <span class="z-gpic">
                                            <img :src="bank.imgsrc">
                                        </span>
                                        <div class="gd-msg-txt">
                                            <p>{{bank.bankname}}</p>
                                        </div>
                                    </article>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="xz-btn btn-e43 xz-btn-bottom">
            <a href="javascript:void(0)" @click="show_pwd" class="rt-link">立即支付</a>
        </div>
        <xz-Paypwd :random="true" :ismask="true" v-model="isPaypwd" @onok="pay_click"/>
    </div>
</template>
<script>
import { Checkbox, CheckboxGroup } from "vant";
import xzPaypwd from "@/components/xz-paypwd";
import { mapState, mapActions } from "vuex";
import returnlogisticsVue from "./afsale/returnlogistics.vue";
export default {
    data() {
        return {
            orderDetail: {},
            userData: {},
            sn: "",
            otherMoney: 0,
            isPaypwd: false,
            is_back: true,
            payitems: [],
            payData: {
                method: "api.module.order.order.detail_payment",
                balance_checked: 0,
                pay_code: "",
                pay_Bank: "",
                order_sn: "",
                pay_passwd: "",
                goback: ""
            },
            postData: {
                method: "api.module.order.cart.lists"
            }
        };
    },
    computed: {
        ...mapState(["websit"]),
        ...mapState(["userMessage"])
    },
    created() {
        this.sn = this.$route.params.sn;
        this.loadData();
        this.loadPays();
    },
    methods: {
        loadData() {
            let _this = this;
            _this.post(
                {
                    method: "api.module.order.order.detailorder",
                    order_sn: _this.sn
                },
                function(data) {
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    _this.orderDetail = data.result;
                    _this.payData.order_sn = _this.orderDetail.sn;
                    _this.payData.goback =
                        _this.util.mobileUrl +
                        "/#/order/payend/" +
                        _this.orderDetail.sn;
                    if (_this.orderDetail._status.now != "create") {
                        _this.$toast({
                            message: "该订单已支付",
                            position: "bottom"
                        });
                        _this.is_back = false;
                        _this.go_back();
                        return;
                    }
                    _this.post(
                        {
                            method: "api.module.member.member.data"
                        },
                        function(data) {
                            if (200 !== data.code) {
                                _this.$toast({
                                    message: data.msg,
                                    position: "bottom"
                                });
                                return;
                            }
                            _this.userData = data.result;
                            _this.otherMoney = parseFloat(
                                _this.orderDetail.real_amount
                            );
                        }
                    );
                }
            );
        },
        loadPays() {
            let _this = this;
            let _pays = _this.websit.data.pay_type;
            _pays.forEach(item => {
                if (item == 1 && !_this.websit.isWeix) {
                    _this.payitems.push({
                        imgsrc: require("../../assets/images/common/ico_p2.png"),
                        bankname: "支付宝",
                        paycode: "alipay",
                        value: 1,
                        checked: false
                    });
                } else if (item == 2 && _this.websit.isWeix) {
                    let _wxpayCode = _this.websit.isWeix
                        ? "wechat_js"
                        : "wechat_mweb";
                    _this.payitems.push({
                        imgsrc: require("../../assets/images/common/ico_p3.png"),
                        bankname: "微信",
                        paycode: _wxpayCode,
                        value: 2,
                        checked: false
                    });
                }
            });
            if (_pays.length > 0) {
                _this.payitems.forEach(item => {
                    if (_this.websit.isWeix) {
                        if (item.value == 2) {
                            _this.payData.pay_code = item.paycode;
                            item.checked = true;
                        }
                    } else {
                        if (_pays[0] == item.value) {
                            _this.payData.pay_code = item.paycode;
                            item.checked = true;
                        }
                    }
                });
            }
        },
        balance_click: function(e) {
            var _this = this;
            if (e.target.checked) {
                if (
                    parseFloat(_this.userData.money) -
                        parseFloat(_this.orderDetail.real_amount) <
                    0
                ) {
                    _this.otherMoney =
                        parseFloat(_this.orderDetail.real_amount) -
                        parseFloat(_this.userData.money);
                } else {
                    _this.otherMoney = 0;
                    _this.payitems.forEach(element => {
                        element.checked = false;
                    });
                }
                _this.payData.balance_checked = 1;
                _this.payData.pay_code = "";
            } else {
                _this.payData.balance_checked = 0;
                _this.otherMoney = parseFloat(_this.orderDetail.real_amount);
            }
        },
        other_click: function(e) {
            var _this = this;
            if (e.target.checked && _this.otherMoney == 0) {
                e.target.checked = !e.target.checked;
                return;
            } else if (e.target.checked) {
                _this.payData.pay_code = e.target.value;
            } else {
                _this.payData.pay_code = "";
            }
        },
        show_pwd() {
            if (
                this.payData.balance_checked == 0 &&
                this.util.isEmpty(this.payData.pay_code)
            ) {
                this.$toast({
                    message: "请选择支付方式"
                });
                return;
            }
            this.payData.pay_passwd = "";
            if (this.payData.balance_checked == 1) {
                if (this.util.isEmpty(this.userMessage.user.pay_password)) {
                    this.isPaypwd = false;
                    this.is_back = false;
                    this.$router.push("/user/balancewallet");
                } else {
                    this.isPaypwd = true;
                }
            } else {
                this.pay_click("");
            }
        },
        pay_click(val) {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.payData.pay_passwd = val;
            _this.isPaypwd = false;
            _this.post(_this.payData, function(data) {
                _loading.clear();
                if (200 !== data.code) {
                    _this.$toast({
                        message: _this.util.isEmpty(data.msg) ? data : data.msg,
                        position: "bottom"
                    });
                    return;
                }
                if (_this.util.isEmpty(_this.payData.pay_code)) {
                    _this.$toast({
                        message: "订单支付成功",
                        position: "bottom"
                    });
                    _this.is_back = false;
                    _this.$router.push("/order/payend/" + _this.orderDetail.sn);
                } else {
                    if (!_this.util.isEmpty(data.result.gateway.gateway_url)) {
                        _this.is_back = false;
                        if (_this.payData.pay_code == "alipay") {
                            setTimeout(function() {
                                _this.$router.push(
                                    "/order/payend/" + _this.orderDetail.sn
                                );
                            }, 2000);
                        }
                        window.location.href = data.result.gateway.gateway_url;
                    } else {
                        _this.$toast({
                            message: "订单支付异常"
                        });
                    }
                }
            });
        }
    },
    components: {
        vanCheckbox: Checkbox,
        xzPaypwd
    },
    beforeRouteLeave(to, from, next) {
        let _this = this;
        if (this.isPaypwd) {
            this.isPaypwd = false;
            next(false);
        } else if (this.is_back) {
            this.$dialog
                .confirm({
                    message: "您的订单还未支付，您确认离开？"
                })
                .then(() => {
                    this.is_back = false;
                    if (
                        !_this.util.isEmpty(to.name) &&
                        to.name.indexOf("orderconfirm") > -1
                    ) {
                        if (_this.orderDetail._subs.length > 0) {
                            _this.$router.push(
                                "/order/detail/" +
                                    _this.orderDetail._subs[0].sub_sn
                            );
                        } else {
                            _this.$router.push("/");
                        }
                    } else {
                        _this.go_back();
                    }
                })
                .catch(() => {
                    this.is_back = true;
                });
            next(false);
        } else {
            next();
        }
    }
};
</script>