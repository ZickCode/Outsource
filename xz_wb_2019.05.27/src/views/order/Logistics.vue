<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="查看物流" fixed left-arrow/>
        <div class="ogistics-box">
            <article class="s-shop-item mb-20">
                <a href="javascript:void(0)">
                    <span class="s-shop-pic">
                        <img v-lazy="LogisticsData.logo" alt>
                    </span>
                    <div class="s-msg-cont">
                        <h4 v-text="LogisticsData.delivery_name"></h4>
                        <p v-if="LogisticsData.delivery_id>0">运单号：{{LogisticsData.delivery_sn}}</p>
                    </div>
                </a>
            </article>
            <div class="stepbox">
                <div class="steptit">
                    <h4>物流跟踪</h4>
                </div>
                <van-steps direction="vertical" active-color="#0068b7" slot="listContent">
                    <van-step
                        v-for="(item, index) in LogisticsData.logs"
                        :class="{active:index==0}"
                    >
                        <h3>{{item.msg}}</h3>
                        <p>{{item.time | formatDateTime}}</p>
                    </van-step>
                </van-steps>
            </div>
        </div>
    </div>
</template>

<script>
import { Step, Steps } from "vant";
import pullUp from "../../components/pull/index.vue";
export default {
    data() {
        return {
            postData: {
                method: "api.module.order.delivery.detail",
                o_d_id: 0
            },
            LogisticsData: []
        };
    },
    created() {
        let _id = this.$route.params.id;
        this.postData.o_d_id = _id;
        this.loadData();
    },
    components: {
        vanStep: Step,
        vanSteps: Steps,
        pullUp: pullUp
    },
    methods: {
        loadData() {
            let _this = this;
            let _loading = _this.$xzLoading();

            _this.post(_this.postData, function(data) {
                _loading.clear();
                if (200 !== data.code) {
                    _this.$toast({
                        message: data.msg,
                        position: "bottom"
                    });
                    _this.go_back();
                    return;
                }
                _this.LogisticsData = data.result;
            });
        }
    }
};
</script>