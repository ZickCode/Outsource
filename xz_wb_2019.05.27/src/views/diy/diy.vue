<template>
    <div class="ui-md-diy-body">
        <div v-html="pageStyleText"></div>
        <div class="ui-md-loading" v-if="showLoading">
            <van-loading type="spinner" color="#ffffff" size="30px"/>
        </div>
        <div
            v-show="cells.length == 0"
            style="padding-top: 30%; text-align: center; color: #999;"
        >暂无内容!</div>
        <md-start :config="base.start"></md-start>
        <md-popupad :config="base.popupad"></md-popupad>
        <div
            v-for="(item, index) in cells"
            :key="index"
            v-show="!isHideOther || (index < loadPageTabIndex + 1  && isHideOther)"
        >
            <!-- 轮播图 -->
            <template v-if="item.name == 'banner'">
                <md-banner :config="item.config"></md-banner>
            </template>
            <!-- 选项卡 -->
            <template v-if="item.name == 'tab'">
                <md-tab :config="item.config" @on-change="handleTabChange"></md-tab>
            </template>
            <!-- 按钮组 -->
            <template v-if="item.name == 'btns'">
                <md-btns :config="item.config"></md-btns>
            </template>
            <!-- 辅助线 -->
            <template v-if="item.name == 'subline'">
                <md-subline :config="item.config"></md-subline>
            </template>
            <!-- 辅助空白 -->
            <template v-if="item.name == 'blank'">
                <md-blank :config="item.config"></md-blank>
            </template>
            <!-- 图组 -->
            <template v-if="item.name == 'atlas'">
                <md-atlas :config="item.config"></md-atlas>
            </template>
            <!-- 搜索引擎 -->
            <template v-if="item.name == 'search'">
                <md-search :config="item.config"></md-search>
            </template>
            <!-- 单个按钮 -->
            <template v-if="item.name == 'btn'">
                <md-btn :config="item.config"></md-btn>
            </template>
            <!-- 图片橱窗 -->
            <template v-if="item.name == 'picwindow'">
                <md-picwindow :config="item.config"></md-picwindow>
            </template>
            <!-- 标题栏 -->
            <template v-if="item.name == 'title'">
                <md-title :config="item.config"></md-title>
            </template>
            <!-- 公告 -->
            <template v-if="item.name == 'notice'">
                <md-notice :config="item.config"></md-notice>
            </template>
            <!-- 产品组 -->
            <template v-if="item.name == 'product'">
                <md-product :config="item.config" :appid="appid"></md-product>
            </template>
            <!-- 优惠券 -->
            <template v-if="item.name == 'coupon'">
                <md-coupon :config="item.config"></md-coupon>
            </template>
        </div>
    </div>
</template>

<script>
import { Loading, Toast } from "vant";
// 基础板块
import MdStart from "./base/start.vue";
import MdPopupad from "./base/popupad.vue";
// 模块组件
import {
    MdBanner,
    MdTab,
    MdBtns,
    MdSubline,
    MdBlank,
    MdAtlas,
    MdSearch,
    MdBtn,
    MdPicwindow,
    MdTitle,
    MdNotice,
    MdProduct,
    MdCoupon
} from "./modules.js";
export default {
    name: "home",
    components: {
        "md-start": MdStart,
        "md-popupad": MdPopupad,

        "md-banner": MdBanner,
        "md-tab": MdTab,
        "md-btns": MdBtns,
        "md-subline": MdSubline,
        "md-blank": MdBlank,
        "md-atlas": MdAtlas,
        "md-search": MdSearch,
        "md-btn": MdBtn,
        "md-picwindow": MdPicwindow,
        "md-title": MdTitle,
        "md-notice": MdNotice,
        "md-product": MdProduct,
        "md-coupon": MdCoupon,

        "van-loading": Loading
    },
    props: {
        isHome: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            appid: "20167362847070",
            showLoading: true,
            base: {
                title: "小折",
                set: {},
                start: {},
                popupad: {}
            },
            cells: [],
            pageStyleText: "", // 页面样式设置
            loadPageTabIndex: null, // 页面切换的tab下标
            isHideOther: false // 是否隐藏tab往后的模块
        };
    },
    mounted() {
        this.init();
    },
    watch: {
        $route() {
            this.init();
        }
    },
    methods: {
        init() {
            this.showLoading = true;
            // 获取页面配置信息
            if (this.isHome) {
                // 首页的
                let params = { method: "api.module.diy.diy.getone" };
                if (this.$route.query.bak) {
                    params.bak = this.$route.query.bak;
                }
                // 首页的
                this.post(params, res => {
                    if (!res.result) return;
                    this.handleRenderPage(res.result);
                });
            } else {
                // 其他普通页面通过id获取配置
                let id = this.$route.params.id || this.$route.query.id;
                if (!id) {
                    Toast("获取页面ID错误！");
                    return false;
                }
                this.post(
                    {
                        method: "api.module.diy.diy.detail",
                        id: id
                    },
                    res => {
                        if (!res.result) {
                            Toast("获取页面数据失败！");
                            this.$parent.title = "";
                            return false;
                        }
                        this.$parent.title = res.result.title;
                        this.handleRenderPage(res.result);
                    }
                );
            }
        },
        // 字符串转对象
        handleTransformJSON(data) {
            if (typeof data == "string") {
                data = JSON.parse(data);
            }
            return data;
        },
        // 渲染页面数据
        handleRenderPage(res) {
            // 页面标题
            if (res.title) this.title = res.title;
            // 页面基本配置
            if (res.config) {
                let set = this.handleTransformJSON(res.config);
                // 页面样式
                let styleText = '<style type="text/css">';
                // 背景颜色模式
                if (set.bgType == 0) {
                    styleText +=
                        ".ui-md-diy-body {background-color: " +
                        set.bgcolor +
                        ";}";
                } else if (set.bgType == 1) {
                    // 背景图片模式
                    styleText +=
                        ".ui-md-diy-body {background-image: url(" +
                        set.bgimg +
                        "); background-repeat: " +
                        set.repeat +
                        "; background-position: " +
                        set.align +
                        ";}";
                }
                styleText += "</style>";

                this.base.set = set;
                this.pageStyleText = styleText;
            }
            // 启动动画、弹窗广告
            if (res.diyadv) {
                let diyadv = this.handleTransformJSON(res.diyadv);
                this.base.start = diyadv.start;
                this.base.popupad = diyadv.popupad;
            }
            // 模块数据
            if (res.content) {
                let content = this.handleTransformJSON(res.content);
                this.cells = content.lists;
                content.lists.forEach((item, index) => {
                    if (item.name == "tab") {
                        if (item.config.loadType == 1) {
                            this.loadPageTabIndex = index;
                        }
                    }
                });
            }
            // 关闭loading
            this.showLoading = false;
        },
        // tab切换
        handleTabChange(index) {
            if (index > 0) {
                this.isHideOther = true;
            } else {
                this.isHideOther = false;
            }
        }
    }
};
</script>

<style>
@import url("home.css");
</style>