<template>
    <div class="nav-main nav-main-bottom bg-f0">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" fixed title="发票信息" left-arrow/>
        <div class="zinv-box">
            <xz-form class="g-form" :model="formData" :rules="rules" ref="invoice_form">
                <div class="invoice">
                    <ul class="distr-list mb-20">
                        <li class="flex-wrap">
                            <span class="flex-wd lab-tit">发票类型</span>
                            <div class="flex-one distr-msg">
                                <a
                                    href="javascript:void(0)"
                                    @click="isShowSort=true"
                                    v-text="type_name"
                                ></a>
                            </div>
                        </li>
                        <li class="flex-wrap">
                            <div class="flex-one">
                                <p class="invoice-tips">显示发票寄送等内容信息，内容信息由系统后台进行配置填写， 如果发票内容过多，则换行显示。</p>
                            </div>
                        </li>
                    </ul>
                    <div class="J_typenth1" v-if="formData.type==1">
                        <ul class="distr-list bm-none">
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">发票抬头</span>
                                <div class="flex-one distr-msg">
                                    <a
                                        href="javascript:void(0)"
                                        @click="isShowPayable=true"
                                        v-text="invoice_title"
                                    ></a>
                                </div>
                            </li>
                        </ul>
                        <ul class="distr-list bm-none J_name" v-if="formData.invoice_title==1">
                            <li class="flex-wrap">
                                <div class="flex-one">
                                    <input
                                        type="text"
                                        name="name"
                                        class="z-ipt"
                                        placeholder="请输入个人或者姓名"
                                        v-model="formData.invoice_name"
                                    >
                                </div>
                            </li>
                        </ul>
                        <ul class="distr-list bm-none J_company" v-else>
                            <li class="flex-wrap">
                                <div class="flex-one">
                                    <input
                                        type="text"
                                        name="name"
                                        class="z-ipt"
                                        placeholder="请输入企业名称"
                                        v-model="formData.invoice_name"
                                    >
                                </div>
                            </li>

                            <li class="flex-wrap z-identify">
                                <span class="flex-wd lab-tit">纳税人识别号</span>
                                <div class="flex-one">
                                    <input
                                        type="text"
                                        name="name"
                                        class="z-ipt"
                                        placeholder="请输入纳税人识别号或统一社会信用代码"
                                        v-model="formData.invoice_company_code"
                                    >
                                </div>
                            </li>
                        </ul>
                        <ul class="distr-list">
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">发票内容</span>
                                <div class="flex-one distr-msg">
                                    <a
                                        href="javascript:void(0)"
                                        @click="isShowSubstance=true"
                                        v-text="formData.invoice_content"
                                    ></a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="J_typenth2" v-else>
                        <ul class="distr-list">
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">发票抬头</span>
                                <div class="flex-one distr-msg z-distr-msg">
                                    <a href="javascript:void(0)" v-text="invoice_title"></a>
                                </div>
                            </li>
                            <li class="flex-wrap">
                                <div class="flex-one">
                                    <input
                                        type="text"
                                        name="name"
                                        class="z-ipt"
                                        placeholder="请输入企业名称"
                                        v-model="formData.invoice_name"
                                    >
                                </div>
                            </li>
                            <li class="flex-wrap z-identify">
                                <span class="flex-wd lab-tit">纳税人识别号</span>
                                <div class="flex-one">
                                    <input
                                        type="text"
                                        name="num"
                                        class="z-ipt"
                                        placeholder="请输入纳税人识别号或统一社会信用代码"
                                        v-model="formData.invoice_company_code"
                                    >
                                </div>
                            </li>

                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">注册地址</span>
                                <div class="flex-one z-invoice">
                                    <input
                                        type="text"
                                        name="adress"
                                        class="z-ipt"
                                        placeholder="请确保与贵公司税务登记证信息一致"
                                        v-model="formData.invoice_sign_address"
                                    >
                                </div>
                            </li>
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">注册电话</span>
                                <div class="flex-one z-invoice">
                                    <input
                                        type="text"
                                        name="phone"
                                        class="z-ipt"
                                        placeholder="请输入注册电话"
                                        v-model="formData.invoice_mobile"
                                    >
                                </div>
                            </li>
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">开户银行</span>
                                <div class="flex-one z-invoice">
                                    <input
                                        type="text"
                                        name="bank"
                                        class="z-ipt"
                                        placeholder="请输入开户银行"
                                        v-model="formData.bank_name"
                                    >
                                </div>
                            </li>
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">银行账户</span>
                                <div class="flex-one z-invoice">
                                    <input
                                        type="text"
                                        name="banknum"
                                        class="z-ipt"
                                        placeholder="请输入银行账户"
                                        v-model="formData.bank_number"
                                    >
                                </div>
                            </li>
                            <li class="flex-wrap">
                                <span class="flex-wd lab-tit">发票内容</span>
                                <div class="flex-one z-invoice">
                                    <input
                                        type="text"
                                        name="banknum"
                                        class="z-ipt"
                                        placeholder="请填写发票明细"
                                        v-model="formData.invoice_content"
                                    >
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </xz-form>
            <!-- 发票类型-->
            <van-actionsheet v-model="isShowSort">
                <xz-popup
                    title="发票类型"
                    btnName="确认"
                    :clickFlag="isShowSort"
                    @addClose="isShowSort=false"
                    @clickBottomBtn="isShowSort=false"
                >
                    <ul class="popup-items sort" slot="content">
                        <ul class="pay-list sort-list">
                            <li
                                v-for="(item,index) in types"
                                :key="index"
                                @click="types_change(index)"
                            >
                                <input
                                    type="radio"
                                    name="tinvoice"
                                    :checked="formData.type == item.id"
                                    class="g-radio"
                                >
                                <article class="gd-msg">
                                    <div class="gd-msg-txt">
                                        <p class="J_kind" v-text="item.title"></p>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </ul>
                </xz-popup>
            </van-actionsheet>
            <!-- 发票抬头-->
            <van-actionsheet v-model="isShowPayable">
                <xz-popup
                    title="发票抬头"
                    btnName="确认"
                    :clickFlag="isShowPayable"
                    @addClose="isShowPayable=true"
                    @clickBottomBtn="isShowPayable=false"
                >
                    <ul class="popup-items sort" slot="content">
                        <ul class="pay-list sort-list">
                            <li
                                v-for="(item,index) in invoice_titles"
                                :key="index"
                                @click="invoice_titles_change(index)"
                            >
                                <input
                                    type="radio"
                                    name="title"
                                    class="g-radio"
                                    :checked="formData.invoice_title == item.id"
                                >
                                <article class="gd-msg">
                                    <div class="gd-msg-txt">
                                        <p v-text="item.title"></p>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </ul>
                </xz-popup>
            </van-actionsheet>

            <!-- 发票内容-->
            <van-actionsheet v-model="isShowSubstance">
                <xz-popup
                    title="发票内容"
                    btnName="确认"
                    :clickFlag="isShowSubstance"
                    @addClose="isShowSubstance=false"
                    @clickBottomBtn="isShowSubstance=false"
                >
                    <ul class="popup-items sort" slot="content">
                        <ul class="pay-list sort-list">
                            <li
                                v-for="(item,index) in invoice_contents"
                                :key="index"
                                @click="invoice_contents_change(index)"
                            >
                                <input
                                    type="radio"
                                    name="conten"
                                    class="g-radio"
                                    :checked="formData.invoice_content== item"
                                >
                                <article class="gd-msg">
                                    <div class="gd-msg-txt">
                                        <p v-text="item"></p>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </ul>
                </xz-popup>
            </van-actionsheet>
        </div>
        <div class="xz-btn btn-e43 xz-btn-bottom" @click="saveData">保存并使用发票抬头</div>
    </div>
