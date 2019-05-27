<template>
    <div id="main" class="margin-ios" :class="'style'+style_id">
        <transition :name="transitionName">
            <router-view></router-view>
        </transition>
        <WechatLogin></WechatLogin>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import WechatLogin from "@/views/WeChat_login/pop_up.vue";
export default {
    data() {
        return {
            style_id: "1",
            transitionName: "slide-right"
        };
    },
    created() {
        this.loadData();
        this.isWeixin();
        var token = this.util.getLS("token", 7);
        if (this.util.isEmpty(token)) {
            let _carts = localStorage.getItem("shopCar");
            if (!this.util.isEmpty(_carts)) {
                this.updateShopcar(JSON.parse(_carts));
            }
        }
    },
    methods: {
        ...mapActions("websit", ["updataWebSit", "upIsWeiXin"]),
        ...mapActions("userMessage", ["setUser"]),
        ...mapActions("shopCar", ["updateShopcar"]),
        loadData() {
            let _this = this;
            _this.post(
                {
                    method: "api.module.admin.setting.get"
                },
                function(data) {
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    _this.updataWebSit(data.result);
                    document.title = _this.websit.data.site_name;
                }
            );
            _this.post(
                {
                    method: "api.module.member.member.data"
                },
                function(data) {
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    if (data.result != null) {
                        let _data = data.result;
                        _this.userData = _data;
                        _this.setUser(_data);
                    }
                }
            );
        },
        isWeixin() {
            var ua = window.navigator.userAgent.toLowerCase();
            //通过正则表达式匹配ua中是否含有MicroMessenger字符串
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                this.upIsWeiXin(true);
            } else {
                this.upIsWeiXin(false);
            }
        },
        getStyle(_id) {
            let _style = "";
            switch (_id) {
                case 1:
                    _style = "style1";
                    break;
                case 2:
                    _style = "style2";
                    break;
                case 3:
                    _style = "style3";
                    break;
                case 4:
                    _style = "style4";
                    break;
                case 5:
                    _style = "style5";
                    break;
                case 6:
                    _style = "style6";
                    break;
            }
            return _style;
        },
        addCart() {
            let _this = this;
            let _params = {};
            let list = _this.shopCar.shopCar;
            list.store.forEach((shop) => {
                shop.sku_list.forEach(item=>{
                    _params[item.sku_id] = item.number;
                })
            });
            let postCart = {
                method: "api.module.order.cart.add",
                params: JSON.stringify(_params),
                buynow: false
            };
            _this.post(postCart, function(data) {
                if (200 == data.code) {
                    localStorage.removeItem("shopCar");
                    return;
                }
            });
        }
    },
    components: {
        WechatLogin
    },
    computed: {
        ...mapState(["websit"]),
        ...mapState(["shopCar"]),
        ...mapGetters("shopCar", ["Shoplen"]),
        ...mapGetters("websit", ["getTimestamp", "getWeSit"]),
        ...mapGetters("userMessage", ["getisLogin"])
    },
    watch: {
        $route(to, from) {
            const toIndex = to.meta.index;
            const fromIndex = from.meta.index;
            this.transitionName =
                toIndex < fromIndex ? "slide-right" : "slide-left";
        },
        getTimestamp: function(newValue) {
            this.loadData();
        },
        getWeSit: function(newValue) {
            if (!this.util.isEmpty(newValue.shop_style))
                this.style_id = newValue.shop_style.id;
        },
        getisLogin: function(newValue) {
            if (newValue) {
                this.addCart();
            }
        }
    },
    mounted() {}
};
</script>