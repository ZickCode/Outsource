<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar lr" fixed title="微信绑定" left-arrow/>
        <xz-form class="xz-lr" :model="formData" :rules="rules" ref="login_form">
            <div class="xz-lr-title">微信绑定</div>
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
import { mapActions, mapState, mapGetters } from "vuex";
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
        ...mapState(["websit"]),
        ...mapState(["userMessage"])
    },
    created() {
        if (
            this.util.isEmpty(this.userMessage.wechatData.openid) ||
            !this.websit.isWeix
        ) {
            this.$router.push("/");
        }
    },
    methods: {
        ...mapActions("userMessage", ["updataWechatLogin"]),
        next_click() {
            let _this = this;
            _this.$refs.login_form.validator(val => {
                if (val) {
                    let _loading = _this.$xzLoading();
                    _this.post(
                        {
                            method:
                                "api.module.member.public.mobile_bind",
                            mobile: _this.formData.mobile
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
                                if (data.result == 0) {
                                    _this.$router.push({
                                        name: "wechatCode",
                                        params: {
                                            u: _this.formData.mobile
                                        }
                                    });
                                } else {
                                    _this.$toast({
                                        message: "该手机号已绑定",
                                        position: "bottom"
                                    });
                                }
                            }
                        }
                    );
                }
            });
        },
        goto_register() {
            this.$router.push("/register/index");
        }
    },
    beforeRouteLeave(to, from, next) {
        let _this = this;
        if (to.path == "/") {
            _this.$router.push("/user");
            next(false);
        } else {
            next();
        }
    }
};
</script>