<template>
    <form>
        <slot></slot>
    </form>
</template>
<script>
import schema from "@/libs/validator";
export default {
    props:{
        rules:{},
        model:{}
    },
    data() {
        return {
            vali: null
        };
    },
    created() {
        this.load();
    },
    methods: {
        load() {
            let _this = this;
            _this.vali = new schema(_this.rules);
        },
        validator(cll) {
            let _this = this;
            _this.vali.validate(_this.model, (errors, fields) => {
                if (errors) {
                    _this.$toast({
                            message: errors[0].message,
                            position: "bottom"
                        });
                    cll(false);
                    return
                }
                cll(true);
            });
        }
    }
};
</script>