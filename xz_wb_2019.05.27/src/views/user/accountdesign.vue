<template>
    <div class="nav-main bg-f0">
        <van-nav-bar
            @click-left="go_back"
            @click-right="save_design"
            class="xz-nva-bar"
            title="账号设置"
            left-arrow
            fixed
            right-text="保存"
        />
        <div class="setaccount-box">
            <form class="g-form">
                <div class="modifyhd-wrap">
                    <div class="modifyhd-box">
                        <span class="modifyhd-pic">
                            <!-- postData: 图片上传的参数，  succUpload： 上传成功后回调，返回服务器返回的数据和已上传成功的file对象   singleImg 是否单图，一般是头像上传时用到 -->
                            <up-loader
                                :postData="upImgData"
                                @upImgFail="upImgFail"
                                @completeUpload="completeUpload"
                                @errorUpload="errorUpload"
                                @upImgdelSucc="upImgdelSucc"
                                :dfImg="util.reImg(userMessage.user.avatar)"
                                :singleImg="false"
                            ></up-loader>
                        </span>
                        <p class="clhead">点击修改头像</p>
                    </div>
                </div>
                <div class>
                    <ul class="accoun-list">
                        <li class="flex-wrap accoun-item">
                            <span class="flex-wd accttxt">昵称</span>
                            <div class="flex-one">
                                <div class="ipt-box">
                                    <input
                                        type="text"
                                        class="u-text"
                                        :placeholder="nickname"
                                        v-model="nickname"
                                    >
                                </div>
                            </div>
                        </li>
                        <li class="flex-wrap accoun-item">
                            <span class="flex-wd accttxt">性别</span>
                            <a
                                href="javascript:void(0)"
                                class="flex-one a-link cout-bg"
                                @click="isShowaction = !isShowaction"
                            >
                                <p class="z-sex">{{sex}}</p>
                            </a>
                        </li>
                        <li class="flex-wrap accoun-item">
                            <span class="flex-wd accttxt">生日</span>
                            <a
                                href="javascript:void(0)"
                                class="flex-one a-link cout-bg"
                                @click="show = true"
                            >
                                <p class="z-sex">{{ choiceTime }}</p>
                            </a>
                        </li>
                        <li class="flex-wrap accoun-item mt-20">
                            <span class="flex-wd accttxt">账号安全</span>
                            <a href="#/user/accountsafe" class="flex-one a-link cout-bg">&nbsp;</a>
                        </li>
                    </ul>
                    <div class="xz-lr-box xz-lr-btn set-back">
                        <button type="button" class="xz-btn btn-e43 xz-radius" @click="log_out">退出登录</button>
                    </div>
                </div>
            </form>
        </div>
        <!-- 性别 -->
        <van-actionsheet
            v-model="isShowaction"
            :actions="actions"
            cancel-text="取消"
            @select="onSelect"
        />
        <!-- 年月 -->
        <van-popup v-model="show" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="min_date"
                :formatter="formatter"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
        </van-popup>
    </div>
