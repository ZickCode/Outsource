<template>
    <div class="scroller-view">
        <van-nav-bar @click-left="go_back" fixed class="xz-nva-bar nav-fix" title="商品评价" left-arrow/>
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
                                    <div class="flex-wrap judli-wrap">
                                        <a
                                            :href="'#/goods/detail/'+item.sku_id"
                                            class="flex-wd z-gpic"
                                        >
                                            <img v-lazy="util.reImg(item.sku_thumb)">
                                        </a>
                                        <div class="flex-one judli-msg">
                                            <h3 class="judli-tit">
                                                <a
                                                    :href="'#/goods/detail/'+item.sku_id"
                                                >{{item.sku_name}}</a>
                                            </h3>
                                            <p class="norms" v-html="item._sku_spec"></p>
                                            <div class="flex-wrap sunburn">
                                                <p class="flex-one sun-price">{{websit.data.currency}}
                                                    <span>
                                                        {{item.sku_price | changePrice}}.
                                                        <i
                                                            class="samll-num"
                                                        >{{item.sku_price | splicePrice}}</i>
                                                    </span>
                                                </p>
                                                <span class="flex-wd sun-num">x {{item.buy_nums}}</span>
                                                
                                                <a
                                                    class="flex-wd od-link rt-pay"
                                                    href="javascript:void(0)"
                                                    @click="go_toapply(index)"
													v-if="item.iscomment==0"
                                                >评价晒单</a>
												<a
                                                    class="flex-wd od-link ight-ash"
                                                    :class="{'rt-pay':(item.iscomment==0),'ight-ash':(item.iscomment==1)}"
                                                    href="javascript:void(0);"
													v-else
                                                >已评价</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </article>
                </div>
                <div slot="noView" class="scroller-tip">
                    <xz-icon type="shoucang1"/>
                    <span>您还没有待评价商品</span>
                    <a class="xz-btn btn-e43 xz-radius" href="#/cate">去逛逛</a>
                </div>
            </pull-up>
        </div>
    </div>
</template>
<script>
import pullUp from "../../components/pull/index.vue";
import {mapState} from "vuex";
export default {
    name: "evaluategoods",
    data() {
        return {
            postData: {
                method: "api.module.member.comment.lists",
                limit: 10
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
            //consol.log(JSON.stringify(goodsList));
            //goodsList[0].iscomment=1;
            this.dataList = dataList;
        },
        go_toapply(index) {
            let _this = this;
            _this.$router.push({
                name: "ordercommon",
                params: {
                    order_sku: _this.dataList[index]
                }
            });
        }
    }
};
</script>
