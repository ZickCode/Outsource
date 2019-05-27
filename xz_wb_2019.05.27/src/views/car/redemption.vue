<template>
    <div class="repurchase">
        <van-nav-bar
            @click-left="go_back"
            class="xz-nva-bar"
            title="超值换购"
            fixed
            :z-index="10"
            left-arrow
        >
            <xz-icon type="cart" slot="right"/>
        </van-nav-bar>
        <div class="repurchase-news">
            <div class="active-group" v-if="isReplacement">
                <p class="active-txt">
                    <em>活动</em>
                    {{Replacement_text}}，挑选赠品并换购超值商品
                </p>
            </div>
        </div>
        <van-tabs sticky animated swipeable>
            <van-tab title="可选赠品">
                <div class="xz-tab" data-id="1" slot="title">可选赠品</div>
                <div class="repurchase-bd">
                    <ul class="order-list">
                        <li class="item" v-for="item in gifts" v-if="gifts.length>0">
                            <div class="item-cont">
                                <a class="order-pic">
                                    <img
                                        v-lazy="util.reImg(item.gift.thumb)"
                                        :alt="item.gift.title"
                                    >
                                </a>
                                <div class="order-txt">
                                    <h4 class="order-tit">
                                        <a href="javascript:void(0)">{{item.gift.title}}</a>
                                    </h4>
                                    <p class="r-condition">{{item.info}}</p>
                                    <div class="calculate-wrap">
                                        <span class="calculate-num"></span>
                                        <a
                                            v-show="!verifCheck(item)"
                                            @click="handleCheck(item)"
                                            href="javascript:void(0)"
                                            class="select-menu"
                                            :class="{'notslt-menu': item.disabled}"
                                        >选择</a>
                                        <div v-show="verifCheck(item)" class="or-number">
                                            <van-stepper
                                                integer
                                                :min="0"
                                                :max="item.use_limit"
                                                v-model="item.num"
                                                @change="handChange"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="item" v-if="poorGift.id">
                            <div class="item-cont">
                                <a class="order-pic">
                                    <img
                                        v-lazy="util.reImg(poorGift.gift.thumb)"
                                        :alt="poorGift.gift.title"
                                    >
                                </a>
                                <div class="order-txt">
                                    <h4 class="order-tit">
                                        <a href="javascript:void(0)">{{poorGift.gift.title}}</a>
                                    </h4>
                                    <p class="r-condition">{{poorGift.info}}</p>
                                    <div class="calculate-wrap">
                                        <span class="calculate-num"></span>
                                        <a
                                            href="javascript:void(0)"
                                            class="select-menu notslt-menu"
                                        >选择</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </van-tab>
            <van-tab title="加钱换购">
                <div class="xz-tab" data-id="1" slot="title">加钱换购</div>
                <div class="repurchase-bd">
                    <ul class="order-list">
                        <li class="item" v-for="item in goods">
                            <div class="item-cont">
                                <a class="order-pic">
                                    <img
                                        v-lazy="util.reImg(item.goods.thumb)"
                                        :alt="item.goods.sku_name"
                                    >
                                </a>
                                <div class="order-txt">
                                    <h4 class="order-tit">
                                        <a href="javascript:void(0)">{{item.goods.sku_name}}</a>
                                    </h4>
                                    <p class="r-condition">{{item.info}}</p>
                                    <div class="calculate-wrap">
                                        <span
                                            class="calculate-num"
                                            style="color: #e4393c; text-decoration: none;"
                                        >￥{{item.add_money}}</span>
                                        <a
                                            v-show="!verifCheck(item)"
                                            @click="handleCheck(item)"
                                            href="javascript:void(0)"
                                            class="select-menu"
                                            :class="{'notslt-menu': item.disabled}"
                                        >选择</a>
                                        <div v-show="verifCheck(item)" class="or-number">
                                            <van-stepper
                                                integer
                                                :min="0"
                                                :max="item.use_limit"
                                                v-model="item.num"
                                                @change="handChange"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </van-tab>
        </van-tabs>
        <div class="xz-bottom redemp-bottom">
            <template v-if="gifts.length == 0">
                <div class="redemptips">
                    还差&nbsp;
                    <span>￥{{differPrice}}</span>&nbsp;才可以参与活动
                </div>
                <button
                    type="button"
                    class="xz-btn btn-e43"
                    @click="handleCollectBills"
                    style="width:70px"
                >去凑单</button>
            </template>
            <template v-else>
                <div class="redemptips">
                    <p style="color: #999;" v-if="hasChecked">已选择</p>
                    <p style="color: #999;" v-else>请选择需要的赠品或换购商品</p>
                </div>
                <button class="xz-btn btn-e43" @click="handleGOSettlement" style="width:70px">去结算</button>
            </template>
        </div>
    </div>
