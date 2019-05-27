<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="重置密码" fixed left-arrow/>
        <form class="xz-lr">
            <div class="xz-lr-title">输入验证码</div>
            <div class="xz-lr-tip">
                验证码已经发送至 {{mobile}}
                <div class="link_btn" v-if="time==0" @click="get_code">发送验证码</div>
                <div class="link_btn" v-else>({{time}})秒后重新发送</div>
            </div>
            <div class="xz-lr-box box-flex" @click="show_key">
                <input type="hidden" v-model="code">
                <input class="box-input key-input" v-model="code[0]" type="text" readonly>
                <input class="box-input key-input" v-model="code[1]" type="text" readonly>
                <input class="box-input key-input" v-model="code[2]" type="text" readonly>
                <input class="box-input key-input" v-model="code[3]" type="text" readonly>
                <input class="box-input key-input" v-model="code[4]" type="text" readonly>
                <input class="box-input key-input" v-model="code[5]" type="text" readonly>
            </div>
            <div class="xz-lr-box xz-lr-btn">
                <button type="button" class="xz-btn btn-e43 xz-radius" @click="checkCode">确认更换密码</button>
            </div>
        </form>
        <xz-Keyboard :isdot="true" v-model="showKeyboard" @changekey="onInput" @ondel="onDelete"/>
    </div>
</template>
<script>
import xzKeyboard from "@/components/xz-keyboard";
export default {
    components: {
        xzKeyboard
    },
    data() {
        return {
            mobile: "",
            showKeyboard: true,
            username: "",
            code: "",
            time: 60,
            timer: null,
            params: {
                method: "api.module.member.info.getvcode",
                mobile: "",
                action: "forget_password "
            },
            reserveParams: {
                method: "api.module.member.info.changepassword",
                mobile: "",
                code: ""
            },
            checkMessage: 0
        };
    },
    methods: {
        async loadData() {
            let _this = this,
                _password = _this.$route.params.password,
                _repassword = _this.$route.params.repassword,
                _mobile = _this.$route.params.mobile;
            _this.params.mobile = _mobile;
            _this.reserveParams.mobile = _mobile;
            let data = await _this.api.post(_this.params);
            if (data.code == 200) {
                let checkMessage = data.result;
                if (checkMessage != "") {
                    _this.$toast({
                        message: "您的验证码为:" + checkMessage,
                        duration: 3000
                    });
                    this.checkMessage = checkMessage;
                }
            } else {
            }
        },
        countDown() {
            let clock = window.setInterval(() => {
                this.time--;
                if (this.time <= 0) {
                    window.clearInterval(clock);
                }
            }, 1000);
        },
        show_key() {
            this.showKeyboard = true;
        },
        onInput(key) {
            this.code = (this.code + key).slice(0, 6);
        },
        async get_code() {
            let _this = this;
            _this.time = 60;
            let _mobile = _this.$route.params.mobile;
            let params = _this.params;
            _this.mobile = _mobile;
            _this.params.mobile = _mobile;
            _this.$toast({
                message: "验证码已发送"
            });
            let data = await _this.api.post(params);
            if (data.code == 200) {
                let checkMessage = data.result;
                if (checkMessage != "") {
                    _this.$toast({
                        message: "您的验证码为:" + checkMessage,
                        duration: 3000
                    });
                    this.checkMessage = checkMessage;
                    this.countDown();
                }
            } else {
            }
        },
        onDelete() {
            this.code = this.code.slice(0, this.code.length - 1);
        },
        /**校验验证码 */
        async checkCode() {
            let _this = this;
            _this.reserveParams.mobile = _this.$route.params.mobile;
            _this.reserveParams.password = _this.$route.params.password;
            _this.reserveParams.repassword = _this.$route.params.repassword;
            if (
                Number.parseInt(this.checkMessage) == Number.parseInt(this.code)
            ) {
                _this.reserveParams.code = _this.code;
                //console.log(_this.reserveParams);
                let data = await _this.api.post(_this.reserveParams);
                if (data.code == 200) {
                    _this.$toast({
                        message: "您的密码更换成功!请重新登录"
                    });
                    _this.$router.push("/user");
                }
            } else {
                _this.$toast({
                    message: "您的验证码输入错误",
                    duration: 3000
                });
            }
        }
    },
    created() {
        //console.log(this.$route.params)
        this.loadData();
    },
    mounted() {
        if (this.time != 0) {
            this.countDown();
        } else {
        }
    }
};
</script>
