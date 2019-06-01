<template>
    <div class="user-main">
        <van-nav-bar class="xz-nva-bar" fixed title="会员中心"/>
        <div class="personal-info" :class="{'close_balance':websit.data.balance_pay!=1}">
            <div class="peronal-cont">
                <div class="peronal-user" v-if="userMessage.isLogin">
                    <span class="peronal-phot">
                        <img :src="util.reImg(userData.avatar)" alt>
                    </span>
                    <div class="peronal-text">
                        <h4>{{userData.nickname}}</h4>
                        <span v-if="userData._group">{{userData._group.name}}</span>
                    </div>
                </div>
                <div class="peronal-login" @click="go_login" v-else>
                    <strong>您还未登录</strong>
                    <span>立即登录</span>
                </div>
            </div>
            <div
                class="peronal-wallet"
                @click.stop="go_balancewallet"
                v-if="websit.data.balance_pay==1"
            >
                <div class="peronal-wallet-title">
                    <h3>余额钱包</h3>
                    <h5>{{websit.data.currency}}{{userData.money}}</h5>
                </div>
                <div class="peronal-wallet-btn" @click.stop="go_brecharged">充值</div>
            </div>
        </div>
        <div class="xz-panel">
            <van-cell class="order-cell" title="我的订单" value="查看全部订单" is-link url="#/order/list"/>
            <van-tabbar class="orderbar" :fixed="false">
                <van-tabbar-item
                    icon="x xz-icon xz-icon-daifukuan"
                    :info="userData.order_info.wait_pay"
                    to="/order/list/1"
                    v-if="userData.order_info&&userData.order_info.wait_pay>0"
                >待付款</van-tabbar-item>
                <van-tabbar-item icon="x xz-icon xz-icon-daifukuan" to="/order/list/1" v-else>待付款</van-tabbar-item>
                <van-tabbar-item
                    icon="x xz-icon xz-icon-daifahuo"
                    to="/order/list/2"
                    :info="userData.order_info.wait_send"
                    v-if="userData.order_info&&userData.order_info.wait_send>0"
                >待发货</van-tabbar-item>
                <van-tabbar-item icon="x xz-icon xz-icon-daifahuo" to="/order/list/2" v-else>待发货</van-tabbar-item>
                <van-tabbar-item
                    icon="x xz-icon xz-icon-daishouhuo"
                    to="/order/list/3"
                    :info="userData.order_info.wait_receiving"
                    v-if="userData.order_info&&userData.order_info.wait_receiving>0"
                >待收货</van-tabbar-item>
                <van-tabbar-item icon="x xz-icon xz-icon-daishouhuo" to="/order/list/3" v-else>待收货</van-tabbar-item>
                <van-tabbar-item
                    icon="x xz-icon xz-icon-pingjia"
                    to="/order/common"
                    :info="userData.order_info.wait_comment"
                    v-if="userData.order_info&&userData.order_info.wait_comment>0"
                >待评价</van-tabbar-item>
                <van-tabbar-item icon="x xz-icon xz-icon-pingjia" to="/order/common" v-else>待评价</van-tabbar-item>
            </van-tabbar>
        </div>
        <div class="xz-panel">
            <van-cell class="order-cell" title="我的服务"/>
            <div class="user-serve">
                <!-- <a class="serve-item">
                        <img src="../../assets/images/svg/xz-ptdd.svg" alt>
                        拼团订单
                </a>-->
                <a class="serve-item" href="#/user/coupon">
                    <img src="../../assets/images/svg/xz-yhj.svg" alt> 优惠券
                </a>
                <a class="serve-item" href="#/user/collect">
                    <img src="../../assets/images/svg/xz-sc.svg" alt> 收藏
                </a>
                <a class="serve-item" href="#/user/footprint">
                    <img src="../../assets/images/svg/xz-zj.svg" alt> 足迹
                </a>
                <!-- <a class="serve-item">
                        <img src="../../assets/images/svg/xz-jfzx.svg" alt>
                        积分中心
                </a>-->
                <a class="serve-item" href="#/user/myconsult">
                    <img src="../../assets/images/svg/xz-zx.svg" alt> 咨询
                </a>
                <a class="serve-item" href="#/order/afsale/service">
                    <img src="../../assets/images/svg/xz-shfw.svg" alt> 售后服务
                </a>
                <!-- <a class="serve-item">
                        <img src="../../assets/images/svg/xz-zhxx.svg" alt>
                        账号信息
                    </a>
                    <a class="serve-item">
                        <img src="../../assets/images/svg/xz-fx.svg" alt>
                        分销
                </a>-->
                <a class="serve-item" href="#/user/address">
                    <img src="../../assets/images/svg/xz-address.svg" alt> 收货地址
                </a>
                <a class="serve-item" href="#/user/accountdesign">
                    <img src="../../assets/images/svg/xz-sz.svg" alt> 设置
                </a>
            </div>
        </div>
        <div class="xz-panel">
            <van-cell class="order-cell" title="车主服务"/>
            <div class="user-serve">
                <a class="serve-item" href="#/carOwnerCenter/index">
                    <img src="../../assets/images/uccenter/uc-idx-ico17.png" alt> 违法处理
                </a>
                <a class="serve-item">
                    <img src="../../assets/images/uccenter/uc-idx-ico18.png" alt> 年检查询
                </a>
                <a class="serve-item">
                    <img src="../../assets/images/uccenter/uc-idx-ico19.png" alt> 保险查询
                </a>
                <a class="serve-item">
                    <img src="../../assets/images/uccenter/uc-idx-ico20.png" alt> 我的保养
                </a>
                <a class="serve-item" href="#/carOwnerCenter/myGarage">
                    <img src="../../assets/images/uccenter/uc-idx-ico21.png" alt> 车辆管理
                </a>
                <a class="serve-item" href="#/carOwnerCenter/yearCheckInfo">
                    <img src="../../assets/images/uccenter/uc-idx-ico22.png" alt> 车辆年检
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem, Cell } from "vant";
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            userData: {
                avatar:
                    "/template/default/statics/images/member/default_head.png",
                username: "请登录",
                money: 0.0,
                _group: {
                    name: "游客"
                }
            }
        };
    },
    created() {
        let _this = this;
        _this.loadData();
    },
    methods: {
        ...mapActions("userMessage", ["getUser", "setUser"]),
        ...mapActions("userMessage", ["updataWechatLogin","updataWechatData"]),
        loadData() {
            let _this = this;
            let _userData = _this.userMessage.user;
            _this.userData = _userData;
            _this.post(
                {
                    method: "api.module.member.car.mycars"
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
        // async getAxios(params) {
        //     let data = await this.api.post(params);
        // },
        go_login() {
            if (this.websit.isWeix &&
                !this.userMessage.isLogin
            ) {
                this.updataWechatLogin(true);
            } else {
                this.$router.push("/login");
            }
        },
        go_balancewallet() {
            this.$router.push("/user/balancewallet");
        },
        go_brecharged() {
            this.$router.push("/user/brecharged");
        }
    },
    components: {
        vanTabbar: Tabbar,
        vanTabbarItem: TabbarItem,
        vanCell: Cell
    },
    computed: {
        ...mapState(["shopCar"]),
        ...mapState(["userMessage"]),
        ...mapState(["websit"])
    }
};
</script>