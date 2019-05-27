<template>
    <div class="nav-main nav-main-bottom">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" fixed title="发表咨询" left-arrow/>
        <form class="g-form">
            <div class="proadvice-box">
                <textarea name="question" v-model="formData.question" placeholder="请输入您想咨询的内容"></textarea>
            </div>
        </form>
        <div class="xz-btn btn-e43 xz-btn-bottom">
            <a href="javascript:void(0)" @click="publish_btn" class="rt-link">发布咨询</a>
        </div>
    </div>
</template>
<script>
export default {
    name: "provadvice",
    data() {
        return {
            formData: {
                question: "",
                spu_id: "",
                sku_id: ""
            }
        };
    },
    created() {
        let _spu_id = this.$route.params.spu_id;
        let _sku_id = this.$route.params.sku_id;
        if (this.util.isEmpty(_spu_id) || this.util.isEmpty(_sku_id)) {
            this.go_back();
            return;
        }
        this.formData.spu_id = _spu_id;
        this.formData.sku_id = _sku_id;
    },
    methods: {
        publish_btn() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.member.consult.add",
                    spu_id: _this.formData.spu_id, //spu_id
                    sku_id: _this.formData.sku_id, //sku_id
                    question: _this.formData.question
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
                    _this.$toast({
                        message: "发表咨询成功",
                        position: "bottom"
                    });
                    _this.go_back();
                }
            );
        }
    }
};
</script>