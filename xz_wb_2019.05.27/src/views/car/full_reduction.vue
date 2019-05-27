<template>
    <div class="goods-list-view">
        <van-nav-bar
            @click-left="go_back"
            class="xz-nva-bar navbar"
            :z-index="2"
            fixed
            title="参与商品"
            left-arrow
        ></van-nav-bar>
        <div class="active-group" v-if="activityData.id>0">
            <p class="active-txt">
                <em>{{activityData.info.type}}</em>
                {{activityData.info.msg}}
            </p>
            <a href="javascript:void(0)" @click="go_reduction(hd)" class="look-btn">
                去凑单
                <xz-icon type="forward"/>
            </a>
        </div>
        <div class="goods-list reduction">
            <a
                class="goods-item"
                v-for="item in goodsList"
                :key="item.id"
            >
                <img v-lazy="util.reImg(item.thumb)">
                <div class="goods-title">
                    <div class="xz-title">
                        <span class="hd-tip" v-show="item._preferential">限时抢购</span>
                        {{ item.sku_name }}
                    </div>
                </div>
                <div class="goods-price">
                    <span>{{websit.data.currency}}</span>
                    {{ (item._preferential?item._preferential.price:item.shop_price) | numFilter }}
                    <label>销量：{{ item.sales }}</label>
                </div>
                <div class="xz-btn btn-e43" @click="showAddCar(item)">加入购物车</div>
            </a>
        </div>
        <to-top ref="totop" v-if="isToTop"/>
        <van-actionsheet v-model="isShowNorm">
            <xz-popup
                class="reduction"
                btnName="加入购物车"
                clickType="addCart"
                :clickFlag="isShowNorm"
                @clickBottomBtn="addCar_click"
                :isShowHd="true"
                :isShowBtn='true'
                :disabled="active.number==0"
            >
                <div class="popup-hd norm-hd" slot="title">
                    <div class="goods-msgtxt">
                        <span class="msg-pic">
                            <img v-lazy="util.reImg(active.thumb)" alt>
                        </span>
                        <div class="txt-box">
                            <span class="price">
                                {{websit.data.currency}}
                                <strong>{{ active.shop_price }}</strong>
                            </span>
                            <p class="goods-desc">库存：{{ active.number }}</p>
                            <p class="goods-desc">编号：{{ active.sn }}</p>
                        </div>
                    </div>
                    <xz-icon type="guanbi" @click="isShowNorm=false"/>
                </div>
                <div class="number-wrap" slot="footer">
                    <span>数量</span>
                    <van-stepper
                        v-model="num"
                        integer
                        :min="1"
                        :max="active.number"
                        :step="1"
                        @change="stepChange"
                    />
                </div>
            </xz-popup>
        </van-actionsheet>
    </div>
</template>
<script>
import menu from "../../components/goods/menu.vue";
import popup from "@/components/goods/index.vue";
import toTop from "@/components/to-top/index.vue";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            isShowNorm:false,
            isLoad: false,
            goodsList: [],
            isToTop: false,
            isFilter: false,
            activityData:{},
            active:{},
            num:1,
            postData: {
                method: "api.module.order.cart.additem",
                limit: 10,
                activity_id: "",
                sku_ids: ""
            }
        };
    },
    components: {
        "xz-menu": menu,
        xzPopup: popup,
        toTop
    },
    computed: {
        ...mapState(["shopCar"]),
        ...mapState(["websit"])
    },
    created() {
        let _id = this.$route.query.id;
        let _s = this.$route.query.id;
        this.postData.activity_id = _id;
        this.postData.sku_ids = _s;
        this.loadData();
    },
    beforeCreate() {},
    methods: {
        ...mapActions("shopCar", [
            "upSku_ids"
        ]),
        loadData() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                _this.postData,
                data => {
                    _loading.clear();
                    if (data.code == 200) {
                        _this.goodsList = data.result.lists;
                        _this.activityData = data.result.activity;
                    }
                },
                res => {}
            );
        },
        showAddCar(item){
            this.active=item;
            this.num= 1;
            this.isShowNorm=true;
        },
        onScroll() {
            let _this = this;
            if (
                document.documentElement.scrollTop > window.innerHeight ||
                document.body.scrollTop > window.innerHeight
            ) {
                _this.isToTop = true;
            } else {
                _this.isToTop = false;
            }
        },
        stepChange(i){
            if(this.active.number < i){
                this.num = this.active.number;
            }else if(i<1){
                this.num =0;
            }
        },
        addCar_click(){
             let _cart = {
                number: this.num,
                img: this.active.thumb,
                name: this.active.sku_name,
                price: this.active.shop_price,
                title: this.active.spec_show,
                spu_id: this.active.spu_id,
                sku_id:this.active.sku_id,
                store:this.active.number,
                _preferential:this.active._preferential
            };
            let params = {
                [_cart.sku_id]: _cart.number
            };
            let addParams = {
                method: "api.module.order.cart.add",
                params: params,
                buynow: this.clickType == "buy" ? true : false
            };
            let _loading = this.$xzLoading();
            this.post(addParams, (data) =>{
                _loading.clear();
                if (data.code == 200) {
                        // this.addShop(_cart);
                        this.$toast.success("加入购物车成功"); // 此处差服务器加入验证，暂时提示成功
                        this.isShowNorm = false;
                        let _sku_ids = this.shopCar.checkSku_ids;
                        if(_sku_ids.indexOf(_cart.sku_id)==-1){
                            _sku_ids.push(_cart.sku_id);
                        }
                        this.upSku_ids(_sku_ids);
                } else {
                    this.$toast({
                        message: data.msg,
                        position: "bottom"
                    });
                }
            });
        }
    },
    mounted: function() {
        window.addEventListener("scroll", this.onScroll);
    },
    beforeRouteLeave(to, from, next) {
        window.removeEventListener("scroll", this.onScroll); //离开页面删除监听
        next();
    }
};
</script>