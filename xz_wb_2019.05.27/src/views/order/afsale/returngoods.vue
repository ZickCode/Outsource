<template>
    <div class="nav-main nav-main-bottom" style="background:#f0f0f0;" v-if="!util.isEmpty(afsaleData.id)">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="申请售后" fixed left-arrow/>
        <article class="s-shop-item mb-20">
            <a>
                <span class="s-shop-pic">
                    <img v-lazy="util.reImg(afsaleData._sku.sku_thumb)">
                </span>
                <div class="s-msg-cont">
                    <h4 v-text="afsaleData._sku.sku_name"></h4>
                    <p v-html="afsaleData._sku.sku_spec"></p>
                </div>
            </a>
        </article>
        <div class="return-tips mb-20">
            <div class="r-tips">
                <em class="red">提醒：</em>请<span v-if="afsaleData._info.return_status">在
                <em class="red">{{afsaleData._info.times | formatSeconds}}</em>内</span>将商品邮寄到以下地址，并填
                写退货信息快递信息，请
                <em class="red">不要使用货到付款</em>，否则无法为您办理退
                货，您退货中产生的运费问题，我们会在售后退款时处理。
            </div>
            <div class="address">
                <header>
                    <span class="mobile">{{websit.data.return_tel}}</span>
                    <span class="title">{{websit.data.return_name}}</span>
                </header>
                <div
                    class="add"
                >{{websit.data.return_province_name + websit.data.return_city_name +websit.data.return_county_name + websit.data.return_address}}</div>
            </div>
        </div>
        <div class="frd-wrap mb-20">
            <div class="freight">
                <ul class="ordmsg-list">
                    <li class="flex-wrap">
                        <span class="flex-wd lab-tit">申请时间：</span>
                        <div
                            class="flex-one gd-msg-txt"
                        >{{afsaleData._log[afsaleData._log.length-1].system_time | formatDateTime}}</div>
                    </li>
                    <!-- <li class="flex-wrap">
                        <span class="flex-wd lab-tit">售后单号：</span>
                        <div class="flex-one gd-msg-txt">AS201901150358001</div>
                    </li>-->
                    <li class="flex-wrap">
                        <span class="flex-wd lab-tit">退款金额：</span>
                        <div class="flex-one gd-msg-txt">
                            <span class="red-cor">￥{{afsaleData._info.amount}}</span>
                        </div>
                    </li>
                    <li class="flex-wrap last">
                        <span class="flex-wd lab-tit">售后状态：</span>
                        <div class="flex-one gd-msg-txt">
                            <span class="red-cor" v-html="afsaleData._log[0].msg"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="xz-btn btn-e43 xz-btn-bottom btn-e43" @click="go_return" v-if="afsaleData.status==1&&afsaleData._info.status==1">确认寄回</div>
        <div class="xz-btn btn-e43 xz-btn-bottom btn-e43" v-else>已提交寄回信息</div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            id:"",
            afsaleData: {},
            timer: null
        };
    },
    computed: {
        ...mapState(["websit"])
    },
    created() {
        let _this = this;
        let _id = _this.$route.params.id;
        if (_this.util.isEmpty(_id)) {
            _this.go_back();
            return;
        }
        _this.id = _id;
        _this.loadData();
    },
    methods: {
        loadData(){
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.order.server.order_server_detail",
                    o_sku_id:_this.id
                },
                function(data) {
                    _loading.clear();
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg
                        });
                        return;
                    }
                    _this.afsaleData = data.result;
                    _this.timers();
                }
            );
        },
        timers(){
            let _this = this;
            
            if (_this.afsaleData._info.times != null && _this.afsaleData._info.times > 0) {
                if (!_this.timer) {
                    _this.timer = setInterval(() => {
                        if (_this.afsaleData._info.times > 0) {
                            _this.afsaleData._info.times--;
                        } else {
                            clearInterval(_this.timer);
                            _this.timer = null;
                        }
                    }, 1000);
                }
            } else {
                _this.get_code();
            }
        },
        go_return() {
            this.$router.push("/order/afsale/returnlogistics/"+this.id);
        }
    }
};
</script>