</template>
<script>
import { Actionsheet } from "vant";
import { DatetimePicker } from "vant";
import { Popup } from "vant";
import Uploader from "@/components/imgUploader/";
import { mapState, mapActions } from "vuex";
export default {
    name: "accountdesign",
    data() {
        return {
            currentDate: new Date(),
            min_date: new Date(1919, 1, 1),
            nickname: "",
            userMsg: {},
            isShowaction: false,
            show: false,
            sex: "保密",
            choiceTime: "请选择",
            actions: [
                {
                    name: "男"
                },
                {
                    name: "女"
                },
                {
                    name: "保密"
                }
            ],
            upImgData: {
                path: "avatar",
                module: "avatar",
                method: "api.module.attachment.attachment.upload"
            },
            imgsMessage: "",
            formData: {
                imgs: []
            }
        };
    },
    components: {
        vanActionsheet: Actionsheet,
        vanDatetimePicker: DatetimePicker,
        vanPopup: Popup,
        UpLoader: Uploader
    },

    methods: {
        ...mapActions("shopCar", ["EmptyShopCar"]),
        ...mapActions("userMessage", ["changeUserMsg"]),
        ...mapActions("userMessage", ["getUser", "setUser"]),
        onSelect(item) {
            (this.sex = item.name), (this.isShowaction = false);
        },
        formatter(type, value) {
            if (type === "year") {
                return `${value}年`;
            } else if (type === "month") {
                return `${value}月`;
            } else if (type === "day") {
                return `${value}日`;
            }
            return value;
        },
        StringToDate(DateStr) {
            var date = new Date(DateStr);
            var Year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (parseInt(month) < 10) {
                month = "0" + month;
            }
            if (parseInt(day) < 10) {
                day = "0" + day;
            }
            return Year + "-" + month + "-" + day;
        },
        onConfirm(time) {
            var zdata = this.StringToDate(time);
            this.choiceTime = zdata;
            this.show = false;
        },
        onCancel() {
            this.show = false;
        },
        completeUpload(res, currentImgs) {
            this.imgsMessage = res.result.url;
            // 图片成功上传后回调 参数
            //this.formData.imgs.push(res.result.url);
            //console.log(this.formData);
        },
        upImgdelSucc(index, currentImgs) {
            this.formData.imgs.splice(index, 1);
            // 图片删除成功回调，返回删除后的图片列表url， 只是本地删除
        },
        upImgFail(res, currentImgs) {
            // 上传失败
        },
        save_design() {
            /**更新用户信息,还要调api */
            let _this = this;
            let copy_u = _.cloneDeep(_this.userMsg);
            _this.$dialog
                .confirm({
                    message: "确定要保存吗"
                })
                .then(() => {
                    let user = _this.userMsg;
                    let sex =
                        this.sex == "男"
                            ? (this.sex = 1)
                            : this.userMsg.sex == "女"
                            ? (this.sex = 2)
                            : (this.sex = 3);
                    user.sex = _this.sex;
                    user.nickname = _this.nickname;
                    let params = {
                        method: "api.module.member.info.changeInfo",
                        birthday: _this.choiceTime,
                        sex: _this.sex,
                        nickname: _this.nickname,
                        avatar: _this.imgsMessage
                    };
                    /**推送接口 */
                    _this.saveUser(params, _this);
                    //_this.changeUserMsg(user);
                    this.sex =
                        this.sex == 1
                            ? (this.sex = "男")
                            : this.sex == 2
                            ? (this.sex = "女")
                            : (this.sex = "保密");
                    /**本地推送 */

                    //user = this.getUser()
                    window.sessionStorage.setItem("userData", user);
                })
                .catch(() => {
                    //cancel
                });
        },
        errorUpload(err, currentImgs) {
            // 删除成功 index删除的索引
        },
        async saveUser(params, _this) {
            let data = await this.api.post(params);
            if (data.code == 200) {
                _this.$toast({
                    message: "更新成功",
                    position: "bottom"
                });
            } else {
                _this.$toast({
                    message: "更新失败",
                    position: "bottom"
                });
            }
        },
        log_out() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.member.public.logout"
                },
                function(data) {
                    _loading.clear();
                    if (data.code == 200) {
                        _this.$toast({
                            message: "已退出登录",
                            position: "bottom"
                        });
                        let _user = {
                            avatar:
                                "/template/default/statics/images/member/default_head.png",
                            username: "请登录",
                            money: 0.0,
                            _group: {
                                name: "游客"
                            }
                        };
                        localStorage.removeItem("token");
                        _this.EmptyShopCar();
                        _this.setUser(_user);
                        _this.go_back();
                    }
                }
            );
        }
    },
    computed: {
        ...mapState(["userMessage"])
    },
    created() {
        if (this.userMessage.user.nickname == undefined) {
            let userHist = JSON.parse(
                window.sessionStorage.getItem("userData")
            );
            if (userHist != undefined) {
                this.userMsg = userHist;
                this.nickname = userHist.nickname;
                this.choiceTime = userHist.birthday;
            }
        } else {
            /**初始化用户信息 */
            this.userMsg = this.userMessage.user;
            this.nickname = this.userMessage.user.nickname;
            this.sex =
                this.userMsg.sex == 1
                    ? (this.sex = "男")
                    : this.userMsg.sex == 2
                    ? (this.sex = "女")
                    : (this.sex = "保密");
            this.choiceTime = this.userMessage.user.birthday;
            this.imgsMessage = this.userMessage.user.avatar;
        }
        console.log(this.choiceTime);
    },
    beforeMount() {},
    mounted() {}
};
</script>
<style lang="scss">
.van-picker__cancel,
.van-picker__confirm {
    line-height: 80px;
}

.van-picker__toolbar {
    line-height: 80px !important;
    height: 80px !important;
    font-size: 44px;
}
.xz-icon {
    display: none;
}

.set-back {
    padding: 0 55px;
}
.modifyhd-pic {
    .imgitem {
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
    }
    .uploader-box {
        height: 100%;
    }
    .van-uploader {
        height: 100%;
        width: 100%;
    }
}
</style>
