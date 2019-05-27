<template>
    <div class="scroller-view" :class="{'scroller-view-bottom':isShowEdit}">
        <van-nav-bar
            @click-left="go_back"
            class="xz-nva-bar"
            fixed
            title="收藏"
            :right-text="edit_text"
            @click-right="edit_click"
            left-arrow
        />
        <pull-up
            :postData="postData"
            @loadListSuccFn="loadListSuccFn"
            ablePull="true"
            ableLoad="true"
            ref="listPull"
        >
            <div slot="listContent" class="or-goods-list">
                <van-swipe-cell
                    :right-width="60"
                    :disabled="isShowEdit"
                    v-for="(item,index) in dataList"
                    :key="index"
                >
                    <div class="or-goods-list-item" @click="swipecell_change($event,index)">
                        <van-checkbox
                            class="or-item-check"
                            v-model="item.check"
                            v-if="isShowEdit"
                            @click="swipecell_change($event,index)"
                        ></van-checkbox>
                        <a href="javascript:void(0);">
                            <img v-lazy="util.reImg(item.thumb)">
                            <div class="or-item-conten">
                                <div class="or-item-title">
                                    <div class="xz-title">{{item.sku_name}}</div>
                                </div>
                                <div class="or-item-sku xz-title">{{item.subtitle}}</div>
                                <div class="or-item-price sun-price">
                                    <span>{{websit.data.currency}}</span>
                                    <span>
                                        <label>{{item.sku_price | changePrice}}.</label>
                                        <i class="samll-num">{{item.sku_price | splicePrice}}</i>
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div slot="right" class="swipe-btns">
                        <a
                            class="xz-btn btn-e43 swipe-btn"
                            :data-spu_id="item.spu_id"
                            href="javascript:void(0);"
                            @click="on_delete"
                        >删除</a>
                    </div>
                </van-swipe-cell>
            </div>
            <div slot="noView" class="scroller-tip">
                <xz-icon type="shoucang1"/>
                <span>还没有留下收藏任何商品</span>
                <a class="xz-btn btn-e43 xz-radius" href="#/cate">去逛逛</a>
            </div>
        </pull-up>
        <div class="xz-bottom" v-if="isShowEdit">
            <van-checkbox v-model="isAll" @click="check_change">全选</van-checkbox>
            <button type="button" class="xz-btn btn-e43" @click="on_deletes">删除</button>
        </div>
    </div>
</template>
<script>
import { SwipeCell, Checkbox } from "vant";
import pullUp from "../../components/pull/index.vue";
import { mapState } from "vuex";
export default {
    data() {
        return {
            edit_text: "",
            isShowEdit: false,
            isAll: false,
            postData: {
                method: "api.module.member.favorite.lists",
                limit: 10
            },
            dataList: []
        };
    },
    components: {
        vanSwipeCell: SwipeCell,
        vanCheckbox: Checkbox,
        pullUp
    },
    computed: {
        ...mapState(["websit"])
    },
    methods: {
        loadListSuccFn(reviewData, data) {
            let _reviewData = [];
            reviewData.forEach(item => {
                item["check"] = false;
                _reviewData.push(item);
            });
            this.dataList = _reviewData;
            if (this.dataList.length > 0) {
                this.edit_text = "编辑";
            } else {
                this.edit_text = "";
            }
        },
        edit_click() {
            let _this = this;
            if (_this.dataList.length == 0) {
                _this.$toast({
                    message: "没有可以编辑的收藏",
                    position: "bottom"
                });
                return;
            }
            if (_this.isShowEdit) {
                _this.isShowEdit = false;
                _this.edit_text = "编辑";
                _this.dataList.forEach(item => {
                    item.check = false;
                });
            } else {
                _this.isShowEdit = true;
                _this.edit_text = "完成";
            }
        },
        check_change() {
            let _this = this;
            _this.dataList.forEach((item, index) => {
                item.check = _this.isAll;
                _this.$set(_this.dataList, index, item);
            });
        },
        on_delete(e) {
            let _this = this;
            let _spu_ids = e.target.dataset.spu_id;
            _this.del_fun(_spu_ids, "确定删除该收藏？");
        },
        on_deletes() {
            let _this = this;
            let _spu_ids = [];
            _this.dataList.forEach(element => {
                if (element.check) {
                    _spu_ids.push(element.spu_id);
                }
            });
            if (_spu_ids.length == 0) {
                _this.$toast({
                    message: "请选择要删除的收藏",
                    position: "bottom"
                });
                return;
            }
            _this.del_fun(_spu_ids, "确定删除选中收藏？");
        },
        del_fun(ids, title) {
            let _this = this;
            _this.$dialog
                .confirm({
                    message: title
                })
                .then(() => {
                    let _loading = _this.$xzLoading();
                    _this.post(
                        {
                            method: "api.module.member.favorite.delete",
                            spu_id: ids
                        },
                        function(data) {
                            _loading.clear();
                            if (200 !== data.code) {
                                _this.$toast({
                                    message: data.msg,
                                    position: "bottom"
                                });
                                return;
                            }
                            _this.$toast({
                                message: "删除成功",
                                position: "bottom"
                            });
                            _this.isAll = false;
                            _this.isShowEdit = false;
                            _this.edit_text = "编辑";
                            _this.$refs.listPull.onRefresh();
                        }
                    );
                })
                .catch(() => {
                    // on cancel
                });
        },
        swipecell_change(e, index) {
            if (this.isShowEdit) {
                let item = this.dataList[index];
                if (!(e.target.className.indexOf("van-icon") > -1)) {
                    item.check = !item.check;
                }
                this.$set(this.dataList, index, item);
                let _b = this.dataList.filter(c => c.check == true);
                if (_b.length == this.dataList.length) {
                    this.isAll = true;
                }
                let _c = this.dataList.filter(c => c.check == false);
                if (_c.length > 0) {
                
                    this.isAll = false;
                }
            } else {
                this.$router.push(
                    "/goods/detail/" + this.dataList[index].sku_id
                );
            }
        }
    }
};
</script>
