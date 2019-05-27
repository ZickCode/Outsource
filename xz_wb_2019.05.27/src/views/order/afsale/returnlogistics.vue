<template>
    <div class="nav-main nav-main-bottom" style="background:#f0f0f0;">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="邮寄信息" fixed left-arrow/>
        <div class="express xz-key mb-20">
            <ul class="key-items">
                <li class="key-item">
                    <span class="key-name">快递公司</span>
                    <div class="key-data" @click="isShowActive=true">
                        <input type="text" readonly :value="formData.delivery_name">
                        <xz-icon type="forward"/>
                    </div>
                </li>
            </ul>
            <div class="express-tips">请选择您发货的快递公司，如无您所使用的快递请选择其他，在下方备注快递公司名称。</div>
        </div>
        <xz-form
            :model="formData"
            :rules="rules"
            ref="afsale_form"
            class="comment-form saleafter-form J_form"
        >
            <div class="s-formcont">
                <p class="title">快递单号</p>
                <input class="number" type="text" v-model="formData.delivery_sn" name placeholder="请输入快递单号并确保正确">
                <textarea
                    class="content"
                    v-model="formData.delivery_desc"
                    cols="20"
                    rows="8"
                    placeholder="（选填）请输入您想备注的内容，也可在下方上传快递单照片"
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
                        ></up-loader>
                    </div>
                </div>
            </div>
        </xz-form>

        <div class="xz-btn btn-e43 xz-btn-bottom btn-e43" @click="save_click">确认邮寄信息</div>

        <van-actionsheet v-model="isShowActive">
            <xz-popup
                title="快递公司"
                btnName="确定"
                :clickFlag="isShowActive"
                :isShowHd="false"
                @addClose="isShowActive=false"
                @clickBottomBtn="isShowActive=false"
            >

                <ul class="popup-items sort" slot="content">
                    <ul class="pay-list sort-list">
                        <li v-for="(item,index) in logisticsList" :key="index" @click="logisticsList_click(index)">
                            <input
                                type="radio"
                                name="icv"
                                class="g-radio"
                                :checked="logistics == item.id"
                            >
                            <article class="gd-msg">
                                <div class="gd-msg-txt">
                                    <p
                                        class="J_kind"
                                    >{{item.name}}</p>
                                </div>
                            </article>
                        </li>
                    </ul>
                </ul>
            </xz-popup>
        </van-actionsheet>
    </div>
</template>
<script>
import popup from "@/components/goods/index.vue";
import Uploader from "@/components/imgUploader/";
import xzForm from "@/components/form";
import { mapActions, mapState } from "vuex";
export default {
    name: "returnlogistics",
    components: {
        "xz-popup": popup,
        UpLoader: Uploader,
        xzForm
    },
    data() {
        return {
            isShowActive: false,
            logisticsList: [],
            logistics: "",
            afsaleData: {},
            accept: "image/*",
            upImgData: {
                path: "pubComment",
                module: "comment",
                method: "api.module.attachment.attachment.upload"
            },
            formData: {
                method:"api.module.order.server.ajax_delivery",
                id: "",
                delivery_images: [],
                delivery_name:"",
                delivery_sn:'',
                delivery_desc: ""
            },
            rules: {
                delivery_sn: {
                    type: "string",
                    required: true,
                    message: "请填写快递单号"
                },
                delivery_desc: {
                    type: "string",
                    required: true,
                    min: 5,
                    message: "请填写备注"
                }
            }
        };
    },
    created() {
        let _this = this;
        let _id = _this.$route.params.id;
        if (_this.util.isEmpty(_id)) {
            _this.go_back();
            return;
        }
        _this.formData.id = _id;
        let _accept = _this.websit.data.attach_ext;
        if (!_this.util.isEmpty(_accept)) {
            let _aps = _accept.split(",");
            let _accepts = [];
            _aps.forEach(item => {
                _accepts.push("image/" + item);
            });
            _this.accept = _accepts.join(",");
        }
        _this.loadData();
    },
    methods: {
        loadData() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.order.server.delivery"
                },
                function(data) {
                    _loading.clear();
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg
                        });
                        return;
                    }
                    _this.logisticsList = data.result;
                    _this.logisticsList.push({ id: 0, name: "其他" });
                    _this.logistics = _this.logisticsList[0].id;
                    _this.formData.delivery_name = _this.logisticsList[0].name;
                }
            );
        },
        save_click() {
            let _this = this;
            _this.$refs.afsale_form.validator(val => {
                if (val) {
                    let _loading = _this.$xzLoading();
                    _this.formData.delivery_desc = _this.util.html(
                        _this.formData.delivery_desc
                    );
                    _this.post(_this.formData,
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
                                message: "提交成功",
                                position: "bottom"
                            });
                            _this.$router.push("/order/afsale/salesuccess/"+_this.formData.id);
                        }
                    );
                }
            });
        },
        logisticsList_click(index) {
            this.logistics = this.logisticsList[index].id;
            this.formData.delivery_name = this.logisticsList[index].name;
            this.isShowActive = false;
        },
        completeUpload(res, currentImgs) {
            // 图片成功上传后回调 参数
            this.formData.delivery_images.push(res.result.url);
        },
        upImgdelSucc(index, currentImgs) {
            this.formData.delivery_images.splice(index, 1);
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
    },
    beforeRouteLeave(to, from, next) {
        if (this.isShowActive) {
            this.isShowActive = false;
            next(false);
        } else {
            next();
        }
    }
};
</script>
<style>
.popup-items .desc {
    padding: 0;
}
</style>