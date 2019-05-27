<template>
    <div class="xz-keyboard" :class="{'keyboard-show':value}">
        <div class="xz-keyboard-mask" v-if="ismask && value" @click="mask_click"></div>
        <div class="xz-keyboard-content">
            <div class="xz-keylist">
                <i
                    class="xz-key-item"
                    v-for="(item,index) in keys"
                    :key="index"
                    @touchstart="touchstart"
                    @touchend="touchend"
                    @touchcancel="touchend"
                    @click="key_click($event,item)"
                >{{item}}</i>
                <i
                    class="xz-key-item xz-key-0"
                    @touchstart="touchstart"
                    @touchend="touchend"
                    @touchcancel="touchend"
                    @click="key_click($event,0)"
                >0</i>
                <i
                    class="xz-key-item xz-key-d"
                    @touchstart="touchstart"
                    @touchend="touchend"
                    @touchcancel="touchend"
                    @click="key_click($event,'.')"
                >.</i>
            </div>
        </div>
        <div class="xz-keyboard-btn">
            <a href="javascript:void(0)" class="btn-del" @click="del_click">删除</a>
            <a href="javascript:void(0)" class="btn-ok btn-e43" @click="ok_click">完成</a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        random: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        },
        isdot: {
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
            keys: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        };
    },
    created() {
        if (this.random) {
            this.keys = _.shuffle(this.keys);
        }
    },
    methods: {
        touchstart(e) {
            e.target.className += " xz-key--active";
        },
        touchend(e) {
            e.target.className = e.target.className.replace(
                " xz-key--active",
                ""
            );
        },
        ok_click(e) {
            this.$emit("input", false);
            this.$emit("onok");
        },
        key_click(e, k) {
            if(this.isdot && k=='.'){
                return;
            }
            this.$emit("changekey", k);
        },
        del_click(e) {
            this.$emit("ondel");
        },
        mask_click() {
            if (this.ismask) {
                this.$emit("input", false);
            }
        }
    }
};
</script>