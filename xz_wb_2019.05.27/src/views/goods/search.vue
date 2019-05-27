<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar search-nav-bar" fixed left-arrow>
            <xz-search slot="right" v-model="k" @search="search_click"/>
        </van-nav-bar>
        <div class="search-panel">
            <div class="search-hd">
                <span class="del" @click="empty_click">清空</span>
                <h4 class="title">
                    <xz-icon type="sousuo"/>历史搜索
                </h4>
            </div>
            <div class="search-bd">
                <ul class="search-items">
                    <li class="item" v-for="(item,index) in oldSearch" :key="index">
                        <a href="javascript:void(0);" @click="search_click(item)">{{item}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="search-panel">
            <div class="search-hd">
                <h4 class="title">
                    <xz-icon type="remen"/>热门搜索
                </h4>
            </div>
            <div class="search-bd">
                <ul class="search-items">
                    <li class="item" v-for="(item,index) in hotSearch" :key="index">
                        <a
                            href="javascript:void(0);"
                            @click="search_click(item)"
                        >{{item}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import search from "@/components/search/index.vue";
import { mapActions, mapState } from "vuex";
export default {
    name: "search",
    components: {
        "xz-search": search
    },
    data() {
        return {
            k: "",
            c: "",
            oldSearch: [],
            hotSearch: [
            ]
        };
    },
    computed: {
        ...mapState(["search"])
    },
    created() {
        let _this = this;
        let _key = _this.$route.query.k;
        if (!_this.util.isEmpty(_key)) {
            _this.k = _key;
        }
        _this.loadData();
    },
    methods: {
        ...mapActions("search", ["addSearch", "emptySearch", "updatedSearch"]),
        loadData() {
            let _this = this;
            _this.updatedSearch();
            _this.oldSearch = _this.search.searchs;
            _this.post(
                {
                    method: "api.module.admin.setting.hot_seach"
                },
                function(data) {
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    _this.hotSearch = data.result;
                }
            );
        },
        search_click(value) {
            let _this = this;
            _this.addSearch(value);
            if (!_this.util.isEmpty(_this.c)) {
                this.$router.push({
                    path: "/goods/list/",
                    query: { k: value }
                });
            } else {
                this.$router.push({
                    path: "/goods/list/",
                    query: { k: value }
                });
            }
        },
        empty_click() {
            let _this = this;
            _this.$dialog
                .confirm({
                    message: "确认清空搜索历史？"
                })
                .then(() => {
                    _this.oldSearch = [];
                    _this.emptySearch();
                })
                .catch(() => {
                    // on cancel
                });
        }
    }
};
</script>