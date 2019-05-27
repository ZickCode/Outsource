<template>
    <div class="uploader-box">
        <slot name="others"></slot>
        <!-- 其它内容slot-->
        <slot name="upimglists" v-if="!singleImg">
            <!-- 自定义 上传图片列表 slot -->
            <div
                class="imgitem"
                v-for="(item, index) in succedImgs"
                @click="imagePreview(index)"
                :key="index"
            >
                <img :src="item.content" :onerror="util.defaultImg" class="upImg">
                <xz-icon type="guanbi" @click="upImgdelSucc(index)"/>
            </div>
        </slot>
        <div class="imgitem" v-if="count>currentImgs.length">
            <van-uploader
                :after-read="onRead"
                :accept="accept"
                :max-size="limitSize"
                @oversize="oversize"
            >
                <slot name="upbtn">
                    <!--自定义上传选择图片按钮 slot -->
                    <img
                        :src="(singleImg && succedImgs.length>0)?succedImgs[0]['content']:dfImg"
                        :onerror="util.addPicture"
                        class="add-icon"
                    >
                </slot>
            </van-uploader>
        </div>
    </div>
</template>
<script>
import { Uploader, ImagePreview, Dialog } from "vant";
export default {
    name: "imgUploader",
    props: {
        limitSize: {
            // 上传图片限制大小 单位byte
            type: [String, Number],
            default: 10485760 // 默认10Mkb
        },
        postData: {
            // ajax 发送的数据
            type: Object,
            default: function() {
                return {
                    file: "upfile",
                    path: "common",
                    module: "common"
                };
            }
        },
        upingTips: {
            // 正在上传提示
            type: String,
            default: "图片上传中..."
        },
        upSuccTips: {
            // 上传成功提示
            type: String,
            default: "上传成功"
        },
        upFailTips: {
            type: String,
            default: "网络错误"
        },
        singleImg: {
            // 是否多图上传， 默认为false，单图上传一般用于头像上传或只允许上传一张的图片
            type: Boolean,
            default: false
        },
        count: {
            type: Number,
            default: 1
        },
        accept: {
            type: String,
            default: "*"
        },
        defaultImg: {
            //初始图片集
            type: Array,
            default: () => {
                return [];
            }
        },
        dfImg: {
            type: String,
            default:"this.src='" + require('../../assets/images/Add.png') + "'"
        }
    },
    components: {
        vanUploader: Uploader
    },
    data() {
        return {
            upedImgs: [], // 需要上传的图片
            succedImgs: [], // 上传成功在前台显示的图片集
            currentImgs: [], // 当前图片列表数据，包括其base64及远程url连接
            commentsText: ""
        };
    },
    created() {},
    methods: {
        changeRtate(val) {
            // 切换 评分
            this.currentRate = val;
        },
        handSubmit() {
            this.texttest = this.util.html(this.commentsText);
        },
        oversize() {
            this.$toast("图片必须小于" + this.limitSize / (1024 * 1024) + "M");
        },
        onRead(files) {
            var _this = this;
            let upFile = [];
            if (_this.singleImg && Array.isArray(files)) {
                // 如果是单图上传，选择了多张则不允许上传
                _this.$toast("只能选择一张图片");
                return false;
            }
            if (Array.isArray(files)) {
                // 选择了多图
                for (let i = 0; i < files.length; i++) {
                    if (files[i].file.size > _this.limitSize) {
                        // 如果所传图片大于限制大小，不允许上传
                        _this.$toast(
                            files[i].file.name +
                                "必须小于" +
                                _this.limitSize / (1024 * 1024) +
                                "M"
                        );
                        return;
                    }
                    let isEquality = false;
                    for (let j = 0; j < _this.upedImgs.length; j++) {
                        // 判断是否选择了相同的图片
                        isEquality = isEqualityImg(files[i], _this.upedImgs[j]);
                        if (isEquality) break;
                    }
                    if (!isEquality) {
                        // 如果不相等则加入
                        _this.upedImgs.push(files[i]);
                        upFile.push(files[i]);
                    }
                }
            } else {
                // 只有一张图
                if (files.file.size / (1024 * 1024) > _this.limitSize) {
                    // 如果所传图片大于限制大小，不允许上传
                    _this.$toast("图片过大，须小于" + _this.limitSize + "M");
                    return;
                }
                let isEquality = false;
                for (let k = 0; k < _this.upedImgs.length; k++) {
                    isEquality = isEqualityImg(_this.upedImgs[k], files);
                    if (isEquality) break;
                }

                if (!isEquality) {
                    // 如果不相等则加入
                    _this.upedImgs.push(files);
                    upFile.push(files);
                }
                if (isEquality) {
                    this.$toast("不能选择重复图片");
                    return false;
                }
            }

            this.upImg(upFile);

            function isEqualityImg(imgFileObj1, imgFileObj2) {
                return (
                    imgFileObj1.file.lastModified ===
                        imgFileObj2.file.lastModified &&
                    imgFileObj1.file.size === imgFileObj2.file.size &&
                    imgFileObj1.file.name === imgFileObj2.file.name &&
                    imgFileObj1.file.type === imgFileObj2.file.type
                );
            }
        },
        upImg(upImgFileObj) {
            let _this = this;
            const upLoadToast = _this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                mask: true,
                message: _this.upingTips
            });
            let imgsLength = upImgFileObj.length;
            let succUploadedNum = 0;
            for (let i = 0; i < imgsLength; i++) {
                let formDatas = new FormData(); // 创建formDatas对象
                formDatas.append("upfile", upImgFileObj[i].file);
                formDatas.append("file", "upfile");
                for (var it in _this.postData) {
                    formDatas.append(it, _this.postData[it]);
                }
                _this.post(
                    formDatas,
                    function(res) {
                        if (200 == res.code) {
                            // 成功回调
                            succUploadedNum++;
                            _this.succedImgs.push(upImgFileObj[i]);
                            _this.currentImgs.push({
                                imgObj: upImgFileObj[i],
                                url: res.result.fetch_url
                            });
                            if (succUploadedNum == imgsLength) {
                                // 上传完成
                                setTimeout(function() {
                                    upLoadToast.clear(); // 关闭加载层
                                    _this.$toast.success(_this.upSuccTips);
                                }, 1000);
                                _this.$emit(
                                    "completeUpload",
                                    res,
                                    _this.currentImgs
                                );
                            }
                        } else {
                            // 上传失败回调
                            _this.$toast.fail(_this.upFailTips);
                            _this.$emit("upImgFail", res, _this.currentImgs);
                        }
                    },
                    "",
                    function(err) {
                        // 成功或失败都执行
                        _this.$toast.fail(_this.upFailTips);
                        _this.upedImgs.pop();
                        _this.$emit("errorUpload", err, _this.currentImgs);
                    },
                    function(progressEvent) {
                        console.log(progressEvent);
                    }
                );
            }
        },
        imagePreview(startPos) {
            // 图片预览

            let _this = this;
            let prevImgs = [];
            if (_this.singleImg) {
                return;
            }

            for (var i = 0; i < _this.succedImgs.length; i++) {
                prevImgs.push(_this.succedImgs[i].content);
            }
            ImagePreview({
                images: prevImgs,
                startPosition: startPos
            });
        },
        upImgdelSucc(index) {
            // 删除图片
            event.stopPropagation(); // 阻止点击弹出预览
            var _this = this;
            _this.$dialog
                .confirm({
                    message: "确定要删除该图片吗？"
                })
                .then(() => {
                    _this.currentImgs.splice(index, 1); // 删除已上传的对应图片
                    _this.succedImgs.splice(index, 1);
                    _this.upedImgs.splice(index, 1);
                    _this.$emit("upImgdelSucc", index, _this.currentImgs);
                })
                .catch(() => {
                    // on cancel
                });
        }
    }
};
</script>
<style lang="scss" scoped="scoped">
.uploader-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.imgitem {
    position: relative;
    padding: 10px;
    width: 25vw;
    height: 25vw;

    .xz-icon {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        background: #e4393c;
        border-radius: 50%;
    }

    &:last-child {
        border: none;
    }
}

.imgitem img {
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
}

.img-preview-box .add-icon {
    width: 100%;
    height: 100%;
}

</style>
