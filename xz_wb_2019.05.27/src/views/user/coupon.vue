<template>
    <div class="myorder-view">
        <van-nav-bar @click-left="go_back" fixed class="xz-nva-bar" title="优惠券" left-arrow/>
        <van-tabs sticky animated swipeable>
            <van-tab :title="it.tabTit" v-for="(it,i ) in couponData" :key="i">
                <div class="xz-tab" data-id="1" slot="title">{{ it.tabTit }}</div>
                <!--说明： postData： 需要传的加的数据    loadListSuccFn： 加载成功后回调，返回加载后的数据  ablePull：String 是否可以下拉刷新 取值： true或false ;
                ableLoad 是否可以上拉加载，String  true或false-->
                <pull-up
                    :postData="it.postData"
                    @loadListSuccFn="loadListSuccFn"
                    ablePull="true"
                    ableLoad="true"
                    :ref="it.ref"
                    :pullid="i"
                    res-key="list"
                >
                    <section class="listContent coupon-info" slot="listContent">
                        <article
                            class="coupon-item"
                            :class="{'dq-item':(item.status==1)||(item.status==2)}"
                            v-for="(item,index) in it.list"
                            :key="it.id"
                        >
                            <div class="coupon-txtbox">
                                <span v-if="item.discounts_type==3">{{item.money}}折</span>
                                <span v-else>{{websit.data.currency}}{{item.money}}</span>
                                <div class="c-txtbox">
                                    <p>{{item.title}}</p>
                                    <time>{{item.time}}</time>
                                </div>
                                <a href="javascript:void(0);" class="btn" v-if="item.status==0">未使用</a>
                                <a href="javascript:void(0);" class="btn" v-if="item.status==1">已使用</a>
                                <a href="javascript:void(0);" class="btn" v-if="item.status==2">已过期</a>
                            </div>
                            <div
                                class="coupon-desc"
                                :class="{'active':item.show}"
                                @click="handleCouponChange(i,index)"
                            >
                                <div class="c-desc-box">{{item.description}}</div>
                                <xz-icon
                                    :type="item.show?'iconfontup':'iconfontdown'"
                                    slot="right"
                                />
                            </div>
                        </article>
                    </section>
                </pull-up>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs, Collapse, CollapseItem } from "vant";
import pullUp from "../../components/pull/index.vue";
import { mapState } from "vuex";
export default {
    name: "coupon",
    components: {
        "van-tabs": Tabs,
        "van-tab": Tab,
        pullUp: pullUp
    },
    data() {
        return {
            tabOffsetTop: 50,
            couponData: [
                {
                    tabTit: "未使用",
                    ref: "coupon1",
                    postData: {
                        method: "api.module.coupon.coupon.selfcoupons",
                        status: 1,
                        limit: 10
                    },
                    list: []
                },
                {
                    tabTit: "已使用",
                    ref: "coupon2",
                    postData: {
                        method: "api.module.coupon.coupon.selfcoupons",
                        status: 2,
                        limit: 10
                    },
                    list: []
                },
                {
                    tabTit: "已过期",
                    ref: "coupon3",
                    postData: {
                        method: "api.module.coupon.coupon.selfcoupons",
                        status: 3,
                        limit: 10
                    },
                    list: []
                }
            ]
        };
    },
    computed: {
        ...mapState(["websit"])
    },
    methods: {
        loadListSuccFn(dataList, data, i) {
            // tab 数据加载成功以后回调
            dataList.forEach(item => {
                item.show = false;
            });
            this.couponData[i].list = dataList;
        },
        /*接收当前选中的卡片对象,以及该对象在上两层循环中的位置*/
        handleCouponChange(_i, _index) {
            let _this = this;
            _this.couponData.forEach((item, i) => {
                if (i == _i) {
                    item.list.forEach((cou, index) => {
                        if (index == _index) {
                            cou.show = !cou.show;
                        }
                    });
                    _this.$set(_this.couponData, i, item);
                }
            });
        }
    },
    mounted() {
        var _this = this;
    }
};
</script>
