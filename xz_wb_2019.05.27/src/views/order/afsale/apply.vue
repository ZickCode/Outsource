<template>
    <div class="nav-main nav-main-bottom">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="申请售后" fixed left-arrow/>
        <article class="s-shop-item mb-20">
            <a :href="'#/goods/detail/'+order_sku.sku_id">
                <span class="s-shop-pic">
                    <img v-lazy="util.reImg(order_sku.sku_thumb)" alt>
                </span>
                <div class="s-msg-cont">
                    <h4 v-text="order_sku.sku_name"></h4>
                    <p v-html="order_sku._sku_spec"></p>
                </div>
            </a>
        </article>
        <xz-form
            :model="formData"
            :rules="rules"
            ref="apply_form"
            class="comment-form saleafter-form J_form"
        >
            <div class="return-box">
                <div class="return-warp">
                    <p>
                        <a
                            href="javascript:void(0);"
                            :class="{ 'cur': formData.method == 'api.module.order.server.create_return' }"
                        >
                            <input
                                type="checkbox"
                                name
                                @change="changeRtate('api.module.order.server.create_return')"
                            >退货退款
                        </a>
                        <a
                            href="javascript:void(0);"
                            :class="{ 'cur': formData.method == 'api.module.order.server.create_refund' }"
                        >
                            <input
                                type="checkbox"
                                name
                                @change="changeRtate('api.module.order.server.create_refund')"
                            >仅退款
                        </a>
                    </p>
                </div>
                <ul class="s-reason">
                    <li class="flex-wrap reason-item J_saleafter" @click="isShowaction=true">
                        <h5 class="flex-wd reason-tit">售后原因</h5>
                        <span class="flex-one reason-msg" v-text="formData.cause"></span>
                    </li>
                </ul>
            </div>
            <div class="bd">
                <div class="amount">
                    <p class="bala-tips">请输入退款金额(元)</p>
                    <div class="flex-wrap balance-box">
                        <span class="flex-wd balance-icon">
                            <img src="../../../assets/images/uccenter/ico_pay.png">
                        </span>
                        <div class="flex-one balance-one">
                            <input
                                type="number"
                                name="num"
                                placeholder
                                class="z-ipt"
                                v-model="formData.amount"
                                @keyup="viAmount"
                            >
                        </div>
                    </div>
                    <p class="bala-tips">可退金额{{order_sku.real_price}}元</p>
                </div>
                <textarea
                    name
                    id
                    cols="20"
                    rows="8"
                    placeholder="请输入您的退款原因"
                    v-model="formData.desc"
                ></textarea>
                <div class="up-img-box">
                    <div class="img-preview-box">
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
        <div class="xz-btn btn-e43 xz-btn-bottom" @click="save_click">提交申请</div>
        <van-actionsheet
            v-model="isShowaction"
            :actions="actions"
            cancel-text="取消"
            @select="onSelect"
        />
    </div>
</template>
<script>
import Uploader from "@/components/imgUploader/";
import xzForm from "@/components/form";
import { Actionsheet } from "vant";
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            isShowaction: false,
            order_sku: {},
            formData: {
                images: [],
                desc: "",
                cause: "外观/参数等与描述不符",
                amount: "",
                sub_sn: "",
                id: "",
                method: "api.module.order.server.create_return"
            },
            rules: {
                desc: {
                    type: "string",
                    required: true,
                    min: 5,
                    message: "退款原因最少5个字"
                }
            },
            accept: "image/*",
            upImgData: {
                path: "pubComment",
                module: "comment",
                method: "api.module.attachment.attachment.upload"
            },
            actions: [
                {
                    name: "外观/参数等与描述不符"
                },
                {
                    name: "商品发错货"
                },
                {
                    name: "产品质量/故障"
                },
                {
                    name: "效果不好或不喜欢"
                },
                {
                    name: "收到商品少件/破损/污渍"
                },
                {
                    name: "假冒商品"
                },
                {
                    name: "其他"
                }
            ]
        };
    },
    components: {
        vanActionsheet: Actionsheet,
        UpLoader: Uploader,
        xzForm
    },
    created() {
        let _this = this;
        let _sku = _this.$route.params.order_sku;
        if (_this.util.isEmpty(_sku)) {
            _this.go_back();
            return;
        }
        _this.formData.id = _sku.id;
        _this.formData.sub_sn = _sku.sub_sn;
        _this.order_sku = _sku;
        let _accept = _this.websit.data.attach_ext;
        if (!_this.util.isEmpty(_accept)) {
            let _accepts = _accept.split(",");
            _this.accept = "";
            _accepts.forEach(item => {
                _this.accept += "image/" + item + ",";
            });
        }
    },
    methods: {
        save_click() {
            let _this = this;
            _this.$refs.apply_form.validator(val => {
                if (val) {
                    let _loading = _this.$xzLoading();
                    _this.formData.content = _this.util.html(
                        _this.formData.content
                    );
                    _this.post(
                        {
                            images: _this.formData.images,
                            id: _this.formData.id,
                            sub_sn: _this.formData.sub_sn,
                            amount: _this.formData.amount,
                            cause: _this.formData.cause,
                            desc: _this.formData.desc,
                            method: _this.formData.method
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
                                message: "申请售后成功",
                                position: "bottom"
                            });
                            _this.order_sku._server.status = 0;
                            _this.order_sku._server.amount =
                                _this.formData.amount;
                            _this.$router.push({
                                name: "afsaledetail",
                                params: { order_sku: _this.order_sku }
                            });
                        }
                    );
                }
            });
        },
        changeRtate(val) {
            // 切换 评分
            this.formData.method = val;
        },
        completeUpload(res, currentImgs) {
            // 图片成功上传后回调 参数
            this.formData.images.push(res.result.url);
        },
        upImgdelSucc(index, currentImgs) {
            this.formData.images.splice(index, 1);
            // 图片删除成功回调，返回删除后的图片列表url， 只是本地删除
        },
        upImgFail(res, currentImgs) {
            // 上传失败
        },
        errorUpload(err, currentImgs) {
            // 删除成功 index删除的索引
        },
        onSelect(item) {
            (this.formData.cause = item.name), (this.isShowaction = false);
        },
        viAmount() {
            if (this.order_sku.real_price < this.formData.amount) {
                this.formData.amount = this.order_sku.real_price;
            }
        }
    },
    computed: {
        ...mapState(["websit"])
    }
};
</script>