</template>
<script>
import popup from "../../components/goods/index.vue";
import xzForm from "@/components/form";
import { mapActions, mapState } from "vuex";
export default {
    name: "invoice",
    components: {
        "xz-popup": popup,
        xzForm
    },
    data() {
        let _this = this;
        return {
            query: {
                s: "",
                i: "",
                c: "",
                r: '',
            },
            isShowSort: false,
            isShowPayable: false,
            isShowSubstance: false,
            type_name: "纸质普通发票",
            invoice_title: "个人",
            invoices_id: "",
            types: [{ id: 1, title: "纸质普通发票" }],
            invoice_titles: [
                { id: 1, title: "个人" },
                { id: 2, title: "企业" }
            ],
            invoice_contents: [],
            formData: {
                method: "api.module.member.invoice.add",
                id: "",
                type: 1,
                invoice_title: 1,
                invoice_name: "",
                invoice_company_code: "",
                invoice_sign_address: "",
                invoice_mobile: "",
                bank_user_name: "",
                bank_name: "",
                bank_number: "",
                invoice_content: ""
            },
            rules: {
                invoice_name: [
                    {
                        type: "string",
                        required: true,
                        message: "请填写姓名"
                    }
                ],
                invoice_company_code: [
                    {
                        type: "string",
                        required: false,
                        message: "请填写纳税人识别号"
                    }
                ],
                invoice_mobile: [
                    {
                        validator: _this.validata.phone()
                    }
                ]
            }
        };
    },
    created() {
        if (this.util.isEmpty(this.$route.query.s)) {
            this.go_back();
            return;
        }
        this.query.s = this.$route.query.s || '';
        this.query.i = this.$route.query.i || '';
        this.query.c = this.$route.query.c || '';
        this.query.r = this.$route.query.r || '';
        let _id =  this.$route.params.id || '';
        this.invoice_contents = this.websit.data.invoice_content;
        // this.formData.invoice_content = this.invoice_contents[0];
        this.updataForm(_id);
        if (this.websit.data.invoice_type == 1) {
            this.types = [
                { id: 1, title: "纸质普通发票" },
                { id: 2, title: "增值税专用发票" }
            ];
        }
    },
    methods: {
        ...mapActions("userMessage", ["getUser", "setUser"]),
        types_change(i) {
            let _t = this.types[i];
            this.formData.type = _t.id;
            this.type_name = _t.title;
            if (this.formData.type == 2) {
                this.invoice_titles_change(1);
            }
            this.isShowSort = false;
            this.updataRules(this.formData.type, this.formData.invoice_title);
        },
        invoice_titles_change(i) {
            let _t = this.invoice_titles[i];
            this.formData.invoice_title = _t.id;
            this.invoice_title = _t.title;
            this.isShowPayable = false;
            if (this.formData.invoice_title == 2) {
                let _in = this.rules["invoice_name"];
                _in[0].message = "请填写企业名称";
                this.$set(this.rules, "invoice_name", _in);
            } else {
                let _in = this.rules["invoice_name"];
                _in[0].message = "请填写姓名";
                this.$set(this.rules, "invoice_name", _in);
            }
            this.updataRules(this.formData.type, this.formData.invoice_title);
        },
        invoice_contents_change(i) {
            let _t = this.invoice_contents[i];
            this.formData.invoice_content = _t;
            this.isShowSubstance = false;
        },
        updataForm(_id) {
            let _invoice = this.userMessage.user._invoice;
            if (!this.util.isEmpty(_invoice)) {
                let _data = this.userMessage.user._invoice.find(
                    c => c.id==_id
                );
                if (!this.util.isEmpty(_data)) {
                    this.formData = JSON.parse(JSON.stringify(_data));
                } else {
                    this.formData.id = this.formData.invoice_name = this.formData.invoice_company_code = this.formData.invoice_sign_address = this.formData.invoice_mobile = this.formData.bank_user_name = this.formData.bank_user_name = this.formData.bank_name = this.formData.bank_number = this.formData.invoice_content =
                        "";
                }
            } else {
                this.formData.id = this.formData.invoice_name = this.formData.invoice_company_code = this.formData.invoice_sign_address = this.formData.invoice_mobile = this.formData.bank_user_name = this.formData.bank_user_name = this.formData.bank_name = this.formData.bank_number = this.formData.invoice_content =
                    "";
            }
            this.formData.method = "api.module.member.invoice.add";
        },
        updataRules(type, t) {
            if (type == 1) {
                let _icc = this.rules["invoice_company_code"];
                _icc[0].required = false;
                this.$set(this.rules, "invoice_company_code", _icc);
                if (t == 2) {
                    _icc[0].required = true;
                    this.$set(this.rules, "invoice_company_code", _icc);
                }
            } else {
                let _icc = this.rules["invoice_company_code"];
                _icc[0].required = true;
                this.$set(this.rules, "invoice_company_code", _icc);
            }
        },
        saveData() {
            let _this = this;
            _this.$refs.invoice_form.validator(val => {
                if (val) {
                    let _loading = _this.$xzLoading();

                    _this.post(_this.formData, function(data) {
                        _loading.clear();
                        if (200 !== data.code) {
                            _this.$toast({
                                message: data.msg,
                                position: "bottom"
                            });
                            return;
                        }
                        if (data.result == false) {
                            _this.$toast({
                                message: "系统错误",
                                position: "bottom"
                            });
                            return;
                        }
                        if (_this.util.isEmpty(_this.formData.id)) {
                            _this.invoices_id = data.result;
                        } else {
                            _this.invoices_id = _this.formData.id;
                        }
                        _this.post(
                            {
                                method: "api.module.member.member.data"
                            },
                            function(udata) {
                                if (200 !== udata.code) {
                                    return;
                                }
                                if (udata.result != null) {
                                    let _data = udata.result;
                                    _this.userData = _data;
                                    _this.setUser(_data);
                                }
                                //_this.go_back();
                                _this.query.i = _this.invoices_id;
                                _this.$router.push({
                                    name: "orderconfirm",
                                     query:_this.query
                                });
                            }
                        );
                    });
                }
            });
        },
        colseInfo() {
            let result = false;
            if (this.isShowSort) {
                (this.isShowSort = false), (result = true);
            }
            if (this.isShowPayable) {
                this.isShowPayable = false;
                result = true;
            }
            if (this.isShowSubstance) {
                this.isShowSubstance = false;
                result = true;
            }
            return result;
        }
    },
    computed: {
        ...mapState(["websit"]),
        ...mapState(["userMessage"])
    },
    beforeRouteLeave(to, from, next) {
        if (this.colseInfo()) {
            next(false);
        } else {
            next();
        }
    }
};
</script>
