<template>
    <div class="scroller-view">
        <van-nav-bar
            @click-left="go_back"
            fixed
            class="xz-nva-bar nav-fix"
            title="售后服务"
            left-arrow
        />
        <div class="judge">
            <pull-up :postData="postData" @loadListSuccFn="loadListSuccFn">
                <div slot="listContent">
                    <article class="eval-item" v-for="(item,index) in dataList" :key="index">
                        <div class="flex-wrap judge-hd">
                            <p class="flex-one">订单号：{{item.sub_sn}}</p>
                        </div>
                        <div class="judge-bd">
                            <ul class="judge-list">
                                <li class="mui-table-view-cell">
                                    <div class="flex-wrap judli-wrap" @click="go_goods(index)">
                                        <a class="flex-wd z-gpic" href="javascript:void(0)">
                                            <img v-lazy="util.reImg(item.sku_thumb)">
                                        </a>
                                        <div class="flex-one judli-msg">
                                            <h3 class="judli-tit">
                                                <span>{{item.sku_name}}</span>
                                            </h3>
                                            <p class="norms" v-html="item._sku_spec"></p>
                                            <div class="flex-wrap sunburn">
                                                <p class="flex-one sun-price">
                                                    {{websit.data.currency}}
                                                    <span>
                                                        {{item.real_price | changePrice}}.
                                                        <i
                                                            class="samll-num"
                                                        >{{item.real_price | splicePrice}}</i>
                                                    </span>
                                                </p>
                                                <span class="flex-wd sun-num">x {{item.buy_nums}}</span>
                                                <a
                                                    class="flex-wd od-link ight-ash"
                                                    href="javascript:void(0);"
                                                    v-if="item._server._status == 0"
                                                    @click.stop="go_detail(index)"
                                                >申请中</a>
                                                <a
                                                    class="flex-wd od-link ight-ash"
                                                    href="javascript:void(0);"
                                                    v-if="item._server.type==1 && item._server._status == 1 && item._server.status==1"
                                                    @click.stop="go_retuen(index)"
                                                >同意退货</a>
                                                <a
                                                    class="flex-wd od-link ight-ash"
                                                    href="javascript:void(0);"
                                                    v-if="item._server.type==1 && item._server._status == 1 && item._server.status == 2"
                                                    @click.stop="go_retuen(index)"
                                                >买家寄回</a>
                                                <a
                                                    class="flex-wd od-link ight-ash"
                                                    href="javascript:void(0);"
                                                    v-if="item._server._status == 2"
                                                    @click.stop="go_detail(index)"
                                                >售后完成</a>
                                                <a
                                                    class="flex-wd od-link ight-ash"
                                                    href="javascript:void(0);"
                                                    v-if="item._server._status == -1"
                                                    @click.stop="go_detail(index)"
                                                >已取消</a>
                                                <a
                                                    class="flex-wd od-link ight-ash"
                                                    href="javascript:void(0);"
                                                    v-if="item._server._status == -2"
                                                    @click.stop="go_detail(index)"
                                                >卖家拒绝</a>
                                                <a
                                                    class="flex-wd od-link rt-pay"
                                                    href="javascript:void(0);"
                                                    @click.stop="go_toapply(index)"
                                                    v-if="item._server.type==0"
                                                >申请售后</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </article>
                </div>
            </pull-up>
        </div>
    </div>
</template>
<script>
import pullUp from "../../../components/pull/index.vue";
import { mapState } from "vuex";
export default {
    name: "service",
    data() {
        return {
            postData: {
                method: "api.module.order.order.serve",
                limit: 5
            },
            dataList: []
        };
    },
    components: {
        pullUp
    },
    computed: {
        ...mapState(["websit"])
    },
    methods: {
        loadListSuccFn(dataList, data) {
            this.dataList = dataList;
        },
        go_toapply(index) {
            this.$router.push({
                name: "orderafsaleapply",
                params: {
                    order_sku: this.dataList[index]
                }
            });
        },
        go_detail(index) {
            this.$router.push({
                name: "afsaledetail",
                params: { order_sku: this.dataList[index] }
            });
        },
        go_goods(index) {
            this.$router.push("/goods/detail/" + this.dataList[index].sku_id);
        },
        go_retuen(index) {
            this.$router.push(
                "/order/afsale/returngoods/" + this.dataList[index].id
            );
        }
    }
};
</script>
  