</template>
<script>
import { Button } from "vant";
import { mapState, mapActions, mapGetters } from "vuex";
import { Tab, Tabs, Collapse, CollapseItem } from "vant";
export default {
    components: {
        "van-tabs": Tabs,
        "van-tab": Tab,
        Button
    },
    data() {
        return {
            sourceUrl: sourceUrl,
            hasChecked: false, // 是否已有选择的商品，用于判断是否可以下单
            ids: [], // 商品的skuid
            differPrice: 0,
            conditionPrice: 59.0,
            gifts: [],
            goods: [],
            poorGift: {},
            replacements: [],
            replacementData: [],
            Replacement_text: "",
            isReplacement: false
        };
    },
    mounted() {
        let ids = this.$route.query.ids || "";
        if (typeof ids == "string") {
            ids = ids;
        }
        this.ids = ids;
        let _pData = this.util.pp(this.shopCar.replacement);
        this.replacementData = {
            sku_ids: this.ids,
            list: _pData.list
        };
        this.replacements = this.replacementData.list.map(
            el => el.r + ":" + el.s + ":" + el.n
        );
        this.init();
    },
    methods: {
        ...mapActions("shopCar", ["updateReplacement", "EmptyReplacement"]),
        init() {
            this.post(
                {
                    method: "api.module.order.order.replacement",
                    sku_ids: this.ids,
                    replacement: this.replacements.join(";")
                },
                res => {
                    if (res.code == 200) {
                        let result = res.result;
                        this.updateReplacement(this.replacementData);
                        this.setData(result);
                    }
                }
            );
        },
        arrangeData(item) {
            let _pData = this.util.pp(this.shopCar.replacement);
            let _data = {
                r: item.id,
                t: item.activity_type,
                s: item.activity_type == 1 ? item.gift.id : item.goods.sku_id,
                n: item.num
            };
            return { _pData, _data };
        },
        // 选择
        handleCheck(item, t = 1) {
            if (item.disabled) return;
            if (t == 1) {
                item["num"] = 1;
            }
            let _r = this.arrangeData(item);
            if (
                _r._pData.list.findIndex(
                    el =>
                        el.r == _r._data.r &&
                        el.t == _r._data.t &&
                        el.s == _r._data.s
                ) > -1
            ) {
                _r._pData.list = _r._pData.list.map(el =>
                    el.r == _r._data.r &&
                    el.t == _r._data.t &&
                    el.s == _r._data.s
                        ? { r: el.r, t: el.t, s: el.s, n: _r._data.n }
                        : el
                );
            } else {
                _r._pData.list = _r._pData.list;
                _r._pData.list.push(_r._data);
            }
            this.replacementData.list = _r._pData.list.filter(c => c.n != 0);
            this.replacements = this.replacementData.list.map(
                el => el.r + ":" + el.s + ":" + el.n
            );
            this.init();
        },
        verifCheck(item) {
            let _r = this.arrangeData(item);
            let result = false;
            _r._pData.list.forEach((el, index) => {
                if (
                    el.r == _r._data.r &&
                    el.t == _r._data.t &&
                    el.s == _r._data.s
                ) {
                    result = true;
                }
            });
            return result;
        },
        getNum(item) {
            let _r = this.arrangeData(item);
            let num = 0;
            _r._pData.list.forEach((el, index) => {
                if (
                    el.r == _r._data.r &&
                    el.t == _r._data.t &&
                    el.s == _r._data.s
                ) {
                    num = el.n;
                }
            });
            return num;
        },
        handChange() {
            let _pData = this.util.pp(this.shopCar.replacement);
            _pData.list.forEach(item => {
                this.gifts.forEach(g => {
                    if (
                        g.id == item.r &&
                        g.activity_type == item.t &&
                        g.gift.num != item.n &&
                        g.gift.id == item.s
                    ) {
                        this.handleCheck(g, 0);
                    }
                });
                this.goods.forEach(g => {
                    let _num = g.num;
                    if (
                        g.id == item.r &&
                        g.activity_type == item.t &&
                        _num != item.n &&
                        g.goods.sku_id == item.s
                    ) {
                        this.handleCheck(g, 0);
                    }
                });
            });
        },
        // 判断是否已有选择的商品
        judgeChecked() {
            let flog = false;
            let _pData = this.util.pp(this.shopCar.replacement);
            if (_pData.list.length > 0) {
                flog = true;
            } else {
                flog = false;
            }
            this.hasChecked = flog;
        },
        // 凑单
        handleCollectBills() {
            this.go_back();
        },

        // 获取超值换购活动数据
        handleGetFormatData() {
            let _pData = this.util.pp(this.shopCar.replacement);
            return _pData.list;
        },
        // 结算
        handleGOSettlement() {
            let rs = this.handleGetFormatData();
            if (rs.length == 0) {
                this.$dialog
                    .confirm({
                        message: "您还未选择优惠活动，确认离开？"
                    })
                    .then(() => {
                        this.$router.push({
                            name: "orderconfirm",
                            query: {
                                s: this.ids,
                                r: ""
                            }
                        });
                    })
                    .catch(() => {});
            } else {
                this.$router.push({
                    name: "orderconfirm",
                    query: {
                        s: this.ids,
                        r: this.replacements.join(";")
                    }
                });
            }
        },
        setData(result) {
            let _money = 0;
            let _Replacement_text = "";
            let _isReplacement = false;
            if (
                !this.util.isEmpty(result._list_gifts) ||
                !this.util.isEmpty(result._list_goods)
            ) {
                if (!this.util.isEmpty(result._list_gifts)) {
                    _money = result._list_gifts[0].active_way;
                } else {
                    _money = result._list_goods[0].active_way;
                }
                _Replacement_text =
                    "购满" + parseFloat(_money).toFixed(2) + "元";
                _isReplacement = true;
            } else if (
                !this.util.isEmpty(result._poor_gift) ||
                !this.util.isEmpty(result._poor_goods)
            ) {
                if (!this.util.isEmpty(result._poor_gift)) {
                    _money = result._poor_gift.money;
                } else {
                    _money = result._poor_goods.money;
                }
                _Replacement_text =
                    "还差" + parseFloat(_money).toFixed(2) + "元";
                _isReplacement = true;
            } else {
                _isReplacement = false;
            }
            this.Replacement_text = _Replacement_text;
            this.isReplacement = _isReplacement;

            result._list_gifts.forEach(item => {
                item["num"] = this.getNum(item);
            });
            result._list_goods.forEach(item => {
                item["num"] = this.getNum(item);
            });
            this.gifts = result._list_gifts;
            this.goods = result._list_goods;
            this.conditionPrice = result._poor_gift.money;
            if (
                result._poor_gift &&
                JSON.stringify(result._poor_gift) != "{}"
            ) {
                this.poorGift = result._poor_gift;
                this.differPrice = result._poor_gift.money - result.all_prices;
            }
            if (result._poor_goods.length > 0) {
                result._poor_goods.forEach(item => {
                    item.disabled = true;
                    this.goods.push(item);
                });
            }
        }
    },
    computed: {
        ...mapState(["shopCar"])
    },
    watch: {
        gifts() {
            this.judgeChecked();
        },
        goods() {
            this.judgeChecked();
        }
    }
};
</script>
<style scoped="scoped">
</style>

   