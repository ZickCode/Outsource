<template>
    <div class="xz-paypwd-moadl">
        <div class="xz-paypwd-mask" v-if="value" @click="mask_click"></div>
        <div class="xz-paypwd" :class="{'xz-paypwd-show':value}">
            <div class="xz-paypwd-head">{{title}}</div>
            <div class="xz-lr-box box-flex">
                <input type="hidden" v-model="code">
                <input class="box-input key-input" v-model="pwd[0]" type="text" readonly>
                <input class="box-input key-input" v-model="pwd[1]" type="text" readonly>
                <input class="box-input key-input" v-model="pwd[2]" type="text" readonly>
                <input class="box-input key-input" v-model="pwd[3]" type="text" readonly>
                <input class="box-input key-input" v-model="pwd[4]" type="text" readonly>
                <input class="box-input key-input" v-model="pwd[5]" type="text" readonly>
            </div>
            <xz-Keyboard
                :random="random"
                :isdot="true"
                v-model="iskeyboard"
                @changekey="onInput"
                @ondel="onDelete"
                @onok="onok"
            />
        </div>
    </div>
</template>
<script>
import xzKeyboard from "@/components/xz-keyboard";
export default {
    props: {
        title:{
            type:String,
            default:'支付密码'
        },
        random: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        },
        ismask: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            code: "",
            pwd:"",
            iskeyboard: true
        };
    },
    components: {
        xzKeyboard
    },
    methods: {
        onInput(key) {
            this.code = (this.code + key).slice(0, 6);
            this.pwd=(this.pwd+"·").slice(0, 6);
        },
        onDelete() {
            this.code = this.code.slice(0, this.code.length - 1);
            this.pwd=this.pwd.slice(0, this.pwd.length - 1);
        },
        onok() {
            if (this.code.length < 6) {
                this.$toast({
                    message: "请输入支付密码",
                    position: "bottom"
                });
            } else {
                this.$emit("onok", this.code);
            }
        },
        mask_click() {
            if (this.ismask) {
                this.$emit("input", false);
            }
        }
    },
    watch:{
        value(newValue){
            if(!newValue){
                this.code="";
                this.pwd="";
            }
        }
    }
};
</script>