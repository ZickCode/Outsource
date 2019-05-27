<template>
    <div class="goods-list-view">
        <van-nav-bar
            @click-left="go_back"
            class="xz-nva-bar navbar"
            :z-index="2"
            fixed
            :title="type.name"
            left-arrow
        >
            <xz-icon type="sousuo" slot="right" @click="go_sousuo"/>
        </van-nav-bar>
        <div class="tab-head">
            <div class="xz-tabs">
                <div
                    :class="['xz-tab',postData.order=='1'?'active':'']"
                    data-id="1"
                    @click="tabs_click"
                >综合</div>
                <div
                    :class="['xz-tab',postData.order=='2'?'active':'']"
                    data-id="2"
                    @click="tabs_click"
                >销量</div>
                <div
                    :class="['xz-tab',postData.order=='3' || postData.order=='4'?'active':'']"
                    data-id="3"
                    @click="tabs_click"
                >
                    价格
                    <xz-icon
                        :class="['tab-icon-t',postData.order=='3'?'active':'']"
                        data-id="3"
                        type="shangjiantou"
                    ></xz-icon>
                    <xz-icon
                        :class="['tab-icon-b', postData.order=='4'?'active':'']"
                        data-id="3"
                        type="xiajiantou"
                    ></xz-icon>
                </div>
                <div
                    :class="['xz-tab',postData.order=='5'?'active':'']"
                    data-id="5"
                    @click="tabs_click"
                >人气</div>
                <div class="line" ref="line"></div>
            </div>
            <!-- <a class="filter-btn" href="javascript:void(0)" >筛选</a> -->
            <a class="filter-btn" href="javascript:void(0)" @click="isFilter=true">筛选</a>
        </div>
        <pull-up
            :postData="postData"
            @loadListSuccFn="loadListSuccFn"
            ablePull="true"
            ableLoad="true"
            ref="goodsPull"
            v-model="isLoad"
        >
            <div class="goods-list" slot="listContent">
                <a
                    class="goods-item"
                    :href="'#/goods/detail/'+item.sku_id"
                    v-for="item in goodsList"
                    :key="item.id"
                >
                    <img v-lazy="util.reImg(item.thumb)">
                    <div class="goods-title">
                        <div class="xz-title"><span class="hd-tip" v-show="item._preferential">限时抢购</span>{{ item.sku_name }}</div>
                    </div>
                    <div class="goods-price">
                        <span>{{websit.data.currency}}</span>
                        {{ (item._preferential?item._preferential.price:item.shop_price) | numFilter }}
                        <label>销量：{{ item.sales }}</label>
                    </div>
                </a>
            </div>
        </pull-up>
        <van-popup v-model="isFilter" class="xz-popup-rigth" position="right">
            <div class="filter-main">
                <div class="wfilter-wrap">
                    <div class="wfilter-cont">
                        <div class="filters">
                            <div class="filter-list">
                                <div class="filter-title">标题</div>
                                <div class="filter-content price">
                                    <input
                                        type="number"
                                        placeholder="最低价"
                                        v-model="postData.min_price"
                                        @keyup.enter="Refresh"
                                        @blur="refresh"
                                    >
                                    <span>~</span>
                                    <input
                                        type="number"
                                        placeholder="最高价"
                                        v-model="postData.max_price"
                                        @keyup.enter="Refresh"
                                        @blur="refresh"
                                    >
                                </div>
                            </div>
                            <div
                                class="filter-list"
                                v-if="brandData.list && brandData.list.length>0"
                            >
                                <div class="filter-title">
                                    品牌
                                    <a
                                        href="javascript:void(0)"
                                        @click="brandData.isShow=!brandData.isShow"
                                        v-if="brandData.list.length>6"
                                    >{{brandData.isShow?"收起":"展开"}}</a>
                                </div>
                                <div class="filter-content" :class="{'hidde':!brandData.isShow}">
                                    <a
                                        href="javascript:void(0)"
                                        v-for="(item,index) in brandData.list"
                                        :key="item.id"
                                        :class="{'active':item.check}"
                                        @click="brandClick(index)"
                                    >{{item.name}}</a>
                                </div>
                            </div>
                            <div class="filter-list" v-for="(item,index) in specList" :key="index">
                                <div class="filter-title">
                                    {{item.name}}
                                    <a
                                        href="javascript:void(0)"
                                        @click="item.isShow=!item.isShow"
                                        v-if="item.list.length>6"
                                    >{{item.isShow?"收起":"展开"}}</a>
                                </div>
                                <div class="filter-content" :class="{'hidde':!item.isShow}">
                                    <a
                                        href="javascript:void(0)"
                                        v-for="(spec,si) in item.list"
                                        :key="si"
                                        :class="{'active':spec.check}"
                                        @click="specClick(index,si)"
                                    >{{spec.name}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="filter-btns">
                    <a href="javascript:void(0)" class="xz-btn btn-f9" @click="reset_select">重置</a>
                    <a href="javascript:void(0)" class="xz-btn btn-e43" @click="isFilter=false">确定</a>
                </div>
            </div>
        </van-popup>
        <xz-menu></xz-menu>
        <to-top ref="totop" v-if="isToTop"/>
    </div>
</template>
<script>
import menu from "../../components/goods/menu.vue";
import pullUp from "../../components/pull/index.vue";
import toTop from "@/components/to-top/index.vue";
import { mapState } from "vuex";
export default {
    data() {
        return {
            isLoad: false,
            goodsList: [],
            isToTop: false,
            isFilter: false,
            type: {
                name: "商品列表"
            },
            postData: {
                method: "api.module.goods.goods.lists",
                limit: 10,
                catid: "",
                order: "1",
                keyword: "",
                min_price: "",
                max_price: "",
                brand_id: "",
                specs: ""
            },
            brandData: {
                isShow: false,
                list: []
            },
            specList: []
        };
    },
    components: {
        "xz-menu": menu,
        pullUp: pullUp,
        toTop
    },
    computed: {
        ...mapState(["websit"])
    },
    created() {
        let _this = this;
        let _id = _this.$route.params.id;
        let _key = _this.$route.query.k;
        if (!_this.util.isEmpty(_key)) {
            _this.postData.keyword = _key;
            _this.type.name = _key;
        } else if (!_this.util.isEmpty(_id)) {
            _this.postData.catid = _id;
            _this.loadData();
            _this.loadSpecs(_id);
        } else {
            _this.type = {
                name: "商品列表"
            };
        }
        _this.loadBrand();
        // this.$nextTick(function() {
        //     _this.refresh();
        // });
    },
    beforeCreate() {},
    methods: {
        loadData() {
            let _this = this;
            _this.post(
                {
                    method: "api.module.goods.type.type_info",
                    type_id: _this.postData.catid
                },
                function(data) {
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    _this.type = data.result;
                }
            );
        },
        loadBrand() {
            let _this = this;
            _this.post(
                {
                    method: "api.module.goods.brand.lists",
                    catid: _this.postData.catid,
                    keyword: _this.postData.keyword
                },
                function(data) {
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    _this.brandData.list = [];
                    data.result.forEach(item => {
                        item["check"] = false;
                        _this.brandData.list.push(item);
                    });
                }
            );
        },
        loadSpecs(_catid) {
            let _this = this;
            _this.post(
                {
                    method: "api.module.goods.type.specs",
                    catid: _catid
                },
                function(data) {
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    _this.specList = [];
                    data.result.forEach(item => {
                        item["isShow"] = false;
                        _this.specList.push(item);
                    });
                }
            );
        },
        tabs_click(e) {
            let _this = this;
            if (_this.isLoad) {
                return;
            }
            let key = e.target.dataset.id;
            if (e.target.className.indexOf("xz-icon") > -1)
                _this.$refs.line.style.transform =
                    "translateX(" + e.target.offsetParent.offsetLeft + "px)";
            else
                _this.$refs.line.style.transform =
                    "translateX(" + e.target.offsetLeft + "px)";
            if (key === "3" && _this.postData.order == key) {
                key = "4";
            }
            _this.postData.order = key;
            _this.refresh();
        },
        loadListSuccFn(reviewData, data) {
            //数据加载成功以后回调
            this.goodsList = reviewData;
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
        go_sousuo() {
            let _this = this;
            if (!_this.util.isEmpty(_this.postData.catid)) {
                _this.$router.push({
                    path: "/goods/search",
                    query: {
                        k: _this.postData.keyword
                    }
                });
            } else {
                _this.$router.push({
                    path: "/goods/search",
                    query: { k: _this.postData.keyword }
                });
            }
        },
        specClick(index, si) {
            let _this = this;
            let _specList = _this.specList[index];
            _specList.list.forEach((spec, _si) => {
                if (_si == si) {
                    if (spec.check) {
                        spec.check = false;
                    } else {
                        spec.check = true;
                    }
                } else {
                    spec.check = false;
                }
            });
            _this.$set(_this.specList, index, _specList);
            let _postSpecs = [];
            _this.specList.forEach(item => {
                let _c = item.list.find(p => p.check == true);
                if (!_this.util.isEmpty(_c)) {
                    _postSpecs.push(_c.name);
                }
            });
            _this.postData.specs = _postSpecs.join(",");
            _this.refresh();
        },
        brandClick(index) {
            let _this = this;
            // let _brands = _this.brandData['list'];
            _this.brandData.list.forEach((item, _index) => {
                if (index == _index) {
                    if (item.check) {
                        item.check = false;
                        _this.postData.brand_id = "";
                    } else {
                        item.check = true;
                        _this.postData.brand_id = item.id;
                    }
                } else {
                    item.check = false;
                }
            });
            _this.refresh();
        },
        refresh() {
            this.$refs.goodsPull.onRefresh();
            if (this.$refs.totop) {
                this.$refs.totop.go_top();
            }
        },
        reset_select() {
            let _this = this;
            _this.brandData.list.forEach((item, _index) => {
                item.check = false;
            });
            _this.specList.forEach(item => {
                item.list.forEach(spec => {
                    spec.check = false;
                });
            });
            _this.postData.min_price = "";
            _this.postData.max_price = "";
            _this.postData.brand_id = "";
            _this.postData.specs = "";
            _this.refresh();
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
<style>
.wfilter-wrap {
    height: 100%;
    padding-bottom: 200px;
}
.wfilter-cont {
    height: 100%;
    overflow-y: scroll;
}

.filter-main .filters {
    margin-bottom: 0;
}
</style>