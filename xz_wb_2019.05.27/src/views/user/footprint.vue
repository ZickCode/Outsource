<template>
    <div class="nav-main bg-f0" :class="{'nav-main-bottom':isShowEdit}">
        <van-nav-bar
            @click-left="go_back"
            class="xz-nva-bar"
            title="足迹"
            fixed
            :right-text="edit_text"
            @click-right="edit_click"
            left-arrow
            :z-index="99"
        />
        <div class="foot-footprint-list scroller-view">
            <div class="footprint-item" v-for="(timeObj,i) of dataList" :key="i">
                <div class="footprint-hd" @click="swipehd_click($event,i)">
                    <van-checkbox
                        class="or-item-check"
                        v-model="timeObj.check"
                        v-if="isShowEdit"
                        @click="swipehd_click($event,i)"
                    ></van-checkbox>
                    <span>{{timeObj.timeer}}</span>
                </div>
                <div class="footprint-bd">
                    <van-swipe-cell
                        :right-width="60"
                        :disabled="isShowEdit"
                        v-for="(item,index) of timeObj.footArr"
                        :key="index"
                    >
                        <div class="or-goods-list-item" @click="swipecell_change($event,index,i)">
                            <van-checkbox
                                class="or-item-check"
                                v-model="item.check"
                                v-if="isShowEdit"
                                @click="swipecell_change($event,index,i)"
                            ></van-checkbox>
                            <span class="goods-list-pic">
                                <img v-if="item.info" v-lazy="util.reImg(item.info.sku_info.img)">
                            </span>
                            <div class="or-item-conten">
                                <div class="or-item-title">
                                    <div class="xz-title">{{item.name}}</div>
                                </div>
                                <div class="or-item-sku xz-title">{{item.subtitle}}</div>
                                <div class="or-item-price sun-price">
                                    <span>{{websit.data.currency}}</span>
                                    <span>
                                        <label>{{item.info.sku_info.price | changePrice}}.</label>
                                        <i
                                            class="samll-num"
                                        >{{item.info.sku_info.price | splicePrice}}</i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div slot="right" class="swipe-btns">
                            <a
                                class="xz-btn btn-e43 swipe-btn"
                                :data-sku_id="item.info.sku_id"
                                href="javascript:void(0);"
                                @click="on_delete"
                            >删除</a>
                        </div>
                    </van-swipe-cell>
                </div>
            </div>
            <div slot="noView" class="scroller-tip" v-if="dLen == 0">
                <xz-icon type="31zuji"/>
                <span>还没留下任何足迹</span>
                <a class="xz-btn btn-e43 xz-radius" href="#/cate">去逛逛</a>
            </div>
        </div>
        <div class="xz-bottom foot-bottom" v-if="isShowEdit">
            <div class="van-goods-action">
                <van-checkbox v-model="isAll" @click="check_change">全选</van-checkbox>
                <div class="center"></div>
                <button type="button" class="xz-btn btn-e43" @click="on_deletes">删除</button>
            </div>
        </div>
    </div>
