<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar lr" fixed title="找回密码" left-arrow/>
        <xz-form class="xz-lr" :model="formData" :rules="rules" ref="login_form">
            <div class="xz-lr-title">开始找密码</div>
            <div class="xz-lr-tip">
				请输入您的手机号找回密码
                <a class="fr link_btn" href="#/login/clogin">手机快速登录</a>
			</div>
            <div class="xz-lr-box">
                <input class="box-input" v-model="formData.mobile" type="tel" placeholder="请输入手机号码">
            </div>
            <div class="xz-lr-box xz-lr-btn">
                <button type="button" class="xz-btn btn-e43 xz-radius" @click="next_click">下一步</button>
            </div>
        </xz-form>
    </div>
</template>
<script>
import xzForm from "@/components/form";
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
                            if (-45006 !== data.code) {
                                _this.$toast({
                                    message: "该手机号未注册",
                                    position: "bottom"
                                });
                                return;
                            } else {
                                _this.$router.push({
                                    name: "retrieveCode",
                                    params: {
                                        u: _this.formData.mobile
                                    }
                                });
                            }
                        }
                    );
                }
            });
        }
    }
};
</script>