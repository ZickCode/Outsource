<template>
    <DiyPage :is-home="true"></DiyPage>
</template>

<script>
import DiyPage from "@/views/diy/diy.vue";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    name: "homepage",
    data() {
        return {
            wechatData: {}
        };
    },
    components: {
        DiyPage
    },

    computed: {
        ...mapState(["websit"]),
        ...mapState(["userMessage"])
    },
    created() {
        let _query = this.$route.query;
        if(this.util.isEmpty(_query.unionid)){
            _query.unionid="";
        }
        //验证是否弹出微信登录
        //和是否微信登录回调
        var token = this.util.getLS("token", 7);
        if (
            this.util.isEmpty(_query.openid) &&
            this.websit.isWeix &&
            !this.userMessage.isLogin && this.util.isEmpty(token)
        ) {
            this.updataWechatLogin(false);
        } else if (this.websit.isWeix && !this.userMessage.isLogin && this.util.isEmpty(token)) {
            this.wechatData = _query;
            this.go_login();
        }
    },
    methods: {
        ...mapActions("userMessage", ["updataWechatLogin","updataWechatData"]),
        go_login() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.member.public.wechat_login",
                    openid: _this.wechatData.openid,
                    nickname: _this.wechatData.nickname,
                    avatar: _this.wechatData.headimgurl,
                    sex: _this.wechatData.sex,
                    unionid:_this.wechatData.unionid
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
                    if (data.result.status == 0) {
                        _this.updataWechatData(_this.wechatData);
                         _this.$router.push("/wechat/bind");
                    } else {
                        _this.util.setLS("token", data.result.token);
                        _this.$toast({
                            message: "登录成功",
                            position: "bottom"
                        });
                    }
                }
            );
        }
    }
};
</script>

<style>
</style>