<template>
    <div class="xz-stepper">
        <button class="xz-stepper-minus" :class="{'xz-stepper-disabled':min>=value}" @click="minus"></button>
        <input
            class="xz-stepper-input"
            type="number"
            v-model="currentValue"
            @keydown="keydown"
            @focus="focus"
            @blur="blur"
        >
        <button class="xz-stepper-plus" :class="{'xz-stepper-disabled':max<=value}" @click="plus"></button>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            default: 1
        },
        min: {
            default: 0
        },
        max: {
            default: null
        }
    },
    data() {
        const value = this.value;
        return {
            currentValue: value
        };
    },
    methods: {
        format(value) {
            value = String(value).replace(/[^0-9.-]/g, "");
            return value === "" ? 0 : this.integer ? Math.floor(value) : +value;
        },
        minus(e) {
            e.stopPropagation();
            if (this.min >= this.currentValue) {
                this.$emit("minus",this.currentValue, false);
            } else {
                this.currentValue--;
                this.$emit("minus",this.currentValue, true);
            }
        },
        plus(e) {
            e.stopPropagation();
            if (this.max <= this.currentValue) {
                this.$emit("plus",this.currentValue, false);
            } else {
                this.currentValue++;
                this.$emit("plus",this.currentValue, true);
            }
        },
        keydown(e) {
            e.stopPropagation();
            this.$emit("change", this.currentValue);
        },
        focus(e) {
            e.stopPropagation();
            this.$emit("focus");
            this.$emit("change", this.currentValue);
        },
        blur(e) {
            e.stopPropagation();
            this.$emit("blur");
            this.$emit("change", this.currentValue);
        }
    },
    watch: {
        value(val) {
            if (val !== this.currentValue) {
                this.currentValue = this.format(val);
            }
        },

        currentValue(val) {
            this.$emit("input", val);
            this.$emit("change", val);
        }
    }
};
</script>
<style lang="scss" >
.xz-stepper {
    width: auto;
    .xz-stepper-minus,
    .xz-stepper-plus {
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        background-color: #f2f3f5;
        border: 0;
        margin: 1Px;
        position: relative;
        padding: 5px;
        vertical-align: middle;
        &.xz-stepper-disabled {
            background-color: #f7f8fa;
            &::after,
            &::before {
                background-color: #c8c9cc;
            }
        }
        &::after,
        &::before {
            content: "";
            position: absolute;
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #323233;
        }
        &::after {
            width: 5Px;
            height: 1Px;
        }
        &::before {
            width: 5Px;
            height: 1Px;
        }
    }
    .xz-stepper-minus {
        border-radius: 5px 0 0 5px;
    }
    .xz-stepper-plus {
        border-radius: 0 5px 5px 0;
        &::after {
            width: 1Px;
            height: 5Px;
        }
    }
    .xz-stepper-input {
        width: 50px;
        height: 40px;
        padding: 1Px;
        border: 0;
        margin: 1Px;
        background-color: #f2f3f5;
        border-width: 1Px 0;
        border-radius: 0;
        box-sizing: border-box;
        color: #323233;
        font-size: 14px;
        vertical-align: middle;
        text-align: center;
        -webkit-appearance: none;
    }
}
</style>

