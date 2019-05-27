<template>
    <div class="nav-main nav-main-bottom">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="支付订单" fixed left-arrow/>
        <div class="payment-suc-warp">
            <div class="payment-box">
                <span class="payment-icon">
                    <xz-icon :type="payIcon"/>
                </span>
                <p>{{payText}}</p>
                <h4>
                    订单金额：
                    <span>{{websit.data.currency}}{{orderDetail.real_amount}}</span>
                </h4>
            </div>
            <article class="flex-wrap psuccess-num">
                <span class="flex-wd p-time">订单号</span>
                <p class="flex-one p-name">{{orderDetail.sn}}</p>
            </article>
        </div>
        <div class="xz-btn btn-e43 xz-btn-bottom">
            <a :href="'#/order/detail/'+orderDetail._subs[0].sub_sn" class="rt-link">查看订单</a>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "odsucceed",
    data() {
        return {
            sn: "",
            payText: "支付未完成",
            payIcon: "info",
            orderDetail: {},
            isConfirm: false,
            confirm: null
        };
    },
    computed: {
        ...mapState(["websit"])
    },
    created() {
        var _this = this;
        this.sn = this.$route.params.sn;
        this.loadData();
        if (!this.websit.isWeix) {
            this.confirm = this.$dialog
                .confirm({
                    message: "支付完成？"
                })
                .then(() => {
                    _this.isConfirm = false;
                    this.loadData();
                })
                .catch(() => {
                    _this.isConfirm = false;
                });
        }
        this.isConfirm = true;
    },
    methods: {
        loadData() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.order.order.detailorder",
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
                    if (_this.orderDetail._status.now == "create") {
                        _this.payText = "支付未完成";
                        _this.payIcon = "info";
                    } else {
                        _this.payText = "支付成功";
                        _this.payIcon = "roundcheck";
                    }
                }
            );
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.isConfirm) {
            this.$dialog.close();
            this.isConfirm = false;
            next(false);
        } else if (!this.util.isEmpty(to.name) && to.name.indexOf("pay") > -1) {
            this.$router.push(
                "/order/detail/" + this.orderDetail._subs[0].sub_sn
            );
            next(false);
        } else {
            next();
        }
    }
};
</script>