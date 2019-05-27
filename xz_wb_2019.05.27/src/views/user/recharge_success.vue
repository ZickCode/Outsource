<template>
    <div class="nav-main nav-main-bottom">
        <van-nav-bar @click-left="go_user" class="xz-nva-bar" title="余额充值" fixed left-arrow/>
        <div class="payment-suc-warp">
            <div class="payment-box">
                <span class="payment-icon">
                    <xz-icon :type="payIcon"/>
                </span>
                <p>{{payText}}</p>
                <h4>
                    充值金额
                    <span>{{websit.data.currency}}{{orderDetail.money}}</span>
                </h4>
            </div>
            <article class="flex-wrap psuccess-num">
                <span class="flex-wd p-time">流水号</span>
                <p class="flex-one p-name">{{order_sn}}</p>
            </article>
        </div>
        <div class="xz-btn btn-e43 xz-btn-bottom">
            <a :href="'#/user'" class="rt-link">返回个人中心</a>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "odsucceed",
    data() {
        return {
            order_sn: "",
            payText: "充值未完成",
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
        let _this = this;
        this.order_sn = this.$route.params.id;
        this.loadData();
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
        this.isConfirm = true;
    },
    methods: {
        loadData() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.member.money.payissuccess",
                    order_sn: _this.order_sn
                },
                function(data) {
                    _loading.clear();
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        this.$router.push("/user");
                        return;
                    }
                    _this.orderDetail = data.result;
                    if (_this.orderDetail.status == "1") {
                        _this.payText = "充值成功";
                        _this.payIcon = "roundcheck";
                    } else {
                        _this.payText = "充值未完成";
                        _this.payIcon = "info";
                    }
                }
            );
        },
        go_user(){
            this.$router.push("/user");
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.isConfirm) {
            this.$dialog.close();
            this.isConfirm = false;
            next(false);
        }  else if (!this.util.isEmpty(to.name) && to.name.indexOf("user") == -1){
            this.$router.push("/user");
            next(false);
        }else{
            next();
        }
    }
};
</script>