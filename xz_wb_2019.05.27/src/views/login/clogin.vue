<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar lr" fixed title="登录" left-arrow/>
        <xz-form class="xz-lr" :model="formData" :rules="rules" ref="login_form">
            <div class="xz-lr-title">欢迎登录</div>
            <div class="xz-lr-box">
                <input class="box-input"  @click="focusInput($event)" v-model="formData.mobile" type="tel" placeholder="请输入手机号码">
            </div>
            <div class="qust-link" v-if="websit.data.reg_unregistered==0">
				<a class="xz-lr-tip end" href="#/login">账号密码登录</a>
			</div>
            <div class="xz-lr-box xz-lr-btn">
                <button type="button" class="xz-btn btn-e43 xz-radius" @click="next_click">下一步</button>
            </div>
        </xz-form>
    </div>
</template>
<script>
import xzForm from "@/components/form";
import { mapActions, mapState,mapGetters } from "vuex";
export default {
    data() {
        let _this = this;
        return {
            formData: {
                mobile: ""
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
                ]
            }
        };
    },
    components: {
        xzForm
    },
    computed: {
        ...mapState(["websit"])
    },
    methods: {
        next_click() {
            let _this = this;
            _this.$refs.login_form.validator(val => {
                if (val) {
                    let _loading = _this.$xzLoading();
                    _this.post(
                        {
                            method: "api.module.member.public.check",
                            name: "username",
                            param: _this.formData.mobile
                        },
                        function(data) {
                            _loading.clear();
                            if (-45006 !== data.code && _this.websit.data.reg_unregistered !=1) {
                                _this.$toast({
                                    message: "该手机号未注册",
                                    position: "bottom"
                                });
                                return;
                            } else {
                                _this.$router.push({
                                    name: "logingCode",
                                    params: {
                                        u: _this.formData.mobile
                                    }
                                });
                            }
                        }
                    );
                }
            });
        },
		focusInput($event){ // 解决iphonex 上面有时候不能聚焦的问题
			$event.currentTarget.focus();
		},
        goto_register() {
            this.$router.push("/register/index");
        }
    },
    beforeRouteLeave(to, from, next) {
        let _this = this;
        if(_this.websit.data.reg_unregistered==1 && to.path=="/login")
        {
            _this.$router.push("/user");
            next(false);
        } else {
            next();
        }
    }
};
</script>