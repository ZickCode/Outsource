<template>
    <div class="myorder-view orderCopon-view">
        <van-nav-bar @click-left="go_back" fixed class="xz-nva-bar" title="选择优惠券" left-arrow/>
        <van-tabs sticky animated swipeable>
            <van-tab>
                <div class="xz-tab" data-id="1" slot="title">可用优惠券({{available.length}})</div>
                <section class="listContent coupon-info orderCopon">
                    <van-radio-group v-model="query.c">
                        <article class="coupon-item" v-for="(item,index) in available">
                            <div class="coupon-txtbox" @click="coupon_click(item.id)">
                                <div class="coupon-left">
                                    <div class="price-box" v-if="item.discounts_type==3">
                                        <span>{{item.money}}</span>折
                                        <!--<p>满100元可用</p>-->
                                    </div>
                                    <div class="price-box"v-else>
                                        {{websit.data.currency}}<span>{{item.money}}</span>
                                        <!--<p>满100元可用</p>-->
                                    </div>
                                    <span v-if="item.amount_limit==0">满{{item.amount}}可用</span>
                                    <span v-else>不设置门槛</span>
                                </div>
                                <div class="c-txtbox">
                                    <p>{{item.title}}</p>
                                    <time>有效期至：{{item.etime | formatdata('yyyy.MM.dd')}}</time>
                                </div>
                                <van-radio
                                    :name="item.id"
                                    class="item-check"
                                    checked-color="#e4393c"
                                    @click="coupon_click(item.id)"
                                ></van-radio>
                            </div>
                            <div
                                class="coupon-desc"
                                :class="{'active':item.show}"
                                @click="handleCouponChange(item)"
                            >
                                <div class="c-desc-box">{{item.description}}</div>
                            </div>
                        </article>
                    </van-radio-group>
                </section>
            </van-tab>
            <van-tab>
                <div class="xz-tab" data-id="1" slot="title">不可用优惠券({{unavailable.length}})</div>
                <section class="listContent coupon-info orderCopon">
                    <van-radio-group>
                        <article class="coupon-item dq-item" v-for="(item,index) in unavailable">
                            <div class="coupon-txtbox">
                                <div class="coupon-left">
                                    <div class="price-box" v-if="item.discounts_type==3">
                                        <span>{{item.money}}</span>折
                                        <!--<p>满100元可用</p>-->
                                    </div>
                                    <div class="price-box"v-else>
                                        {{websit.data.currency}}<span>{{item.money}}</span>
                                        <!--<p>满100元可用</p>-->
                                    </div>
                                    <span v-if="item.amount_limit==0">满{{item.amount}}可用</span>
                                    <span v-else>不设置门槛</span>
                                </div>
                                <div class="c-txtbox">
                                    <p>{{item.title}}</p>
                                    <time>有效期至：{{item.etime | formatdata('yyyy.MM.dd')}}</time>
                                </div>
                            </div>
                            <div
                                class="coupon-desc"
                            >
                                <div class="c-desc-box">{{item.description}}</div>
                            </div>
                        </article>
                    </van-radio-group>
                </section>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs, Collapse, CollapseItem, Radio, RadioGroup } from "vant";
import pullUp from "../../components/pull/index.vue";
import { mapState } from "vuex";
export default {
    name: "coupon",
    components: {
        "van-tabs": Tabs,
        "van-tab": Tab,
        pullUp: pullUp,
        vanRadio: Radio,
        vanRadioGroup: RadioGroup
    },
    data() {
        return {
            query: {
                s: "",
                i: "",
                c: "",
                r: "",
            },
            tabOffsetTop: 50,
            radio: 0,
            available: [], // 可用优惠券
            unavailable: [], // 不可用优惠券
            couponData: [
                {
                    tabTit: "可用优惠券（2）",
                    ref: "coupon1",
                    list: []
                },
                {
                    tabTit: "不可用优惠券（0）",
                    ref: "coupon2",
                    list: []
                }
            ]
        };
    },
    computed: {
        ...mapState(["websit"]),
        ...mapState(["order"])
    },
    created() {
        if (this.util.isEmpty(this.$route.query.s)) {
            this.go_back();
            return;
        }
        this.query.s = this.$route.query.s || "";
        this.query.i = this.$route.query.i || "";
        this.query.c = this.$route.query.c || "";
        this.query.r = this.$route.query.r || "";
        this.loadData();
    },
    methods: {
        loadData() {
            this.order.coupon.forEach(item => {
                if (item.use) {
                    this.available.push(item);
                } else {
                    this.unavailable.push(item);
                }
            });
        },
        /*接收当前选中的卡片对象,以及该对象在上两层循环中的位置*/
        handleCouponChange(item) {
            this.$set(item, 'show', !item.show);
        },
        coupon_click(_id) {
            this.query.c = _id;
            this.$router.push({
                name: "orderconfirm",
                query: this.query
            });
        }
    },
    mounted() {
        var _this = this;
    }
};
</script>
