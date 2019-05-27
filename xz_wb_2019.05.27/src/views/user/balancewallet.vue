<template>
    <div class="wallet-view">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" fixed title="余额钱包" left-arrow/>
        <div class="wallet-view-head" v-if="!isPwd">
            <div class="wallet-wrap">
                <p>钱包余额</p>
                <div class="wallet-money">
                    <p>
                        {{websit.data.currency}}
                        <i>{{userData.money}}</i>
                    </p>
                </div>
                <p>冻结资金：{{userData.frozen_money}}</p>
            </div>
            <section class="wallet-record">
                <div class="w-record-hd">
                    <p>余额交易记录</p>
                </div>
            </section>
        </div>
        <pull-up
            :postData="postData"
            @loadListSuccFn="loadListSuccFn"
            ablePull="true"
            ableLoad="true"
            ref="listPull"
            v-if="!isPwd"
        >
            <ul class="w-record-list" slot="listContent">
                <li class="flex-wrap" v-for="(item, index) in dataList">
                    <div class="flex-wd rec-data">
                        <span>{{item.dateline | formatDateMD}}</span>
                        <span class="year">{{item.dateline | formatDateY}}</span>
                    </div>
                    <div class="flex-one rec-num">
                        <h5>{{item.title}}</h5>
                        <p>{{item.number}}</p>
                    </div>
                    <div class="flex-wd rec-money">
                        <h5>{{item.value}}</h5>
                        <p :class="{'fail':item.statusCode==0}">{{item.status}}</p>
                    </div>
                </li>
            </ul>
        </pull-up>
        <div class="xz-btn btn-e43 xz-btn-bottom fixed" @click="go_recharge" v-if="!isPwd">我要充值</div>
        <form class="xz-lr" v-if="isPwd">
            <div class="xz-lr-title">设置支付密码</div>
            <div class="xz-lr-tip">请设置6位支付密码</div>
            <div class="xz-lr-box box-flex" @click="isKey=true">
                <input type="hidden" v-model="code">
                <input class="box-input key-input pwd" v-model="code2[0]" type="text" readonly>
                <input class="box-input key-input pwd" v-model="code2[1]" type="text" readonly>
                <input class="box-input key-input pwd" v-model="code2[2]" type="text" readonly>
                <input class="box-input key-input pwd" v-model="code2[3]" type="text" readonly>
                <input class="box-input key-input pwd" v-model="code2[4]" type="text" readonly>
                <input class="box-input key-input pwd" v-model="code2[5]" type="text" readonly>
            </div>
            <div class="xz-lr-box xz-lr-btn">
                <button type="button" class="xz-btn btn-e43 xz-radius" @click="pay_click">立即设置</button>
            </div>
        </form>
        <xz-Keyboard :isdot="true" :ismask="true" v-model="isKey" @changekey="onInput" @ondel="onDelete"/>
    </div>
</template>
<script>
import pullUp from "../../components/pull/index.vue";
import xzKeyboard from "@/components/xz-keyboard";
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            isPwd: false,
            isKey: false,
            code: "",
            code2: "",
            userData: {},
            postData: {
                method: "api.module.member.finance.log",
                limit: 10
            },
            dataList: []
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        ...mapActions("userMessage", ["getUser", "setUser"]),
        loadData() {
            let _this = this;
            let _userData = _this.userMessage.user;
            _this.userData = _userData;
            _this.post(
                {
                    method: "api.module.member.member.data"
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
                        if (
                            _this.util.isEmpty(
                                _this.userMessage.user.pay_password
                            )
                        ) {
                            _this.isPwd = true;
                            _this.isKey = true;
                        }
                    }
                }
            );
        },
        go_recharge() {
            this.$router.push("/user/brecharged");
        },
        loadListSuccFn(dataList, data) {
            let _dataList = dataList;
            _dataList.forEach(item => {
                let _strs = item.msg.split(",");
                item.title = _strs[0];
                if (_strs.length > 1) {
                    item.number = _strs[1];
                }
            });
            this.dataList = dataList;
        },
        onInput(key) {
            this.code = (this.code + key).slice(0, 6);
            this.code2 = (this.code2 + "·").slice(0, 6);
        },
        onDelete() {
            this.code = this.code.slice(0, this.code.length - 1);
            this.code2 = this.code2.slice(0, this.code2.length - 1);
        },
        pay_click() {
            let _this = this;
            let _code = this.code;
            let _loading = _this.$xzLoading();
            if (_code.length < 6) {
                return;
            }
            _this.post(
                {
                    method: "api.module.member.info.setpay",
                    pay_password: _code
                },
                function(data) {
                    _loading.clear();
                    if (200 !== data.code) {
                        _this.$toast({
                            message: _this.util.isEmpty(data.msg)
                                ? data
                                : data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    _this.isPwd = false;
                    _this.$toast({
                        message: "设置支付密码成功",
                        position: "bottom"
                    });
                }
            );
        }
    },
    components: {
        pullUp: pullUp,
        xzKeyboard
    },
    computed: {
        ...mapState(["userMessage"]),
        ...mapState(["websit"])
    }
};
</script>