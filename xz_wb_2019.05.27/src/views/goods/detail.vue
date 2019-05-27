<template>
    <div class="nav-main nav-main-bottom bg-f0">
        <div class="tab-head detail-tabs">
            <div class="xz-tabs">
                <div
                    class="xz-tab"
                    :class="{'cur':active==0}"
                    data-id="0"
                    @click="jump($event,0)"
                >商品</div>
                <div
                    class="xz-tab"
                    :class="{'cur':active==1}"
                    data-id="1"
                    @click="jump($event,1)"
                >评价</div>
                <div
                    class="xz-tab"
                    :class="{'cur':active==2}"
                    data-id="2"
                    @click="jump($event,2)"
                >推荐</div>
                <div
                    class="xz-tab"
                    :class="{'cur':active==3}"
                    data-id="3"
                    @click="jump($event,3)"
                >详情</div>
            </div>
        </div>

        <div class="shop-wrap d_jump" v-if="!util.isEmpty(goodsData.spu_id)">
            <!-- 这个是商品对应的 -->
            <div class="swiper-wrap">
                <van-swipe>
                    <van-swipe-item
                        v-for="(image, index) in goodsData.imgs"
                        :key="index"
                        @touchstart="touchstart"
                        @touchend="tap($event,1,{imgs:goodsData.imgs,index})"
                    >
                        <img v-lazy="util.reImg(image)">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="shop-msgbox">
                <div class="shop-title">
                    <div class="xz-title">{{goodsData.name + goodsData.info.sku_info.title}}</div>
                    <!-- <a class="share-btn" @click="isShowShare=true">
                        <xz-icon type="fenxiang"/>分享
                    </a>-->
                </div>
                <div class="banner-tips">{{goodsData.subtitle}}</div>
                <p
                    class="goods-price"
                    v-if="!goodsData.info.sku_info._preferential || goodsData.info.sku_info._preferential.endtime==0"
                >
                    {{websit.data.currency}}
                    <strong>{{goodsData.info.sku_info.price | numFilter}}</strong>
                </p>
                <div
                    class="active-price"
                    v-if="goodsData.info.sku_info._preferential && goodsData.info.sku_info._preferential.endtime!=0"
                >
                    <span>
                        {{websit.data.currency}}
                        <strong>{{goodsData.info.sku_info._preferential.price | changePrice}}</strong>
                        .{{goodsData.info.sku_info._preferential.price | splicePrice}}
                    </span>
                    <label>{{websit.data.currency}}{{goodsData.info.sku_info.price | numFilter}}</label>
                    <div class="active-time">
                        <p>距离结束仅剩</p>
                        <label data-seconds="1687" class="J_time">
                            <span>{{goodsData.info.sku_info._preferential.endtime | formatSeconds('dd')}}</span>天
                            <span>{{goodsData.info.sku_info._preferential.endtime | formatSeconds('hh')}}</span>时
                            <span>{{goodsData.info.sku_info._preferential.endtime | formatSeconds('mm')}}</span>分
                            <span>{{goodsData.info.sku_info._preferential.endtime | formatSeconds('ss')}}</span>秒
                        </label>
                    </div>
                </div>
                <div class="xz-key">
                    <ul class="key-items">
                        <li class="key-item hd-list" v-if="goodsData.info.sku_info._incordec">
                            <div class="hd-title">
                                <span>促销活动</span>
                                <xz-icon type="gengduo-tianchong" @click="isShowActive=true"/>
                            </div>
                            <div class="hd-content">
                                <p>
                                    <span>{{goodsData.info.sku_info._incordec.type}}</span>
                                    {{goodsData.info.sku_info._incordec.title}}
                                </p>
                            </div>
                        </li>
                        <li
                            class="key-item hd-list mb-20"
                            v-if="goodsData.info.sku_info._coupons && goodsData.info.sku_info._coupons.length>0"
                        >
                            <div class="hd-title">
                                <span>
                                    优惠券
                                    <label>领劵</label>
                                </span>
                                <xz-icon type="gengduo-tianchong" @click="isShowCoupon=true"/>
                            </div>
                            <div class="hd-content">
                                <p
                                    v-for="(item,index) in goodsData.info.sku_info._coupons"
                                    :key="index"
                                    v-if="index<2"
                                >
                                    <span>{{item.info}}</span>
                                    {{item.title}}
                                </p>
                            </div>
                        </li>
                        <li class="key-item mb-20" v-if="goodsData.sku_arr.length>1">
                            <span class="key-name">选择商品规格</span>
                            <div class="key-data" @click="handleClickNorm">
                                <input
                                    type="text"
                                    readonly
                                    :value="'已选'+goodsData.info.sku_info.title"
                                >
                                <xz-icon type="forward"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="detail-panel d_jump">
                <!-- 这个是评价 -->
                <div class="panel-hd">
                    <span class="hd-more">
                        好评度
                        <em>{{goodsData.ratio}}%</em>
                        <xz-icon type="forward"/>
                    </span>
                    <h4 class="col-title">
                        评价
                        <span>({{goodsData.common_count}})</span>
                    </h4>
                </div>
                <div class="panel-bd">
                    <section class="evaluate-items">
                        <article
                            class="evaluate-item"
                            v-for="item in goodsData.comm_list"
                            :key="item.id"
                        >
                            <div class="evaluate-hd">
                                <span class="tips good">{{item.assess}}</span>
                                <div class="user-msgbox">
                                    <span class="user-pic">
                                        <img v-lazy="util.reImg(item.userimage)" alt>
                                    </span>
                                    <h5 class="user-name">{{item.username}}</h5>
                                </div>
                            </div>
                            <div class="evaluate-bd">
                                <div class="evaluate-desc">{{item.comment}}</div>
                                <ul class="evaluate-pic">
                                    <li
                                        class="pic-item"
                                        v-for="(img,index) in item.imgs"
                                        :key="index"
                                        @click="showBigImg(item.imgs,index)"
                                    >
                                        <div class="pic-cont">
                                            <img v-lazy="util.reImg(img)" alt>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </section>
                </div>
                <div class="panel-ftr">
                    <a :href="'#/goods/allcomment/'+goodsData.spu_id">查看全部评价</a>
                    <a
                        href="javascript:void(0)"
                        @click="go_advisory"
                    >购买咨询({{goodsData.advisory_count}})</a>
                </div>
            </div>
            <div class="detail-panel d_jump">
                <!-- 这个是推荐 -->
                <div class="panel-hd">
                    <h4 class="col-title">为你推荐</h4>
                </div>
                <div class="panel-bd">
                    <div class="recommend-swiper">
                        <van-swipe :autoplay="5000">
                            <van-swipe-item v-for="item in goodsData.recom_list" :key="item.id">
                                <section class="rem-goods">
                                    <div
                                        class="goods-list"
                                        v-for="(list,index) in item.children"
                                        :key="index"
                                    >
                                        <a
                                            class="goods-item"
                                            href="javascript:void(0);"
                                            @touchstart="touchstart"
                                            @touchend="tap($event,2,{id:list.sku_id})"
                                        >
                                            <div class="pic-wrap">
                                                <img v-lazy="util.reImg(list.img)" alt>
                                            </div>
                                            <div class="goods-title">
                                                <div class="xz-title">{{list.name}}</div>
                                            </div>
                                            <div class="goods-price">
                                                <span>{{websit.data.currency}}</span>
                                                {{list.price}}
                                            </div>
                                        </a>
                                    </div>
                                </section>
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                </div>
            </div>
            <div class="detail-panel d_jump">
                <!-- 这个是详情 -->
                <div class="panel-hd">
                    <h4 class="col-title">商品详情</h4>
                </div>
                <div class="panel-bd">
                    <div class="details-panel" v-html="util.reHtml(goodsData.details)"></div>
                </div>
            </div>
        </div>

        <van-goods-action>
            <van-goods-action-mini-btn icon="x xz-icon xz-icon-kefu" text="客服" @click="go_kefu"/>
            <van-goods-action-mini-btn
                icon="x xz-icon xz-icon-shoucang1"
                :text="goodsData.isCollect?'取消收藏':'收藏'"
                :class="{'active':goodsData.isCollect}"
                @click="collect_click"
            />
            <van-goods-action-mini-btn
                icon="x xz-icon xz-icon-cart"
                to="/cart"
                text="购物车"
                :info="Shoplen"
                v-if="Shoplen>0"
            />
            <van-goods-action-mini-btn icon="x xz-icon xz-icon-cart" to="/cart" text="购物车" v-else/>
            <van-goods-action-big-btn text="加入购物车" @click="handleClickNorm('addCart')"/>
            <van-goods-action-big-btn
                primary
                :class="{'btn-dis' : goodsData.info.sku_info.store==0}"
                :disabled="goodsData.info.sku_info.store==0"
                :text="goodsData.info.sku_info.store==0?'已售馨':'立即购买'"
                @click="handleClickNorm('buy')"
            />
        </van-goods-action>
        <!-- 分享弹窗-->
        <van-actionsheet v-model="isShowShare">
            <xz-popup
                class="share"
                title="分享到"
                btnName="我知道了"
                :isShowBtn="false"
                :clickFlag="isShowShare"
                @addClose="listenClose"
            >
                <ul class="share-items" slot="content">
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon">
                                <img src="../../assets/images/common/share-ico1.png" alt>
                            </span>
                            <p>微信好友</p>
                        </a>
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon">
                                <img src="../../assets/images/common/share-ico2.png" alt>
                            </span>
                            <p>朋友圈</p>
                        </a>
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon">
                                <img src="../../assets/images/common/share-ico3.png" alt>
                            </span>
                            <p>QQ好友</p>
                        </a>
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon">
                                <img src="../../assets/images/common/share-ico4.png" alt>
                            </span>
                            <p>QQ空间</p>
                        </a>
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon">
                                <img src="../../assets/images/common/share-ico5.png" alt>
                            </span>
                            <p>新浪微博</p>
                        </a>
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon">
                                <img src="../../assets/images/common/share-ico6.png" alt>
                            </span>
                            <p>复制链接</p>
                        </a>
                    </li>
                </ul>
            </xz-popup>
        </van-actionsheet>
        <!-- 促销活动弹窗-->
        <van-actionsheet v-model="isShowActive">
            <xz-popup
                title="活动"
                btnName="我知道了"
                :clickFlag="isShowActive"
                @addClose="listenClose"
                @clickBottomBtn="isShowActive = !isShowActive"
            >
                <ul class="popup-items" slot="content">
                    <li class="item" v-if="goodsData.spu_id">
                        <span class="type">{{goodsData.info.sku_info._incordec.type}}</span>
                        <p class="desc">{{goodsData.info.sku_info._incordec.title}}</p>
                    </li>
                </ul>
            </xz-popup>
        </van-actionsheet>
        <!-- 优惠券弹窗-->
        <van-actionsheet v-model="isShowCoupon">
            <xz-popup
                title="优惠券"
                btnName="确定"
                :clickFlag="isShowCoupon"
                @addClose="listenClose"
                @clickBottomBtn="isShowCoupon = !isShowCoupon"
            >
                <ul class="coupon-items" slot="content">
                    <li
                        class="item"
                        v-for="item in goodsData.info.sku_info._coupons"
                        :key="item.id"
                    >
                        <div class="item-cont">
                            <div class="coupon-msg">
                                <span v-if="item.discounts_type==3">
                                    <strong>
                                        {{item.money}}
                                        <label>折</label>
                                    </strong>
                                    {{item.title}}
                                </span>
                                <span v-else>
                                    {{websit.data.currency}}
                                    <strong>{{item.money}}</strong>
                                    {{item.title}}
                                </span>
                                <p>{{item.info}}</p>
                            </div>
                            <span class="coupon-btn" @click="draw_coupon(item.id)">领取</span>
                        </div>
                    </li>
                </ul>
            </xz-popup>
        </van-actionsheet>
        <!-- 商品规格弹窗-->
        <van-actionsheet v-model="isShowNorm">
            <xz-popup
                v-if="goodsData.spu_id"
                :class="[(goodsData.sku_arr.length >1?'norm':'reduction')]"
                :btnName="popupBottomBtnText"
                :clickType="clickType"
                :clickFlag="isShowNorm"
                :sku_id="goodsData.info.sku_id"
                :sku_info="goodsData"
                @clickBottomBtn="addCartOrBuy"
                :isShowHd="true"
                :disabled="goodsData.info.sku_info.store==0"
            >
                <div class="popup-hd norm-hd" slot="title">
                    <div class="goods-msgtxt">
                        <span class="msg-pic" @click="showBigImg(goodsData.info.sku_info.img,0)">
                            <img v-lazy="util.reImg(goodsData.info.sku_info.img)" alt>
                        </span>
                        <div class="txt-box">
                            <span class="price">
                                {{websit.data.currency}}
                                <strong>{{ goodsData.info.sku_info._preferential?goodsData.info.sku_info._preferential.price:goodsData.info.sku_info.price }}</strong>
                            </span>
                            <p class="goods-desc">库存：{{ goodsData.info.sku_info.store }}</p>
                            <p class="goods-desc">编号：{{ goodsData.info.sku_info.num_ber }}</p>
                        </div>
                    </div>
                    <xz-icon type="guanbi" @click="isShowNorm=false"/>
                </div>
                <div class="good-norm" slot="content" v-if="goodsData.sku_arr.length >1">
                    <!-- 选择成功后返回选择的对象  -->
                    <xz-sku
                        :skuDatas="goodsData.sku_arr"
                        :defaultSelSkuId="goodsData.info.sku_id"
                        @selCallback="selCallback"
                    ></xz-sku>
                </div>
                <div class="number-wrap" slot="footer">
                    <span>数量</span>
                    <van-stepper
                        v-model="addProductNumModel"
                        integer
                        :min="1"
                        :max="goodsData.info.sku_info.store"
                        :step="1"
                        disable-input
                        @change="addProductNum"
                    />
                </div>
            </xz-popup>
        </van-actionsheet>
        <!-- 配送至弹窗-->
        <van-actionsheet v-model="isShowAddress">
            <xz-popup
                title="配送至"
                btnName="选择其他地区"
                :clickFlag="isShowAddress"
                @addClose="listenClose"
            >
                <ul class="popup-items address" slot="content">
                    <li
                        class="item"
                        :class="[addID==item.id ?'active' :'']"
                        v-for="item in addressData"
                        @click="handleClickSelAdd(item.id)"
                        :key="item.id"
                    >
                        <xz-icon type="shouhuodizhi1"/>
                        <p class="desc">{{item.address}}</p>
                        <xz-icon type="dui"/>
                    </li>
                </ul>
            </xz-popup>
        </van-actionsheet>
        <xz-menu></xz-menu>
        <to-top v-if="isToTop"/>
    </div>
