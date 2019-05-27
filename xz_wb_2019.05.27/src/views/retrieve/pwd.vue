<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar lr" fixed title="找回密码" left-arrow/>
        <xz-form class="xz-lr" :model="formData" :rules="rules" ref="retrieve_form">
            <div class="xz-lr-title">账号验证成功</div>
            <div class="xz-lr-tip">请设置您的新密码</div>
            <div class="xz-lr-box">
                <input class="box-input" type="password" v-model="formData.password" placeholder="请设置您的登录密码">
            </div>
            <div class="xz-lr-box">
                <input class="box-input" type="password" v-model="formData.pwdconfirm" placeholder="请确认您的登录密码">
            </div>
            <div class="xz-lr-box xz-lr-btn">
                <button type="button" class="xz-btn btn-e43 xz-radius" @click="retrieve_click">开始购物</button>
            </div>
        </xz-form>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import xzForm from "@/components/form";
export default {
    data() {
        let _this = this;
        const validatePassCheck = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== _this.formData.password) {
                callback(new Error("两次输入的密码不一致"));
            } else {
                callback();
            }
        };
        return {
            show: false,
            formData: {
                password: "",
                pwdconfirm: ""
            },
            mobile: "",
            code: "",
            rules: {
                password: [
                    {
                        type: "string",
                        required: true,
                        message: "请输入位数密码"
                    }
                ],
                pwdconfirm: [
                    {
                        validator: validatePassCheck
                    }
                ]
            }
        };
    },
    created() {
        let _u = this.$route.params.u;
        let _c = this.$route.params.c;
        if (this.util.isEmpty(_u) || this.util.isEmpty(_c)) {
            this.$router.push("/retrieve");
        }
        this.mobile = _u;
        this.code = _c;
        this.loadData();
    },
    methods: {
        loadData() {
            let _pass_complex = this.websit.data.reg_pass_complex;
            let _length = this.websit.data.reg_pass_lenght;
            let _rep = "";
            let _repMsg = [];
            if (!this.util.isEmpty(_pass_complex)) {
                _pass_complex.forEach(item => {
                    switch (item) {
                        case "1":
                            _rep += "(?=.*\\d)";
                            _repMsg.push("数字");
                            break;
                        case "2":
                            _rep += "(?=.*[a-z])";
                            _repMsg.push("小写字母");
                            break;
                        case "3":
                            _rep += "(?=.*[A-Z])";
                            _repMsg.push("大写字母");
                            break;
                        case "4":
                            _rep += "(?=.*[^a-zA-z0-9]+)";
                            _repMsg.push("特殊字符");
                            break;
                    }
                });
                let _rule = this.rules;
                _rule.password = [
                    {
                        type: "string",
                        required: true,
                        min: Number(_length),
                        message: "请输入" + _length + "位数以上密码"
                    },
                    {
                        type: "string",
                        pattern: new RegExp(_rep, "g"),
                        message: "请输入包含" + _repMsg.join(",") + "的密码"
                    }
                ];
                this.rules = _rule;
            }
        },
        retrieve_click() {
            let _this = this;
            _this.$refs.retrieve_form.validator(val => {
                if (val) {
                    let _loading = _this.$xzLoading();
                    _this.post(
                        {
                            method: "api.module.member.member.resetpassword",
                            mobile: _this.mobile,
                            code: _this.code,
                            password: _this.formData.password,
                            repassword: _this.formData.pwdconfirm
                        },
                        function(data) {
                            _loading.clear();
                            if (200 !== data.code) {
                                _this.$toast({
                                    message: data.msg
                                });
                                return;
                            }
                            _this.$toast({
                                message: "找回密码成功"
                            });
                            _this.$router.push("/login");
                        }
                    );
                }
            });
        }
    },
    components: {
        xzForm
    },
    computed: {
        ...mapState(["websit"]),
        ...mapGetters("websit", ["getWeSit"])
    },
    watch: {
        getWeSit: function(newValue) {
            this.loadData();
        }
    }
};
</script>