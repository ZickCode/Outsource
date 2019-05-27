<template>
    <div class="nav-main nav-main-bottom bg-f0">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="确认订单" fixed left-arrow/>
        <form class="g-form">
            <div class="order-detil">
                <div class="c-order-hd">
                    <article class="re-goods">
                        <a
                            href="javascript:void(0);"
                            class="flex-wrap z-link"
                            @click="isShowAddress=true"
                        >
                            <span class="flex-wd lab-tit">收货人</span>
                            <div class="flex-one gd-msg-txt">
                                <p class="sh-name">
                                    <i v-text="address.name"></i>
                                    <span v-text="address.mobile"></span>
                                </p>
                                <p v-text="address.address_info"></p>
                            </div>
                        </a>
                        <xz-icon type="forward"/>
                    </article>
                </div>
                <div class="shop mb-20" v-for="shop in confirmData.store" :key="shop.id">
                    <div class="judge mt-20">
                        <article
                            class="eval-item"
                        >
                            <div class="flex-wrap judge-hd">
                                <p class="flex-one">{{shop.name}}</p>
                            </div>
                            <div class="judge-bd">
                                <ul class="judge-list">
                                    <li
                                        class="mui-table-view-cell"
                                        v-for="(item,i) in shop.sku_list"
                                        :key="i"
                                    >
                                        <div
                                            class="flex-wrap judli-wrap"
                                            :class="{'other-goods':item.is_give==1}"
                                        >
                                            <a
                                                :href="'#/goods/detail/'+item.sku_id"
                                                class="flex-wd z-gpic"
                                            >
                                                <img v-lazy="util.reImg(item.img)">
                                            </a>
                                            <div class="flex-one judli-msg">
                                                <h3 class="judli-tit">
                                                    <a :href="'#/goods/detail/'+item.sku_id">
                                                        <span
                                                            class="hd-tip"
                                                            v-show="item._preferential"
                                                        >限时抢购</span>
                                                        {{item.name}}
                                                    </a>
                                                </h3>
                                                <p class="norms" v-if="item.is_give==1">加钱换购</p>
                                                <p class="norms" v-html="item.title" v-else></p>
                                                <div class="flex-wrap sunburn">
                                                    <p class="flex-one sun-price">
                                                        {{websit.data.currency}}
                                                        <span>
                                                            <span>{{(item._preferential)?item._preferential.price:item.price | changePrice}}.</span>
                                                            <i
                                                                class="samll-num"
                                                            >{{(item._preferential)?item._preferential.price:item.price | splicePrice}}</i>
                                                        </span>
                                                    </p>
                                                    <span class="flex-wd sun-num">x{{item.number}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>
                    <div class="distribution">
                         <ul class="distr-list mb-20" v-if="confirmData._coupons._coupons || confirmData.promot.incordec">
                             <li
                                class="flex-wrap"
                                v-if="confirmData.promot.incordec && confirmData.promot.incordec.dec > 0"
                            >
                                <span class="flex-wd lab-tit">店铺优惠</span>
                                <div class="flex-one distr-msg">
                                    <a
                                        href="javascript:void(0)"
                                        data-name="discount"
                                        data-val="22"
                                        @click="showIncdec(shop.activity)"
                                    >-{{websit.data.currency}}{{confirmData.promot.incordec.dec}}</a>
                                </div>
                            </li>
                            <li
                                class="flex-wrap"
                                v-if="confirmData._coupons._coupons && confirmData._coupons._coupons.length>0"
                            >
                                <span class="flex-wd lab-tit">优惠券</span>
                                <div class="flex-one distr-msg">
                                    <a
                                        class="text-color"
                                        href="javascript:void(0)"
                                        data-name="discount"
                                        data-val="22"
                                        @click="go_coupon"
                                    >{{couponTitle}}</a>
                                </div>
                            </li>
                        </ul>
                        <ul class="distr-list">
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">配送方式</span>
                                <div class="flex-one">
                                    <a
                                        href="javascript:void(0)"
                                        data-val="11"
                                        data-name="methods"
                                    >普通快递 {{websit.data.currency}}{{confirmData.deliverys_total}}</a>
                                </div>
                            </li>
                            <li class="flex-wrap" v-if="websit.data.site_invoice_enabled==1">
                                <span class="flex-wd lab-tit">发票抬头</span>
                                <div class="flex-one distr-msg">
                                    <a
                                        href="javascript:void(0)"
                                        data-val="31"
                                        data-name="ipayable"
                                        @click="go_invoiceinfor"
                                    >{{invoice.title}}</a>
                                </div>
                            </li>
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">买家留言</span>
                                <div class="flex-one">
                                    <textarea
                                        placeholder="选填"
                                        class="z-tare"
                                        v-model="formData.remarks"
                                    ></textarea>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="detail-panel order-js" v-if="confirmData.promot">
                    <div class="panel-hd">
                        <span class="hd-more">
                            <em>{{websit.data.currency}}{{confirmData.sku_total}}</em>
                        </span>
                        <h4 class="col-title">
                            商品合计金额
                        </h4>
                    </div>
                    <div class="panel-bd">
                        <p><span>运费</span><strong>{{websit.data.currency}}{{confirmData.deliverys_total | numFilter}}</strong></p>
                        <p v-if="confirmData.promot.incordec"><span>活动满减</span><strong>-{{websit.data.currency}}{{confirmData.promot.incordec.dec| numFilter}}</strong></p>
                        <p v-if="confirmData.promot.coupon"><span>优惠券</span><strong>-{{websit.data.currency}}{{confirmData.promot.coupon.dec | numFilter}}</strong></p>
                        <p v-if="confirmData.promot.invoice_tax"><span>发票</span><strong>{{websit.data.currency}}{{confirmData.invoice_tax | numFilter}}</strong></p>
                    </div>
                </div>
            </div>
        </form>
        <div class="xz-btn-bottom">
            <div class="ft-total flex-wrap">
                <p class="flex-one st-totl">
                    合计金额：
                    <i class="until">{{websit.data.currency}}</i>
                    <span class="al-price">
                        <span>{{confirmData.real_amount | changePrice}}.</span>
                        <i>{{confirmData.real_amount | splicePrice}}</i>
                    </span>
                </p>
                <a href="javascript:void(0);" class="u-slink flex-wd" @click="saveOrder">提交订单</a>
            </div>
        </div>
        <!-- 店铺优惠弹窗遮罩-->
        <van-actionsheet v-model="isShowIncdec">
            <xz-popup
                title="活动"
                btnName="我知道了"
                :clickFlag="isShowIncdec"
                @addClose="isShowIncdec=false"
                @clickBottomBtn="isShowIncdec=false"
            >
                <ul class="popup-items" slot="content">
                    <li class="item" v-for="item in activity" :key="item.id">
                        <span class="type">{{item.info.type}}</span>
                        <p class="desc">{{item.info.msg}}</p>
                    </li>
                </ul>
            </xz-popup>
        </van-actionsheet>
        <!-- 地址选择器-->
        <van-actionsheet v-model="isShowAddress">
            <xz-popup
                title="选择收货地址"
                btnName="添加新的收货地址"
                :clickFlag="isShowAddress"
                @addClose="isShowAddress=false"
                @clickBottomBtn="go_address"
            >
                <ul class="popup-items address" slot="content">
                    <li
                        class="item"
                        :class="[formData.address_id==item.id ?'active' :'']"
                        v-for="(item,index) in addressData"
                        :key="index"
                        @click="address_change(index)"
                    >
                        <xz-icon type="shouhuodizhi1"/>
                        <p class="desc">{{item.address_info}}</p>
                        <xz-icon type="dui"/>
                    </li>
                </ul>
            </xz-popup>
        </van-actionsheet>
    </div>
</template>
<script>
import popup from "../../components/goods/index.vue";
import { mapActions, mapState } from "vuex";
export default {
    name: "invoice",
    components: {
        "xz-popup": popup
    },
    data() {
        return {
            isShowAddress: false,
            isShowIncdec: false,
            sumNum: 0,
            sumMoney: 0,
            is_back: true,
            confirmData: {},
            activity:[],
            addressData: [],
            invoiceData: [],
            address: {},
            invoice: { id: 0, type: 0, title: "不使用发票" },
            couponTitle: "不使用优惠券",
            formData: {
                method: "api.module.order.order.create",
                skuids: "",
                address_id: "",
                district_id: 0,
                invoices: "",
                coupon_id: "",
                incdec_id: "",
                gifts: "",
                remarks: "",
                replacement: ""
            }
        };
    },
    created() {
        let _this = this;
        let _skuids = _this.$route.query.s;
        let _invoices_id = _this.$route.query.i;
        let _coupon_id = _this.$route.query.c;
        // 超值换购
        this.formData.replacement = this.$route.query.r || "";

        if (_this.util.isEmpty(_skuids)) {
            _this.$router.push("/");
            return;
        }
        _this.formData.skuids = _skuids;
        if (!_this.util.isEmpty(_invoices_id)) {
            let _invoices = this.userMessage.user._invoice.find(
                c => c.id == _invoices_id
            );
            if (!_this.util.isEmpty(_invoices)) {
                _this.formData.invoices = JSON.stringify(_invoices);
                _invoices["title"] =
                    _invoices.type > 0
                        ? _invoices.invoice_name +
                          (_invoices.type == 1 ? "(纸质普通" : "(增值税专用") +
                          (_invoices.invoice_title == 1 ? "个人" : "企业") +
                          ")"
                        : "不开发票";
                _this.invoice = _invoices;
            }
        }
        _this.formData.coupon_id = _coupon_id;
        _this.loadData();
    },
    methods: {
        ...mapActions("userMessage", ["getUser", "setUser"]),
        ...mapActions("order", [
            "updateCoupon",
            "updateIncdec"
        ]),
        loadData() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.member.member.data"
                },
                function(data) {
                    if (200 !== data.code) {
                        return;
                    }
                    if (data.result != null) {
                        _loading.clear();
                        let _data = data.result;
                        _this.setUser(_data);
                        _this.loadAddress();
                        _this.loadInvoice();
                        _this.verifyData();
                    }
                }
            );
        },
        verifyData() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(_this.formData, function(data) {
                _loading.clear();
                if (200 !== data.code) {
                    _this.$toast({
                        message: data.msg,
                        position: "bottom"
                    });
                    _this.is_back = false;
                    // _this.$router.push("/cart");
                    return;
                }
                _this.confirmData = data.result;
                _this.formData.coupon_id = _this.confirmData.promot.coupon.id;
                let _incdec = _this.confirmData._coupons._coupons.find(c => c.id == _this.formData.coupon_id);
                if (!_this.util.isEmpty(_incdec)) {
                    _this.couponTitle = _incdec.title;
                }else{
                    _this.couponTitle = _this.order.coupon.filter(c=>c.use).length+"张优惠券可用"
                }
                _this.updateCoupon(_this.confirmData._coupons._coupons); //更新数据到vuex
            });
        },
        loadAddress() {
            let _this = this;
            _this.addressData = _this.userMessage.user._address;
            if (
                !_this.util.isEmpty(_this.addressData) &&
                _this.addressData.length > 0
            ) {
                _this.address = _this.addressData[0];
                if (!_this.util.isEmpty(_this.address)) {
                    _this.formData.address_id = _this.address.id;
                    _this.formData.district_id = _this.address.district_id;
                }
            } else {
                _this.isShowAddress = true;
            }
        },
        loadInvoice() {
            let _this = this;
            _this.invoiceData = _this.userMessage.user._invoice;
            if (_this.util.isEmpty(_this.invoiceData)) {
                _this.invoiceData = [];
            }
            _this.invoiceData.unshift({ id: 0, type: 0 });
        },
        address_change(index) {
            this.address = this.addressData[index];
            this.formData.address_id = this.address.id;
            this.formData.district_id = this.address.district_id;
            this.isShowAddress = false;
            this.verifyData();
        },
        incdec_change(item) {
            let _this = this;
            _this.formData.incdec_id = item.number;
            _this.incdecTitle = item.desc;
            _this.isShowIncdec = false;
            _this.verifyData();
        },
        showIncdec(_activity){
            this.activity = _activity;
            this.isShowIncdec = true;
        },
        go_invoiceinfor() {
            this.is_back = false;
            this.$router.push({
                name: "invoicelist",
                query: {
                    s: this.formData.skuids,
                    i: this.invoice.id,
                    c: this.formData.coupon_id,
                    r: this.formData.replacement,
                }
            });
        },
        go_address() {
            this.is_back = false;
            this.$router.push("/user/address/edit");
        },
        go_coupon() {
            this.is_back = false;
            this.$router.push({
                name: "ordercoupon",
                query: {
                    s: this.formData.skuids,
                    i: this.invoice.id,
                    c: this.formData.coupon_id,
                    r: this.formData.replacement
                }
            });
        },
        saveOrder() {
                this.handleSubmitOrder();
        },
        handleSubmitOrder() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.formData.submit = true;
            _this.post(_this.formData, function(data) {
                _loading.clear();
                if (200 !== data.code) {
                    _this.$toast({
                        message: data.msg,
                        position: "bottom"
                    });
                    return;
                }
                _this.$toast({
                    message: "下单成功",
                    position: "bottom"
                });
                _this.is_back = false;
                _this.$router.push("/order/pay/" + data.result);
            });
        }
    },
    computed: {
        ...mapState(["userMessage"]),
        ...mapState(["websit"]),
        ...mapState(["order"])
    },
    beforeRouteLeave(to, from, next) {
        let _this = this;
        if (this.is_back && to.path.indexOf("login") == -1) {
            this.$dialog
                .confirm({
                    message: "您的订单还未提交，您确认离开？"
                })
                .then(() => {
                    _this.is_back = false;
                    _this.$router.push("/cart");
                })
                .catch(() => {
                    this.is_back = true;
                });
            next(false);
        } else {
            next();
        }
    }
};
</script>
