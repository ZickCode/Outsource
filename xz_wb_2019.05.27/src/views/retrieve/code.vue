<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar lr" fixed title="找回密码" left-arrow/>
        <form class="xz-lr">
            <div class="xz-lr-title">输入验证码</div>
            <div class="xz-lr-tip">
                验证码已经发送至{{username}}
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
                <button type="button" class="xz-btn btn-e43 xz-radius" @click="login_click">设置新密码</button>
            </div>
        </form>
        <xz-Keyboard :isdot="true" v-model="showKeyboard" @changekey="onInput" @ondel="onDelete"/>
    </div>
</template>
<script>
import xzKeyboard from "@/components/xz-keyboard";
export default {
    data() {
        return {
            showKeyboard: false,
            username: "",
            code: "",
            time: 0,
            timer: null
        };
    },
    created() {
        this.$nextTick(() => {
            let _u = this.$route.params.u;
            if (this.util.isEmpty(_u)) {
                this.$router.push('/retrieve');
            }
            this.username = _u;
            this.showKeyboard = true;
            this.load();
        });
    },
    methods: {
        load() {
            let _this = this;
            let _time = sessionStorage.getItem("time");
            if (_time != null && _time > 0) {
                _this.time = _time;
                if (!_this.timer) {
                    _this.timer = setInterval(() => {
                        if (_this.time > 0) {
                            _this.time--;
                            sessionStorage.setItem("time", _this.time);
                        } else {
                            clearInterval(_this.timer);
                            _this.timer = null;
                        }
                    }, 1000);
                }
            } else {
                _this.get_code();
            }
        },
        get_code() {
            let _this = this;
            if (_this.time == 0) {
                _this.post(
                    {
                        method: "api.module.member.member.getvcode",
                        mobile: _this.username,
                        action: "forget_password"
                    },
                    function(data) {
                        if (200 !== data.code) {
                            _this.$toast({
                                message: data.msg,
                                position: "bottom"
                            });
                            return;
                        }
                        if (data.result != true) {
                            _this.$toast({
                                message: data.result,
                                position: "bottom"
                            });
                        }else{
                            _this.$toast({
                                message: "验证码发送成功"
                            });
                        }
                        _this.time = 60;
                        _this.startTimer();
                    }
                );
            }
        },
        startTimer() {
            let _this = this;
            if (!_this.timer) {
                _this.timer = setInterval(() => {
                    if (_this.time > 0) {
                        _this.time--;
                        sessionStorage.setItem("time", _this.time);
                    } else {
                        clearInterval(_this.timer);
                        _this.timer = null;
                    }
                }, 1000);
            }
        },
        login_click() {
            let _this = this;
            if (_this.code.length < 6) {
                _this.$toast({
                    message: "请输入正确验证码",
                    position: "bottom"
                });
                return;
            }
            _this.showKeyboard=false;
            _this.post(
                {
                    method: "api.module.member.member.checkvcode",
                    mobile: _this.username,
                    code: _this.code,
                    action: "forget_password"
                },
                function(data) {
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    sessionStorage.removeItem("time");
                    _this.$router.push({
                        name: "retrievePwd",
                        params: {
                            u: _this.username,
                            c: _this.code
                        }
                    });
                }
            );
        },
        show_key() {
            this.showKeyboard = true;
        },
        onInput(key) {
            this.code = (this.code + key).slice(0, 6);
        },
        onDelete() {
            this.code = this.code.slice(0, this.code.length - 1);
        }
    },
    components: {
        xzKeyboard
    }
};
</script>
