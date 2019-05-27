<template>
    <van-pull-refresh
        class
        v-model="refreshing"
        @refresh="onRefresh"
        :disabled="ablePull=='true'?isDisabledPull:ablePull"
    >
        <van-list
            v-model="loading"
            :finished="ableLoad == 'true'?finished:true"
            :finished-text="ableLoad == 'true'?finishedText_:''"
            :loading-text="loadingText"
            @load="onLoad"
        >
            <slot name="listContent"></slot>
            <!--  列表插槽 -->
            <!-- 底部加载中提示 -->
            <div slot="loading" class="tipsWraper">
                <div
                    class="van-loading van-loading--circular van-loading van-list__loading-icon"
                    style="color: rgb(228,57,60);"
                    v-if="ableLoad == 'true'"
                >
                    <svg
                        class="icon icon-loading"
                        v-if="loading"
                        aria-hidden="true"
                        style="width: 16px; height: 16px;"
                    >
                        <use xlink:href="#icon-loading"></use>
                    </svg>
                </div>
                <span class="van-list__loading-text tips" v-html="loadingText" v-cloak>加载成功</span>
            </div>
            <!--暂无数据提示-->
            <slot name="noView" v-if="finished && goodsList.length <= 0"></slot>
        </van-list>
        <!-- 顶部加载中状态 -->
        <div class="van-pull-refresh__loading tipsWraper" slot="loading">
            <svg
                class="icon"
                :class="{'icon-loading': loadType == 'loading' }"
                aria-hidden="true"
                style="width: 16px; height: 16px;"
            >
                <use :xlink:href="iconLink"></use>
            </svg>
            &nbsp;
            <span class="tips">{{ pLoadingText }}</span>
        </div>
        <div slot="pulling" class="tipsWraper">
            <svg class="icon" aria-hidden="true" style="width: 16px; height: 16px;">
                <use xlink:href="#icon-arrow-bottom"></use>
            </svg>
            <span class="tips">下拉即可刷新</span>
        </div>
        <div slot="loosing" class="tipsWraper">
            <svg class="icon icon-arrow" aria-hidden="true " style="width: 16px; height: 16px;">
                <use xlink:href="#icon-arrow-bottom" style="display: inline-block; align: center"></use>
            </svg>
            <span class="tips">释放即可刷新</span>
        </div>
    </van-pull-refresh>
