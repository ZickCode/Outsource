<template>
    <div class="scroller-view">
        <van-nav-bar
            @click-left="go_back"
            class="xz-nva-bar"
            :z-index="99"
            fixed
            title="发票抬头"
            left-arrow
        />
        <div class="invoice-list">
            <van-swipe-cell :right-width="item.id==0?0:120" v-for="item in invoiceList" :key="item.id">
                <div class="invoice-list-item" @click="change(item)"v-if='item.id==0'>
                    <div class="no-invoice">不使用发票</div>
                    <van-radio class="item-check" checked-color="#e4393c" v-if="item.id==query.i"></van-radio>
                </div>
                <div class="invoice-list-item" @click="change(item)"v-else>
                    <div class="item-title">{{item.invoice_title==1?'个人':'企业'}}</div>
                    <div class="content">
                        <span>{{item.invoice_name}}</span>
                        <div class="content-address">
                            <span>{{item.type==1?'纸质普通发票':'增值税专用发票'}}</span>
                            <span>{{item.invoice_content}}</span>
                        </div>
                    </div>
                    <van-radio class="item-check" checked-color="#e4393c" v-if="item.id==query.i"></van-radio>
                </div>
                <div slot="right" class="swipe-btns">
                    <a class="xz-btn btn-8c swipe-btn" href="javascript:void(0)" @click="go_edit(item.id)">编辑</a>
                    <a
                        class="xz-btn btn-e43 swipe-btn"
                        href="javascript:void(0);"
                        @click="on_delete(item)"
                    >删除</a>
                </div>
            </van-swipe-cell>
        </div>
        <div slot="noView" class="scroller-tip" v-if="invoiceList.length==0">
            <xz-icon type="shouhuodizhi1"/>
            <span>您还没有发票抬头</span>
        </div>
        <a class="xz-btn btn-e43 xz-btn-bottom" href="javascript:void(0)" @click="go_edit('')">添加发票抬头</a>
    </div>
</template>
<script>
import { SwipeCell, Radio, RadioGroup } from "vant";
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            query: {
                s: "",
                i: "",
                c: "",
                r: ""
            },
            invoiceList: []
        };
    },
    components: {
        vanSwipeCell: SwipeCell,
        vanRadio: Radio,
        vanRadioGroup: RadioGroup
    },
    computed: {
        ...mapState(["userMessage"])
    },
    created() {
        if (this.util.isEmpty(this.$route.query.s)) {
            this.go_back();
            return;
        }
        this.query.s = this.$route.query.s || "";
        this.query.i = this.$route.query.i || "0";
        this.query.c = this.$route.query.c || "";
        this.query.r = this.$route.query.r || "";
        this.loadData();
    },
    methods: {
        loadData() {
            //数据加载成功以后回调
            this.invoiceList = this.userMessage.user._invoice;
        },
        on_delete(item) {
            let _this = this;
            let _id = item.id;
            _this.$dialog
                .confirm({
                    message: "确定删除发票抬头？"
                })
                .then(() => {
                    let _loading = _this.$xzLoading();
                    _this.post(
                        {
                            method: "api.module.member.invoice.del",
                            id: _id
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
                            _this.invoiceList = _this.invoiceList.filter(c=>c.id != _id);
                        }
                    );
                })
                .catch(() => {
                    // on cancel
                });
        },
        change(item) {
            this.query.i = item.id;
            this.$router.push({
                name: "orderconfirm",
                query: this.query
            });
        },
        go_edit(id) {
            this.is_back = false;
            this.$router.push({
                name: "invoiceinfor",
                params: { id },
                query: this.query
            });
        }
    }
};
</script>