</template>
<script>
import popup from "@/components/goods/index.vue";
import menu from "@/components/goods/menu.vue";
import sku from "@/components/sku/index.vue";
import toTop from "@/components/to-top/index.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import {
    Swipe,
    SwipeItem,
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    ImagePreview
} from "vant";
export default {
    name: "detail",
    components: {
        vanSwipe: Swipe,
        vanSwipeItem: SwipeItem,
        vanGoodsAction: GoodsAction,
        vanGoodsActionBigBtn: GoodsActionBigBtn,
        vanGoodsActionMiniBtn: GoodsActionMiniBtn,
        "xz-popup": popup,
        "xz-menu": menu,
        "xz-sku": sku,
        toTop
    },
    computed: {
        ...mapState(["websit"]),
        ...mapState(["shopCar"]),
        ...mapState(["userMessage"]),
        ...mapState(["footprint"]),
        ...mapGetters("shopCar", ["Shoplen"])
    },
    data() {
        return {
            goodsData: { info: { sku_info: {} } },
            kfUrl: kfUrl,
            active: 0,
            isShowShare: false,
            isShowActive: false,
            isShowCoupon: false,
            isShowAddress: false,
            popupBottomBtnText: "加入购物车", // 弹出层底部固定按钮的显示文字
            clickType: "addCart", // 点击的类型，用以判断是加入购物车，还是立即购买，根据此type来做购买还是加入购物车的逻辑,默认为加入购物车addCart，立即购买为： buy
            isShowNorm: false,
            addID: 1,
            isToTop: false,
            imagePreview: {},
            isImagePreview: false,
            addProductNumModel: 1,
            touchData: {},
            Timing: null,
            TimingTime: 0,
            addressData: [
                {
                    id: 1,
                    address:
                        "云南省昆明市盘龙区鼓楼街道北京路635号小城故事A座309室"
                },
                {
                    id: 2,
                    address:
                        "云南省昆明市盘龙区鼓楼街道北京路636号小城故事A座310室"
                },
                {
                    id: 3,
                    address:
                        "云南省昆明市盘龙区鼓楼街道北京路637号小城故事A座311室"
                }
            ]
        };
    },
    created() {
        let _this = this;
        _this.loadData();
        document.documentElement.scrollTop = 0;
    },
    methods: {
        ...mapActions("shopCar", ["addShop"]),
        ...mapActions("footprint", ["addFoot"]),
        loadData() {
            let _this = this;
            let _id = _this.$route.params.id;
            let _loading = _this.$xzLoading();
            let params = {
                method: "api.module.goods.goods.detail",
                sku_id: _id
            };
            _this.post(params, function(data) {
                _loading.clear();
                if (200 !== data.code) {
                    _this.$toast({
                        message: data.msg,
                        position: "bottom"
                    });
                    //_this.$router.push("/");
                    return;
                }
                if (_this.util.isEmpty(data.result)) {
                    _this.$toast({
                        message: "该商品不存在"
                    });
                    // _this.$router.push("/");
                    return;
                }
                _this.goodsData = data.result;
                _this.pushFootPrint(_this.goodsData); //添加足迹
                document.title =
                    document.title.substring(
                        0,
                        document.title.indexOf("-") + 1
                    ) +
                    _this.goodsData.name +
                    _this.goodsData.info.sku_info.title;
                if (!_this.util.isEmpty(_this.goodsData.info.sku_info.img)) {
                    _this.orderByImgs();
                }
                _this.startTimer();
            });
        },
        startTimer() {
            let _this = this;
            if (!_this.Timing) {
                if (
                    _this.goodsData.info.sku_info._preferential &&
                    _this.goodsData.info.sku_info._preferential.endtime != 0
                ) {
                    _this.Timing = setInterval(() => {
                        _this.goodsData.info.sku_info._preferential.endtime -= 1;
                        if (
                            _this.goodsData.info.sku_info._preferential
                                .endtime == 0
                        ) {
                            clearInterval(_this.Timing);
                        }
                    }, 1000);
                }
            } else {
                clearInterval(_this.Timing);
                _this.Timing = null;
                _this.startTimer();
            }
        },
        orderByImgs() {
            let _img = this.goodsData.imgs.filter(
                c => c != this.goodsData.info.sku_info.img
            );
            _img.unshift(this.goodsData.info.sku_info.img);
            this.goodsData.imgs = _img;
        },
        selCallback(selVal) {
            // 选择规格参数成功后回调 返回所选的规格对象，此处应该刷新页面数据，呈现当前选择的规格的数据
            if (selVal.sku_id === this.goodsData.info.sku_id) return;
            this.goodsData.info = selVal;
            this.addProductNumModel = 1;
            if (this.goodsData.info.sku_info.store == 0) {
                this.popupBottomBtnText = "已售馨";
            } else {
                if (this.clickType == "buy") {
                    this.popupBottomBtnText = "立即购买";
                } else {
                    this.popupBottomBtnText = "加入购物车";
                }
            }
            if (!this.util.isEmpty(this.goodsData.info.sku_info.img)) {
                this.orderByImgs();
            }
            this.startTimer();
        },
        showBigImg(url, index) {
            // 展示规格大图
            let _this = this;
            let imgarray = [];
            if (url.constructor === Array) {
                url.forEach(item => {
                    imgarray.push(_this.util.reImg(item));
                });
            } else {
                imgarray.push(_this.util.reImg(url));
            }
            this.imagePreview = ImagePreview({
                images: imgarray,
                loop: false,
                startPosition: index,
                onClose: () => {
                    _this.isImagePreview = false;
                }
            });
            _this.isImagePreview = true;
        },
        /**加入购物车钱数据整理 */
        getCartData(clickType, sku_id, sku_info) {
            let k_info = _.cloneDeep(sku_info);
            k_info.number = 0;
            let number = 0;
            let prices = 0;
            // 点击加入购物车
            let curAddCartGoodsObj = JSON.stringify(this.goodsData.info); // 此种拷贝方式在操作拷贝的数据时，不影响原来的数据
            curAddCartGoodsObj = JSON.parse(curAddCartGoodsObj);
            curAddCartGoodsObj.sku_info.addCartNum = this.addProductNumModel; // curAddCartGoodsObj 为加入购物车数据
            /**获取当前的货物数量,并准备导入vuex */
            number = parseInt(curAddCartGoodsObj.sku_info.addCartNum);
            k_info.number = number;
            k_info.sku_spec = this.util.toSku_spec(k_info.info);
            prices = sku_info.info.sku_info.price * number;
            /** */
            /**把购物车数目标签拿出来计算 */
            /**接口请求区域 */
            //设定购物车參數
            let sku = {
                number: k_info.number,
                img: k_info.info.sku_info.img,
                name: k_info.name,
                price: k_info.info.sku_info.price,
                title: k_info.sku_spec,
                spu_id: k_info.spu_id,
                sku_id: k_info.info.sku_id,
                store: k_info.info.sku_info.store,
                _preferential: k_info.info.sku_info._preferential
            };
            let _store = this.goodsData.store;
            _store["activity"] = k_info.info.sku_info._incordec;
            _store["sku"] = sku;
            return _store;
        },
        /**加入购物车or立即购买 */
        addCartOrBuy(clickType, sku_id, sku_info) {
            let _this = this;
            let _store = _this.getCartData(clickType, sku_id, sku_info);
            let obj = {};
            let params = {
                [_store.sku.sku_id]: _store.sku.number
            };
            params = JSON.stringify(params);
            obj = {
                method: "api.module.order.cart.add",
                params: params,
                buynow: this.clickType == "buy" ? true : false
            };
            if (_store.sku.store == 0) {
                _this.$toast({
                    message: "商品库存不足",
                    position: "bottom"
                });
                return;
            }
            //调用ajax
            let _loading = _this.$xzLoading();
            _this.post(obj, function(data) {
                _loading.clear();
                if (data.code == 200) {
                    if (clickType === "buy") {
                        // 如果点击的是立即购买
                        _this.listenClose();
                        _this.$router.push({
                            name: "orderconfirm",
                            query: {
                                s: _store.sku.sku_id + "," + _store.sku.number
                            }
                        });
                    } else {
                        _this.addShop(_store);
                        _this.$toast.success("加入购物车成功"); // 此处差服务器加入验证，暂时提示成功
                        _this.listenClose();
                    }
                } else {
                    _this.$toast({
                        message: data.msg,
                        position: "bottom"
                    });
                }
            });
        },
        addProductNum(curNum) {
            // 点击添加数量按钮
            if (curNum >= this.goodsData.info.sku_info.skuStore) {
                this.$toast(
                    "该商品最多可购买" +
                        this.goodsData.info.sku_info.skuStore +
                        "件"
                );
            }
        },
        handleClickNorm(type) {
            switch (type) {
                case "buy":
                    this.popupBottomBtnText = "立即购买";
                    this.clickType = "buy"; // 设置点击type
                    break;
                case "addCart":
                    this.popupBottomBtnText = "加入购物车";
                    this.clickType = "addCart"; // 设置点击type
                    break;
                default:
                    break;
            }
            if (this.goodsData.info.sku_info.store == 0) {
                this.popupBottomBtnText = "已售馨";
            }
            // if (this.goodsData.sku_arr.length < 2) {
            //     this.addCartOrBuy(
            //         type,
            //         this.goodsData.info.sku_id,
            //         this.goodsData
            //     );
            // } else {
            //     this.isShowNorm = true;
            // }
            this.isShowNorm = true;
        },
        // 选择地址
        handleClickSelAdd(id) {
            this.addID = id;
        },
        listenClose() {
            //如果分享打开
            let isS = false;
            if (this.isShowShare) {
                this.isShowShare = false;
                isS = true;
            } else if (this.isShowActive) {
                this.isShowActive = false;
                isS = true;
            } else if (this.isShowCoupon) {
                this.isShowCoupon = false;
                isS = true;
            } else if (this.isShowAddress) {
                this.isShowAddress = false;
                isS = true;
            } else if (this.isShowNorm) {
                this.isShowNorm = false;
                isS = true;
            }
            return isS;
        },
        jump(e, index) {
            // 用 class="d_jump" 添加锚点
            let jump = document.querySelectorAll(".d_jump");
            let total = jump[index].offsetTop;
            let distance =
                document.documentElement.scrollTop || document.body.scrollTop;
            // 平滑滚动，时长500ms，每10ms一跳，共50跳
            let step = total / 50;
            if (total > distance) {
                smoothDown();
            } else {
                let newTotal = distance - total;
                step = newTotal / 50;
                smoothUp();
            }
            this.active = e.target.dataset.id;

            function smoothDown() {
                if (distance < total) {
                    distance += step;
                    document.body.scrollTop = distance;
                    document.documentElement.scrollTop = distance;
                    setTimeout(smoothDown, 10);
                } else {
                    document.body.scrollTop = total;
                    document.documentElement.scrollTop = total;
                }
            }

            function smoothUp() {
                if (distance > total) {
                    distance -= step;
                    document.body.scrollTop = distance;
                    document.documentElement.scrollTop = distance;
                    setTimeout(smoothUp, 10);
                } else {
                    document.body.scrollTop = total;
                    document.documentElement.scrollTop = total;
                }
            }
        },
        onScroll() {
            let _this = this;
            let scrolled =
                document.documentElement.scrollTop || document.body.scrollTop;
            let _jump = document.querySelectorAll(".d_jump");
            if (_this.util.isEmpty(_jump) || _jump.length == 0) {
                return;
            }
            if (scrolled >= _jump[3].offsetTop) {
                _this.active = 3;
            } else if (
                scrolled < _jump[3].offsetTop &&
                scrolled >= _jump[2].offsetTop
            ) {
                _this.active = 2;
            } else if (
                scrolled < _jump[2].offsetTop &&
                scrolled >= _jump[1].offsetTop
            ) {
                _this.active = 1;
            } else {
                _this.active = 0;
            }
            if (
                document.documentElement.scrollTop > window.innerHeight ||
                document.body.scrollTop > window.innerHeight
            ) {
                _this.isToTop = true;
            } else {
                _this.isToTop = false;
            }
        },
        collect_click() {
            let _this = this;
            let _sku_id = _this.goodsData.info.sku_id;
            let _spu_id = _this.goodsData.spu_id;
            let _action = "add";
            if (_this.goodsData.isCollect) {
                _action = "delete";
            }
            _this.post(
                {
                    method: "api.module.member.favorite." + _action,
                    sku_id: _sku_id,
                    spu_id: _spu_id
                },
                function(data) {
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    if (_action == "add") {
                        _this.$toast({
                            message: "收藏成功"
                        });
                    } else {
                        _this.$toast({
                            message: "已取消收藏"
                        });
                    }
                    _this.goodsData.isCollect = !_this.goodsData.isCollect;
                }
            );
        },
        draw_coupon(_id) {
            let _this = this;
            _this.post(
                {
                    method: "api.module.coupon.coupon.receive",
                    coupon_id: _id
                },
                function(data) {
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    _this.$toast({
                        message: "领取成功"
                    });
                }
            );
        },
        go_advisory() {
            this.$router.push({
                name: "goodsadvisory",
                query: {
                    sp: this.goodsData.spu_id,
                    sk: this.goodsData.info.sku_id
                }
            }); // -> /user
        },
        /**加入足迹 */
        pushFootPrint(list) {
            let obj = {
                time: new Date().getTime(),
                item: list
            };
            let sku_id = list.info.sku_id;
            /**添加足迹数据 */
            if (this.footprint.footNote.length > 0) {
                let i = _.findIndex(this.footprint.footNote, n => {
                    return n.item.info.sku_id == sku_id;
                });
                if (i == -1) {
                    this.addFoot(obj);
                } else {
                    return false;
                }
            } else {
                this.addFoot(obj);
            }
        },
        go_goods(sku_id) {
            this.$router.push("/goods/detail/" + sku_id);
        },
        go_kefu() {
            if (this.util.isEmpty(this.kfUrl)) {
                this.$toast({
                    message: "暂未启用敬请期待"
                });
            } else {
                window.location.href = this.kfUrl;
            }
        },
        touchstart(e) {
            this.touchData = e.changedTouches[0];
        },
        tap(e, t, option) {
            var _this = this;
            if (
                _this.touchData.pageX == e.changedTouches[0].pageX &&
                _this.touchData.pageY == e.changedTouches[0].pageY
            ) {
                if (t == 1) {
                    _this.showBigImg(option.imgs, option.index);
                } else if (t == 2) {
                    _this.go_goods(option.id);
                }
            }
        }
    },
    updated() {
        window.addEventListener("scroll", this.onScroll);
    },
    beforeMount() {},
    mounted: function() {
        window.addEventListener("scroll", this.onScroll);
    },
    beforeRouteLeave(to, from, next) {
        if (to.path == "/login") {
            this.listenClose();
            if (!this.imagePreview) {
                this.imagePreview.close();
            }
            next();
        } else if (this.isImagePreview) {
            this.imagePreview.close();
            this.isImagePreview = false;
            next(false);
        } else if (this.listenClose()) {
            next(false);
        } else {
            window.removeEventListener("scroll", this.onScroll); //离开页面删除监听
            next();
        }
    },
    beforeRouteUpdate(to, from, next) {
        if (this.isImagePreview) {
            this.imagePreview.close();
            this.isImagePreview = false;
            next(false);
        } else if (this.listenClose()) {
            next(false);
        } else {
            next();
        }
        this.$xzLoading.clear();
    }
};
</script>