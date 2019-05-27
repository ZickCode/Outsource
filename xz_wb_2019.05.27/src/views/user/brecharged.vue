<template>
    <div class="nav-main nav-main-bottom bg-f0">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="余额充值" fixed left-arrow/>
        <div class="add-addres">
            <form class="g-form">
                <div class="amount">
                    <ul class="amount-list">
                        <li>
                            <div>
                                <p class="bala-tips">请输入充值金额(元)</p>
                                <div class="flex-wrap balance-box">
                                    <span class="flex-wd balance-icon">
                                        <img :src="balanceImg">
                                    </span>
                                    <div class="flex-one balance-one">
                                        <input
                                            v-model.number="payData.money"
                                            type="number"
                                            class="z-ipt"
                                        >
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="bala-tips">
                            <p>最低充值金额为0.01元</p>
                        </li>
                    </ul>
                </div>
                <div class="pay">
                    <div class="pay-nth1">
                        <div class="c-store-hd">
                            <h3 class="z-tit">选择支付方式</h3>
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
        <div class="xz-btn btn-e43 xz-btn-bottom" @click="save_Recharge">立即支付</div>
    </div>
</template>
<script>
import { Checkbox, CheckboxGroup } from "vant";
import { mapState, mapActions } from "vuex";
export default {
    name: "myconsult",
    data() {
        return {
            balanceImg: require("../../assets/images/common/ico_pay.png"),
            checkedVal: "",
            payitems: [],
            payData: {
                method: "api.module.member.money.pay",
                money: "",
                pay_code: "",
                goback: ""
            }
        };
    },
    created() {
        this.loadPays();
    },
    methods: {
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
        save_Recharge: function() {
            let _this = this;
            if (_this.util.isEmpty(_this.payData.pay_code)) {
                _this.$toast({
                    message: "请选择支付方式",
                    position: "bottom"
                });
                return;
            }
            let _loading = _this.$xzLoading();
            _this.payData.goback =
                        _this.util.mobileUrl +
                        "/#/user/brecharged/success";
            _this.post(_this.payData, function(data) {
                _loading.clear();
                if (200 !== data.code) {
                    _this.$toast({
                        message: _this.util.isEmpty(data.msg) ? data : data.msg,
                        position: "bottom"
                    });
                    return;
                }
                if (!_this.util.isEmpty(data.result.gateway_url)) {
                    if(_this.payData.pay_code=='alipay'){
                        setTimeout(function (){
                            _this.$router.push("/user/brecharged/success/" + data.result.order_sn);
                        }, 2000);
                    }
                    window.location.href = data.result.gateway_url;
                } else {
                    _this.$toast({
                        message: "订单支付异常"
                    });
                }
            });
        }
    },
    computed: {
        ...mapState(["websit"])
    }
};
</script>