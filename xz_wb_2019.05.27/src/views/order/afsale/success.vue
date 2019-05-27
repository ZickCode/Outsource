<template>
    <div :class="['nav-main',skuData._server.status==0?'nav-main-bottom':'']">
        <van-nav-bar @click-left="go_back()" class="xz-nva-bar" title="售后申请成功" fixed left-arrow/>
        <div class="payment-suc-warp">
            <div class="payment-box">
                <span class="payment-icon">
                    <xz-icon type="roundcheck"/>
                </span>
                <p v-if="skuData._server.status==0">您已申请成功，等待卖家处理</p>
                <p v-if="skuData._server.status==1">卖家处理</p>
                <p v-if="skuData._server.status==-1">已取消申请</p>
                <h4>
                    退款金额：
                    <span>{{websit.data.currency}}{{ skuData._server.amount | numFilter}}</span>
                </h4>
            </div>
            <div class="saleafter-tips">
                <p>如果卖家同意，您可以退货给卖家并完成退款</p>
                <p>如果卖家拒绝，需要您修改售后申请</p>
                <p>每个商品您只有一次售后维权的机会</p>
            </div>
        </div>
        <div
            class="xz-btn btn-e43 xz-btn-bottom"
            @click="cancel_click"
            v-if="skuData._server.status==0"
        >取消售后申请</div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "success",
    data() {
        return {
            skuData: {}
        };
    },
    computed: {
        ...mapState(["websit"])
    },
    created() {
        let _this = this;
        let _sku = _this.$route.params.order_sku;
        if (_this.util.isEmpty(_sku)) {
            _this.go_back();
            return;
        }
        _this.skuData = _sku;
    },
    methods: {
        cancel_click() {
            let _this = this;
            _this.$dialog
                .confirm({
                    message: "确认取消申请售后？"
                })
                .then(() => {
                    let _loading = _this.$xzLoading();
                    _this.post(
                        {
                            method:
                                "api.module.order.server.order_server_cancel",
                            id: _this.skuData.id
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
                                message: "取消申请成功",
                                position: "bottom"
                            });
                            _this.skuData._server.status = -1;
                        }
                    );
                })
                .catch(() => {
                    // on cancel
                });
        }
    }
};
</script>