</template>
<script>
require("../../assets/sass/ui/pull.scss");
require("../../assets/fonts/pull_icon/iconfont");
import { List, PullRefresh } from "vant";
export default {
    name: "pullUp",
    props: {
        loadDataUrl: {
            type: String,
            default: ""
        },
        limit: {
            // 限制每页显示多少条
            type: Number,
            default: 10
        },
        loadingText: {
            // 正在加载数据提示
            type: String,
            default: "&nbsp;正在加载..."
        },
        pullLoadingText: {
            // 下拉刷新数据加载中提示
            type: String,
            default: "正在加载..."
        },
        finishedText: {
            // 没有更多提示
            type: String,
            default: "没有更多了"
        },
        noDataText: {
            type: String,
            default: "暂无数据"
        },
        loadErrorText: {
            type: String,
            default: "加载错误"
        },
        pullSuccText: {
            type: String,
            default: "刷新成功"
        },
        netWorkErrorText: {
            type: String,
            default: "网络错误"
        },
        postData: {
            type: Object,
            default: function() {
                return {};
            }
        },
        ablePull: {
            // 是否可以下拉刷新 默认为true
            type: String,
            default: "true"
        },
        ableLoad: {
            // 是否可以上拉加载 默认为true
            type: String,
            default: "true"
        },
        pullid: {
            //组件id回调用  loadListSuccFn 返回时那个组件返回的数据
            default: 1
        },
        resKey: {
            type: String,
            default: "lists"
        },
        value: {
            default: false
        }
    },
    data() {
        return {
            active: "1",
            refreshing: false,
            loading: false,
            finished: false,
            curLoadingFlag: "", // 当前加载标识，加载为loading,刷新为 refreshing （防止同时进行加载和刷新）
            page: 1,
            goodsList: [],
            isDisabledPull: false, // 是否禁用下拉
            iconLink: "#icon-loading", // 顶部图标加载svgid
            loadType: "loading", // 顶部图标加载类型
            finishedText_: "没更多了", // 加载完成提示
            pLoadingText: "正在加载..."
        };
    },
    components: {
        vanList: List,
        vanPullRefresh: PullRefresh
    },
    methods: {
        loadData() {
            let _this = this;
            let _page = 1;
            let _sendData = {
                page: _this.page,
                method: ""
            };
            let _stringSendDatas = JSON.parse(JSON.stringify(_this.postData)); // 克隆父组件的发送数据
            let sendDatas = Object.assign({}, _sendData, _stringSendDatas); // 发送数据合并
            _this.$emit("input", true);
            _this.post(
                sendDatas,
                function(data) {
                    if (data.hasOwnProperty("code") && 200 == data.code) {
                        //console.log(JSON.stringify(data.result))
                        // 成功
                        if (
                            data.hasOwnProperty("result") &&
                            data.result &&
                            data.result.hasOwnProperty(_this.resKey)
                        ) {
                            // 有列表数据字段

                            if (_this.curLoadingFlag === "refreshing") {
                                //如果是刷新，则替换
                                _this.goodsList = []; //　清空
                            }
                            if (
                                _this.util.isEmpty(data.result[_this.resKey]) ||
                                data.result[_this.resKey].length == 0
                            ) {
                                // 如果列表为空时，分为上拉和下拉的情况

                                if (_this.curLoadingFlag === "loading") {
                                    // 如果为上拉下载
                                    _this.finished = true; // 禁用上拉
                                } else if (
                                    _this.curLoadingFlag === "refreshing"
                                ) {
                                    // 如果是下拉刷新
                                    _this.finished = true;
                                } // 注： 以上代码没有合并写，为后期分开做逻辑考虑, 比如显示空列表和网络错误等
                                if (_this.page == 1) {
                                    // 如果是第一页，提示暂无数据
                                    _this.finishedText_ = _this.noDataText;
                                }
                            } else if (data.result[_this.resKey].length > 0) {
                                // 如果有数据
                                if (
                                    data.result[_this.resKey].length <
                                    sendDatas.limit
                                ) {
                                    // 有数据并且是最后一页
                                    _this.finished = true; // 禁用上拉
                                } else if (
                                    data.result[_this.resKey].length >=
                                    sendDatas.limit
                                ) {
                                    // 有数据，不是最后一页
                                    _this.page++; // 页数加1
                                }
                                if (_this.curLoadingFlag === "refreshing") {
                                    //如果是刷新，则替换
                                    _this.goodsList = []; //　清空
                                    if (
                                        data.result[_this.resKey].length >=
                                        sendDatas.limit
                                    ) {
                                        // 有数据，不是最后一页
                                        _this.finished = false; //如果还有更多数据且禁用了上拉，重启上拉加载更多
                                    }
                                    for (
                                        let i = 0;
                                        i < data.result[_this.resKey].length;
                                        i++
                                    ) {
                                        _this.goodsList.push(
                                            data.result[_this.resKey][i]
                                        );
                                    }
                                } else if (_this.curLoadingFlag === "loading") {
                                    // 如果是上拉加载，则往后面添加数据
                                    if(_this.page==1){
                                        _this.goodsList=[];
                                    }
                                    for (
                                        let i = 0;
                                        i < data.result[_this.resKey].length;
                                        i++
                                    ) {
                                        _this.goodsList.push(
                                            data.result[_this.resKey][i]
                                        );
                                    }
                                }
                            }
                        } else {
                            _this.finished = true;
                            _this.loading = false;
                            _this.finishedText_ = _this.loadErrorText; //后期做加载错误提示
                        }
                        _this.$emit(
                            "loadListSuccFn",
                            _this.goodsList,
                            data,
                            _this.pullid
                        ); // 成功后返回列表数据和请求回来的数据
                    } else {
                        // 加载不成功的时候
                        _this.finished = true;
                        _this.loading = false;
                        _this.finishedText_ = _this.loadErrorText; //后期做加载错误提示
                    }
                },
                function(res) {
                    // 不管成功过失败都调用

                    if (_this.curLoadingFlag === "refreshing") {
                        // 刷新
                        _this.pLoadingText = _this.pullSuccText; // 刷新后提示
                        _this.iconLink = "#icon-finish"; // 顶部加载图标为加载完成
                        _this.loadType = "";
                        setTimeout(function() {
                            _this.refreshing = false;
                            setTimeout(function() {
                                _this.pLoadingText = _this.pullLoadingText;
                                _this.iconLink = "#icon-loading";
                                _this.loadType = "loading";
                            }, 200);
                        }, 1000);
                    } else if (_this.curLoadingFlag === "loading") {
                        // 加载
                        _this.loading = false;
                        _this.isDisabledPull = false; // 启用下拉刷新
                    }
                    _this.$emit("input", false);
                },
                function(err) {
                    // 网络错误时
                    _this.finished = true;
                    _this.loading = false;
                    _this.finishedText_ = _this.netWorkErrorText; //后期做加载错误提示
                }
            );
        },
        onLoad() {
            var _this = this;
            _this.isDisabledPull = true; // 上拉的时候禁用下拉刷新
            _this.curLoadingFlag = "loading";
            _this.loadData();
        },
        onRefresh() {
            let _this = this;
            // _this.refreshing = true;
            _this.curLoadingFlag = "refreshing";
            this.page = 1;
            _this.finishedText_ = _this.finishedText; // 如果因为网络原因等修改了提示，则修改回来
            _this.loadData();
        }
    }
};
</script>
<style>
.van-list__loading-icon {
    width: 0.4rem;
    height: 0.4rem;
}
.tipsWraper {
    font-size: 24px;
}

.tipsWraper svg {
    vertical-align: middle;
}

.loading-state {
    color: #969799;
}

.van-pull-refresh__head {
    top: -66px;
}

.van-pull-refresh {
    overflow: visible;
}
</style>
