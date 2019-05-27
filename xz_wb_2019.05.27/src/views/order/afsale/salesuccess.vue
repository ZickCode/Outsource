<template>
    <div class="nav-main nav-main-bottom">
        <van-nav-bar
            @click-left="$router.go(-2)"
            fixed
            class="xz-nva-bar nav-fix"
            title="售后服务"
            left-arrow
        />
        <div class="payment-suc-warp" v-if="afsaleData._info">
            <div class="payment-box bm-none">
                <span class="payment-icon">
                    <xz-icon type="roundcheck"/>
                </span>
                <p>您已提交成功，等待售后处理</p>
                <h4>退款金额：
                    <span>{{websit.data.currency}}{{ afsaleData._info.amount | numFilter}}</span>
                </h4>
            </div>
        </div>
        <div class="sale-success"  v-if="afsaleData._info">
            <article class="s-shop-item mb-20">
                <a href="javascript:void(0)">
                    <span class="s-shop-pic">
                        <img>
                    </span>
                    <div class="s-msg-cont">
                        <h4>{{afsaleData._info.delivery_name}}</h4>
                        <p>运单号：{{afsaleData._info.delivery_sn}}</p>
                    </div>
                </a>
            </article>
        </div>
        <a class="xz-btn btn-e43 xz-btn-bottom" href="#/order/afsale/service">返回我的售后</a>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "salesuccess",
    data() {
        return {
            afsaleData:{}
        };
	},
	computed: {
        ...mapState(["websit"])
    },
    created() {
        let _this = this;
        let _id = _this.$route.params.id;
        if (_this.util.isEmpty(_id)) {
            _this.go_back();
            return;
        }
        _this.id = _id;
        _this.loadData();
    },
    methods: {
        loadData() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.order.server.order_server_detail",
                    o_sku_id: _this.id
                },
                function(data) {
                    _loading.clear();
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg
                        });
                        return;
                    }
                    _this.afsaleData = data.result;
                }
            );
        }
    }
};
</script>
