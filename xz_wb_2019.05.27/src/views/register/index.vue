<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar lr" fixed title="注册" left-arrow/>
        <xz-form class="xz-lr" :model="formData" :rules="rules" ref="register_form">
            <div class="xz-lr-title">欢迎注册账号</div>
            <div class="xz-lr-box">
                <input
					@click="focusInput($event)" 
                    class="box-input"
                    type="text"
                    v-model="formData.nickName"
                    placeholder="请输入用户昵称"
                >
            </div>
            <div class="xz-lr-box">
                <input class="box-input" @click="focusInput($event)" type="text" v-model="formData.mobile" placeholder="请输入手机号">
            </div>
            <div class="xz-lr-box">
                <input
					@click="focusInput($event)" 
                    class="box-input"
                    type="password"
                    v-model="formData.password"
                    placeholder="请输入密码"
                >
            </div>
            <div class="xz-lr-box">
                <input
					@click="focusInput($event)" 
                    class="box-input"
                    type="password"
                    v-model="formData.pwdconfirm"
                    placeholder="确认密码"
                >
            </div>
            <div class="xz-lr-box xz-lr-btn">
                <button type="button" class="xz-btn btn-e43 xz-radius" @click="next_click">下一步</button>
            </div>
        </xz-form>
        <div class="xz-lr-box-text" @click="goto_login">立即登录</div>
        <van-actionsheet v-model="show">
            <div class="xz-pact">
                <div class="xz-pact-title">用户协议
                    <xz-icon @click="pact_click('no')" type="guanbi"/>
                </div>
                <div class="xz-pact-content" v-html="protocol">
                </div>
                <div class="xz-pact-btn">
                    <button class="xz-btn" @click="pact_click('no')">不同意</button>
                    <button class="xz-btn btn-e43" @click="pact_click('ok')">同意</button>
                </div>
            </div>
        </van-actionsheet>
    </div>
</template>
<script>
import { Actionsheet } from "vant";
import xzForm from "@/components/form";
import { mapGetters, mapState } from "vuex";
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
            protocol:"",
            formData: {
                nickName: "",
                mobile: "",
                password: "",
                pwdconfirm: ""
            },
            rules: {
                nickName: [
                    {
                        type: "string",
                        required: true,
                        message: "请输入昵称"
                    }
                    // {
                    //     validator: _this.validata.checkUsername()
                    // }
                ],
                mobile: [
                    {
                        type: "string",
                        required: true,
                        message: "请输入手机号"
                    },
                    {
                        validator: _this.validata.mobile()
                    },
                    {
                        validator: _this.validata.checkUsername()
                    }
                ],
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
        this.loadData();
        this.load_protocol();
        this.$nextTick(function() {
            this.show = true;
        });
    },
    methods: {
        loadData() {
            let _pass_complex = this.websit.data.reg_pass_complex;
            let _user_censor = this.websit.data.reg_user_censor;
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

            if (!this.util.isEmpty(_user_censor)&& _user_censor.length>0) {
                let _nickRep ="^((?!(";
                _nickRep += _user_censor.map(c=>c.replace(/\*/g,"\\*").replace(/\|/g,"\\r\\n")).join('|');
                _nickRep += ")).)*$";
                let _rule = this.rules;
                _rule.nickName= [
                    {
                        type: "string",
                        required: true,
                        message: "请输入昵称"
                    },
                    {
                        max: 10,
                        message: "昵称只能输入10个字符以内"
                    },
                    {
                        type: "string",
                        pattern: new RegExp(_nickRep, "g"),
                        message: "该昵称不可用"
                    }
                ]
                this.rules = _rule;
            }
        },
        next_click() {
            let _this = this;
            _this.$refs.register_form.validator(val => {
                if (val) {
                    sessionStorage.setItem(
                        "register",
                        JSON.stringify(_this.formData)
                    );
                    _this.$router.push("/register/code");
                }
            });
        },
        load_protocol(){
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.admin.setting.getRegisterProtocol"
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
                    _this.protocol = data.result;
                }
            );
        },
		focusInput($event){ // 解决iphonex 上面有时候不能聚焦的问题
			$event.currentTarget.focus();
		},
        goto_login() {
            this.$router.push("/login");
        },
        pact_click(action) {
            action === "ok" ? (this.show = false) : this.go_back();
        }
    },
    components: {
        vanActionsheet: Actionsheet,
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