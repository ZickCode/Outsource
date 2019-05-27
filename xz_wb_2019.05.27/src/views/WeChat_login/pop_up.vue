<template>
    <div class="chat-wrap">
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            isShow: false
        };
    },
    componentsL: {},
    computed: {
        ...mapState(["websit"]),
        ...mapState(["userMessage"]),
        ...mapGetters("userMessage", ["getWechatLogin"])
    },
    created() {
    },
    methods: {
        ...mapActions("userMessage", ["updataWechatLogin"]),
        go_wechat_login() {
            this.verifWx();
        },
        verifWx() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.member.public.saasBind"
                },
                function(data) {
                     _loading.clear();
                    if (200 == data.code) {
                        if (data.result == 1) {
                            window.location.href =
                                "https://www.xiaozhe.cn/wechat/auth/getCode/host/" +
                                window.location.host;
                        } else if(_this.userMessage.isWechatLogin!=0){
                            _this.$router.push("/login");
                        }
                    }
                }
            );
        }
    },
    watch: {
        getWechatLogin: function(newValue, oldVlaue) {
            this.go_wechat_login();
        }
    }
};
</script>
