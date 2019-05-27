<template>
    <div class="nav-main nav-main-bottom">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="发表评论" fixed left-arrow/>
        <article class="s-shop-item mb-20">
            <a :href="'#/goods/detail/'+skuData.sku_id">
                <span class="s-shop-pic">
                    <img v-lazy="util.reImg(skuData.sku_thumb)" alt>
                </span>
                <div class="s-msg-cont">
                    <h4 v-text="skuData.sku_name"></h4>
                    <p v-html="skuData._sku_spec"></p>
                </div>
            </a>
        </article>
        <xz-form
            :model="formData"
            :rules="rules"
            ref="comment_form"
            action
            class="comment-form saleafter-form J_form"
        >
            <div class="return-box mb-0">
                <div class="return-warp">
                    <p>
                        <a
                            href="javascript:void(0);"
                            :class="{ 'cur': formData.mood == 'positive' }"
                        >
                            <input
                                type="radio"
                                name="commentNum"
                                value="3"
                                @change="changeRtate('positive')"
                            >好评
                        </a>
                        <a
                            href="javascript:void(0);"
                            :class="{ 'cur': formData.mood == 'neutral' }"
                        >
                            <input
                                type="radio"
                                name="commentNum"
                                value="2"
                                @change="changeRtate('neutral')"
                            >中评
                        </a>
                        <a
                            href="javascript:void(0);"
                            :class="{ 'cur': formData.mood == 'negative' }"
                        >
                            <input
                                type="radio"
                                name="commentNum"
                                value="1"
                                @change="changeRtate('negative')"
                            >差评
                        </a>
                    </p>
                </div>
            </div>
            <div class="bd">
                <textarea
                    name
                    id
                    v-model="formData.content"
                    cols="20"
                    rows="8"
                    placeholder="请输入您的评论内容"
                ></textarea>
                <div class="up-img-box">
                    <div class="img-preview-box">
                        <!-- postData: 图片上传的参数，  succUpload： 上传成功后回调，返回服务器返回的数据和已上传成功的file对象   singleImg 是否单图，一般是头像上传时用到 -->
                        <up-loader
                            :postData="upImgData"
                            :accept="accept"
                            @upImgFail="upImgFail"
                            @completeUpload="completeUpload"
                            @errorUpload="errorUpload"
                            @upImgdelSucc="upImgdelSucc"
                            :singleImg="false"
                            :count="8"
                        ></up-loader>
                    </div>
                </div>
            </div>
        </xz-form>
        <div class="xz-btn btn-e43 xz-btn-bottom" @click="handSubmit">发表评论</div>
    </div>
</template>
<script>
import Uploader from "@/components/imgUploader/";
import xzForm from "@/components/form";
import { mapActions, mapState } from "vuex";
export default {
    name: "comments",
    components: {
        UpLoader: Uploader,
        xzForm
    },
    data() {
        return {
            skuData: {},
            formData: {
                imgs: [],
                id: "",
                spu_id: "",
                sku_id: "",
                sub_sn: "",
                content: "",
                mood: "positive"
            },
            rules: {
                content: {
                    type: "string",
                    required: true,
                    min: 5,
                    message: "评论内容最少5个字"
                }
            },
            accept: "image/*",
            upImgData: {
                path: "pubComment",
                module: "comment",
                method: "api.module.attachment.attachment.upload"
            }
        };
    },
    created() {
        let _this = this;

        let _sku = _this.$route.params.order_sku;
        if (_this.util.isEmpty(_sku)) {
            _this.go_back();
            return;
        }
        _this.formData.sub_sn = _sku.sub_sn;
        _this.formData.sku_id = _sku.sku_id;
        _this.formData.id = _sku.id;
        _this.skuData = _sku;
        let _accept = _this.websit.data.attach_ext;
        if (!_this.util.isEmpty(_accept)) {
            let _aps = _accept.split(",");
            let _accepts = [];
            _aps.forEach(item => {
                _accepts.push("image/" + item);
            });
            _this.accept = _accepts.join(",");
        }
    },
    methods: {
        changeRtate(val) {
            // 切换 评分
            this.formData.mood = val;
        },
        handSubmit() {
            let _this = this;
            //表单提函数
            _this.$refs.comment_form.validator(val => {
                if (val) {
                    let _loading = _this.$xzLoading();
                    _this.formData.content = _this.util.html(
                        _this.formData.content
                    );
                    _this.post(
                        {
                            imgs: _this.formData.imgs,
                            id: _this.formData.id,
                            spu_id: _this.formData.spu_id,
                            sku_id: _this.formData.sku_id,
                            sub_sn: _this.formData.sub_sn,
                            content: _this.formData.content,
                            mood: _this.formData.mood,
                            method: "api.module.comment.comment.add"
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
                                message: "评论成功",
                                position: "bottom"
                            });
                            _this.go_back();
                        }
                    );
                }
            });
        },
        completeUpload(res, currentImgs) {
            // 图片成功上传后回调 参数
            this.formData.imgs.push(res.result.url);
        },
        upImgdelSucc(index, currentImgs) {
            this.formData.imgs.splice(index, 1);
            // 图片删除成功回调，返回删除后的图片列表url， 只是本地删除
        },
        upImgFail(res, currentImgs) {
            // 上传失败
        },
        errorUpload(err, currentImgs) {
            // 删除成功 index删除的索引
        }
    },
    computed: {
        ...mapState(["websit"])
    }
};
</script>
