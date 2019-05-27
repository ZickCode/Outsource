<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar lr" title="登录" fixed left-arrow/>
        <xz-form class="xz-lr" :model="formData" :rules="rules" ref="login_form">
            <div class="xz-lr-title">
                欢迎登录
                <a class="xz-lr-tip end fr" href="#/login/clogin" @click="is_back=false">手机快捷登录</a>
            </div>
            <div class="xz-lr-box">
                <input
                    class="box-input"
                    @click="focusInput($event)"
                    v-model="formData.mobile"
                    type="tel"
                    placeholder="请输入手机号码"
                >
            </div>
            <div class="xz-lr-box">
                <input
                    @click="focusInput($event)"
                    ref="inputs"
                    class="box-input"
                    v-model="formData.password"
                    type="password"
                    placeholder="请输入您的密码"
                >
            </div>
            <div class="qust-link">
                <a class="xz-lr-tip end fl" href="javascript:void(0)" @click="goto_register">立即注册</a>
                <a class="xz-lr-tip end fr link_btn" href="#/retrieve" @click="is_back=false">忘记密码</a>
            </div>
            <div class="xz-lr-box xz-lr-btn">
                <button type="button" class="xz-btn btn-e43 xz-radius" @click="login_log">立即登录</button>
            </div>
        </xz-form>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import xzForm from "@/components/form";
export default {
    data() {
        let _this = this;
        return {
            is_back: true,
            formData: {
                mobile: "",
                password: ""
            },
            rules: {
                mobile: [
                    {
                        type: "string",
                        required: true,
                        message: "请输入手机号"
                    },
                    {
                        validator: _this.validata.mobile()
                    }
                ],
                password: [
                    {
                        type: "string",
                        required: true,
                        message: "请输入密码"
                    }
                ]
            }
        };
    },
    components: {
        xzForm
    },
    computed: {
        ...mapState(["shopCar"]),
        ...mapState(["websit"])
    },
    methods: {
        login_log() {
            let _this = this;
            _this.$refs.login_form.validator(val => {
                if (val) {
                    let _loading = _this.$xzLoading();
                    _this.post(
                        {
                            method: "api.module.member.public.login",
                            username: _this.formData.mobile,
                            password: _this.formData.password
                        },
                        function(data) {
                            _loading.clear();
                            if (200 !== data.code) {
                                _this.$toast({
                                    message: data.msg,
                                    position: "bottom"
                                });
                                return;
                            } else {
                                _this.$toast({
                                    message: "登录成功",
                                    position: "bottom"
                                });
                                _this.util.setLS("token", data.result);
                                _this.go_back();
                            }
                        }
                    );
                }
            });
        },
        focusInput($event) {
            // 解决iphonex 上面有时候不能聚焦的问题
            $event.currentTarget.focus();
        },
        goto_register() {
            this.is_back = false;
            this.$router.push("/register/index");
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.websit.data.reg_unregistered == 1) {
                vm.is_back = false;
                vm.$router.push("/login/clogin");
            }
        });
    },
    beforeRouteLeave(to, from, next) {
        let _this = this;
        if (
            (to.path.indexOf("retrieve") > -1 ||
                to.path.indexOf("login") > -1 ||
                to.path.indexOf("register") > -1) &&
            _this.is_back
        ) {
            _this.$router.push("/user");
            next(false);
        } else {
            next();
        }
    }
};
</script>