</template>
<script>
import { List, PullRefresh, SwipeCell, Checkbox } from "vant";
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            edit_text: "",
            isShowEdit: false,
            isAll: false,
            refreshing: false,
            loading: false,
            finished: false,
            page: 1,
            limit: 10,
            dataList: [],
            dLen: 0
        };
    },
    components: {
        vanList: List,
        vanPullRefresh: PullRefresh,
        vanSwipeCell: SwipeCell,
        vanCheckbox: Checkbox
    },
    methods: {
        ...mapActions("footprint", [
            "addFoot",
            "reduceFoot",
            "updateFoot",
            "deleteFoot"
        ]),
        loadData() {
            let _this = this;
            let _page = _this.page;
            _this.post(
                {
                    method: "api.module.member.favorite.lists",
                    page: _page,
                    limit: _this.limit
                },
                function(data) {
                    _this.loading = false;
                    _this.refreshing = false;
                    if (_page == 1) {
                        _this.dataList = [];
                        _this.finished = false;
                    }
                    if (200 !== data.code) {
                        return;
                    }
                    if (
                        data.result.lists != null &&
                        data.result.lists.length > 0
                    ) {
                        data.result.lists.forEach(element => {
                            element.check = _this.isAll;
                            _this.dataList.push(element);
                        });
                        _this.page = _page + 1;
                    } else {
                        _this.finished = true;
                    }
                    if (_this.dataList.length == 0) {
                        _this.edit_text = "";
                    }
                }
            );
        },
        edit_click() {
            let _this = this;
            if (_this.dataList.length == 0) {
                _this.$toast({
                    message: "没有可以编辑的足迹",
                    position: "bottom"
                });
                return;
            }
            if (_this.isShowEdit) {
                _this.isShowEdit = false;
                _this.edit_text = "编辑";
                // _this.dataList.forEach(item => {
                //     item.check = false;
                // });
            } else {
                _this.isShowEdit = true;
                _this.edit_text = "完成";
            }
        },
        swipehd_click(e, i) {
            let item = this.dataList[i];
            if (!(e.target.className.indexOf("van-icon") > -1)) {
                item.check = !item.check;
            }
            this.$set(this.dataList, i, item);
        },
        swipecell_change(e, index, i) {
            var _this = this;
            if (this.isShowEdit) {
                let item = this.dataList[i].footArr[index];
                let timeItem = this.dataList[i];
                if (!(e.target.className.indexOf("van-icon") > -1)) {
                    item.check = !item.check;
                }
                this.$set(this.dataList[i].footArr, index, item);
                let _b = this.dataList[i].footArr.filter(c => c.check == true);
                if (_b.length == this.dataList[i].footArr.length) {
                    timeItem.check = true;
                    this.$set(this.dataList, i, timeItem);
                }
                let _c = this.dataList[i].footArr.filter(c => c.check == false);
                if (_c.length == this.dataList[i].footArr.length) {
                    timeItem.check = false;
                    this.$set(this.dataList, i, timeItem);
                }
            } else {
                this.$router.push(
                    "/goods/detail/" + this.dataList[index].footArr[i].info.sku_id
                );
            }
        },
        /**全选 */
        check_change(e) {
            let _this = this;
            _this.dataList.forEach((item, index) => {
                item.check = _this.isAll;
                item.footArr.forEach((it, ind) => {
                    item.footArr[ind].check = _this.isAll;
                });
                //item.item.check = e;
                _this.$set(_this.dataList, index, item);
            });
        },
        /**时间区间选择 */
        time_check(e, timeer) {
            let _this = this;
            let i = _.findIndex(_this.dataList, o => {
                return o.timeer == timeer;
            });
            _this.dataList[i].check = e;
            _this.dataList[i].footArr.forEach((item, index) => {
                item.check = e;
                _this.$set(_this.dataList[i].footArr, index, item);
            });
            let time = _this.dataList[i];
            time.check = e;
            _this.$set(_this.dataList, i, time);
        },
        single_check(e) {
            let _this = this;
        },
        onLoad() {
            this.loadData();
        },
        onRefresh() {
            this.page = 1;
            this.loadData();
        },
        on_delete(e) {
            let _this = this;
            let sku_id = e.target.dataset.sku_id;
            _this.del_fun(sku_id, "您确认删除所选足迹？");
        },
        /**让足迹根据时间分类 */
        appendFootNote(list) {
            let ret = [],
                timeer = "";
            for (let [key, val] of list.entries()) {
                val.item.check = false;
                timeer = this.format(val.time);
                let i = _.findIndex(ret, o => {
                    return o.timeer == timeer;
                });
                let timeObj = {
                    footArr: []
                };
                /**判断时间断是否重复,做分类 */
                /**不重复 */
                if (i == -1) {
                    timeObj.timeer = timeer;
                    timeObj.footArr.push(val.item);
                    ret.push(timeObj);
                } else {
                    ret[i].footArr.push(val.item);
                }
            }
            return ret;
        },
        /**转换时间戳 */
        format(shijianchuo) {
            function add0(m) {
                return m < 10 ? "0" + m : m;
            }
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y + "-" + add0(m) + "-" + add0(d);
        },
        on_deletes() {
            let _this = this;
            let _sku_ids = [];
            _this.dataList.forEach((element, index) => {
                if (element.footArr) {
                    let footArr = element.footArr;
                    for (let [key, val] of footArr.entries()) {
                        if (val.check == true) {
                            _sku_ids.push(val.info.sku_id);
                        }
                    }
                }
            });
            if (_sku_ids.length == 0) {
                _this.$toast({
                    message: "请选择要删除的足迹",
                    position: "bottom"
                });
                return;
            }
            _this.del_funs(_sku_ids, "确定要删除吗");
        },
        /**批量删除 */
        del_funs(ids, title) {
            let _this = this;
            _this.$dialog
                .confirm({
                    message: title
                })
                .then(() => {
                    _this.deleteFoot(ids);
                    _this.dataList = _this.appendFootNote(
                        _this.footprint.footNote
                    );
                    _this.dLen = _this.footprint.footNote.length;
                    if (_this.dLen == 0) {
                        _this.isAll = false;
                        _this.isShowEdit = false;
                    }
                    //this.$router.go(0);
                })
                .catch(() => {
                    //cancel
                });
        },
        /** 删除*/
        del_fun(ids, title) {
            let _this = this;
            _this.$dialog
                .confirm({
                    message: title
                })
                .then(() => {
                    let i = _.findIndex(_this.footprint.footNote, n => {
                        return n.item.info.sku_id == ids;
                    });
                    /**从vuex删 */
                    let obj = {
                        start: i,
                        len: 1
                    };
                    _this.reduceFoot(obj);
                    /**更新 */
                    _this.dataList = _this.appendFootNote(
                        _this.footprint.footNote
                    );
                    _this.dLen = _this.footprint.footNote.length;
                    _this.isAll = false;
                    _this.isShowEdit = false;
                })
                .catch(() => {
                    // on cancel
                });
        }
    },
    computed: {
        ...mapState(["footprint"]),
        ...mapState(["websit"])
    },
    watch: {
        dataList: {
            handler(newValue, oldValue) {
                let _b = true;
                newValue.forEach(element => {
                    element.footArr.forEach(itme => {
                        if (!itme.check) {
                            _b = false;
                        }
                    });
                });
                this.isAll = _b;
            },
            deep: true
        },
        dLen: {
            handler(newValue, oldValue) {
                if (newValue == 0) {
                    this.edit_text = "";
                } else {
                    this.edit_text = "编辑";
                }
            }
        }
    },
    created() {
        /**做判断,是否在本地和vuex有记录 */
        if (this.footprint.footNote.length == 0) {
            let localData = JSON.parse(window.localStorage.getItem("footNote"));
            if (localData != null && localData.length > 0) {
                this.updateFoot(localData);
                this.dataList = this.appendFootNote(localData);
                this.dLen = this.dataList.length;
            }
        } else {
            this.dataList = this.footprint.footNote;
            this.dataList = this.appendFootNote(this.dataList);
            this.dLen = this.dataList.length;
        }
        //console.log(this.dataList);
    }
};
</script>
<style scoped>
.foot-bottom {
    position: fixed;
    background: #fff;
    justify-content: space-between;
}
/* .foot-footprint-list {
    padding: 90px 0 100px 0;
} */
.van-goods-action {
    position: absolute;
}
.center {
    flex: 1;
}
</style>

